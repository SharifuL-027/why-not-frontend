import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-[#0a0f16] flex items-center overflow-hidden">
      
      {/* 3D Background Image Layer with Slow Zoom Animation */}
      <motion.div 
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
        className="absolute inset-0 z-0 opacity-30 bg-fixed"
        style={{
          backgroundImage: "url('https://res.cloudinary.com/kpuio2i4/image/upload/v1786613825/Abstract_mind_with_neural_pathways_202608131529_w0zxgn.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed', 
        }}
      />

      {/* Sophisticated Ambient Background Effects (Muted Slate and Soft Teal instead of Neon Blue) */}
      <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-slate-800/30 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-teal-900/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full -mt-10">
        
        {/* Wrapper to keep text aligned left */}
        <div className="max-w-3xl text-left">
          
          {/* Animated Headline - Removed heavy drop shadow, using a softer off-white and elegant teal */}
          <motion.h1 
            initial={{ opacity: 0, x: -150 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#f8fafc] tracking-tight mb-6"
          >
            Discover the career you <br/>
            were <span className="text-teal-400 font-medium">meant for.</span>
          </motion.h1>

          {/* Animated Subtext - Using a cleaner slate gray */}
          <motion.p 
            initial={{ opacity: 0, x: -150 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
            className="text-lg sm:text-xl text-slate-400 mb-10 leading-relaxed max-w-2xl"
          >
            Stop guessing about your future. Answer our structured psychological assessment and get a personalized career roadmap analyzed by two professional doctors.
          </motion.p>

          {/* Animated CTA Button - Changed to a crisp, solid premium white button */}
          <motion.button 
            initial={{ opacity: 0, x: -150 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
            onClick={() => navigate('/assessment')}
            className="bg-white text-slate-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-sm"
          >
            Start Your Assessment
          </motion.button>
          
        </div>
      </div>
    </div>
  );
};

export default Hero;