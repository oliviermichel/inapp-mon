import { getItemsUnderExplorerRoot } from "../graphql/getitemsunderexplorerroot";

export async function fetchListItems(): Promise<{ [key: string]: string[]; }> {
    const callAPI: Record<string, string[]> | null = await getItemsUnderExplorerRoot();

    if (callAPI === null) {
        return {};
    }
    return callAPI;
}
