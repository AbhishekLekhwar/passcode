import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-128px)] bg-gradient-to-b from-purple-100 to-white p-8">
      <div className="max-w-2xl text-center">
        <h1 className="text-5xl font-bold text-purple-800 mb-6">Welcome to PassCode</h1>
        <p className="text-xl text-gray-700 mb-8">
          Secure password management made simple. Register now or login to access your passwords.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/register" 
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors"
          >
            Get Started
          </Link>
          <Link 
            to="/login" 
            className="bg-white hover:bg-gray-100 text-purple-600 font-bold py-3 px-6 rounded-lg border-2 border-purple-600 text-lg transition-colors"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
