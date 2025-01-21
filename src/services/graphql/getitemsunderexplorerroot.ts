import { GetItemsUnderExplorerRoot } from './queries';
import { GetCookie } from './loginSitecore';
import { ExplorerRootItem } from '@/types/ExplorerRootItem';

let aspNetCookie: string | null = null;

export async function getItemsUnderExplorerRoot(): Promise<Record<string, ExplorerRootItem> | null> {
    await refreshAccessToken();
    
    const baseUrl = process.env.SITECORE_BASE_URL;
    const graphQlApiUrl = process.env.SITECORE_GRAPHQL_ENDPOINT;

    if (!baseUrl) {
        throw new Error('SITECORE_BASE_URL is not defined');
    }

    const requestData = {
        query: GetItemsUnderExplorerRoot,
        variables: {}
    };
    const cookieHeader = aspNetCookie || '';
    
    const response = await fetch(`${baseUrl}${graphQlApiUrl}`, {
        method: 'POST',
        headers: {
            'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cookie': cookieHeader
        },
        body: JSON.stringify(requestData)
    });

    if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}  ${response.statusText}`);
    }

    const responseData = await response.json();
    const result: Record<string, ExplorerRootItem> = {};

    if (!responseData || !responseData.data || !responseData.data.item) {
        return result;
    }

    for (const item of responseData.data.item.children) {
        const cardName: string = item.name;
        const childrenValue: string = item.messages?.value || '';
        const explorerRootItem : ExplorerRootItem = {
            items: childrenValue ? childrenValue.split('|') : [],
            messageHeader: item.MessageHeader?.value || '',
            teaserHeader: item.TeaserHeader?.value || '',
            cardType: item.template?.name || '',
            teaserDescription: item.TeaserDescription?.value || '',
            image: item.Image?.value || ''
        }

        result[cardName] = explorerRootItem;
    }

    return result;
}

async function refreshAccessToken() {
        const cookies = await GetCookie();
        if (!cookies) {
            return null;
        }

        const newToken = cookies.find(cookie => cookie.startsWith('.AspNet.Cookies=')) || null;
        if (!newToken) {
            throw new Error('Required cookie not found');
        }
        aspNetCookie = newToken;
       
}