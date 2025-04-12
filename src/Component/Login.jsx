import React, { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const handleLogin = () => {
    if (!email && !mobile) {
      setError('Please enter either email or mobile number.');
      return;
    }
    
    // Check credentials against stored users
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => {
      const emailMatch = email && u.email === email;
      const mobileMatch = mobile && u.mobile === mobile;
      return emailMatch || mobileMatch;
    });
    
    if (!user) {
      setError('User not found. Please register first.');
      return;
    }

    // Verify password
    try {
      console.log('Encrypted password from storage:', user.password);
      const bytes = CryptoJS.AES.decrypt(user.password, 'secret key');
      console.log('Decrypted bytes:', bytes);
      const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
      console.log('Decrypted string:', decryptedPassword);
      console.log('Input password:', password);
      console.log('Comparison:', decryptedPassword === password ? 'MATCH' : 'NO MATCH');
      
      console.log('Stored User:', user);
      console.log('Decrypted Password:', decryptedPassword);
      console.log('Input Password:', password);
      
      if (decryptedPassword !== password) {
        setError('Incorrect password. Please try again.');
        return;
      }

      // Store logged in user info
      localStorage.setItem('loggedInUser', JSON.stringify({
        email: user.email,
        mobile: user.mobile
      }));
      
      console.log('Before onLogin - isAuthenticated should be false');
      props.onLogin({ email: user.email, mobile: user.mobile });
      // Use setTimeout to ensure navigation happens after state updates
      setTimeout(() => {
        console.log('Navigating to manager page');
        navigate('/manager');
      }, 0);
    } catch (error) {
      console.error('Decryption error:', error);
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="login-container max-w-md mx-auto p-4 w-full">
      <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 mb-3 border border-gray-300 rounded"
      />
      <input
        type="text"
        placeholder="Mobile Number"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        className="w-full p-2 mb-3 border border-gray-300 rounded"
      />
      <div className="relative w-full mb-3">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password (min 14 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded pr-10"
        />
        <span 
          className="absolute right-3 top-3 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>
      {error && <p className="text-red-500 mb-3">{error}</p>}
      <button 
        onClick={handleLogin} 
        className="w-full bg-purple-500 text-white p-2 rounded hover:bg-purple-600"
      >
        Login
      </button>
      </div>
    </div>
  );
};

export default Login;
