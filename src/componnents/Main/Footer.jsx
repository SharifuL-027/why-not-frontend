import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#F9F6F0] relative overflow-hidden pt-20 pb-10 border-t border-[#EFECE5] lg:pl-[50px] w-full flex flex-col font-sans">
      
      {/* Subtle Warm Ambient Backdrop Glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#EFECE5]/60 rounded-full blur-[140px] pointer-events-none -translate-y-1/2 z-0" />
      <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-[#EAEFF0]/50 rounded-full blur-[120px] pointer-events-none translate-y-1/3 z-0" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 xl:px-24 relative z-10 w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* =========================================
              BRANDING & SOCIALS (Left Column)
              ========================================= */}
          <div className="lg:col-span-5">
            
            {/* Logo matching the refined header */}
            <Link to="/" className="flex items-center gap-4 mb-6 w-max group">
              <img 
                src="https://res.cloudinary.com/dsrs8hryx/image/upload/v1790161331/WhatsApp_Image_2026-08-17_at_12.05.48_AM-removebg-preview_o66w0p.png" 
                alt="Why Not You Logo" 
                className="h-14 sm:h-16 w-auto object-contain group-hover:scale-105 transition-transform duration-500 shrink-0" 
              />
              
              <div className="flex flex-col">
                <span className="font-serif font-bold text-2xl sm:text-3xl tracking-tight text-[#222222] group-hover:text-[#A38771] transition-colors duration-300">
                  WHY NOT YOU?
                </span>
                <span className="text-[0.65rem] sm:text-xs uppercase tracking-[0.2em] text-[#A38771] font-sans mt-0.5 font-bold">
                  Know Yourself <span className="text-[#C8D0C0] mx-1">•</span> Change Yourself
                </span>
              </div>
            </Link>

            <p className="text-[#4A4A4A] leading-relaxed mb-8 max-w-sm text-sm sm:text-base border-l-2 border-[#A38771] pl-4">
              An evidence-based psychological profiling and counseling sanctuary designed to align cognitive patterns with genuine personal clarity.
            </p>
            
            {/* Minimalist Square Social Buttons */}
            <div className="flex gap-3">
              <a 
                href="#" 
                aria-label="X (Twitter)"
                className="w-11 h-11 border border-[#EFECE5] bg-white text-[#222222] flex items-center justify-center hover:border-[#A38771] hover:text-[#A38771] hover:bg-[#F9F6F0] transition-all duration-300 rounded-sm shadow-xs group"
              >
                <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              <a 
                href="#" 
                aria-label="LinkedIn"
                className="w-11 h-11 border border-[#EFECE5] bg-white text-[#222222] flex items-center justify-center hover:border-[#A38771] hover:text-[#A38771] hover:bg-[#F9F6F0] transition-all duration-300 rounded-sm shadow-xs group"
              >
                <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>

              <a 
                href="#" 
                aria-label="Instagram"
                className="w-11 h-11 border border-[#EFECE5] bg-white text-[#222222] flex items-center justify-center hover:border-[#A38771] hover:text-[#A38771] hover:bg-[#F9F6F0] transition-all duration-300 rounded-sm shadow-xs group"
              >
                <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-1" />

          {/* =========================================
              NAVIGATION SECTIONS (Right Columns)
              ========================================= */}
          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8 lg:pt-3">
            
            {/* Column 1: Platform */}
            <div>
              <h4 className="text-[#222222] font-bold mb-6 tracking-[0.2em] uppercase text-xs border-l-2 border-[#A38771] pl-3">
                Platform
              </h4>
              <ul className="space-y-3.5">
                <li>
                  <Link to="/assessment" className="text-[#4A4A4A] hover:text-[#222222] transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-0 h-[1px] bg-[#A38771] group-hover:w-3 transition-all duration-300" />
                    Take Assessment
                  </Link>
                </li>
                <li>
                  <Link to="/tests" className="text-[#4A4A4A] hover:text-[#222222] transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-0 h-[1px] bg-[#A38771] group-hover:w-3 transition-all duration-300" />
                    All Tests
                  </Link>
                </li>
                <li>
                  <Link to="/selection" className="text-[#4A4A4A] hover:text-[#222222] transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-0 h-[1px] bg-[#A38771] group-hover:w-3 transition-all duration-300" />
                    Selection
                  </Link>
                </li>
                <li>
                  <Link to="/image-quiz" className="text-[#4A4A4A] hover:text-[#222222] transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-0 h-[1px] bg-[#A38771] group-hover:w-3 transition-all duration-300" />
                    Image Quiz
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Column 2: Practice */}
            <div>
              <h4 className="text-[#222222] font-bold mb-6 tracking-[0.2em] uppercase text-xs border-l-2 border-[#A38771] pl-3">
                Practice
              </h4>
              <ul className="space-y-3.5">
                <li>
                  <Link to="/about" className="text-[#4A4A4A] hover:text-[#222222] transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-0 h-[1px] bg-[#A38771] group-hover:w-3 transition-all duration-300" />
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/careers" className="text-[#4A4A4A] hover:text-[#222222] transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-0 h-[1px] bg-[#A38771] group-hover:w-3 transition-all duration-300" />
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-[#4A4A4A] hover:text-[#222222] transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-0 h-[1px] bg-[#A38771] group-hover:w-3 transition-all duration-300" />
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Legal */}
            <div className="col-span-2 sm:col-span-1">
              <h4 className="text-[#222222] font-bold mb-6 tracking-[0.2em] uppercase text-xs border-l-2 border-[#A38771] pl-3">
                Legal
              </h4>
              <ul className="space-y-3.5 flex flex-row sm:flex-col flex-wrap gap-x-6 gap-y-3 sm:gap-x-0">
                <li>
                  <Link to="/privacy" className="text-[#4A4A4A] hover:text-[#222222] transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-0 h-[1px] bg-[#A38771] group-hover:w-3 transition-all duration-300" />
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-[#4A4A4A] hover:text-[#222222] transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-0 h-[1px] bg-[#A38771] group-hover:w-3 transition-all duration-300" />
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/refunds" className="text-[#4A4A4A] hover:text-[#222222] transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-0 h-[1px] bg-[#A38771] group-hover:w-3 transition-all duration-300" />
                    Refund Policy
                  </Link>
                </li>
              </ul>
            </div>
            
          </div>
        </div>

        {/* =========================================
            BOTTOM DIVIDER & COPYRIGHT
            ========================================= */}
        <div className="border-t border-[#EFECE5] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left relative z-10 text-xs sm:text-sm text-[#4A4A4A]">
          
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
            <p>
              &copy; {new Date().getFullYear()} Why Not You. All rights reserved.
            </p>
            <span className="hidden sm:inline text-[#EFECE5]">|</span>
            <p>
              Developed by{' '}
              <a 
                href="https://genesysltd.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#222222] font-semibold hover:text-[#A38771] transition-colors tracking-wide underline underline-offset-4 decoration-[#EFECE5]"
              >
                Genesys Tech
              </a>
            </p>
          </div>

          <p className="font-serif italic text-[#A38771] tracking-wide text-sm">
            Calm, light, quietly refined.
          </p>
          
        </div>

      </div>
    </footer>
  );
};

export default Footer;