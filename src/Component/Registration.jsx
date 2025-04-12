import React, { useState } from 'react';
import CryptoJS from 'crypto-js';

const Registration = () => {
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = () => {
    // Validation
    if (!email && !mobile) {
      setError('Please enter either email or mobile number.');
      return;
    }
    if (password.length < 14) {
      setError('Password must be at least 14 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Encrypt and store user data
    console.log('Original password:', password);
    const encryptedPassword = CryptoJS.AES.encrypt(password, 'secret key').toString();
    console.log('Encrypted password:', encryptedPassword);
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push({ email, mobile, password: encryptedPassword });
    localStorage.setItem('users', JSON.stringify(users));
    
    alert('Registration successful! Please login.');
  };

  return (
    <div className="registration-container max-w-md mx-auto p-4 w-full">
      <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Register</h2>
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
      <input
        type="password"
        placeholder="Password (min 14 characters)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 mb-3 border border-gray-300 rounded"
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full p-2 mb-3 border border-gray-300 rounded"
      />
      {error && <p className="text-red-500 mb-3">{error}</p>}
      <button 
        onClick={handleRegister} 
        className="w-full bg-purple-500 text-white p-2 rounded hover:bg-purple-600"
      >
        Register
      </button>
      </div>
    </div>
  );
};

export default Registration;
