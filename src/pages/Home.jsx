import React from 'react';
import CryptoCard from '../components/CryptoCard';

const Home = ({ allCoins }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {allCoins.map((coin) => (
        <CryptoCard key={coin.id} coin={coin} />
      ))}
    </div>
  );
};

export default Home;
