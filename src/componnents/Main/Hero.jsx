import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Hero = () => {
  const navigate = useNavigate();

  // 1. Array of words to cycle through
  const phrases = ["meant for", "built for", "destined for", "wired for"];
  const [index, setIndex] = useState(0);

  // 2. Set interval to change the word every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Define the coordinates and delays for the "shooting sparks" coming from the brain
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
    <div className="relative min-h-screen bg-[#FBF6F4] flex flex-col justify-center overflow-hidden">
      
      {/* 
        Background Image Layer 
        - Increased opacity to 90% so the image is much more visible
        - Adjusted gradient mask to reveal more of the right side
      */}
      <motion.div 
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-0 opacity-90 mix-blend-multiply" 
        style={{
          backgroundImage: "url('https://res.cloudinary.com/wtbwxhmc/image/upload/v1786785619/Gemini_Generated_Image_25ye6q25ye6q25ye_hxuhjj.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'right center',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, transparent 15%, black 75%)',
          maskImage: 'linear-gradient(to right, transparent 0%, transparent 15%, black 75%)',
        }}
      />

      {/* NEURAL BRAIN EFFECTS CONTAINER */}
      <div className="hidden lg:flex absolute inset-y-0 right-[5%] xl:right-[10%] w-125 items-center justify-center pointer-events-none z-0">
        
        {/* Expanding Neural Rings */}
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
            className="absolute w-48 h-48 rounded-full border border-[#B98286]/60"
          />
        ))}

        {/* Shooting Neural Sparks - Increased scale to [0, 2, 0] for higher visibility */}
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
            className="absolute w-1.5 h-1.5 bg-[#B98286] rounded-full shadow-[0_0_12px_3px_rgba(185,130,134,0.8)]"
          />
        ))}
      </div>

      {/* Soft Ambient Warmth */}
      <div className="absolute top-0 left-0 w-175 h-175 bg-[#E8D4D0]/40 rounded-full blur-[120px] pointer-events-none z-0"></div>
      
      {/* Main Content Container */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 xl:px-32">
        
        <div className="w-full max-w-4xl flex flex-col items-start text-left">
          
          <motion.h1 
            initial={{ opacity: 0, y: -80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="text-4xl sm:text-5xl lg:text-7xl playfair-display-bold text-[#352B2D] tracking-tight mb-6"
          >
            Discover the career you <br className="hidden sm:block" />
            were{' '}
            {/* Animated Word Cycler */}
            <span className="text-[#B98286] inline-block min-w-70">
              <AnimatePresence mode="wait">
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -25 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="inline-block"
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
            className="text-lg sm:text-xl lato-regular text-[#633F45]/80 mb-10 leading-relaxed w-full lg:w-3/5"
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
              className="bg-[#633F45] text-[#FBF6F4] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#B98286] hover:scale-105 transition-all duration-300 shadow-[0_8px_20px_rgba(99,63,69,0.15)] hover:shadow-[0_12px_25px_rgba(185,130,134,0.3)]"
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