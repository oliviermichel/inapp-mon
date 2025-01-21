import { getImageUrls } from "@/services/aprimo/getImageUrls";
import { getItemFromId } from "@/services/graphql/getitemfromid";
import { SimpleItem } from "@/types/SimpleItem";
import { CardContent, Typography } from "@mui/material";
import lightbulbIcon from '@/assets/lightbulb-icon.png';
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


const NoClickMessage: React.FC<{ item: string }> = async ({ item }) => {
    const itemId = item.replace(/-/g, '').replace(/{/g, '').replace(/}/g, '').toLowerCase();
    const itemData = await getItem(itemId, 'en');
    
    return (
        <Typography component="div" className="noclick-message" style={{ display: 'flex', alignItems: 'center' }}>
        <Image className="noclick-icon" src={lightbulbIcon} alt="icon" width={40} height={30} />
        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>
            <div className="noclick-header">{itemData?.header}</div>
            <div className="noclick-text">{itemData?.message}</div>
        </div>
    </Typography>
    );
}

export default NoClickMessage;