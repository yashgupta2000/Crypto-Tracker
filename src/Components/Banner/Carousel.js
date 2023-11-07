import React, { useEffect, useState } from 'react';

import AliceCarousel from 'react-alice-carousel'
import { CryptoState } from '../../CryptoContext';
import { Link } from 'react-router-dom';
import { TrendingCoins } from '../../Config/api';
import axios from 'axios'
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    carousel: {
        height: "50%",
        alignItem: 'center',
        display: 'flex'
    },
    carouselItems: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textTransform: 'uppercase',
        color: 'white'
    }
}))

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


const Carousel = () => {
    const classes = useStyles();


    const [trending, settrending] = useState([])
    const { currency, symbol
    } = CryptoState()

    const fetchingCoin = async () => {
        const { data } = await axios.get(TrendingCoins(currency))
        settrending(data);
        console.log(data)
    }

    useEffect(() => {
        fetchingCoin()
    }, [currency])

    const carouselImg = trending.map((items) => {
        const profit = items.price_change_percentage_24h >= 0;
        // const loss = items.price_change_percentage_24h < 0;
        return (
            <Link className={classes.carouselItems} to={`/coins/${items.id}`}>
                <img height="80" src={items.image}></img >
                <span>{items.symbol}

                    &nbsp;
                    {<span style={{ color: profit > 0 ? "green" : "red" }}>{profit && "+"}{items.price_change_percentage_24h.toFixed(2)}%</span>}
                </span>
                <span style={{ fontSize: 20, fontWeight: 500 }}>
                    {`${symbol} `}{numberWithCommas(items.current_price.toFixed(2))}
                </span>

            </Link>
        )

    })
    const responsives = {

        0: {
            items: 1,
        },
        1024: {
            items: 3,
            itemsFit: 'contain',
        }

    };

    return (<div className={classes.carousel}>
        <AliceCarousel disableDotsControls mouseTracking infinite autoPlayInterval={1000} disableButtonsControls animationDuration={1500} autoPlay responsive={responsives} items={carouselImg} />
    </div>);
}


export default Carousel;