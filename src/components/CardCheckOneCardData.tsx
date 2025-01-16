import React from 'react';
import { format } from 'date-fns';
import Image from 'next/image';
import { Card, CardContent, Typography, Tooltip, IconButton, Grid } from '@mui/material';
import PageviewIcon from '@mui/icons-material/Pageview';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import DoneIcon from '@mui/icons-material/Done';
import DangerousIcon from '@mui/icons-material/Dangerous';
import HelpIcon from '@mui/icons-material/Help';

interface CardCheckInfo {
    campaignName: string;
    marketsFromSitecore: string[];
    marketsFromMeno: string[];
    language: string;
    header: string;
    startDate: Date;
    endDate: Date;
    imagePath: string;
    path: string;
    visible: boolean;
    isFuture: boolean;
    isPast: boolean;
    marketCheck: boolean;
    sitecoreCheck: boolean;
    menoCheck: boolean;
    models: string[];
}

interface CardCheckOneCardDataProps {
    info: CardCheckInfo[];
}

const CardCheckOneCardData: React.FC<CardCheckOneCardDataProps> = ({ info }) => {
    const areMarketsEqual = (marketsSitecore: string[] | null, marketsMeno: string[] | null) => {
        const sitecoreCount = marketsSitecore?.length || 0;
        const menoCount = marketsMeno?.length || 0;
        return sitecoreCount === menoCount;
    }

    const getImagePath = (path: string | null) => {
        if (!path)  return '';
        return path.startsWith("https:") ? path : `https:${path}`;
    }

    return (
        <Grid container spacing={2} className="cardContainer">
            {info.map((item, index) => (
                <Grid item xs={3} key={index} className="cardItem">
                    <Card className="cardContent">
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {item.campaignName}
                                {item.visible && <PageviewIcon color="success" titleAccess="Visible" />}
                                {item.isFuture && <FlightTakeoffIcon color="success" titleAccess="Visible Later" />}
                                {item.isPast && <FlightLandIcon color="success" titleAccess="Visible Before" />}
                                <Tooltip title={
                                    <div>
                                        {item.imagePath && (
                                            <Image src={getImagePath(item.imagePath)} alt="Campaign" width={100} height={100} />
                                        )}
                                        <div>{item.header}</div>
                                        <hr />
                                        <div>CampaignName: {item.campaignName}</div>
                                        <div>Path: {item.path}</div>
                                        <div>Interval: {format(new Date(item.startDate), 'yyyy-MM-dd')} - {format(new Date(item.endDate), 'yyyy-MM-dd')}</div>
                                        <div>Markets Meno: {item.marketsFromMeno?.join(', ') || ''}</div>
                                        <div>Markets Sitecore: {item.marketsFromSitecore?.join(', ') || ''}</div>
                                        <div>Models: {item.models}</div>
                                    </div>
                                }>
                                    <IconButton>
                                        <HelpIcon />
                                    </IconButton>
                                </Tooltip>
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Markets From Sitecore: {item.marketsFromSitecore?.join(', ') || ''} 
                                {areMarketsEqual(item.marketsFromSitecore, item.marketsFromMeno) ? <DoneIcon color="success" /> : <DangerousIcon color="error" />}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Markets From Meno: {item.marketsFromMeno?.join(', ') || ''}
                                {areMarketsEqual(item.marketsFromSitecore, item.marketsFromMeno) ? <DoneIcon color="success" /> : <DangerousIcon color="error" />}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Language: {item.language}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Header: {item.header}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Start Date: {format(new Date(item.startDate), 'yyyy-MM-dd')}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                End Date: {format(new Date(item.endDate), 'yyyy-MM-dd')}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            {item.imagePath && (
                                            <Image src={getImagePath(item.imagePath)} alt="Campaign" width={100} height={100} />
                                        )}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Path: {item.path}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Market Check: {item.marketCheck ? <DoneIcon color="success" /> : <DangerousIcon color="error" />}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Sitecore Check: {item.sitecoreCheck ? <DoneIcon color="success" /> : <DangerousIcon color="error" />}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                MENO Check: {item.menoCheck ? <DoneIcon color="success" /> : <DangerousIcon color="error" />}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default CardCheckOneCardData;