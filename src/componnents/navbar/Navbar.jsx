import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out ${
          isScrolled 
            ? 'bg-[#FCFBF9]/95 backdrop-blur-md border-b border-[#1A6BBA]/10 shadow-sm py-4' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="w-full px-6 md:px-12 lg:px-20 xl:px-32">
          <div className="flex justify-between items-center">
            
            {/* Logo Section */}
            <div className="shrink-0 flex items-center cursor-pointer">
              <Link 
                to="/" 
                className="font-sans font-bold text-2xl tracking-tight text-[#0A1930] transition-colors hover:opacity-80 flex items-center gap-1"
                onClick={() => setIsOpen(false)}
              >
                Why not <span className="bg-linear-to-r from-[#1A6BBA] to-[#5DBB4D] bg-clip-text text-transparent font-semibold">you</span>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex space-x-8 items-center">
              <Link 
                to="/how-it-works" 
                className="font-medium text-[#0A1930]/80 hover:text-[#1A6BBA] transition-colors"
              >
                How it Works
              </Link>
              <Link 
                to="/our-doctors" 
                className="font-medium text-[#0A1930]/80 hover:text-[#1A6BBA] transition-colors"
              >
                Our Doctors
              </Link>
            </div>

            {/* Desktop Call to Action & Login */}
            <div className="hidden md:flex items-center space-x-6">
              <Link 
                to="/login" 
                className="font-medium text-[#0A1930]/80 hover:text-[#1A6BBA] transition-colors"
              >
                Log in
              </Link>
              <button 
                onClick={() => navigate('/assessment')}
                className="bg-linear-to-r from-[#1A6BBA] to-[#5DBB4D] text-white px-6 py-2.5 rounded-full font-semibold hover:scale-105 transition-all duration-300 shadow-[0_4px_10px_rgba(26,107,186,0.2)]"
              >
                Start Assessment
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsOpen(true)}
                className="p-2.5 bg-[#1A6BBA]/5 hover:bg-[#1A6BBA]/10 border border-[#1A6BBA]/10 rounded-full text-[#0A1930] transition-all backdrop-blur-sm focus:outline-none"
                aria-label="Open menu"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Full-Screen Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-60 bg-[#FCFBF9] flex flex-col"
          >
            <div className="flex justify-between items-center w-full px-6 md:px-12 lg:px-20 xl:px-32 py-6 border-b border-[#1A6BBA]/10">
              <Link 
                to="/" 
                className="font-sans font-bold text-2xl tracking-tight text-[#0A1930] flex items-center gap-1"
                onClick={() => setIsOpen(false)}
              >
                Why not <span className="bg-linear-to-r from-[#1A6BBA] to-[#5DBB4D] bg-clip-text text-transparent font-semibold">you</span>
              </Link>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2.5 bg-[#1A6BBA]/5 hover:bg-[#1A6BBA]/10 border border-[#1A6BBA]/10 rounded-full text-[#0A1930] transition-all focus:outline-none"
                aria-label="Close menu"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex flex-col items-center justify-center flex-1 space-y-10 px-6">
              <Link 
                to="/how-it-works" 
                onClick={() => setIsOpen(false)}
                className="text-3xl font-serif text-[#0A1930] hover:text-[#1A6BBA] transition-colors"
              >
                How it Works
              </Link>
              <Link 
                to="/our-doctors" 
                onClick={() => setIsOpen(false)}
                className="text-3xl font-serif text-[#0A1930] hover:text-[#1A6BBA] transition-colors"
              >
                Our Doctors
              </Link>
              <Link 
                to="/login" 
                onClick={() => setIsOpen(false)}
                className="text-3xl font-serif text-[#0A1930] hover:text-[#1A6BBA] transition-colors"
              >
                Log in
              </Link>

              <div className="w-24 h-px bg-[#1A6BBA]/20 my-4"></div>

              <button 
                onClick={() => {
                  setIsOpen(false);
                  navigate('/assessment');
                }}
                className="w-full max-w-xs bg-linear-to-r from-[#1A6BBA] to-[#5DBB4D] text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-[0_8px_20px_rgba(26,107,186,0.25)] transition-all duration-300"
              >
                Start Assessment
              </button>
            </div>
            
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-100 h-100 bg-[#5DBB4D]/10 rounded-full blur-[100px] pointer-events-none z-[-1]"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;