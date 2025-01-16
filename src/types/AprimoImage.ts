
export class AprimoImage {
    Resolution!: string;
    Url!: string;

    constructor(resolution: string, url: string) {
        this.Resolution = resolution;
        this.Url = url;
    }
}