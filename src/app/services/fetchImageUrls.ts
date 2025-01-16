import { AprimoImage } from "@/types/AprimoImage";
import { getImageUrls } from "../aprimo/getImageUrls";

export async function fetchImageUrls(imageId: string, width: string, height: string): Promise<AprimoImage[]> {
    const response = await getImageUrls(imageId, width, height);
    
    return response;
}
