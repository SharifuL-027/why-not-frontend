import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    // Navy Blue Background with top border for separation
    <footer className="bg-[#0A1930] relative overflow-hidden pt-20 pb-8 border-t border-[#3c5685]/30">
      
      {/* Subtle Background Glows (Blue & Gold) */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#1A6BBA]/10 rounded-full blur-[150px] pointer-events-none -translate-x-1/3 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#ffba12]/5 rounded-full blur-[120px] pointer-events-none translate-x-1/4 translate-y-1/4"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 xl:px-24 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* =========================================
              BRANDING & SOCIALS (Left Column)
              ========================================= */}
          <div className="lg:col-span-4">
            
           {/* Logo matching the Navbar style */}
<Link to="/" className="flex items-center gap-4 mb-8 w-max group">
    
    {/* 1. Logo Image (Here h-16 or h-20 makes it bigger) */}
    <img 
      src="https://res.cloudinary.com/dsrs8hryx/image/upload/v1790161331/WhatsApp_Image_2026-08-17_at_12.05.48_AM-removebg-preview_o66w0p.png" 
      alt="Why Not You Logo" 
      className="h-16 sm:h-20 w-auto object-contain group-hover:opacity-90 transition-opacity shrink-0" 
    />
    
    {/* 2. Brand Name & Tagline */}
    <div className="flex flex-col">
      <span className="font-serif font-bold text-2xl sm:text-3xl tracking-tight text-white">
        WHY NOT YOU?
      </span>
      <span className="text-[0.65rem] sm:text-xs uppercase tracking-[0.2em] text-[#ffba12] font-sans mt-1 font-normal opacity-90">
        Know Yourself • Change Yourself
      </span>
    </div>
    
  </Link>

  <p className="text-white/60 leading-relaxed mb-8 max-w-sm lato-regular text-sm sm:text-base">
    An advanced psychological profiling platform designed to map your natural cognitive traits to your optimal career path. 
  </p>
            
            {/* Social Icons */}
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-[#3c5685]/50 bg-[#0A1930] flex items-center justify-center text-white/70 hover:bg-[#ffba12] hover:text-[#0A1930] hover:border-[#ffba12] hover:-translate-y-1 transition-all duration-300">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-[#3c5685]/50 bg-[#0A1930] flex items-center justify-center text-white/70 hover:bg-[#ffba12] hover:text-[#0A1930] hover:border-[#ffba12] hover:-translate-y-1 transition-all duration-300">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-[#3c5685]/50 bg-[#0A1930] flex items-center justify-center text-white/70 hover:bg-[#ffba12] hover:text-[#0A1930] hover:border-[#ffba12] hover:-translate-y-1 transition-all duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
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
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-10">
            
            <div>
              <h4 className="text-white font-bold mb-6 tracking-widest uppercase text-xs">Platform</h4>
              <ul className="space-y-4">
                <li><Link to="/assessment" className="text-white/60 hover:text-[#ffba12] transition-colors text-sm font-medium">Take Assessment</Link></li>
                <li><Link to="/tests" className="text-white/60 hover:text-[#ffba12] transition-colors text-sm font-medium">All Tests</Link></li>
                <li><Link to="/selection" className="text-white/60 hover:text-[#ffba12] transition-colors text-sm font-medium">Selection</Link></li>
                <li><Link to="/image-quiz" className="text-white/60 hover:text-[#ffba12] transition-colors text-sm font-medium">Image Quiz</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6 tracking-widest uppercase text-xs">Company</h4>
              <ul className="space-y-4">
                <li><Link to="/about" className="text-white/60 hover:text-[#ffba12] transition-colors text-sm font-medium">About Us</Link></li>
                <li><Link to="/careers" className="text-white/60 hover:text-[#ffba12] transition-colors text-sm font-medium">Careers</Link></li>
                <li><Link to="/contact" className="text-white/60 hover:text-[#ffba12] transition-colors text-sm font-medium">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 tracking-widest uppercase text-xs">Legal</h4>
              <ul className="space-y-4">
                <li><Link to="/privacy" className="text-white/60 hover:text-[#ffba12] transition-colors text-sm font-medium">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-white/60 hover:text-[#ffba12] transition-colors text-sm font-medium">Terms of Service</Link></li>
                <li><Link to="/refunds" className="text-white/60 hover:text-[#ffba12] transition-colors text-sm font-medium">Refund Policy</Link></li>
              </ul>
            </div>
            
          </div>
        </div>

        {/* =========================================
            COPYRIGHT SECTION
            ========================================= */}
        <div className="border-t border-[#3c5685]/30 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3 text-white/50 text-sm">
            <p>
              &copy; {new Date().getFullYear()} Why not you. All rights reserved.
            </p>
            <span className="hidden md:block text-white/30">|</span>
            <p>
              Developed by{' '}
              <a 
                href="https://genesysltd.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/80 hover:text-[#ffba12] font-semibold transition-colors duration-300 tracking-wide"
              >
                Genesys Tech
              </a>
            </p>
          </div>

          <p className="text-[#ffba12]/80 text-sm italic font-serif">
            Designed for your future.
          </p>
          
        </div>

      </div>
    </footer>
  );
};

export default Footer;