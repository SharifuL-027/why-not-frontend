import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = () => {
  const navigate = useNavigate();

  // Define the coordinates and delays for the "shooting sparks" coming from the brain
  const sparks = [
    { id: 1, x: -250, y: -150, delay: 0 },
    { id: 2, x: 200, y: -200, delay: 0.4 },
    { id: 3, x: -150, y: 250, delay: 0.8 },
    { id: 4, x: 250, y: 100, delay: 1.2 },
    { id: 5, x: 50, y: -300, delay: 1.6 },
    { id: 6, x: 150, y: 250, delay: 0.2 },
    { id: 7, x: -280, y: 50, delay: 0.6 },
    { id: 8, x: -100, y: -250, delay: 1.0 },
  ];

  return (
    // Removed mt-20 and restored min-h-screen so it starts at the very top of the browser, behind the navbar
    <div className="relative min-h-screen bg-[#0a0f16] flex flex-col justify-center overflow-hidden">
      
      {/* Background Image Layer */}
      <motion.div 
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-0 opacity-40" 
        style={{
          backgroundImage: "url('https://res.cloudinary.com/kpuio2i4/image/upload/v1786613825/Abstract_mind_with_neural_pathways_202608131529_w0zxgn.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* NEURAL BRAIN EFFECTS CONTAINER */}
      <div className="hidden lg:flex absolute inset-y-0 right-[5%] xl:right-[10%] w-125 items-center justify-center pointer-events-none z-0">
        
        {/* Expanding Neural Rings */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={`ring-${i}`}
            initial={{ scale: 0.2, opacity: 0 }}
            animate={{ scale: 2, opacity: [0, 0.4, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 1.3,
              ease: "easeOut",
            }}
            className="absolute w-48 h-48 rounded-full border border-teal-500/30"
          />
        ))}

        {/* Shooting Neural Sparks */}
        {sparks.map((spark) => (
          <motion.div
            key={spark.id}
            initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
            animate={{ 
              x: spark.x, 
              y: spark.y, 
              scale: [0, 1.5, 0], 
              opacity: [0, 1, 0] 
            }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity, 
              delay: spark.delay,
              ease: "easeOut" 
            }}
            className="absolute w-1.5 h-1.5 bg-teal-400 rounded-full shadow-[0_0_15px_2px_rgba(45,212,191,0.8)]"
          />
        ))}
      </div>

      {/* Subtle Lighting */}
      <div className="absolute top-0 left-0 w-175 h-175 bg-slate-800/30 rounded-full blur-[150px] pointer-events-none z-0"></div>
      
      {/* Main Content Container - Pinned to the Left Edge */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 xl:px-32">
        
        <div className="w-full max-w-4xl flex flex-col items-start text-left">
          
          <motion.h1 
            initial={{ opacity: 0, y: -80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="text-4xl sm:text-4xl lg:text-6xl playfair-bold text-[#f8fafc] tracking-tight mb-6"
          >
            Discover the career you
            were <span className="text-teal-400">meant for</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: -80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
            className="text-lg sm:text-xl lato-regular text-slate-400 mb-10 leading-relaxed w-full lg:w-4/5"
          >
            Stop guessing about your future. Answer our structured psychological assessment and get a personalized career roadmap analyzed by two professional doctors.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: -80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
          >
            <button 
              onClick={() => navigate('/assessment')}
              className="bg-white text-slate-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-sm"
            >
              Start Your Assessment
            </button>
          </motion.div>
          
        </div>
      </div>
    </div>
  );
};

export default Hero;