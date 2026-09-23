import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    id: 1,
    question: "How long does the psychological assessment take?",
    answer: "The assessment typically takes 15 to 20 minutes to complete. It consists of deep, scientifically-backed questions designed to evaluate your cognitive strengths, behavioral tendencies, and stress triggers. We recommend taking it in a quiet environment where you can focus entirely on your responses."
  },
  {
    id: 2,
    question: "Why is there an upfront cost?",
    answer: "Your fee grants you access to our highly advanced, doctor-trained clinical algorithm. Unlike generic free quizzes, our system performs an instant, expert-level analysis of your psychological profile, cross-referencing your traits against thousands of real-world career data points to generate your precise roadmap."
  },
  {
    id: 3,
    question: "I'm already mid-career. Is this still useful for me?",
    answer: "Absolutely. A large portion of our clients are professionals experiencing burnout or seeking a meaningful career pivot. The assessment will instantly help you understand if your current dissatisfaction is due to the industry, the specific role, or a misalignment with your natural psychological traits."
  },
  {
    id: 4,
    question: "What exactly is included in the final roadmap?",
    answer: "You will receive a comprehensive breakdown of your psychological profile and your statistically optimal career matches across various industries. It also includes a tailored, step-by-step action plan detailing exactly how to transition into those fields based on your unique strengths."
  },
  {
    id: 5,
    question: "How long will it take to receive my results?",
    answer: "Your results are delivered instantly. The moment you submit your final answer, our expert system processes your data and immediately generates your complete, personalized career roadmap right on your screen."
  }
];

const FAQ = () => {
  const [openId, setOpenId] = useState(null);

  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    // Navy Blue Background
    <section className="bg-[#0A1930] py-32 relative overflow-hidden">
      
      {/* =========================================
          BACKGROUND IMAGE & NAVY BLUE OVERLAY
          ========================================= */}
      <div 
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1557682250-33bd709cbe85?q=80&w=1429&auto=format&fit=crop')", // Abstract dark image
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0A1930] via-[#0A1930]/80 to-[#0A1930]" />

      {/* Subtle glowing effect behind content */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#1A6BBA]/5 rounded-full blur-[150px] pointer-events-none z-0"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          {/* Subtitle color updated to Gold/Yellow */}
          <p className="text-[#ffba12] font-bold tracking-[0.2em] text-xs uppercase mb-6 drop-shadow-sm">
            Clear Your Doubts
          </p>
          {/* Title color updated to White and Gold */}
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight font-serif mb-6">
            Frequently Asked <span className="italic font-light text-[#ffba12]">Questions</span>
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openId === faq.id;

            return (
              <motion.div 
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                // Card backgrounds and borders updated for dark mode
                className={`border border-[#3c5685]/40 rounded-2xl overflow-hidden transition-colors duration-300 backdrop-blur-sm ${
                  isOpen ? 'bg-[#132644]/90 shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-[#ffba12]/40' : 'bg-[#0A1930]/50 hover:bg-[#132644]/50 hover:border-[#3c5685]/80'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full flex items-center justify-between p-6 sm:p-8 text-left focus:outline-none group"
                >
                  {/* Question Text styling */}
                  <span className={`font-serif text-lg sm:text-xl font-medium transition-colors duration-300 leading-snug ${
                    isOpen ? 'text-[#ffba12]' : 'text-white/90 group-hover:text-white'
                  }`}>
                    {faq.question}
                  </span>
                  
                  {/* Toggle Icon Styling */}
                  <div className={`shrink-0 ml-4 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                    isOpen 
                      ? 'border-[#ffba12] bg-[#ffba12] text-[#0A1930]' 
                      : 'border-[#3c5685] text-white/50 group-hover:border-[#ffba12] group-hover:text-[#ffba12]'
                  }`}>
                    <svg 
                      className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                      {/* Answer Text Styling */}
                      <div className="px-6 sm:px-8 pb-8 text-white/70 leading-relaxed border-t border-[#3c5685]/30 mt-2 pt-6 lato-regular">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FAQ;