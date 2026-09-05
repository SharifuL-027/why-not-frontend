// src/App.jsx

import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './componnents/navbar/Navbar';
import AllRoutes from './routes/AllRoutes';
import Footer from './componnents/Main/Footer';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col">
        {/* The Navbar stays fixed at the top */}
        <Navbar />

        {/* Main content area expands to fill available space */}
        <main className="grow">
          <AllRoutes />
        </main>
        <Footer/>

        {/* You can easily add a global <Footer /> here later */}
      </div>
    </Router>
  );
};

export default App;