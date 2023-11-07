import { Container, Typography, makeStyles } from '@material-ui/core';

import Carousel from './Carousel';
import React from 'react';

const useStyles = makeStyles(() => ({

    bannerContent: {
        height: 400,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        paddingTop: 25,
        // border: '2px solid white'


    },
    tagline: {
        display: 'flex',
        // border: '2px solid white',
        height: '40%',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center'
    }
}))
const Banner = () => {
    const classes = useStyles();

    return (
        <div style={{ backgroundImage: "url('./banner2.jpg')" }} className={classes.banner}>
            <Container className={classes.bannerContent}>
                <div style={{}} className={classes.tagline}>
                    <Typography variant='h2'
                        style={{ fontWeight: 'bold', fontFamily: 'Montserrat', }}>
                        Crypto Hunter
                    </Typography>
                    <Typography variant='subtitle2'
                        style={{ fontFamily: 'Montserrat', color: 'darkgray', textTransform: 'capitalize' }}>
                        Get All The Info Regarding Your Favorite Crypto Currency
                    </Typography>
                </div>
                <Carousel />

            </Container>
        </div>
    )
}



export default Banner;