import React from 'react';
import Card from "@/components/card";
import HealthCheckBox from "@/components/heathcheckbox";
import { getMessageFromCampaignName } from '@/app/meno/getMessageFromCampaignName';
import { getItemsUnderExplorerRoot } from '@/app/graphql/getitemsunderexplorerroot';

export default async function HealthMonitor() {
    let isMenoCheck = false;
    let isSitecoreCheck = false;

    try {
        const menoResponse = await getMessageFromCampaignName("Card_ExplorerRoot");
        isMenoCheck = menoResponse !== null;
    } catch (error) {
        isMenoCheck = false;
        console.error(error);
    }

    try {
        const sitecoreResponse = await getItemsUnderExplorerRoot();
        isSitecoreCheck = sitecoreResponse !== null;
    } catch (error) {
        isSitecoreCheck = false;
        console.error(error);
    }

    return (
        <Card>
            <HealthCheckBox Title="Sitecore" isCheck={isSitecoreCheck} />
            <HealthCheckBox Title="Meno" isCheck={isMenoCheck} />
        </Card>
    );
}