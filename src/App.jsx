import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Favorites from './components/Favorites';
import Header from './components/Header';

const App = () => {
  const [allCoins, setAllCoins] = useState([]);



  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd'
        );
        const data = await res.json();
        setAllCoins(data);
      } catch (err) {
        console.error('Error fetching coins:', err);
      }
    };

    fetchCoins();
  }, []);

  return (
    <BrowserRouter>
     <Header />
      <Routes>
        <Route path="/" element={<Home allCoins={allCoins} />} />
        <Route path="/favorites" element={<Favorites allCoins={allCoins} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
