import { CircularProgress, ThemeProvider, createTheme, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import Chart from 'chart.js/auto';
import { CryptoState } from '../CryptoContext';
import { HistoricalChart } from '../Config/api';
import { Line } from 'react-chartjs-2'
import SelectButton from './SelectButton';
import axios from 'axios';
import { chartDays } from '../Config/data'

const useStyles = makeStyles((theme) => ({
    container: {
        width: "75%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 25,
        padding: 40,
        [theme.breakpoints.down("md")]: {
            width: "100%",
            marginTop: 0,
            padding: 20,
            paddingTop: 0,
        },
    }
}))


const CoinInfo = ({ coin }) => {

    const [historical, sethistorical] = useState('');
    const [days, setdays] = useState(1);

    const { currency } = CryptoState();
    const [flag, setflag] = useState(false);

    const fetchHistoricalData = async () => {
        const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
        sethistorical(data.prices);
        console.log(data);
    }

    useEffect(() => {
        fetchHistoricalData()
    }, [currency, days])

    const theme = createTheme({
        palette: {
            primary: {
                main: '#fff'
            },
            type: 'dark'
        }
    })

    const classes = useStyles();
    return (
        <ThemeProvider theme={theme}>
            <div className={classes.container}>
                {
                    !historical ? (
                        <CircularProgress style={{ color: 'gold' }} size={250} thickness={1} />
                    ) : <>

                        <Line data={{
                            labels: historical.map((coin) => {
                                let date = new Date(coin[0]);
                                let time =
                                    date.getHours() > 12
                                        ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                                        : `${date.getHours()}:${date.getMinutes()} AM`;
                                return days === 1 ? time : date.toLocaleString();

                            }),
                            datasets: [
                                {
                                    data: historical.map((coin) => coin[1]),
                                    label: `Price ( Past ${days} Days ) in ${currency}`,
                                    borderColor: "#EEBC1D",
                                }

                            ]

                        }}
                            options={{
                                elements: {
                                    point: {
                                        radius: 1,
                                    },
                                },
                            }} />
                        {/* {chartDays.map((day) => (
                            <SelectButton
                                key={day.value}
                                onClick={() => {
                                    setdays(day.value);
                                    setflag(false);
                                }}
                                selected={day.value === days}
                            >
                                {day.label}
                            </SelectButton>
                        ))} */}


                    </>
                }

            </div>

        </ThemeProvider >
    );
}


export default CoinInfo;