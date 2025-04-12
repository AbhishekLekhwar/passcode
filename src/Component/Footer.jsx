import React from 'react'
import { FaBattleNet } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-purple-400 w-full py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-center  items-center space-y-4 md:space-y-0">
          {/* Logo - text size adjusts for mobile */}
          <div className="text-sm md:text-base font-bold bg-slate-400 shadow-xl px-4 py-2 rounded-2xl flex items-center">
            <span className="hidden sm:inline ">SAFE YOUR WORLD WITH PASSCODE </span>  <FaBattleNet className="ml-2" />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
