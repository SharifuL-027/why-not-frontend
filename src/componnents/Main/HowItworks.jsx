import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LoadingStepCircle = ({ number }) => {
  return (
    <div className="relative w-16 h-16 flex items-center justify-center mx-auto mb-6">
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
      <span className="relative z-10 text-[#0A1930] font-bold text-xl font-serif">
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
      title: "Algorithm Analysis",
      description: "Our highly advanced system instantly analyzes your unique response patterns and psychological profile."
    },
    {
      id: 4,
      title: "Your Roadmap",
      description: "Instantly receive a personalized, actionable guide detailing the exact career paths you were meant for."
    }
  ];

  return (
    <section className="bg-[#FCFBF9] py-24 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl text-[#2c2f33] mb-4 tracking-tight playfair-display-bold"
          >
            How to discover your ideal career
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs uppercase tracking-[0.25em] text-[#1A6BBA] font-bold"
          >
            YOUR JOURNEY TO PROFESSIONAL CLARITY
          </motion.p>
        </div>

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
              <h3 className="text-xl font-medium text-[#0A1930] mb-3 font-serif">
                {step.title}
              </h3>
              <p className="text-sm text-[#0A1930]/70 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-center"
        >
          <button 
            onClick={() => navigate('/assessment')}
            className="group flex items-center justify-between gap-4 bg-gradient-to-r from-[#1A6BBA] to-[#5DBB4D] p-2 pl-6 rounded-full hover:scale-105 transition-all duration-300 shadow-[0_8px_20px_rgba(26,107,186,0.2)] hover:shadow-[0_12px_25px_rgba(93,187,77,0.3)]"
          >
            <span className="text-white font-semibold text-sm">
              Unlock Your Assessment
            </span>
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