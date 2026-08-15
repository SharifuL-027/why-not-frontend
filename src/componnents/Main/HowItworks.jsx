import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// --- Reusable Animated Circle Component ---
const LoadingStepCircle = ({ number }) => {
  return (
    <div className="relative w-16 h-16 flex items-center justify-center mx-auto mb-6">
      {/* Spinning Dashed Ring (Using Primary Dusty Rose) */}
      <svg 
        className="absolute inset-0 w-full h-full text-[#B98286] animate-[spin_8s_linear_infinite]" 
        viewBox="0 0 50 50"
      >
        <circle 
          cx="25" 
          cy="25" 
          r="22" 
          stroke="currentColor" 
          strokeWidth="3" 
          fill="none" 
          strokeDasharray="4 6" 
          strokeLinecap="round"
        />
      </svg>
      {/* Static Number in Center (Using Theme Text Color) */}
      <span className="relative z-10 text-[#352B2D] font-bold text-xl font-serif">
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
      title: "Unlock Access",
      description: "Secure your entry with a one-time payment to access our exclusive psychological career evaluation."
    },
    {
      id: 2,
      title: "The Assessment",
      description: "Answer a structured series of deep, psychology-based questions to reveal your true professional traits."
    },
    {
      id: 3,
      title: "Doctor Analysis",
      description: "Two professional doctors will carefully review your unique response patterns and psychological profile."
    },
    {
      id: 4,
      title: "Your Roadmap",
      description: "Receive a highly personalized, actionable guide detailing the exact career paths you were meant for."
    }
  ];

  return (
    // Background using the warm creamy off-white
    <section className="bg-[#ffffff] py-24 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl text-[#352B2D] mb-4 tracking-tight playfair-display-bold"
          >
            How to discover your ideal career
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs uppercase tracking-[0.25em] text-[#633F45]/80 playfair-display-bold"
          >
            YOUR JOURNEY TO PROFESSIONAL CLARITY
          </motion.p>
        </div>

        {/* Steps Grid with Dividers (Using Accent Color for Dividers) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-12 divide-y md:divide-y-0 md:divide-x divide-[#E8D4D0] mb-20">
          {steps.map((step, index) => (
            <motion.div 
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="text-center px-6 pt-8 md:pt-0"
            >
              <LoadingStepCircle number={step.id} />
              <h3 className="text-xl loto-medium text-[#352B2D] mb-3 font-serif">
                {step.title}
              </h3>
              <p className="text-sm lato-regular text-[#633F45]/80 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Call to Action Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-center"
        >
          {/* Button styled exactly like the Hero CTA */}
          <button 
            onClick={() => navigate('/assessment')}
            className="group flex items-center justify-between gap-4 bg-[#633F45] p-2 pl-6 rounded-full hover:bg-[#B98286] hover:scale-105 transition-all duration-300 shadow-[0_8px_20px_rgba(99,63,69,0.15)] hover:shadow-[0_12px_25px_rgba(185,130,134,0.3)]"
          >
            <span className="text-[#FBF6F4] font-semibold text-sm">
              Unlock Your Assessment
            </span>
            {/* Light Circle with Arrow inside the button */}
            <div className="w-8 h-8 bg-[#FBF6F4] rounded-full flex items-center justify-center text-[#633F45] group-hover:text-[#B98286] transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default HowItWorks;