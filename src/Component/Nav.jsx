import React, { useState } from 'react'
import { FaBattleNet, FaBars, FaTimes } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Nav = ({ isAuthenticated, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-purple-300 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="font-bold bg-slate-400 px-4 py-2 rounded-2xl flex items-center">
              PassCode <FaBattleNet className="ml-2" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {!isAuthenticated && (
                <>
                  <Link to="/register" className="hover:text-purple-800 font-bold px-3 py-2">Register</Link>
                  <Link to="/login" className="hover:text-purple-800 font-bold px-3 py-2">Login</Link>
                </>
              )}
              {!window.location.pathname.includes('/manager') && (
                <Link to="/about" className="hover:text-purple-800 font-bold px-3 py-2">About</Link>
              )}
              {isAuthenticated && (
                <button 
                  onClick={onLogout}
                  className="hover:text-purple-800 font-bold px-3 py-2"
                >
                  Logout
                </button>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-purple-800 hover:text-white hover:bg-purple-700 focus:outline-none"
            >
              {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {!isAuthenticated && (
              <>
                <Link to="/register" className="hover:text-purple-800 font-bold block px-3 py-2">Register</Link>
                <Link to="/login" className="hover:text-purple-800 font-bold block px-3 py-2">Login</Link>
              </>
            )}
            {!window.location.pathname.includes('/manager') && (
              <Link to="/about" className="hover:text-purple-800 font-bold block px-3 py-2">About</Link>
            )}
            {isAuthenticated && (
              <button 
                onClick={onLogout}
                className="hover:text-purple-800 font-bold block px-3 py-2 w-full text-left"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Nav
