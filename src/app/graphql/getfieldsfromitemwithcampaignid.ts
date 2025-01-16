import { GetFieldsFromItem } from './queries';
import { GetCookie } from './loginSitecore';

interface GraphQLResponse {
    data: {
        search: {
            results: {
                items: {
                    item: {
                        versions: {
                            language: { name: string };
                            notificationMessage: { value: string };
                        }[];
                    };
                }[];
            };
        };
    };
}

let aspNetCookie: string | null = null;

export async function getFieldsFromItemWithCampaignId(campaignId: string): Promise<GraphQLResponse | null> {
    await refreshAccessToken();

    const baseUrl = process.env.SITECORE_BASE_URL;
    const graphQlApiUrl = process.env.SITECORE_GRAPHQL_ENDPOINT;

    const requestData = {
        query: GetFieldsFromItem,
        variables: { campaignName: campaignId }
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

    const responseData: GraphQLResponse = await response.json();
    const textMessage = responseData.data.search.results.items[0].item.versions[0].notificationMessage.value || "NOT FOUND";

    return responseData;
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
