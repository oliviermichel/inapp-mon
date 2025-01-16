import { SitecoreItem } from "@/types/SitecoreItem";
import { getItemFromId } from "../graphql/getitemfromid";
import { SimpleItem } from "@/types/SimpleItem";

export async function fetchItemFromId(id: string, language: string): Promise<SitecoreItem | null> {
    const response: SimpleItem | null = await getItemFromId(id, language);

    if (response === null) {
        return null;
    }

    const sitecoreItem: SitecoreItem = {
        ...response,
        startDate: response.startDate.toISOString(),
        endDate: response.endDate.toISOString(),
    };

    return sitecoreItem;
}
