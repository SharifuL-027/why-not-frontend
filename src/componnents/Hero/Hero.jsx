// src/components/Hero.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-slate-900 flex items-center overflow-hidden">
      
      {/* Subtle dark background glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white tracking-tight mb-8"
        >
          Discover the career you <br/>
          were <span className="text-teal-400">meant for.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl text-gray-300 max-w-2xl mx-auto mb-10"
        >
          Stop guessing about your future. Answer our structured psychological assessment and get a personalized career roadmap analyzed by two professional doctors.
        </motion.p>

        <motion.button 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          onClick={() => navigate('/assessment')}
          className="bg-teal-500 text-slate-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-teal-400 shadow-lg shadow-teal-500/30 transition-all duration-300 transform hover:-translate-y-1"
        >
          Start Your Assessment
        </motion.button>
      </div>
    </div>
  );
};

export default Hero;