import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Premium Leaf Loading Spinner with Blue-Green Gradient
const LoadingStepLeaf = ({ number }) => {
  return (
    <div className="relative w-20 h-20 flex items-center justify-center mx-auto mb-6 group">
      <svg 
        // 10s rotation for a calm, natural spinning effect
        className="absolute inset-0 w-full h-full animate-[spin_10s_linear_infinite]" 
        viewBox="0 0 100 100"
      >
        <defs>
          {/* Blue to Green Gradient Definition */}
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
      
      {/* Background glow that appears on hover */}
      <div className="absolute inset-2 rounded-full bg-gradient-to-br from-[#1A6BBA]/5 to-[#5DBB4D]/5 group-hover:from-[#1A6BBA]/20 group-hover:to-[#5DBB4D]/20 transition-colors duration-500"></div>
      
      {/* Number with Blue-Green Gradient Text */}
      <span className="relative z-10 font-bold text-2xl font-serif bg-gradient-to-r from-[#1A6BBA] to-[#5DBB4D] bg-clip-text text-transparent">
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
    <section className="bg-[#0A1930] py-32 relative overflow-hidden flex flex-col">
      
      {/* =========================================
          BACKGROUND IMAGE & DUAL GLOW
          ========================================= */}
      <div 
        className="absolute inset-0 z-0 opacity-15"
        style={{
          // আপনার জেনারেট করা ব্যানার ইমেজ
          backgroundImage: "url('/watermarked_img_2708617221946330444.jpg')", 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed', 
        }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0A1930] via-[#0A1930]/80 to-[#0A1930]" />
      
      {/* Blue Glow on Left, Green Glow on Right */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#1A6BBA]/15 rounded-full blur-[150px] pointer-events-none z-0 -translate-x-1/2"></div>
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-[#5DBB4D]/10 rounded-full blur-[150px] pointer-events-none z-0 translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-20 flex flex-col items-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl text-white mb-6 tracking-tight font-serif drop-shadow-md"
          >
            Why not you?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs sm:text-sm uppercase tracking-[0.25em] font-bold bg-gradient-to-r from-[#1A6BBA] to-[#5DBB4D] bg-clip-text text-transparent"
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
              className="bg-[#132644]/90 backdrop-blur-md border border-[#3c5685]/40 p-8 shadow-xl hover:border-[#5DBB4D]/40 hover:-translate-y-2 transition-all duration-300 group flex flex-col items-center text-center relative overflow-hidden rounded-sm"
            >
              {/* Subtle hover glow inside the card */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#1A6BBA]/0 to-[#5DBB4D]/0 group-hover:to-[#5DBB4D]/5 transition-colors duration-500"></div>

              <LoadingStepLeaf number={step.id} />
              
              <h3 className="text-xl font-bold text-white mb-4 font-serif tracking-wide group-hover:text-[#5DBB4D] transition-colors relative z-10">
                {step.title}
              </h3>
              
              <p className="text-sm text-white/70 leading-relaxed lato-regular relative z-10">
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
            className="relative overflow-hidden bg-gradient-to-r from-[#1A6BBA] to-[#5DBB4D] text-white font-bold text-base sm:text-lg py-4 px-10 shadow-[0_10px_30px_rgba(26,107,186,0.3)] hover:shadow-[0_10px_40px_rgba(93,187,77,0.5)] transition-all duration-300 flex justify-center items-center gap-4 group uppercase tracking-widest border border-transparent hover:border-white/20 rounded-sm"
          >
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300"></div>
            
            <span className="relative z-10">Start Your Journey</span>
            <svg 
              className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default HowItWorks;