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

    const removeSitecorePath = (path: string) => {
        return path.replace("/sitecore/content/husqvarna/inappmessage/amc", "");
    }

    return (
        <Grid container spacing={2} className="cardContainer">
            {info.map((item, index) => (
                <Grid item xs={3} key={index} className="cardItem">
                    <Card className="cardContent">
                        <CardContent className="cardContent">
                        <div className="cardHeader">
                            <Typography variant="h5" component="div">
                                {item.campaignName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
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
                                        <div>Models: {item.models?.join(', ') || ''}</div>
                                    </div>
                                }>
                                    <IconButton>
                                        <HelpIcon />
                                    </IconButton>
                                </Tooltip>
                            </Typography>
                        </div>
                        <div className="cardDetails">
                            <Typography variant="body2" color="text.secondary">
                                {removeSitecorePath(item.path) || 'PATH not found in Sitecore'}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                ({item.language}) <b>{item.header}</b>
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            {item.imagePath && (
                                            <Image src={getImagePath(item.imagePath)} alt="Campaign" width={100} height={100} />
                                        )}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Visible: {format(new Date(item.startDate), 'yyyy-MM-dd')} - {format(new Date(item.endDate), 'yyyy-MM-dd')}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Markets From Sitecore: {item.marketsFromSitecore?.join(', ') || ''} 
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Markets From Meno: {item.marketsFromMeno?.join(', ') || ''}
                           </Typography>
                        </div>
                        <div className="cardFooter">
                            <Grid container spacing={1} className="smallCardContainer">
                                <Grid item xs={4}>
                                    <div className="smallCard">
                                        <Typography variant="body2" color="text.secondary">
                                            Markets OK
                                        </Typography>
                                        {item.marketCheck ? <DoneIcon color="success" /> : <DangerousIcon color="error" />}
                                    </div>
                                </Grid>
                                <Grid item xs={4}>
                                    <div className="smallCard">
                                        <Typography variant="body2" color="text.secondary">
                                            Is in Sitecore
                                        </Typography>
                                        {item.sitecoreCheck ? <DoneIcon color="success" /> : <DangerousIcon color="error" />}
                                    </div>
                                </Grid>
                                <Grid item xs={4}>
                                    <div className="smallCard">
                                        <Typography variant="body2" color="text.secondary">
                                            Is in MENO
                                        </Typography>
                                        {item.menoCheck ? <DoneIcon color="success" /> : <DangerousIcon color="error" />}
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default CardCheckOneCardData;