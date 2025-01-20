import { FeedMessage } from "@/types/FeedMessage";
import { getMessageFromExternalId } from "./meno/getMessageFromExternId";

export async function fetchMessageFromExternalId(externalId: string): Promise<FeedMessage | null> {
    const response = await getMessageFromExternalId(externalId);

    return response;
}


export async function fetchMessageFromExternalIdLocal(externalId: string): Promise<FeedMessage | null> {
    const response = await fetch(`http://localhost:3000/data/meno/message?externalId=${externalId}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = await response.json();
    const result: FeedMessage = data.response;
    return result || null;
}