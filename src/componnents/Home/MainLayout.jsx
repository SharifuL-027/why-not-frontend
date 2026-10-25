import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../componnents/navbar/Navbar'; // Update path if needed
import Footer from '../componnents/Main/Footer'; // Update path if needed

const MainLayout = () => {
  return (
    // Main Container
    <div className="relative min-h-screen bg-[#0A1930] w-full flex flex-col">
      
      {/* Top Navbar (যেটা আগে বানিয়েছিলাম, সেটার ভেতরেই Mobile + Desktop sidebar এর লজিক আছে) */}
      <Navbar />

      {/* Main Content Area */}
      {/* 
        যেহেতু Navbar কম্পোনেন্টের ভেতরেই আমরা lg স্ক্রিনের জন্য fixed sidebar (w-[320px]) দিয়েছিলাম, 
        তাই মেইন কন্টেন্টকে lg স্ক্রিনে একটু ডান দিকে সরাতে হবে (lg:pl-[320px] বা lg:ml-[320px])
      */}
      <div className="flex-1 flex flex-col lg:pl-[320px] w-full">
        
        {/* Pages Content (Hero, Tests, Quiz, etc.) */}
        <main className="flex-1 w-full min-h-screen relative">
          <Outlet />
        </main>

        {/* Footer */}
        <Footer />
        
      </div>

    </div>
  );
};

export default MainLayout;