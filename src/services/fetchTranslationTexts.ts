import { SitecoreItem } from "@/types/SitecoreItem";
import { getItemsFromId } from "./graphql/getitemsfromid";
import { SimpleItem } from "@/types/SimpleItem";

export async function fetchTranslationTexts(id: string): Promise<{ [lang: string]: SitecoreItem} | null> {
    const response: SimpleItem[] | null = await getItemsFromId(id);

    if (response === null) {
        return null;
    }

    const formattedItems: { [lang: string]: SitecoreItem } = {};

    response.forEach(item => {
        const sitecoreItem: SitecoreItem = {
            ...item,
            startDate: item.startDate.toISOString(),
            endDate: item.endDate.toISOString(),
        };
        formattedItems[item.language] = sitecoreItem;
    });

    return formattedItems;
}