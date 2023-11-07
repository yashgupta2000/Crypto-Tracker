import { Container, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, ThemeProvider, Typography, createTheme } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import { CoinList } from '../Config/api';
import { CryptoState } from '../CryptoContext';
import Pagination from '@mui/material/Pagination';
import axios from 'axios';
import { makeStyles } from '@material-ui/core';
import { numberWithCommas } from './Banner/Carousel';
import { useNavigate } from "react-router-dom";

//styles
const useStyles = makeStyles(() => ({
    row: {
        color: 'red'
    },
    pagination: {
        "& .MuiPaginationItem-root": {
            color: 'gold'
        }
    }
}))

const CoinsTable = () => {

    //Navigation
    const navigate = useNavigate();




    //state
    const [coins, setcoins] = useState([]);
    const [loading, setloading] = useState(false);
    const [search, setsearch] = useState('');
    const [page, setPage] = useState(1);

    //contextAPI
    const { currency, symbol } = CryptoState();


    //api
    const fetchCoins = async () => {
        setloading(true);
        const { data } = await axios.get(CoinList(currency));
        setcoins(data);
        setloading(false);
        console.log(coins);

    }

    //hook
    useEffect(() => {
        fetchCoins()
    }, [currency])


    //dark Theme
    const theme = createTheme({
        palette: {
            primary: {
                main: '#fff'
            },
            type: 'dark'
        }
    })


    //Functions
    const handleSearch = () => {
        return (
            coins.filter((item) => (
                item.name.toLowerCase().includes(search) || item.symbol.toLowerCase().includes(search)
            ))
        )
    }
    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <Container style={{ textAlign: 'center' }}>
                <Typography variant='h4' style={{ margin: 18, fontFamily: 'Montserrat' }}>
                    Cryptocurrency Prices by Market Cap
                </Typography>

                <TextField label='Search For Crypto Currency' variant='outlined' style={{ width: '100%', marginTop: 10, marginBottom: 20 }} onChange={e => setsearch(e.target.value)} />

                <TableContainer>
                    {loading ? (<LinearProgress style={{ backgroundColor: 'gold' }} />) : <>

                        <Table>
                            <TableHead style={{ backgroundColor: '#eebc1d' }}>

                                <TableRow>
                                    {["Coin", "Price", "24h change", "Market Cap"].map((item) =>
                                    (
                                        <TableCell style={{ color: 'black', fontWeight: '700', fontFamily: 'Montserrat', alignItems: 'center', textAlign: 'center' }} key={item}>
                                            {item}
                                        </TableCell>
                                    )
                                    )}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    handleSearch().slice((page - 1) * 10, (page - 1) * 10 + 10)
                                        .map((item) => {
                                            const profit = item.price_change_percentage_24h >= 0;
                                            // alert(profit)
                                            return (
                                                <TableRow onClick={() => {
                                                    navigate(`/coins/${item.id}`)
                                                }}
                                                    key={item.name}
                                                >
                                                    <TableCell style={{ display: 'flex', gap: 20 }}>

                                                        <img src={item.image} height='50'
                                                            className={classes.row} />

                                                        <div style={{ display: 'flex', flexDirection: 'column', alignItem: 'center' }}>
                                                            <span style={{ textTransform: 'uppercase', fontSize: '22' }}>{item.symbol}</span>
                                                            <span style={{ color: 'darkgray' }}>{item.name}</span>
                                                        </div>
                                                    </TableCell>

                                                    <TableCell align='center'>
                                                        {symbol}{numberWithCommas(item.current_price.toFixed(2))}
                                                    </TableCell>

                                                    <TableCell align='center'

                                                        style={{
                                                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                                                            fontWeight: 500,
                                                        }}
                                                    >

                                                        {item.price_change_percentage_24h.toFixed(2)}%
                                                    </TableCell>

                                                    <TableCell align='center'>
                                                        {symbol} {numberWithCommas(item.market_cap.toString().slice(0, 6))}M

                                                    </TableCell>

                                                </TableRow>
                                            )
                                        })
                                }
                            </TableBody>
                        </Table>
                    </>}


                </TableContainer>

                <Pagination classes={{ ul: classes.pagination }} style={{ display: 'flex', justifyContent: 'center', padding: 20 }} count={(handleSearch()?.length / 10).toFixed(0)} color='secondary'


                />

            </Container>
        </ThemeProvider >
    );
}


export default CoinsTable;