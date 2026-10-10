// src/App.jsx

import { BrowserRouter as Router } from 'react-router-dom';
import AllRoutes from './routes/Allroutes';


const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col">
        {/* The Navbar stays fixed at the top */}


        {/* Main content area expands to fill available space */}
        <main className="grow">
          <AllRoutes />
        </main>


        {/* You can easily add a global <Footer /> here later */}
      </div>
    </Router>
  );
};

export default App;