import { GetItemFromId } from './queries';
import { SimpleItem } from '@/types/SimpleItem';
import { GetCookie } from './loginSitecore';

let aspNetCookie: string | null = null;

export async function getItemFromId(id: string, language: string = 'en'): Promise<SimpleItem | null> {
    await refreshAccessToken();

    const baseUrl = process.env.SITECORE_BASE_URL;
    const graphQlApiUrl = process.env.SITECORE_GRAPHQL_ENDPOINT;

    const requestData = {
        query: GetItemFromId,
        variables: { id, language }
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
    const item = new SimpleItem();

    if (itemData?.data?.search?.results?.items.length > 0 && itemData?.data?.search?.results?.items[0]?.item?.versions[0]) {
        const version = itemData.data.search.results.items[0].item.versions[0];
        item.id = itemData.data.search.results.items[0].item.id;
        item.imageId = version.image1?.value || '';
        item.campaignName = version.campaignName?.value || '';
        item.header = version.header?.value || '';
        item.language = version.language?.name || '';
        item.startDate = new Date(version.startDate?.formattedDateValue || '');
        item.endDate = new Date(version.endDate?.formattedDateValue || '');
        item.marketCodes = version.marketCodes?.targetItems?.map((t: { field: { value: string } }) => t.field.value) || [];
        item.models = version.models?.targetItems?.map((t: { field: { value: string } }) => t.field.value) || [];
        item.path = itemData.data.search.results.items[0].path;
    } else {
        item.campaignName = `item ${id} NOT FOUND`;
    }
    return item;
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
