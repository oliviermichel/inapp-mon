import { promises as fs } from 'fs';

export async function GET() {

    const file = await fs.readFile(process.cwd() + '/data/all.json', 'utf8');
    const data = JSON.parse(file);
    const response = data.sitecore.getitemfromid;

    return Response.json({ response })
}