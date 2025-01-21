import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { ExplorerRootItem } from '@/types/ExplorerRootItem';
import VerticalMessage from './VerticalMessage';

const InAppExplorerVerticalCard: React.FC<{ item: ExplorerRootItem }> = ({ item }) => (
    <Card className="verticallist-card">
        <CardContent>
            <Typography component="div" className='verticallist-header'>
            {item.teaserHeader}
            </Typography>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'left', width: '100%', maxHeight: '200px', overflowY: 'auto' }}>
                {item.items && item.items.map((subItem, index) => (
                    <VerticalMessage key={index} item={subItem} />
                ))}
            </div>
        </CardContent>
    </Card>
);

export default InAppExplorerVerticalCard;