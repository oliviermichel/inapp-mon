import React from 'react';
import { Card, CardContent } from '@mui/material';
import { ExplorerRootItem } from '@/types/ExplorerRootItem';
import NoClickMessage from './NoClickMessage';

const InAppExplorerNoClickCard: React.FC<{ item: ExplorerRootItem }> = ({ item }) => (
    <Card className="noclick-card">
        <CardContent>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxHeight: '200px', overflowY: 'auto' }}>
                {item.items && item.items.map((subItem, index) => (
                    <NoClickMessage key={index} item={subItem} />
                ))}
            </div>
        </CardContent>
    </Card>
);

export default InAppExplorerNoClickCard;