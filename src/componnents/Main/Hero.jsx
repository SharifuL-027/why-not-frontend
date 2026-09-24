import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Hero = () => {
  const navigate = useNavigate();

  // --- Sidebar Menu Data ---
  const menuItems = [
    { id: '01', label: 'Home', link: '/' }, 
    { id: '02', label: 'Online Assessment', link: '/tests' },
    { id: '03', label: 'Selection & Recruitment', link: '/selection' },
    { id: '04', label: 'Online Counselling', link: '/counselling' }, // Add corresponding routes if needed
    { id: '05', label: 'For Young Generation', link: '/young-generation' },
    { id: '06', label: 'Art Therapy', link: '/art-therapy' },
    { id: '07', label: 'Psychological Awareness', link: '/awareness' },
    { id: '08', label: 'About Us & Contacts', link: '/contact' },
  ];

  // State for active menu item
  const [activeMenu, setActiveMenu] = useState('01');

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
    // Main Wrapper 
    <div className="flex flex-col lg:flex-row min-h-screen w-full bg-[#0A1930]">

      {/* =========================================
          HERO CONTENT 
          ========================================= */}
      <div className="relative flex-1 flex flex-col justify-center overflow-hidden min-h-screen">
        
        {/* Background Image with subtle breathing/moving effect */}
        <motion.div 
          animate={{ 
            scale: [1, 1.05, 1], // Subtle breathing effect
            x: [0, -10, 0]       // Slight horizontal movement
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute inset-0 z-0" 
          style={{
            backgroundImage: "url('https://res.cloudinary.com/dsrs8hryx/image/upload/q_auto,f_auto/v1790144340/Gemini_Generated_Image_6oxbb16oxbb16oxb_uwj00t.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center center', // Changed for better centering
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, transparent 5%, black 60%)', // Adjusted mask for better text readability
            maskImage: 'linear-gradient(to right, transparent 0%, transparent 5%, black 60%)',
          }}
        />

        {/* Existing Sparks & Rings (Untouched logic, adjusted position to the left) */}
        {/* poriborton: right-[5%] k right-[25%] abong xl:right-[10%] k xl:right-[30%] kora hoyeche */}
        <div className="hidden lg:flex absolute inset-y-0 right-[25%] xl:right-[30%] w-125 items-center justify-center pointer-events-none z-0">
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
        
        {/* Text Content */}
        <div className="relative z-10 w-full px-6 md:px-12 lg:px-16 xl:px-24 py-20 lg:py-0">
          <div className="w-full max-w-3xl flex flex-col items-start text-left">
            
            <motion.h1 
              initial={{ opacity: 0, y: -80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="font-semibold text-4xl sm:text-5xl lg:text-7xl playfair-display-bold text-white tracking-tight mb-4 flex flex-col gap-y-1 sm:gap-y-2" // Adjusted flex-col and gap for structure
            >
              <span className="block">Discover the career you</span>
              
              {/* Row for "were" and the animated phrase */}
              <div className="flex flex-wrap items-baseline gap-x-3 sm:gap-x-4">
                 <span>were</span>
                 <span className="inline-block min-w-40 sm:min-w-70"> {/* Min width to prevent layout shift */}
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, y: 25 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -25 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      // Removed pb-2, adjusted padding/margin for alignment
                      className="inline-block bg-linear-to-r from-[#1A6BBA] to-[#5DBB4D] bg-clip-text text-transparent pt-1 sm:pt-0" 
                    >
                      {phrases[index]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </div>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: -80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
              className="text-lg sm:text-xl lato-regular text-gray-100 mb-10 mt-2 leading-relaxed w-full lg:w-4/5" // Added mt-2 for space from heading
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
                className="bg-linear-to-r from-[#1A6BBA] to-[#5DBB4D] text-white px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-[0_8px_20px_rgba(26,107,186,0.2)] hover:shadow-[0_12px_25px_rgba(93,187,77,0.3)]"
              >
                Start Your Assessment
              </button>
            </motion.div>
            
          </div>
        </div>
      </div>

    </div>
  );
};

export default Hero;