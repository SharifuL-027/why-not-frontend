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
    // lg:pl-[320px] added to maintain sidebar layout spacing
    <section className="bg-[#0A1930] py-32 relative overflow-hidden lg:pl-[320px] w-full flex flex-col">
      
      {/* SVG Definitions for Global Blue-Green Gradient */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="faqLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1A6BBA" />
            <stop offset="100%" stopColor="#5DBB4D" />
          </linearGradient>
        </defs>
      </svg>

      {/* =========================================
          BACKGROUND IMAGE & NAVY BLUE OVERLAY
          ========================================= */}
      <div 
        className="absolute inset-0 z-0 opacity-15"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1557682250-33bd709cbe85?q=80&w=1429&auto=format&fit=crop')", 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />
      <div className="absolute inset-0 z-0 bg-linear-to-b from-[#0A1930] via-[#0A1930]/80 to-[#0A1930]" />

      {/* Background Decorative Glows (Blue & Green Theme) */}
      <div className="absolute top-0 right-1/4 w-125 h-125 bg-[#1A6BBA]/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-1/4 w-100 h-100 bg-[#5DBB4D]/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          {/* Subtitle updated to Blue-Green Gradient */}
          <p className="font-bold tracking-[0.2em] text-xs uppercase mb-6 drop-shadow-sm bg-linear-to-r from-[#1A6BBA] to-[#5DBB4D] bg-clip-text text-transparent">
            Clear Your Doubts
          </p>
          {/* Title updated to White and Blue-Green Gradient */}
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight font-serif mb-6 drop-shadow-md">
            Frequently Asked <span className="italic font-light bg-linear-to-r from-[#1A6BBA] to-[#5DBB4D] bg-clip-text text-transparent">Questions</span>
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
                // Square edges (no rounded classes) and premium dark mode styling
                className={`border border-[#3c5685]/40 overflow-hidden transition-colors duration-300 backdrop-blur-sm relative group ${
                  isOpen ? 'bg-[#132644]/90 shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-[#5DBB4D]/50' : 'bg-[#0A1930]/50 hover:bg-[#132644]/50 hover:border-[#5DBB4D]/30'
                }`}
              >
                {/* Left Accent Line */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 transition-colors duration-300 ${isOpen ? 'bg-gradient-to-b from-[#1A6BBA] to-[#5DBB4D]' : 'bg-transparent group-hover:bg-[#5DBB4D]/30'}`}></div>

                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full flex items-center justify-between p-6 sm:p-8 text-left focus:outline-none"
                >
                  <div className="flex items-start sm:items-center gap-4 sm:gap-6">
                    {/* Leaf Icon on the left side of every question */}
                    <div className="shrink-0 mt-1 sm:mt-0">
                      <svg 
                        className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'scale-110' : 'opacity-70 group-hover:opacity-100 group-hover:scale-105'}`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="url(#faqLeafGrad)"
                      >
                        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M20 4C20 4 14 3 9 8C4 13 4 20 4 20C4 20 11 20 16 15C21 10 20 4 20 4ZM4 20L10 14" />
                      </svg>
                    </div>

                    {/* Question Text styling with Gradient when open */}
                    <span className={`font-serif text-lg sm:text-xl font-medium transition-all duration-300 leading-snug ${
                      isOpen ? 'bg-linear-to-r from-[#1A6BBA] to-[#5DBB4D] bg-clip-text text-transparent' : 'text-white/90 group-hover:text-white'
                    }`}>
                      {faq.question}
                    </span>
                  </div>
                  
                  {/* Square Toggle Icon Styling */}
                  <div className={`shrink-0 ml-4 w-8 h-8 border flex items-center justify-center transition-all duration-300 ${
                    isOpen 
                      ? 'border-[#5DBB4D] bg-linear-to-br from-[#1A6BBA] to-[#5DBB4D] text-[#0A1930] shadow-inner' 
                      : 'border-[#3c5685] text-white/50 bg-[#0A1930] group-hover:border-[#5DBB4D]/50 group-hover:text-[#5DBB4D]'
                  }`}>
                    <svg 
                      className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-45 text-white' : 'rotate-0'}`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2.5} d="M12 4v16m8-8H4" />
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
                      <div className="px-6 sm:px-14 pb-8 text-white/70 leading-relaxed mt-2 pt-4 border-t border-[#3c5685]/30 lato-regular ml-0 sm:ml-6">
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