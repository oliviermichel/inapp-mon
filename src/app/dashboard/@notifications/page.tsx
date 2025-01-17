import Card from "@/components/card";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Notifications() {
    const faq = [
        {"question": "When Sitecore is down", "answer": "Contact Sitecore support<br /> Olivier Michel<br /> olivier.michel@husqvarnagroup.com <br /> 0723819396"},
        {"question": "When MENO is down", "answer": "Contact MENO support<br /> DS Alpha<br />ds.alpha@husqvarnagroup.com"},
        {"question": "When an Item is missing in MENO", "answer": "Submit this item from Sitecore CMS"},
        {"question": "When an Item is missing in Sitecore", "answer": "Create it in Sitecore CMS"},
        {"question": "When an Item have different markets in Sitecore and MENO", "answer": "Correct it in Sitecore and resubmit the item"}
    ];
    return (
    <Card>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {faq.map((item, index) => (
                <Accordion key={index}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel${index}-content`} id={`panel${index}-header`}>
                        <Typography>{item.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography dangerouslySetInnerHTML={{ __html: item.answer }} />
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    </Card>);
}