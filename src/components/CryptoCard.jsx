import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const CryptoCard = ({ coin }) => {
  const [isFav, setIsFav] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFav(favs.includes(coin?.id));
  }, [coin?.id]);

  const toggleFavorite = () => {
    let favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (favs.includes(coin?.id)) {
      favs = favs.filter((id) => id !== coin.id);
    } else {
      favs.push(coin?.id);
    }
    localStorage.setItem("favorites", JSON.stringify(favs));
    setIsFav(favs.includes(coin?.id));
  };

  const fetchChartData = async () => {
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=usd&days=7`
      );
      const data = await res.json();
      const prices = data.prices.map(([timestamp, price]) => ({
        date: new Date(timestamp).toLocaleDateString(),
        price: price.toFixed(2),
      }));
      setChartData(prices);
    } catch (err) {
      console.error("Failed to fetch chart data", err);
    }
  };

  const handleCardClick = async () => {
    if (!showChart) {
      await fetchChartData();
    }
    setShowChart((prev) => !prev);
  };

  return (
    <div
      onClick={handleCardClick}
      className="cursor-pointer bg-gradient-to-br from-[#1f2937] to-[#111827] text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 w-full max-w-sm mx-auto mb-6"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">{coin.name}</h3>
        <button
          onClick={(e) => {
            e.stopPropagation(); 
            toggleFavorite();
          }}
          className={`text-lg px-3 py-1 rounded-full transition-all duration-200 
            ${isFav ? "bg-yellow-400 text-black" : "bg-gray-800 text-white hover:bg-gray-700"}`}
        >
          {isFav ? "★" : "☆"}
        </button>
      </div>
      <p className="text-2xl font-bold">${coin.current_price.toFixed(2)}</p>
      <p className="text-sm text-gray-400 mt-2">Current Price</p>

      {showChart && chartData.length > 0 && (
        <div className="mt-4 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="date" />
              <YAxis domain={['auto', 'auto']} />
              <Tooltip />
              <Line type="monotone" dataKey="price" stroke="#38bdf8" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default CryptoCard;
