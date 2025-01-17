//import Card from "@/components/card";
import CardCheckOneCardData from '@/components/CardCheckOneCardData';
//import CardAccordion from "@/components/CardAccordion";
import Accordion from '@mui/material/Accordion';
//import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { performCardCheck } from '@/app/services/Monitor';

export default async function MessageMonitor() {
    const currentDate = new Date(Date.now());
    const items = await performCardCheck(currentDate);
    
    const counts: { [key: string]: {text: string, color: string } } = {};
    Object.keys(items).forEach(key => {
        const nbMessages = items[key].length;
        const nbMenoCheck = nbMessages - items[key].filter(x => x.menoCheck).length;
        const nbSitecoreCheck = nbMessages - items[key].filter(x => x.sitecoreCheck).length;
        const nbMarketCheck = nbMessages - items[key].filter(x => x.marketCheck).length;

        const text = `${key}: ${nbMessages} messages - Sitecore: ${nbSitecoreCheck} Errors - MENO: ${nbMenoCheck} Errors - Markets: ${nbMarketCheck} Errors`;
        const color = (nbMenoCheck + nbSitecoreCheck + nbMarketCheck) > 0 ? "red" : "";
        counts[key] = {text: text, color: color };
    });

    return (
        <div>
            {Object.keys(items).map((key, index) => (
                
                <Accordion key={key}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Typography component="span" color={counts[key].color} className="tableContainer">
                            <table className="table">
                                {index === 0 && (
                                    <thead>
                                        <tr>
                                            <th>Category</th>
                                            <th>Total Messages</th>
                                            <th>Sitecore Errors</th>
                                            <th>MENO Errors</th>
                                            <th>Market Errors</th>
                                        </tr>
                                    </thead>
                                )}
                                <tbody>
                                    <tr>
                                        <td>{key}</td>
                                        <td>{items[key].length}</td>
                                        <td>{items[key].length - items[key].filter(x => x.sitecoreCheck).length}</td>
                                        <td>{items[key].length - items[key].filter(x => x.menoCheck).length}</td>
                                        <td>{items[key].length - items[key].filter(x => x.marketCheck).length}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <CardCheckOneCardData info={items[key]} />
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>);
}


