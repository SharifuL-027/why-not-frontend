// src/App.jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import AllRoutes from './routes/AllRoutes';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col">
        {/* The Navbar stays fixed at the top */}
        <Navbar />

        {/* Main content area expands to fill available space */}
        <main className="flex-grow">
          <AllRoutes />
        </main>

        {/* You can easily add a global <Footer /> here later */}
      </div>
    </Router>
  );
};

export default App;