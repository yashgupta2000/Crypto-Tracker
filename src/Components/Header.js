import { AppBar, Container, MenuItem, Select, ThemeProvider, Toolbar, Typography, createTheme } from '@material-ui/core';

import { CryptoState } from '../CryptoContext';
import React from 'react';
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const { currency, setCurrency } = CryptoState()
    const theme = createTheme({
        palette: {
            primary: {
                main: '#fff'
            },
            type: 'dark'
        }
    })
    console.log(currency);
    return (


        <>
            <ThemeProvider theme={theme}>
                <AppBar color='transparent' position='static'>
                    <Container>

                        <Toolbar>
                            <Typography onClick={() => navigate("/")}
                                style={{ flex: 1, color: 'gold', fontFamily: 'Montserrat', fontWeight: 'bold', cursor: 'pointer' }}>Crypto Hunter</Typography>


                            <Select
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value)}

                                variant='outlined' style={{ width: '100', height: 40 }}>
                                <MenuItem value={"USD"}>USD</MenuItem>
                                <MenuItem value={"INR"}>INR</MenuItem>
                            </Select>
                        </Toolbar>

                    </Container>
                </AppBar>
            </ThemeProvider>

        </>
    );
}



export default Header;