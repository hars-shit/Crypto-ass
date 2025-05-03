import React, { useEffect, useState } from 'react'
import CryptoCard from './CryptoCard';
import axios from 'axios';

const CryptoList = () => {

    const [cryptos,setCryptos]=useState([])
    useEffect(() => {
        const fetchPrices = async () => {
          try {
            const res = await axios.get(
              "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"
            );
            setCryptos(res?.data);
          } catch (error) {
            console.error("Failed to fetch data:", error);
          }
        };
        fetchPrices();
       
      }, []);
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cryptos.map((coin) => (
        <CryptoCard key={coin.id} coin={coin} />
      ))}
    </div>
  )
}



export default CryptoList