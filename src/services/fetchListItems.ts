import { ExplorerRootItem } from "@/types/ExplorerRootItem";
import { getItemsUnderExplorerRoot } from "./graphql/getitemsunderexplorerroot";

export async function fetchListItems(): Promise<{ [key: string]: ExplorerRootItem; }> {
    const callAPI: Record<string, ExplorerRootItem> | null = await getItemsUnderExplorerRoot();

    if (callAPI === null) {
        return {};
    }
    return callAPI;
}
