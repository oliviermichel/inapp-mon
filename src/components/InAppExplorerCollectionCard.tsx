import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { ExplorerRootItem } from '@/types/ExplorerRootItem';
import { getImageUrls } from '@/services/aprimo/getImageUrls';
import Image from 'next/image';


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


const InAppExplorerCollectionCard: React.FC<{ item: ExplorerRootItem }> = async ({ item }) => {
    const imageUrl = await getImageUrl(item.image);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Card className="collection-card">
                <CardContent>
                    <Typography component="div" className="collection-header">
                        {item.messageHeader}
                    </Typography>
                    <Typography component="div" className="collection-text">
                        {item.teaserDescription}
                    </Typography>
                    <Typography component="div" className="collection-image-container">
                        {imageUrl && (
                            <Image src={imageUrl} alt="collection image" width={360} height={200} className="collection-image" />
                        )}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
};
export default InAppExplorerCollectionCard;