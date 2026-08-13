import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  // Listen for scroll events to change navbar background
  useEffect(() => {
    const handleScroll = () => {
      // If user scrolls down past the hero height (e.g., 90% of screen height)
      // window.innerHeight gives the height of the viewport
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
          ? 'bg-white shadow-md py-4' 
          : 'bg-transparent py-6' // Slightly taller when at the top
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo Section */}
          <div className="shrink-0 flex items-center cursor-pointer">
            <Link 
              to="/" 
              className={`font-sans font-bold text-2xl tracking-tight transition-colors ${
                isScrolled ? 'text-slate-900' : 'text-white'
              }`}
            >
              Why not <span className={isScrolled ? 'text-teal-600' : 'text-teal-400'}>you</span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link 
              to="/how-it-works" 
              className={`font-medium transition-colors ${
                isScrolled ? 'text-slate-600 hover:text-teal-600' : 'text-gray-200 hover:text-white'
              }`}
            >
              How it Works
            </Link>
            <Link 
              to="/our-doctors" 
              className={`font-medium transition-colors ${
                isScrolled ? 'text-slate-600 hover:text-teal-600' : 'text-gray-200 hover:text-white'
              }`}
            >
              Our Doctors
            </Link>
          </div>

          {/* Desktop Call to Action & Login */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/login" 
              className={`font-medium transition-colors ${
                isScrolled ? 'text-slate-600 hover:text-slate-900' : 'text-gray-200 hover:text-white'
              }`}
            >
              Log in
            </Link>
            <button 
              onClick={() => navigate('/assessment')}
              className={`px-6 py-2.5 rounded-full font-medium shadow-sm transition-all ${
                isScrolled 
                  ? 'bg-teal-600 text-white hover:bg-teal-700' 
                  : 'bg-white text-slate-900 hover:bg-gray-100' // White button on dark background
              }`}
            >
              Start Assessment
            </button>
          </div>

          {/* Mobile Menu Button (Hamburger) */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className={`focus:outline-none transition-colors ${
                isScrolled ? 'text-slate-600' : 'text-white'
              }`}
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

      {/* Mobile Menu Dropdown (Always solid so text is readable) */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg absolute w-full left-0 top-full border-t border-gray-100">
          <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col">
            <Link to="/how-it-works" className="block px-3 py-2 text-slate-600 font-medium hover:bg-slate-50 rounded-md">How it Works</Link>
            <Link to="/our-doctors" className="block px-3 py-2 text-slate-600 font-medium hover:bg-slate-50 rounded-md">Our Doctors</Link>
            <hr className="my-2 border-gray-100" />
            <Link to="/login" className="w-full text-left px-3 py-2 text-slate-600 font-medium hover:bg-slate-50 rounded-md">Log in</Link>
            <button 
              onClick={() => navigate('/assessment')}
              className="w-full mt-2 bg-teal-600 text-white px-3 py-3 rounded-lg font-medium hover:bg-teal-700 text-center"
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