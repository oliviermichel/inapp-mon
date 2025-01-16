import { getImageUrls } from "./getImageUrls";

export default async function GraphQL() {
    const data = await getImageUrls('OA-0072sds15', '360', '186');
    return (<h1>Test</h1>);
}