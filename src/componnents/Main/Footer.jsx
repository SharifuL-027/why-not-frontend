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
{/* Minimalist Square Social Buttons */}
<div className="flex gap-3">
  {/* WhatsApp */}
  <a 
    href="https://wa.me/8801711902441" 
    target="_blank"
    rel="noopener noreferrer"
    aria-label="WhatsApp"
    className="w-11 h-11 border border-[#EFECE5] bg-white text-[#222222] flex items-center justify-center hover:border-[#A38771] hover:text-[#A38771] hover:bg-[#F9F6F0] transition-all duration-300 rounded-sm shadow-xs group"
  >
    <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  </a>

  {/* Facebook */}
  <a 
    href="https://www.facebook.com/WHYNOTYOU.PSY?mibextid=ZbWKwL" 
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Facebook"
    className="w-11 h-11 border border-[#EFECE5] bg-white text-[#222222] flex items-center justify-center hover:border-[#A38771] hover:text-[#A38771] hover:bg-[#F9F6F0] transition-all duration-300 rounded-sm shadow-xs group"
  >
    <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  </a>

  {/* Instagram */}
  <a 
    href="https://www.instagram.com/whynotyou.psy?igsh=YzljYTk1ODg3Zg==" 
    target="_blank"
    rel="noopener noreferrer"
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
                  <Link to="/tests" className="text-[#4A4A4A] hover:text-[#222222] transition-colors text-sm flex items-center gap-2 group">
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
                    Intelligence Assessment
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
                  <Link to="/arttherapy" className="text-[#4A4A4A] hover:text-[#222222] transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-0 h-[1px] bg-[#A38771] group-hover:w-3 transition-all duration-300" />
                    Art Therapy
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