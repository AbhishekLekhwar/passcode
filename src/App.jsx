import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Nav from './Component/Nav';
import Manager from './Component/Manager_final';
import Login from './Component/Login';
import Registration from './Component/Registration';
import Footer from './Component/Footer';
import Welcome from './Component/Welcome';
import About from './Component/About';
import Contact from './Component/Contact';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('loggedInUser');
      let loggedInUser = null;
      
      if (storedUser) {
        // Handle case where email was stored directly as string
        if (storedUser.includes('@')) {
          loggedInUser = { email: storedUser };
        } else {
          // Parse as JSON if it looks like JSON
          loggedInUser = JSON.parse(storedUser);
        }
      }
      setIsAuthenticated(!!(loggedInUser?.email || loggedInUser?.mobile));
    } catch (error) {
      console.error('Error parsing user data:', error);
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogin = (user) => {
    localStorage.setItem('loggedInUser', JSON.stringify({
      email: user.email,
      mobile: user.mobile
    }));
    setIsAuthenticated(true);
  };

const handleLogout = () => {
  localStorage.removeItem('loggedInUser');
  setIsAuthenticated(false);
  navigate('/'); // Redirect to welcome page
};

  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <Nav isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route 
            path="/manager" 
            element={isAuthenticated ? <Manager /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/login" 
            element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/manager" />} 
          />
          <Route 
            path="/register" 
            element={!isAuthenticated ? <Registration /> : <Navigate to="/manager" />} 
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App
