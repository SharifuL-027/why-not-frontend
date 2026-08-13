import React from 'react';
import { Routes, Route } from 'react-router-dom';
// Ensure your folder name spelling matches here!
import Hero from '../componnents/Hero/Hero';

const AllRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Hero />} />
      
      {/* Commented out until you create a NotFound.jsx file and import it */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
};

export default AllRoutes;