import { CardCheckInfo } from "@/types/CardCheckInfo";
import { SitecoreItem } from "@/types/SitecoreItem";
import { FeedMessage } from "@/types/FeedMessage";
import { AprimoImage } from "@/types/AprimoImage";
import { format } from "date-fns";
import { fetchListItems } from "./fetchListItems";
import { fetchItemFromId } from "./fetchItemFromId";
import { fetchImageUrls } from "./fetchImageUrls";
import { fetchMessageFromExternalId } from "./fetchMessageFromExternalId";

export async function performCardCheck(today : Date): Promise<{ [key: string]: CardCheckInfo[] }> {

    const result: { [key: string]: Array<CardCheckInfo> } = {};
    const languages: string[] = [
        "de-AT", "fr-BE", "de-CH", "de-DE", "da-DK", "fr-FR", "nl-NL", 
        "nb-NO", "sv-SE", "fi-FI", "en-GB", "en-US", "en-gb", "en-001"
    ];
    const listItems = await fetchListItems();
    for (const key in listItems) {
        if (listItems.hasOwnProperty(key)) {
            result[key] = await createCardCheckInfoList(listItems[key], languages, today);
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
        await findSitecoreItem(id, languages);
    }
    if (sitecoreItem == null)
        {
            await populateCardCheckInfoFromMeno(info, id);
        } else {
            await populateCardCheckInfoFromSitecore(info, id, sitecoreItem, language);
        }
}

async function populateCardCheckInfoFromMeno(info: CardCheckInfo, id: string): Promise<void> {
    info.id = id;
    info.sitecoreCheck = false;

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
    const menoItem : FeedMessage = await fetchMessageFromExternalId(id.toUpperCase());
    if (menoItem == null || menoItem.attributes == null) {
        info.menoCheck = false;
    } else {
        info.menoCheck = true;
        info.campaignName = menoItem.attributes.campaignId;
        info.marketsFromMeno = menoItem.attributes.context.countryCodes;
    }
}

async function findSitecoreItem(id: string, languages: string[]) {
    for (const lang of languages) {
        const language = lang;
        const sitecoreItem = await fetchItemFromId(id, language);
        if (!sitecoreItem.campaignName.includes("NOT FOUND")) {
            break;
        }
    }
}

function formatSimpleGuid(guid: string): string {
    return guid.replace(/{|}|-/g, "").toLowerCase();
}

function manageCardCheckInfo(info: CardCheckInfo, today: Date): CardCheckInfo {
    info.startDateString = formatDateString(info.startDate);
    info.endDateString = formatDateString(info.endDate);
    setCardCheckVisibility(info, today);
    setCardCheckModelString(info);
    setCardCheckMarketsStrings(info);
    setCardCheckMarketClasses(info);
    return info;
}

function formatDateString(date: Date): string {
    return format(date, 'yyyy-MM-dd');
}

function setCardCheckVisibility(info: CardCheckInfo, today: Date): void {
    info.visible = today >= info.startDate && today <= info.endDate;
    info.isFuture = today < info.startDate;
    info.isPast = today > info.endDate;
}

function setCardCheckModelString(info: CardCheckInfo): void {
    info.modelString = info.models.length == 0 ? "" : info.models.join(', ');
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

