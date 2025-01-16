import * as React from 'react';
import Accordion from '@mui/material/Accordion';
//import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
//import Button from '@mui/material/Button';

export default function CardAccordion() {
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
            >
            <Typography component="span">Accordion 1</Typography>
            </AccordionSummary>
            <AccordionDetails>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
            </AccordionDetails>
        </Accordion>
    );
}