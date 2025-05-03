import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Header = () => {
    const {pathname}=useLocation()
    console.log("path",pathname)
  return (
    <div className="flex justify-between items-center px-6 py-4 bg-gray-900 text-white shadow-md rounded-b-xl">
      <h1 className="text-2xl font-bold">CryptoTracker</h1>
      <Link to={pathname=="/" ? "/favorites" : "/"}>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200">
         {
            pathname=="/" 
            ?
            "Favorites"
            :
            "Home"

         }
        </button>
      </Link>
    </div>
  )
}

export default Header