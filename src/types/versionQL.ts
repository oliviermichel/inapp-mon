interface VersionQL {
    language: {
        name: string;
    };
    campaignName: {
        value: string;
    };
    header: {
        value: string;
    };
    startDate: {
        formattedDateValue: string;
    };
    endDate: {
        formattedDateValue: string;
    };
    marketCodes: {
        targetItems: {
            field: {
                value: string;
            };
        }[];
    };
    models: {
        targetItems: {
            field: {
                value: string;
            };
        }[];
    };
    image1: {
        value: string;
    };
    message: {
        value: string;
    };
}