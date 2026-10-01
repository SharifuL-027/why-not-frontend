import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Premium Leaf Loading Spinner with Original Blue-Green Gradient
const LoadingStepLeaf = ({ number }) => {
  return (
    <div className="relative w-20 h-20 flex items-center justify-center mx-auto mb-6 group">
      <svg 
        // 10s rotation for a calm, natural spinning effect
        className="absolute inset-0 w-full h-full animate-[spin_10s_linear_infinite]" 
        viewBox="0 0 100 100"
      >
        <defs>
          {/* Original Blue to Green Gradient Definition */}
          <linearGradient id={`leafGradient-${number}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1A6BBA" />   {/* Blue */}
            <stop offset="100%" stopColor="#5DBB4D" /> {/* Green */}
          </linearGradient>
        </defs>

        <g fill={`url(#leafGradient-${number})`}>
          {/* 4 Beautiful Leaves placed around the circle */}
          {[0, 90, 180, 270].map((angle) => (
            <path 
              key={angle}
              transform={`rotate(${angle} 50 50)`}
              // A customized beautiful leaf shape
              d="M 50 5 C 60 14, 60 25, 50 32 C 40 25, 40 14, 50 5 Z" 
            />
          ))}
          
          {/* Subtle connecting circular vine */}
          <circle 
            cx="50" cy="50" r="34" 
            fill="none" 
            stroke={`url(#leafGradient-${number})`} 
            strokeWidth="1.5" 
            strokeOpacity="0.4"
          />
          
          {/* Small decorative nature dots between the leaves */}
          {[45, 135, 225, 315].map((angle) => (
             <circle 
               key={angle} 
               transform={`rotate(${angle} 50 50)`} 
               cx="50" cy="16" r="2.5" 
               fill={`url(#leafGradient-${number})`}
               opacity="0.8"
             />
          ))}
        </g>
      </svg>
      
      {/* Background glow that appears on hover - Soft Blue-Green tone */}
      <div className="absolute inset-2 rounded-full bg-gradient-to-br from-[#1A6BBA]/0 to-[#5DBB4D]/0 group-hover:from-[#1A6BBA]/10 group-hover:to-[#5DBB4D]/10 transition-colors duration-500"></div>
      
      {/* Number with Dark Charcoal Text for clean readability */}
      <span className="relative z-10 font-bold text-2xl font-serif text-[#2C3338]">
        {number}
      </span>
    </div>
  );
};

const HowItWorks = () => {
  const navigate = useNavigate();

  const steps = [
    {
      id: 1,
      title: "Know Yourself",
      description: "Begin with a deep psychological assessment to uncover your hidden strengths, traits, and true potential."
    },
    {
      id: 2,
      title: "Analyze & Reflect",
      description: "Our advanced system evaluates your responses, providing clear insights into who you are right now."
    },
    {
      id: 3,
      title: "Chart the Path",
      description: "Receive a personalized roadmap detailing the specific steps required to evolve and grow professionally."
    },
    {
      id: 4,
      title: "Change Yourself",
      description: "Take actionable steps towards becoming the best version of yourself. If others can, why not you?"
    }
  ];

  return (
    // Base Background changed to Morning Ivory
    <section className="bg-[#FAF7F2] py-32 relative overflow-hidden flex flex-col">
      
      {/* =========================================
          BACKGROUND IMAGE & DUAL GLOW (Light Theme)
          ========================================= */}
      <div 
        className="absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage: "url('/watermarked_img_2708617221946330444.jpg')", 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed', 
        }}
      />
      {/* Light overlay to wash out the background image into Morning Ivory */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#FAF7F2] via-[#FAF7F2]/85 to-[#FAF7F2]" />
      
      {/* Soft Horizon (Blue-Grey) Glow on Left, Blush Dawn (Warm) Glow on Right */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#EAEFF0]/80 rounded-full blur-[150px] pointer-events-none z-0 -translate-x-1/2"></div>
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-[#F0EBE6]/80 rounded-full blur-[150px] pointer-events-none z-0 translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-20 flex flex-col items-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl text-[#2C3338] mb-4 tracking-tight font-serif drop-shadow-sm"
          >
            Why not you?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            // Subtitle changed to Linen Clay for a premium accent
            className="text-xs sm:text-sm uppercase tracking-[0.25em] font-bold text-[#D4BCA6]"
          >
            Change yourself and become a better version of yours
          </motion.p>
        </div>

        {/* Steps Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-24">
          {steps.map((step, index) => (
            <motion.div 
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              // Light Cards: White with slight transparency, Sage Mist border
              className="bg-white/70 backdrop-blur-md border border-[#C8D0C0]/50 p-8 shadow-sm hover:border-[#D4BCA6] hover:-translate-y-2 transition-all duration-300 group flex flex-col items-center text-center relative overflow-hidden rounded-sm"
            >
              {/* Subtle hover glow inside the card */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#C8D0C0]/0 to-[#D4BCA6]/0 group-hover:to-[#D4BCA6]/10 transition-colors duration-500"></div>

              {/* The Blue-Green Animated Leaf Component */}
              <LoadingStepLeaf number={step.id} />
              
              <h3 className="text-xl font-bold text-[#2C3338] mb-4 font-serif tracking-wide group-hover:text-[#D4BCA6] transition-colors relative z-10">
                {step.title}
              </h3>
              
              <p className="text-sm text-[#596573] leading-relaxed font-light relative z-10">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Action Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-center"
        >
          <button 
            onClick={() => navigate('/assessment')}
            // Solid Sage Mist Button matching the Hero section
            className="bg-[#C8D0C0] text-[#2C3338] px-10 py-4 rounded-sm font-medium text-sm sm:text-base uppercase tracking-widest hover:bg-[#b5bead] hover:scale-105 transition-all duration-300 shadow-[0_8px_20px_rgba(200,208,192,0.3)] hover:shadow-[0_12px_25px_rgba(200,208,192,0.5)] flex justify-center items-center gap-3"
          >
            <span>Start Your Journey</span>
            <svg 
              className="w-5 h-5 transition-transform" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default HowItWorks;