import { GetItemFromIdNoLang } from './queries';
import { SimpleItem } from '@/types/SimpleItem';
import { GetCookie } from './loginSitecore';

let aspNetCookie: string | null = null;

export async function getItemsFromId(id: string): Promise<SimpleItem[] | null> {
    await refreshAccessToken();

    const baseUrl = process.env.SITECORE_BASE_URL;
    const graphQlApiUrl = process.env.SITECORE_GRAPHQL_ENDPOINT;
    
    const requestData = {
        query: GetItemFromIdNoLang,
        variables: { id }
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
        throw new Error(`Request failed with status: ${response.status}`);
    }
    
    const itemData = await response.json();
    const result: SimpleItem[] = [];

    if (itemData?.data?.search?.results?.items.length > 0) {
        const itemResult = itemData.data.search.results.items[0];
        itemResult.item.versions.forEach((version: VersionQL) => {
            const item = new SimpleItem();
            item.id = itemResult.item.id;
            item.imageId = version.image1?.value || '';
            item.campaignName = version.campaignName?.value || '';
            item.message = version.message?.value || '';
            item.header = version.header?.value || '';
            item.language = version.language?.name || '';
            item.startDate = new Date(version.startDate?.formattedDateValue || '');
            item.endDate = new Date(version.endDate?.formattedDateValue || '');
            item.marketCodes = version.marketCodes?.targetItems?.map((t: { field: { value: string } }) => t.field.value) || [];
            item.models = version.models?.targetItems?.map((t: { field: { value: string } }) => t.field.value) || [];
            item.path = itemResult.path;
            result.push(item);
        });
    } else {
        const item = new SimpleItem();
        item.campaignName = `item ${id} NOT FOUND`;
        result.push(item);
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
