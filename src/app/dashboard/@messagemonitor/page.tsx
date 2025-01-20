import CardCheckOneCardData from '@/components/CardCheckOneCardData';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FaCheckCircle   } from 'react-icons/fa';
import { RxCrossCircled   } from 'react-icons/rx';
import { performCardCheck } from '@/services/Monitor';

export default async function MessageMonitor() {
    const currentDate = new Date(Date.now());
    const items = await performCardCheck(currentDate);
    
    const counts: { [key: string]: {text: string, color: string } } = {};
    Object.keys(items).forEach(key => {
        const nbMessages = items[key].items.length;
        const nbMenoCheck = nbMessages - items[key].items.filter(x => x.menoCheck).length;
        const nbSitecoreCheck = nbMessages - items[key].items.filter(x => x.sitecoreCheck).length;
        const nbMarketCheck = nbMessages - items[key].items.filter(x => x.marketCheck).length;

        const text = `${key}: ${nbMessages} messages - Sitecore: ${nbSitecoreCheck} Errors - MENO: ${nbMenoCheck} Errors - Markets: ${nbMarketCheck} Errors`;
        const color = (nbMenoCheck + nbSitecoreCheck + nbMarketCheck) > 0 ? "" : "";
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
                                            <th>Total Visible Messages</th>
                                            <th>Sitecore Errors</th>
                                            <th>MENO Errors</th>
                                            <th>Market Errors</th>
                                        </tr>
                                    </thead>
                                )}
                                <tbody>
                                    <tr>
                                        <td>{key} <ExpandMoreIcon /><br /><i>{items[key].header}</i></td>
                                        <td>{items[key].items.length}</td>
                                        <td>{items[key].items.filter(x => x.visible).length}</td>
                                        <td className={items[key].items.length - items[key].items.filter(x => x.sitecoreCheck).length > 0 ? 'errorCell' : ''}>
                                            {items[key].items.length - items[key].items.filter(x => x.sitecoreCheck).length}
                                        </td>
                                        <td className={items[key].items.length - items[key].items.filter(x => x.menoCheck).length > 0 ? 'errorCell' : ''}>
                                            {items[key].items.length - items[key].items.filter(x => x.menoCheck).length}
                                        </td>
                                        <td className={items[key].items.length - items[key].items.filter(x => x.marketCheck).length > 0 ? 'errorCell' : ''}>
                                            {items[key].items.length - items[key].items.filter(x => x.marketCheck).length}
                                        </td>
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


