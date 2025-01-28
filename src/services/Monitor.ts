import { CardCheckInfo } from "@/types/CardCheckInfo";
import { SitecoreItem } from "@/types/SitecoreItem";
import { FeedMessage } from "@/types/FeedMessage";
import { AprimoImage } from "@/types/AprimoImage";
import { format } from "date-fns";
import { fetchListItems } from "./fetchListItems";
import { fetchItemFromId } from "./fetchItemFromId";
import { fetchImageUrls } from "./fetchImageUrls";
import { fetchMessageFromExternalId } from "./fetchMessageFromExternalId";
import { CardCompleteInfo } from "@/types/CardCompleteInfo";
import { fetchTranslationTexts } from "./fetchTranslationTexts";
import { GetMenoToken } from "./meno/getToken";


export async function performCardCheck(today : Date): Promise<{ [key: string]: CardCompleteInfo }> {

    const result: { [key: string]: CardCompleteInfo } = {};
    const languages: string[] = [
        "de-AT", "fr-BE", "de-CH", "de-DE", "da-DK", "fr-FR", "nl-NL", 
        "nb-NO", "sv-SE", "fi-FI", "en-GB", "en-US", "en-gb", "en-001"
    ];
    try {
        await GetMenoToken();
    } catch (error) {
            console.log(`Failed to retrieve access token from MENO: ${error}`);
            return result;
    }
    const listItems = await fetchListItems();
    for (const key in listItems) {
        if (listItems.hasOwnProperty(key)) {
            const items : CardCheckInfo[] = await createCardCheckInfoList(listItems[key].items, languages, today);
            const header = listItems[key].messageHeader || listItems[key].teaserHeader;
            const cardCompleteInfo : CardCompleteInfo = { items, header };
            result[key] = cardCompleteInfo;
        }
    }
    return result;
}

async function createCardCheckInfoList(itemIds: string[], languages: string[], today : Date): Promise<CardCheckInfo[]> {
    const CardCheckInfoList: CardCheckInfo[] = [];
    await Promise.all(itemIds.map(async (item: string) => {
        const id = formatSimpleGuid(item);
        const info: CardCheckInfo = {} as CardCheckInfo;
        const language = "en";
        const sitecoreItem = await fetchItemFromId(id, language);
        await populateCardCheckInfo(info, id, sitecoreItem!, languages);
        CardCheckInfoList.push(manageCardCheckInfo(info, today));
    }));

    // Order the items based on their visibility
    CardCheckInfoList.sort((a, b) => {
        if (a.visible && !b.visible) return -1;
        if (!a.visible && b.visible) return 1;
        if (a.isFuture && !b.isFuture) return -1;
        if (!a.isFuture && b.isFuture) return 1;
        if (a.isPast && !b.isPast) return -1;
        if (!a.isPast && b.isPast) return 1;
        return 0;
    });
    
    return CardCheckInfoList;
}

async function populateCardCheckInfo(info: CardCheckInfo, id: string, sitecoreItem: SitecoreItem, languages: string[]) {
    const language = "en";
    if (sitecoreItem.campaignName.includes("NOT FOUND")) {
        const foundSitecoreItem = await findSitecoreItem(id, languages);
        if (foundSitecoreItem) {
            sitecoreItem = foundSitecoreItem;
        } else {
            await populateCardCheckInfoFromMeno(info, id);
            return;
        }
    }
    await populateCardCheckInfoFromSitecore(info, id, sitecoreItem, language);
}

async function populateCardCheckInfoFromMeno(info: CardCheckInfo, id: string): Promise<void> {
    info.id = id;
    
    const menoItem: FeedMessage | null = await fetchMessageFromExternalId(id.toUpperCase());
    if (!menoItem) {
        info.menoCheck = false;
        return;
    }

    info.menoCheck = true;
    info.campaignName = menoItem.attributes.campaignId;
    info.marketsFromMeno = menoItem.attributes.context.countryCodes;
    const imageId = menoItem.attributes?.links?.teaserImage?.[0]?.id || "";
    if (imageId) {
        const images: AprimoImage[] = await fetchImageUrls(imageId, "360", "180");
        if (images && images.length > 0) {
            info.imagePath = images[0].Url;
        }
    }
}

async function populateCardCheckInfoFromSitecore(info: CardCheckInfo, id: string, sitecoreItem: SitecoreItem, language: string) {
    populateMarketsFromSitecore(info, sitecoreItem);
    populateBasicInfoFromSitecore(info, language, sitecoreItem, id);
    await populateTranslationsFromSitecore(info, id);
    await populateImageFromSitecore(info, sitecoreItem);
    await populateMenoInfo(info, id);
}

