import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#633F45] relative overflow-hidden pt-32 pb-8 mt-12">
      
      {/* Abstract Ambient Glows (Using Dusty Rose and Accent) */}
      <div className="absolute top-0 left-0 w-150 h-150 bg-[#B98286]/20 rounded-full blur-[150px] pointer-events-none -translate-x-1/3 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-125 h-125 bg-[#E8D4D0]/10 rounded-full blur-[120px] pointer-events-none translate-x-1/4 translate-y-1/4"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Colorful Floating CTA Banner (Using Primary Dusty Rose) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-[#B98286] rounded-3xl p-10 md:p-14 mb-24 flex flex-col md:flex-row items-center justify-between gap-8 shadow-[0_20px_40px_rgba(53,43,45,0.2)] relative overflow-hidden"
        >
          {/* Subtle pattern/overlay inside the CTA */}
          <div className="absolute inset-0 bg-[#352B2D]/5 mix-blend-overlay pointer-events-none"></div>
          
          <div className="relative z-10 max-w-xl text-center md:text-left">
            <h3 className="text-3xl md:text-4xl font-bold text-[#FBF6F4] font-serif mb-4 tracking-tight">
              Ready to stop guessing?
            </h3>
            <p className="text-[#FBF6F4]/90 text-lg">
              Take the first step toward a career that actually aligns with your cognitive strengths.
            </p>
          </div>
          
          <div className="relative z-10 shrink-0">
            <button 
              onClick={() => navigate('/assessment')}
              className="bg-[#FBF6F4] text-[#633F45] px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:scale-105 hover:shadow-xl transition-all duration-300"
            >
              Start Your Assessment
            </button>
          </div>
        </motion.div>

        {/* Footer Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          {/* Brand & Social Section */}
          <div className="md:col-span-4">
            <Link to="/" className="font-sans font-bold text-3xl tracking-tight text-[#FBF6F4] mb-6 inline-block">
              Why not <span className="text-[#B98286] font-medium">you</span>
            </Link>
            <p className="text-[#E8D4D0]/80 leading-relaxed mb-8 max-w-sm">
              An advanced psychological profiling platform designed to map your natural cognitive traits to your optimal career path.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-4">
              {/* X / Twitter */}
              <a href="#" className="w-10 h-10 rounded-full bg-[#E8D4D0]/10 flex items-center justify-center text-[#FBF6F4] hover:bg-[#B98286] hover:-translate-y-1 transition-all duration-300">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="#" className="w-10 h-10 rounded-full bg-[#E8D4D0]/10 flex items-center justify-center text-[#FBF6F4] hover:bg-[#B98286] hover:-translate-y-1 transition-all duration-300">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a href="#" className="w-10 h-10 rounded-full bg-[#E8D4D0]/10 flex items-center justify-center text-[#FBF6F4] hover:bg-[#B98286] hover:-translate-y-1 transition-all duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>

          {/* Spacer for Desktop */}
          <div className="hidden md:block md:col-span-1"></div>

          {/* Quick Links */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            
            {/* Column 1 */}
            <div>
              <h4 className="text-[#FBF6F4] font-semibold mb-6 tracking-wider uppercase text-xs">Platform</h4>
              <ul className="space-y-4">
                <li><Link to="/assessment" className="text-[#E8D4D0]/70 hover:text-[#B98286] transition-colors text-sm">Take Assessment</Link></li>
                <li><Link to="/how-it-works" className="text-[#E8D4D0]/70 hover:text-[#B98286] transition-colors text-sm">How It Works</Link></li>
                <li><Link to="/our-doctors" className="text-[#E8D4D0]/70 hover:text-[#B98286] transition-colors text-sm">Clinical Experts</Link></li>
                <li><Link to="/pricing" className="text-[#E8D4D0]/70 hover:text-[#B98286] transition-colors text-sm">Pricing</Link></li>
              </ul>
            </div>
            
            {/* Column 2 */}
            <div>
              <h4 className="text-[#FBF6F4] font-semibold mb-6 tracking-wider uppercase text-xs">Company</h4>
              <ul className="space-y-4">
                <li><Link to="/about" className="text-[#E8D4D0]/70 hover:text-[#B98286] transition-colors text-sm">About Us</Link></li>
                <li><Link to="/careers" className="text-[#E8D4D0]/70 hover:text-[#B98286] transition-colors text-sm">Careers</Link></li>
                <li><Link to="/contact" className="text-[#E8D4D0]/70 hover:text-[#B98286] transition-colors text-sm">Contact</Link></li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h4 className="text-[#FBF6F4] font-semibold mb-6 tracking-wider uppercase text-xs">Legal</h4>
              <ul className="space-y-4">
                <li><Link to="/privacy" className="text-[#E8D4D0]/70 hover:text-[#B98286] transition-colors text-sm">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-[#E8D4D0]/70 hover:text-[#B98286] transition-colors text-sm">Terms of Service</Link></li>
                <li><Link to="/refunds" className="text-[#E8D4D0]/70 hover:text-[#B98286] transition-colors text-sm">Refund Policy</Link></li>
              </ul>
            </div>
            
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#E8D4D0]/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#E8D4D0]/40 text-sm">
            &copy; {new Date().getFullYear()} Why not you. All rights reserved.
          </p>
          <p className="text-[#E8D4D0]/40 text-sm italic font-serif">
            Designed for your future.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;