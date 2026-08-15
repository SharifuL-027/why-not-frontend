import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Hero = () => {
  const navigate = useNavigate();

  const phrases = ["meant for", "built for", "destined for", "wired for"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const sparks = [
    { id: 1, x: -260, y: -160, delay: 0 },
    { id: 2, x: 220, y: -210, delay: 0.3 },
    { id: 3, x: -160, y: 260, delay: 0.7 },
    { id: 4, x: 270, y: 110, delay: 1.1 },
    { id: 5, x: 60, y: -320, delay: 1.5 },
    { id: 6, x: 170, y: 260, delay: 0.2 },
    { id: 7, x: -300, y: 60, delay: 0.5 },
    { id: 8, x: -120, y: -270, delay: 0.9 },
  ];

  return (
    <div className="relative min-h-screen bg-[#FCFBF9] flex flex-col justify-center overflow-hidden">
      
      <motion.div 
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-0 opacity-80 mix-blend-multiply" 
        style={{
          backgroundImage: "url('https://res.cloudinary.com/wtbwxhmc/image/upload/v1786793235/Abstract_mind_with_neural_pathways_202608131529_h2nq0s.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'right center',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, transparent 15%, black 75%)',
          maskImage: 'linear-gradient(to right, transparent 0%, transparent 15%, black 75%)',
        }}
      />

      <div className="hidden lg:flex absolute inset-y-0 right-[5%] xl:right-[10%] w-125 items-center justify-center pointer-events-none z-0">
        
        {[0, 1, 2].map((i) => (
          <motion.div
            key={`ring-${i}`}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 2.5, opacity: [0, 0.4, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 1.3,
              ease: "easeOut",
            }}
            className="absolute w-48 h-48 rounded-full border border-[#1A6BBA]/40"
          />
        ))}

        {sparks.map((spark) => (
          <motion.div
            key={spark.id}
            initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
            animate={{ 
              x: spark.x, 
              y: spark.y, 
              scale: [0, 2, 0], 
              opacity: [0, 1, 0] 
            }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity, 
              delay: spark.delay,
              ease: "circOut" 
            }}
            className="absolute w-1.5 h-1.5 bg-[#5DBB4D] rounded-full shadow-[0_0_12px_3px_rgba(93,187,77,0.6)]"
          />
        ))}
      </div>

      <div className="absolute top-0 left-0 w-150 h-150 bg-[#1A6BBA]/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="absolute bottom-0 right-1/4 w-125 h-125 bg-[#5DBB4D]/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 xl:px-32">
        
        <div className="w-full max-w-4xl flex flex-col items-start text-left">
          
          <motion.h1 
            initial={{ opacity: 0, y: -80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="text-4xl sm:text-5xl lg:text-7xl playfair-display-bold text-[#0A1930] tracking-tight mb-6 flex flex-wrap items-center gap-x-3"
          >
            <span>Discover the career you</span>
            <br className="hidden sm:block w-full" />
            <span>were</span>
            
            <span className="inline-block min-w-[280px]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -25 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="inline-block bg-gradient-to-r from-[#1A6BBA] to-[#5DBB4D] bg-clip-text text-transparent pb-2"
                >
                  {phrases[index]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: -80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
            className="text-lg sm:text-xl lato-regular text-[#0A1930]/70 mb-10 leading-relaxed w-full lg:w-3/5"
          >
            Stop guessing about your future. Answer our structured psychological assessment and get a personalized career roadmap analyzed by our advanced expert system.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: -80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
          >
            <button 
              onClick={() => navigate('/assessment')}
              className="bg-gradient-to-r from-[#1A6BBA] to-[#5DBB4D] text-white px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-[0_8px_20px_rgba(26,107,186,0.2)] hover:shadow-[0_12px_25px_rgba(93,187,77,0.3)]"
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