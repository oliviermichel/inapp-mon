import { FeedMessage } from '@/types/FeedMessage';
import { GetToken } from './getToken';

interface FeedMessageResponse {
    data: FeedMessage[];
}

let token: string | null = null;

export async function getMessageFromExternalId(externalId: string): Promise<FeedMessage | null> {
    await refreshAccessToken();

    const baseUrl = process.env.MENO_BASE_URL;
    const messagesUrl = process.env.MENO_MESSAGE_ENDPOINT;

    const url = `${baseUrl}${messagesUrl}?filter[messageType]=feed-messages&filter[externalId]=${externalId}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/vnd.api+json',
            'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status} ${response.statusText}`);
    }

    const itemData: FeedMessageResponse = await response.json();
    if (!itemData || !itemData.data) {
        return null;
    }

    return itemData.data[0] || null;
}

async function refreshAccessToken() {
        const newToken = await GetToken();
        if (!newToken) {
            throw new Error('Failed to retrieve access token');
        }
        token = newToken;
    
}
