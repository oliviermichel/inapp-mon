import { Links } from "./Links";
import { Parent } from "./Parent";
import { Target } from "./Target";
import { Context } from "./Context";
import { Period } from "./Period";


export type Attributes = {
    repetition: string;
    category: string;
    period: Period;
    campaignId: string;
    externalId: string;
    //requiredConsents: Array<any>;
    textFormat: string;
    context: Context;
    target: Target;
    header: string;
    description: string;
    segmentId: string;
    cardType: string;
    sortBy: string;
    //children: Array<any>;
    parents: Array<Parent>;
    links: Links;
    createdBy: string;
    createdTime: number;
    updatedBy: string;
    updatedTime: number;
};
