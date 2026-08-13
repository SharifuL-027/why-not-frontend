import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Hero from '../componnents/Main/Hero';
import HowItWorks from '../componnents/Main/HowItworks';

const AllRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route 
        path="/" 
        element={
          <>
            <Hero />
            <HowItWorks />
          </>
        } 
      />
      
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
};

export default AllRoutes;