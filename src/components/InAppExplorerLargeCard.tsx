import React from 'react';
import { ExplorerRootItem } from '@/types/ExplorerRootItem';
import LargeMessage from './LargeMessage';

const InAppExplorerLargeCard: React.FC<{ item: ExplorerRootItem }> = ({ item }) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', overflowY: 'auto' }}>
                    {item.items && item.items.map((subItem, index) => (
                        <LargeMessage key={index} item={subItem} />
                    ))}
    </div>
    
);

export default InAppExplorerLargeCard;