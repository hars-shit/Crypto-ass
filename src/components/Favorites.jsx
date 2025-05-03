import React, { useEffect, useState } from 'react';
import CryptoCard from './CryptoCard';

const Favorites = ({ allCoins }) => {
  const [favoriteCoins, setFavoriteCoins] = useState([]);

  useEffect(() => {
    const favIds = JSON.parse(localStorage.getItem("favorites") || "[]");
    const filtered = allCoins.filter((coin) => favIds.includes(coin.id));
    setFavoriteCoins(filtered);
  }, [allCoins]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {favoriteCoins.length > 0 ? (
        favoriteCoins.map((coin) => <CryptoCard key={coin.id} coin={coin} />)
      ) : (
        <p className="text-gray-500 text-center col-span-full">No favorites selected.</p>
      )}
    </div>
  );
};

export default Favorites;
