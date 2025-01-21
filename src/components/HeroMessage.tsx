import React from 'react';
import { Typography } from "@mui/material";
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles
import Image from 'next/image';

interface HeroMessageProps {
    carouselItem: {
        imageUrl: string | null;
        header: string;
    };
    index: number;
}

const HeroMessage: React.FC<HeroMessageProps> = async ({ carouselItem, index }) => {
    return (<div key={index} style={{ position: 'relative' }}>
                                {carouselItem.imageUrl && (
                                    <Image className="hero-image" src={carouselItem.imageUrl} alt="large image" width={360} height={200} />
                                )}
                                <Typography
                                    component="div"
                                    style={{
                                        position: 'absolute',
                                        bottom: '10px',
                                        left: '10px',
                                        color: 'white',
                                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                        padding: '5px',
                                        borderRadius: '5px',
                                    }}
                                >
                                    {carouselItem.header}
                                </Typography>
                            </div>)
};

export default HeroMessage;