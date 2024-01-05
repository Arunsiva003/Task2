import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import Home from "./pages/Home"
import FlightBooking from './pages/FlighBooking';
import MyBookings from './pages/MyBookings';
import Login from './pages/Login';
import Register from "./pages/Register";
import Admin from './pages/Admin';
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [registered, setRegistered] = useState(false);

  const handleLogin = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:3001/login', {
        username,
        password,
      });
      console.log(response.data);
      setLoggedIn(true);
    } catch (error) {
      console.error('Login failed:', error.response.data);
      if(error.response.data==="Invalid credentials") alert("Invalid Credentials! Please register");
    }
  };

  const handleRegister = async (username, password) =>{
    try{
      await axios.post('http://localhost:3001/register', {
        username,
        password,
      })
      setRegistered(true);
    }catch(err){
      console.error("Register failed",err.response.data)
    }
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/admin' element={<Admin/>}/>
          <Route path="/login" element={loggedIn ? <Navigate to="/home" /> : <Login handleLogin={handleLogin} />} />
          <Route path="/register" element={registered ? <Navigate to="/login"/> : <Register handleRegister={handleRegister}/>}/>
          <Route path="/home" element={loggedIn ? <Home /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/bookflights" element={<FlightBooking/>} />
          <Route path="/mybookings" element={<MyBookings/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
