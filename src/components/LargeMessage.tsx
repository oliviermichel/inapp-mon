import { getImageUrls } from "@/services/aprimo/getImageUrls";
import { getItemFromId } from "@/services/graphql/getitemfromid";
import { SimpleItem } from "@/types/SimpleItem";
import { Card, CardContent, Typography } from "@mui/material";
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


const LargeMessage: React.FC<{ item: string }> = async ({ item }) => 
{
    const itemId = item.replace(/-/g, '').replace(/{/g, '').replace(/}/g, '').toLowerCase();
    const itemData = await getItem(itemId, 'en');
    const imageUrl = itemData ? await getImageUrl(itemData.imageId) : null;
    
return (
    <Card className="large-content">
        <CardContent className="large-image-container">
            <Typography component="div" className="large-message">
                <div>
                        {imageUrl && (
                            <Image className="large-image" src={imageUrl} alt="large image" width={360} height={200} />
                        )}
                        <div className="large-text">{itemData?.header}</div>
                </div>
            </Typography>
        </CardContent>
    </Card>
)};

export default LargeMessage;