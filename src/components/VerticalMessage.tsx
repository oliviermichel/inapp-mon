import { getImageUrls } from "@/services/aprimo/getImageUrls";
import { getItemFromId } from "@/services/graphql/getitemfromid";
import { SimpleItem } from "@/types/SimpleItem";
import { Typography } from "@mui/material";
import Image from 'next/image';

async function getItem(itemId: string, language: string): Promise<SimpleItem | null> {
    return getItemFromId(itemId, language);
}

async function getImageUrl(itemId: string): Promise<string | null> {
    const images = await getImageUrls(itemId, '360', '200');
    if (images && images.length > 0) {
        let url = images[0].Url;
        if (url.startsWith('//')) {
            url = 'https:' + url;
        }
        return url;
    }
    return null; // Return null if no images are found
}


const VerticalMessage: React.FC<{ item: string }> = async ({ item }) => {
    const itemId = item.replace(/-/g, '').replace(/{/g, '').replace(/}/g, '').toLowerCase();
    const itemData = await getItem(itemId, 'en');
    const imageUrl = itemData ? await getImageUrl(itemData.imageId) : null;

    return (
    
        <Typography component="div" className="verticallist-simple-message">
                {imageUrl && (
                    <Image className="verticallist-simple-image" src={imageUrl} alt="large image" width={180} height={100} />
                )}
                <div className="verticallist-simple-text">{itemData?.header}</div>
            </Typography>
    
);
}

export default VerticalMessage;