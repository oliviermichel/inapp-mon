export class SitecoreItem {
    id: string;
    imageId: string;
    campaignName: string;
    header: string;
    language: string;
    startDate: string;
    endDate: string;
    path: string;
    marketCodes: string[];
    models: string[];

    constructor() {
        this.id = '';
        this.imageId = '';
        this.campaignName = '';
        this.header = '';
        this.language = '';
        this.startDate = '';
        this.endDate = '';
        this.marketCodes = [];
        this.models = [];
        this.path = '';
    }
}
