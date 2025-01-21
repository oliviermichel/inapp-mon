import React from 'react';
import { Card, Typography, TextField, MenuItem, Button } from '@mui/material';
import InAppExplorerCollectionCard from '@/components/InAppExplorerCollectionCard';
import InAppExplorerHeroCard from '@/components/InAppExplorerHeroCard';
import InAppExplorerLargeCard from '@/components/InAppExplorerLargeCard';
import InAppExplorerVerticalCard from '@/components/InAppExplorerVerticalCard';
import InAppExplorerNoClickCard from '@/components/InAppExplorerNoClickCard';
import { fetchListItems } from '@/services/fetchListItems';
import { ExplorerRootItem } from '@/types/ExplorerRootItem';

const cardItems = await fetchListItems();

const renderCardContent = (item: ExplorerRootItem) => {
    switch (item.cardType) {
        case 'InAppExplorerCollectionCard':
            return <InAppExplorerCollectionCard item={item} />;
        case 'InAppExplorerHeroCard':
            return <InAppExplorerHeroCard item={item} />;
        case 'InAppExplorerLargeCard':
            return <InAppExplorerLargeCard item={item} />;
        case 'InAppExplorerVerticalList':
            return <InAppExplorerVerticalCard item={item} />;
        case 'InAppExplorerNoClickCard':
            return <InAppExplorerNoClickCard item={item} />;
        default:
            return null;
    }
};

const Page: React.FC = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '25%', padding: '20px' }}>
                <form style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <TextField select label="Markets" variant="outlined">
                        <MenuItem value="market1">Market 1</MenuItem>
                        <MenuItem value="market2">Market 2</MenuItem>
                        <MenuItem value="market3">Market 3</MenuItem>
                    </TextField>
                    <TextField select label="Models" variant="outlined">
                        <MenuItem value="model1">Model 1</MenuItem>
                        <MenuItem value="model2">Model 2</MenuItem>
                        <MenuItem value="model3">Model 3</MenuItem>
                    </TextField>
                    <TextField label="Date" type="date" InputLabelProps={{ shrink: true }} variant="outlined" />
                    <Button variant="contained" color="primary">Submit</Button>
                </form>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '75%' }}>
                {cardItems ? (
                    Object.values(cardItems).map((item, index) => (
                        <Card key={index} style={{ width: '1000px', margin: '10px' }}>
                            {renderCardContent(item)}
                        </Card>
                    ))
                ) : (
                    <Typography variant="body2" color="text.secondary">
                        No items found.
                    </Typography>
                )}
            </div>
        </div>
    );
};

export default Page;