function populateMarketsFromSitecore(info: CardCheckInfo, sitecoreItem: SitecoreItem) {
    info.marketsFromSitecore = [];
    if (sitecoreItem.marketCodes != null && sitecoreItem.marketCodes.length > 0) {
        for (const marketCode of sitecoreItem.marketCodes) {
            const splitMarkets = marketCode.split('|');
            info.marketsFromSitecore.push(...splitMarkets);
        }
    }
}

async function populateTranslationsFromSitecore(info: CardCheckInfo, id: string) {
    info.translations = [];
    const items = await fetchTranslationTexts(id);
    if (items) {
        Object.keys(items).forEach((lang) => {
            info.translations.push(lang);
        });
    }
}

function populateBasicInfoFromSitecore(info: CardCheckInfo, language: string, sitecoreItem: SitecoreItem, id : string) {
    info.language = language;
    info.header = sitecoreItem.header;
    info.models = sitecoreItem.models;
    info.startDate = new Date(sitecoreItem.startDate);
    info.endDate = new Date(sitecoreItem.endDate);
    info.campaignName = sitecoreItem.campaignName;
    info.path = sitecoreItem.path;
    info.sitecoreCheck = true;
    info.id = id;
}

async function populateImageFromSitecore(info: CardCheckInfo, sitecoreItem: SitecoreItem) {
    const imageId = sitecoreItem.imageId;
    if (imageId != null) {
        const images : AprimoImage[] = await fetchImageUrls(imageId, "360", "180");
        if (images != null && images.length > 0) {
            info.imagePath = images[0].Url;
        }
    }   
}

async function populateMenoInfo(info: CardCheckInfo, id: string) {
    const menoItem : FeedMessage | null = await fetchMessageFromExternalId(id.toUpperCase());
    if (menoItem == null || menoItem.attributes == null) {
        info.menoCheck = false;
    } else {
        info.menoCheck = true;
        info.campaignName = menoItem.attributes.campaignId;
        info.marketsFromMeno = menoItem.attributes.context.countryCodes;
    }
}

async function findSitecoreItem(id: string, languages: string[]): Promise<SitecoreItem | null> {
    const sitecoreItem: SitecoreItem | null = null;
    for (const lang of languages) {
        const language = lang;
        const sitecoreItem = await fetchItemFromId(id, language);
        if (sitecoreItem && !sitecoreItem.campaignName.includes("NOT FOUND")) {
            return sitecoreItem;
        }
    }
    if (sitecoreItem == null) {
        console.log(`Could not find sitecore item with id ${id}`);
    }
    return sitecoreItem;
}

function formatSimpleGuid(guid: string): string {
    return guid.replace(/{|}|-/g, "").toLowerCase();
}

function manageCardCheckInfo(info: CardCheckInfo, today: Date): CardCheckInfo {
    info.startDateString = info.startDate && formatDateString(info.startDate);
    info.endDateString = info.endDate && formatDateString(info.endDate);
    setCardCheckVisibility(info, today);
    setCardCheckModelString(info);
    setCardCheckMarketsStrings(info);
    setCardCheckMarketClasses(info);
    return info;
}

function formatDateString(date: Date): string {
    if (isNaN(date.getTime())) {
        // Return an empty string or a default value if the date is invalid
        return '';
    }
    return format(date, 'yyyy-MM-dd');
}

function setCardCheckVisibility(info: CardCheckInfo, today: Date): void {
    info.visible = today >= info.startDate && today <= info.endDate;
    info.isFuture = today < info.startDate;
    info.isPast = today > info.endDate;
}

function setCardCheckModelString(info: CardCheckInfo): void {
    info.modelString = !info.models || info.models.length == 0 ? "" : info.models.join(', ');
}

function setCardCheckMarketsStrings(info: CardCheckInfo): void {
    info.marketsfromSitecoreString = !info.marketsFromSitecore || info.marketsFromSitecore.length == 0 ? "" : info.marketsFromSitecore.join(', ');
    info.marketsFromMenoString = !info.marketsFromMeno || info.marketsFromMeno.length == 0 ? "" : info.marketsFromMeno.join(', ');
}

function setCardCheckMarketClasses(info: CardCheckInfo): void {
    const marketCheck = !info.marketsFromMeno || !info.marketsFromSitecore || info.marketsFromMeno.length == info.marketsFromSitecore.length;
    info.marketsFromMenoClass = marketCheck ? "green" : "red";
    info.marketsFromSitecoreClass = marketCheck ? "green" : "red";
    info.marketCheck = marketCheck;
}

