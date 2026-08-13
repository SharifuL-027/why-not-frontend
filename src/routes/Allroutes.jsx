// src/routes/AllRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';



const AllRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/assessment" element={<Assessment />} />
      <Route path="/checkout" element={<Checkout />} />
      
      {/* Private/Protected Routes (To be locked behind authentication later) */}
      <Route path="/dashboard" element={<Dashboard />} />
      
      {/* 404 Catch-All Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AllRoutes;