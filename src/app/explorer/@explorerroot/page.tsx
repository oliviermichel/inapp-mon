import Typography from '@mui/material/Typography';
import { fetchListItems } from '@/services/fetchListItems';
import { Card } from '@mui/material';
import InAppExplorerCollectionCard from '@/components/InAppExplorerCollectionCard';
import InAppExplorerHeroCard from '@/components/InAppExplorerHeroCard';
import InAppExplorerLargeCard from '@/components/InAppExplorerLargeCard';
import InAppExplorerVerticalCard from '@/components/InAppExplorerVerticalCard';
import InAppExplorerNoClickCard from '@/components/InAppExplorerNoClickCard';
import { ExplorerRootItem } from '@/types/ExplorerRootItem';

export default async function ExplorerRoot() {
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
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                {cardItems ? (
                    Object.values(cardItems).map((item, index) => (
                        <Card key={index} style={{ width: '1000px' }}>
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
}