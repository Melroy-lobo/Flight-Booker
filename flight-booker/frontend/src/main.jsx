import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles.css';
import App from './App.jsx';
import Home from './pages/Home.jsx';
import Results from './pages/Results.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import MyBookings from './pages/MyBookings.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}> 
          <Route index element={<Home />} />
          <Route path="results" element={<Results />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="my-bookings" element={<MyBookings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
