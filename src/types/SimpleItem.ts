export class SimpleItem {
    id: string;
    imageId: string;
    campaignName: string;
    header: string;
    message: string;
    language: string;
    startDate: Date;
    endDate: Date;
    marketCodes: string[];
    models: string[];
    path: string;

    constructor() {
        this.id = '';
        this.imageId = '';
        this.campaignName = '';
        this.message = '';
        this.header = '';
        this.language = '';
        this.startDate = new Date();
        this.endDate = new Date();
        this.marketCodes = [];
        this.models = [];
        this.path = '';
    }
}