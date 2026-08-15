import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Hero from '../componnents/Main/Hero';
import HowItWorks from '../componnents/Main/HowItworks';
import WhyItMatters from '../componnents/Main/WhyItMatters';
import WhatYouGet from '../componnents/Main/WhatYouGet';

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
            <WhyItMatters/>
            <WhatYouGet/>
          </>
        } 
      />
      
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
};

export default AllRoutes;