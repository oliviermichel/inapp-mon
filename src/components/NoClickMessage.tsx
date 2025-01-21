import { getItemFromId } from "@/services/graphql/getitemfromid";
import { SimpleItem } from "@/types/SimpleItem";
import lightbulbIcon from '@/assets/lightbulb-icon.png';
import Image from 'next/image';
import { Typography } from "@mui/material";

async function getItem(itemId: string, language: string): Promise<SimpleItem | null> {
    return getItemFromId(itemId, language);
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