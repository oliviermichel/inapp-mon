export type CardCheckInfo = {
    imagePath: string;
    campaignName: string;
    startDate: Date;
    endDate: Date;
    models: Array<string>;
    path: string;
    id: string;
    menoCheck: boolean;
    sitecoreCheck: boolean;
    header: string;
    marketsFromSitecore: Array<string>;
    marketsFromMeno: Array<string>;
    language: string;
    translations: Array<string>;

    startDateString: string;
    endDateString: string;
    visible: boolean;
    isFuture: boolean;
    isPast: boolean;
    modelString: string;
    marketsfromSitecoreString: string;
    marketsFromMenoString: string;
    marketsFromMenoClass: string;
    marketsFromSitecoreClass: string;
    marketCheck: boolean;
}


