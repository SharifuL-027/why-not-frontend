import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    // Navy Blue Background with top border for separation
    // lg:pl-[50px] added to maintain sidebar layout spacing
    <footer className="bg-[#0A1930] relative overflow-hidden pt-24 pb-8 border-t border-[#3c5685]/40 lg:pl-[50px] w-full flex flex-col">
      
      {/* SVG Definitions for Global Blue-Green Gradient */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="footerLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1A6BBA" />
            <stop offset="100%" stopColor="#5DBB4D" />
          </linearGradient>
        </defs>
      </svg>

      {/* =========================================
          BACKGROUND GLOWS & TWO BIG CORNER LEAVES
          ========================================= */}
      
      {/* Glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#1A6BBA]/10 rounded-full blur-[150px] pointer-events-none -translate-y-1/2 z-0"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#5DBB4D]/10 rounded-full blur-[120px] pointer-events-none translate-y-1/4 z-0"></div>

      {/* Big Leaf - Top Right */}
      <svg className="absolute -top-10 -right-20 w-96 h-96 text-[#5DBB4D] opacity-5 pointer-events-none rotate-[15deg] z-0" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20 4C20 4 14 3 9 8C4 13 4 20 4 20C4 20 11 20 16 15C21 10 20 4 20 4Z" />
      </svg>

      {/* Big Leaf - Bottom Left */}
      <svg className="absolute -bottom-20 -left-20 w-[450px] h-[450px] text-[#1A6BBA] opacity-5 pointer-events-none -rotate-[45deg] z-0" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20 4C20 4 14 3 9 8C4 13 4 20 4 20C4 20 11 20 16 15C21 10 20 4 20 4Z" />
      </svg>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 xl:px-24 relative z-10 w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          {/* =========================================
              BRANDING & SOCIALS (Left Column)
              ========================================= */}
          <div className="lg:col-span-4">
            
            {/* Logo matching the Navbar style */}
            <Link to="/" className="flex items-center gap-4 mb-8 w-max group">
                
                {/* 1. Logo Image */}
                <img 
                  src="https://res.cloudinary.com/dsrs8hryx/image/upload/v1790161331/WhatsApp_Image_2026-08-17_at_12.05.48_AM-removebg-preview_o66w0p.png" 
                  alt="Why Not You Logo" 
                  className="h-16 sm:h-20 w-auto object-contain group-hover:scale-105 transition-transform duration-500 shrink-0" 
                />
                
                {/* 2. Brand Name & Tagline */}
                <div className="flex flex-col">
                  <span className="font-serif font-bold text-2xl sm:text-3xl tracking-tight text-white group-hover:text-[#5DBB4D] transition-colors duration-300">
                    WHY NOT YOU?
                  </span>
                  <span className="text-[0.65rem] sm:text-xs uppercase tracking-[0.2em] text-[#1A6BBA] font-sans mt-1 font-bold opacity-90">
                    Know Yourself <span className="text-[#3c5685] mx-1">•</span> Change Yourself
                  </span>
                </div>
                
            </Link>

            <p className="text-white/60 leading-relaxed mb-10 max-w-sm lato-regular text-sm sm:text-base border-l-2 border-[#5DBB4D] pl-4">
              An advanced psychological profiling platform designed to map your natural cognitive traits to your optimal career path. 
            </p>
            
            {/* Social Icons - Square Style */}
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 border border-[#3c5685] bg-[#0A1930] flex items-center justify-center text-white/60 hover:bg-[#5DBB4D]/10 hover:text-[#5DBB4D] hover:border-[#5DBB4D] transition-all duration-300 group">
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" className="w-12 h-12 border border-[#3c5685] bg-[#0A1930] flex items-center justify-center text-white/60 hover:bg-[#1A6BBA]/10 hover:text-[#1A6BBA] hover:border-[#1A6BBA] transition-all duration-300 group">
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="#" className="w-12 h-12 border border-[#3c5685] bg-[#0A1930] flex items-center justify-center text-white/60 hover:bg-gradient-to-br hover:from-[#1A6BBA]/20 hover:to-[#5DBB4D]/20 hover:text-[#5DBB4D] hover:border-[#5DBB4D] transition-all duration-300 group">
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-1"></div>

          {/* =========================================
              FOOTER LINKS (Right Columns)
              ========================================= */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-10 lg:pt-4">
            
            <div>
              <h4 className="text-white font-bold mb-8 tracking-[0.2em] uppercase text-xs border-l-2 border-[#5DBB4D] pl-3">Platform</h4>
              <ul className="space-y-4">
                <li><Link to="/assessment" className="text-white/60 hover:text-[#5DBB4D] transition-colors text-sm font-medium flex items-center gap-2 group"><span className="w-0 h-[1px] bg-[#5DBB4D] group-hover:w-3 transition-all"></span>Take Assessment</Link></li>
                <li><Link to="/tests" className="text-white/60 hover:text-[#5DBB4D] transition-colors text-sm font-medium flex items-center gap-2 group"><span className="w-0 h-[1px] bg-[#5DBB4D] group-hover:w-3 transition-all"></span>All Tests</Link></li>
                <li><Link to="/selection" className="text-white/60 hover:text-[#5DBB4D] transition-colors text-sm font-medium flex items-center gap-2 group"><span className="w-0 h-[1px] bg-[#5DBB4D] group-hover:w-3 transition-all"></span>Selection</Link></li>
                <li><Link to="/image-quiz" className="text-white/60 hover:text-[#5DBB4D] transition-colors text-sm font-medium flex items-center gap-2 group"><span className="w-0 h-[1px] bg-[#5DBB4D] group-hover:w-3 transition-all"></span>Image Quiz</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-8 tracking-[0.2em] uppercase text-xs border-l-2 border-[#1A6BBA] pl-3">Company</h4>
              <ul className="space-y-4">
                <li><Link to="/about" className="text-white/60 hover:text-[#1A6BBA] transition-colors text-sm font-medium flex items-center gap-2 group"><span className="w-0 h-[1px] bg-[#1A6BBA] group-hover:w-3 transition-all"></span>About Us</Link></li>
                <li><Link to="/careers" className="text-white/60 hover:text-[#1A6BBA] transition-colors text-sm font-medium flex items-center gap-2 group"><span className="w-0 h-[1px] bg-[#1A6BBA] group-hover:w-3 transition-all"></span>Careers</Link></li>
                <li><Link to="/contact" className="text-white/60 hover:text-[#1A6BBA] transition-colors text-sm font-medium flex items-center gap-2 group"><span className="w-0 h-[1px] bg-[#1A6BBA] group-hover:w-3 transition-all"></span>Contact</Link></li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h4 className="text-white font-bold mb-8 tracking-[0.2em] uppercase text-xs border-l-2 border-[#3c5685] pl-3">Legal</h4>
              <ul className="space-y-4 flex flex-row sm:flex-col flex-wrap gap-x-8 gap-y-4 sm:gap-x-0">
                <li><Link to="/privacy" className="text-white/60 hover:text-white transition-colors text-sm font-medium flex items-center gap-2 group"><span className="w-0 h-[1px] bg-white group-hover:w-3 transition-all"></span>Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-white/60 hover:text-white transition-colors text-sm font-medium flex items-center gap-2 group"><span className="w-0 h-[1px] bg-white group-hover:w-3 transition-all"></span>Terms of Service</Link></li>
                <li><Link to="/refunds" className="text-white/60 hover:text-white transition-colors text-sm font-medium flex items-center gap-2 group"><span className="w-0 h-[1px] bg-white group-hover:w-3 transition-all"></span>Refund Policy</Link></li>
              </ul>
            </div>
            
          </div>
        </div>

        {/* =========================================
            COPYRIGHT SECTION
            ========================================= */}
        <div className="border-t border-[#3c5685]/40 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left relative z-10">
          
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3 text-white/50 text-sm">
            <p>
              &copy; {new Date().getFullYear()} Why Not You. All rights reserved.
            </p>
            <span className="hidden md:block text-[#3c5685]">|</span>
            <p>
              Developed by{' '}
              <a 
                href="https://genesysltd.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/80 hover:text-[#5DBB4D] font-bold transition-colors duration-300 tracking-wide"
              >
                Genesys Tech
              </a>
            </p>
          </div>

          <p className="text-transparent bg-gradient-to-r from-[#1A6BBA] to-[#5DBB4D] bg-clip-text text-sm italic font-serif font-bold tracking-wide">
            Designed for your future.
          </p>
          
        </div>

      </div>
    </footer>
  );
};

export default Footer;