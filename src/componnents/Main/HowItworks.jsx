import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// --- Reusable Animated Circle Component ---
const LoadingStepCircle = ({ number }) => {
  return (
    <div className="relative w-16 h-16 flex items-center justify-center mx-auto mb-6">
      {/* Spinning Dashed Ring (Using Ocean Blue) */}
      <svg 
        className="absolute inset-0 w-full h-full text-[#1A6BBA] animate-[spin_8s_linear_infinite]" 
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
      {/* Static Number in Center (Using Deep Navy) */}
      <span className="relative z-10 text-[#0A1930] font-bold text-xl font-serif">
        {number}
      </span>
    </div>
  );
};

const HowItWorks = () => {
  const navigate = useNavigate();

  // Updated Data for RIASEC & Instant Algorithm Model
  const steps = [
    {
      id: 1,
      title: "Unlock Access",
      description: "Secure your entry to access our exclusive, scientifically-backed RIASEC career evaluation platform."
    },
    {
      id: 2,
      title: "The RIASEC Assessment",
      description: "Answer a targeted series of questions to map your traits across the Holland Codes: Realistic, Investigative, Artistic, Social, Enterprising, and Conventional."
    },
    {
      id: 3,
      title: "Instant Analysis",
      description: "Our advanced expert algorithm instantly processes your unique response patterns to determine your dominant psychological working style."
    },
    {
      id: 4,
      title: "Your Roadmap",
      description: "Instantly receive a personalized, actionable guide detailing the exact roles and industries you are naturally wired for."
    }
  ];

  return (
    // Background using the watercolor cream to match the logo canvas
    <section className="bg-[#FCFBF9] py-24 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl text-[#0A1930] mb-4 tracking-tight playfair-display-bold"
          >
            How to discover your ideal career
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs uppercase tracking-[0.25em] text-[#1A6BBA] playfair-display-bold"
          >
            YOUR JOURNEY TO PROFESSIONAL CLARITY
          </motion.p>
        </div>

        {/* Steps Grid with Dividers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-12 divide-y md:divide-y-0 md:divide-x divide-[#1A6BBA]/15 mb-20">
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
              <h3 className="text-xl loto-medium text-[#0A1930] mb-3 font-serif">
                {step.title}
              </h3>
              <p className="text-sm lato-regular text-[#0A1930]/70 leading-relaxed">
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
          {/* Button utilizing the Blue-to-Green Logo Gradient */}
          <button 
            onClick={() => navigate('/assessment')}
            className="group flex items-center justify-between gap-4 bg-linear-to-r from-[#1A6BBA] to-[#5DBB4D] p-2 pl-6 rounded-full hover:scale-105 transition-all duration-300 shadow-[0_8px_20px_rgba(26,107,186,0.2)] hover:shadow-[0_12px_25px_rgba(93,187,77,0.3)]"
          >
            <span className="text-white font-semibold text-sm">
              Unlock Your Assessment
            </span>
            {/* White Circle with Arrow inside the button */}
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#1A6BBA] group-hover:text-[#5DBB4D] transition-colors">
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