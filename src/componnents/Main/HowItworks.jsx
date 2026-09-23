import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LoadingStepCircle = ({ number }) => {
  return (
    <div className="relative w-16 h-16 flex items-center justify-center mx-auto mb-6">
      <svg 
        // Navy blue theme: Changed text color to gold/yellow to match the brand
        className="absolute inset-0 w-full h-full text-[#ffba12] animate-[spin_8s_linear_infinite]" 
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
      {/* Navy blue theme: Text color changed to white */}
      <span className="relative z-10 text-white font-bold text-xl font-serif">
        {number}
      </span>
    </div>
  );
};

const HowItWorks = () => {
  const navigate = useNavigate();

  // Updated steps data based on the theme of self-change and becoming a better version
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
    // Navy blue theme: Changed background to #0A1930
    <section className="bg-[#0A1930] py-24 relative overflow-hidden">
      
      {/* Subtle background glow for the navy theme */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#ffba12]/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            // Navy blue theme: Changed text to white
            className="text-4xl md:text-5xl text-white mb-4 tracking-tight playfair-display-bold"
          >
            Why not you?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            // Navy blue theme: Changed accent text to gold/yellow
            className="text-xs uppercase tracking-[0.25em] text-[#ffba12] font-bold"
          >
            Change yourself and become a better version of yours
          </motion.p>
        </div>

        {/* Navy blue theme: Changed divider color to fit dark theme */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-12 divide-y md:divide-y-0 md:divide-x divide-[#3c5685]/30 mb-20">
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
              {/* Navy blue theme: Changed heading text to white */}
              <h3 className="text-xl font-medium text-white mb-3 font-serif">
                {step.title}
              </h3>
              {/* Navy blue theme: Changed description text to light gray/blue */}
              <p className="text-sm text-white/70 leading-relaxed">
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
            // Navy blue theme: Updated button to use the gold/yellow accent color
            className="group flex items-center justify-between gap-4 bg-[#ffba12] p-2 pl-6 rounded-full hover:bg-white transition-all duration-300 shadow-[0_8px_20px_rgba(255,186,18,0.2)] hover:shadow-[0_12px_25px_rgba(255,186,18,0.4)]"
          >
            {/* Button text color adjusted for gold background */}
            <span className="text-[#0a1930] font-bold text-sm">
              Start Your Journey
            </span>
            <div className="w-8 h-8 bg-[#0a1930] rounded-full flex items-center justify-center text-[#ffba12] group-hover:bg-[#132644] transition-colors">
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