import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  // Listen for scroll events to change navbar background
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

  // Lock body scrolling when mobile menu is open
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
            ? 'bg-[#0a0f16]/90 backdrop-blur-md border-b border-white/5 shadow-lg py-4' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            {/* Logo Section */}
            <div className="shrink-0 flex items-center cursor-pointer">
              <Link 
                to="/" 
                className="font-sans font-bold text-2xl tracking-tight text-white transition-colors hover:opacity-80"
                onClick={() => setIsOpen(false)}
              >
                Why not <span className="text-teal-400 font-medium">you</span>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex space-x-8 items-center">
              <Link 
                to="/how-it-works" 
                className="font-medium text-slate-300 hover:text-teal-400 transition-colors"
              >
                How it Works
              </Link>
              <Link 
                to="/our-doctors" 
                className="font-medium text-slate-300 hover:text-teal-400 transition-colors"
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
                className="bg-white text-slate-900 px-6 py-2.5 rounded-full font-semibold hover:bg-gray-200 hover:scale-105 transition-all duration-300 shadow-sm"
              >
                Start Assessment
              </button>
            </div>

            {/* Mobile Menu Button (Stylish Hamburger) */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsOpen(true)}
                className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-slate-300 hover:text-white transition-all backdrop-blur-sm focus:outline-none"
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
            className="fixed inset-0 z-[60] bg-[#0a0f16] flex flex-col"
          >
            {/* Mobile Menu Header (Matches Navbar position) */}
            <div className="flex justify-between items-center px-4 sm:px-6 py-6 border-b border-white/5">
              <Link 
                to="/" 
                className="font-sans font-bold text-2xl tracking-tight text-white"
                onClick={() => setIsOpen(false)}
              >
                Why not <span className="text-teal-400 font-medium">you</span>
              </Link>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-slate-300 hover:text-white transition-all focus:outline-none"
                aria-label="Close menu"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Huge, beautifully centered links for mobile */}
            <div className="flex flex-col items-center justify-center flex-1 space-y-10 px-6">
              <Link 
                to="/how-it-works" 
                onClick={() => setIsOpen(false)}
                className="text-3xl font-serif text-slate-300 hover:text-teal-400 transition-colors"
              >
                How it Works
              </Link>
              <Link 
                to="/our-doctors" 
                onClick={() => setIsOpen(false)}
                className="text-3xl font-serif text-slate-300 hover:text-teal-400 transition-colors"
              >
                Our Doctors
              </Link>
              <Link 
                to="/login" 
                onClick={() => setIsOpen(false)}
                className="text-3xl font-serif text-slate-300 hover:text-white transition-colors"
              >
                Log in
              </Link>

              <div className="w-24 h-px bg-white/10 my-4"></div>

              <button 
                onClick={() => {
                  setIsOpen(false);
                  navigate('/assessment');
                }}
                className="w-full max-w-xs bg-teal-500 text-slate-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-teal-400 transition-all duration-300 shadow-[0_0_20px_rgba(45,212,191,0.3)]"
              >
                Start Assessment
              </button>
            </div>
            
            {/* Faint background glow inside the mobile menu */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-100 h-100 bg-teal-900/20 rounded-full blur-[100px] pointer-events-none z-[-1]"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;