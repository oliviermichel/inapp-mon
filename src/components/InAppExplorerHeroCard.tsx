import React from 'react';
import { ExplorerRootItem } from "@/types/ExplorerRootItem";
import { Card, CardContent, Typography } from "@mui/material";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles
import { SimpleItem } from '@/types/SimpleItem';
import { getItemFromId } from '@/services/graphql/getitemfromid';
import { getImageUrls } from '@/services/aprimo/getImageUrls';
import Image from 'next/image';
import HeroMessage from './HeroMessage';

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

interface HeroMessageProps {
    item: ExplorerRootItem;
}

const InAppExplorerHeroCard: React.FC<HeroMessageProps> = async ({ item }) => {
    const items = await Promise.all(item.items.map(async (subItem) => {
        const itemId = subItem.replace(/-/g, '').replace(/{/g, '').replace(/}/g, '').toLowerCase();
        const itemData = await getItem(itemId, 'en');
        const imageUrl = itemData ? await getImageUrl(itemData.imageId) : null;
        return { header: itemData?.header || '', imageUrl };
    }));

    return (
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <Card className='hero-card'>
            <CardContent>
                <Typography component="div" className='hero-header'>
                    {item.messageHeader}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {item.teaserHeader}
                </Typography>
                <div className='hero-container'>
                {items.map((carouselItem, index) => (
                        <HeroMessage key={index} carouselItem={carouselItem} index={index} />
                    ))}
                </div>
            </CardContent>
        </Card>
        </div>
    );
};

export default InAppExplorerHeroCard;