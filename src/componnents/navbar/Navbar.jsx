import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  // Listen for scroll events to change navbar background
  useEffect(() => {
    const handleScroll = () => {
      // If user scrolls down past the hero height
      if (window.scrollY > window.innerHeight * 0.8) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Cleanup the event listener when component unmounts
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out ${
        isScrolled 
          ? 'bg-black/80 backdrop-blur-md border-b border-blue-900/50 shadow-lg shadow-blue-900/10 py-4' 
          : 'bg-transparent py-6' // Slightly taller when at the top
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo Section */}
          <div className="shrink-0 flex items-center cursor-pointer">
            <Link 
              to="/" 
              className="font-sans font-bold text-2xl tracking-tight text-white transition-colors hover:opacity-80"
            >
              Why not <span className="text-blue-500">you</span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link 
              to="/how-it-works" 
              className="font-medium text-slate-300 hover:text-blue-400 transition-colors"
            >
              How it Works
            </Link>
            <Link 
              to="/our-doctors" 
              className="font-medium text-slate-300 hover:text-blue-400 transition-colors"
            >
              Our Doctors
            </Link>
          </div>

          {/* Desktop Call to Action & Login */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/login" 
              className="font-medium text-slate-300 hover:text-white transition-colors"
            >
              Log in
            </Link>
            <button 
              onClick={() => navigate('/assessment')}
              className="px-6 py-2.5 rounded-full font-medium transition-all bg-blue-600/20 border border-blue-500/50 text-blue-200 hover:bg-blue-600 hover:text-white shadow-[0_0_15px_rgba(37,99,235,0.2)] hover:shadow-[0_0_25px_rgba(37,99,235,0.4)]"
            >
              Start Assessment
            </button>
          </div>

          {/* Mobile Menu Button (Hamburger) */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none text-slate-300 hover:text-white transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown (Dark Theme) */}
      {isOpen && (
        <div className="md:hidden bg-[#050b14] shadow-lg shadow-blue-900/20 absolute w-full left-0 top-full border-t border-blue-900/30">
          <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col">
            <Link to="/how-it-works" className="block px-3 py-2 text-slate-300 font-medium hover:bg-blue-900/30 hover:text-white rounded-md transition-colors">How it Works</Link>
            <Link to="/our-doctors" className="block px-3 py-2 text-slate-300 font-medium hover:bg-blue-900/30 hover:text-white rounded-md transition-colors">Our Doctors</Link>
            <hr className="my-2 border-blue-900/30" />
            <Link to="/login" className="w-full text-left px-3 py-2 text-slate-300 font-medium hover:bg-blue-900/30 hover:text-white rounded-md transition-colors">Log in</Link>
            <button 
              onClick={() => navigate('/assessment')}
              className="w-full mt-2 bg-blue-600/80 border border-blue-500 text-white px-3 py-3 rounded-lg font-medium hover:bg-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.3)] text-center transition-all"
            >
              Start Assessment
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;