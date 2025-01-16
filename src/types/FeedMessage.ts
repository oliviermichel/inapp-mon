import { Attributes } from "./Attributes";


export type FeedMessage = {
    type: string;
    attributes: Attributes;
    id: string;
};
