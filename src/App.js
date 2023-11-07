import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import CoinPage from './pages/CoinPage';
import CryptoContext from './CryptoContext';
import Header from './Components/Header';
import Home from './pages/Home';
import { makeStyles } from '@material-ui/core';

function App() {
  // const useStyles = makeStyles(() => ({
  //   App: {
  //     backgroundColor: 'red',
  //     color: 'white',
  //     border: '2px black'
  //   }
  // }))
  // const classes = useStyles();
  return (
    <CryptoContext>
      <BrowserRouter>
        <div style={{ color: 'white', backgroundColor: '#14161a' }}>
          <Header />
          <Routes>
            <Route path='/' Component={Home} exact />
            <Route path='/coins/:id' Component={CoinPage} />
          </Routes>
        </div>
      </BrowserRouter>
    </CryptoContext>
  );
}

export default App;
