import { AprimoImage } from "@/types/AprimoImage";

export async function getImageUrls(id: string, maxWidth: string, maxHeight: string): Promise<AprimoImage[]> {
    const baseUrl = process.env.APRIMO_BASEURL;
    const getImageUrlsEndpoint = process.env.APRIMO_ENDPOINT;
    const apiKeyHeader = process.env.APRIMO_APIKEY_HEADER || "Dummy";
    const apiKey = process.env.APRIMO_APIKEY || "Dummy";

    const url = `${baseUrl}${getImageUrlsEndpoint}?id=${id}&maxWidth=${maxWidth}&maxHeight=${maxHeight}&imageSizes=${maxWidth}x${maxHeight}&v2=true`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/vnd.api+json',
            'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
            [apiKeyHeader]: apiKey
        }
    });

    if (!response.ok) {
        return [];
    }

    const imageData: AprimoImage[] = await response.json();
    return imageData;
}