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
    // Background updated to Morning Ivory (#FAF7F2)
    <section className="bg-[#FAF7F2] py-32 relative overflow-hidden lg:pl-[50px] w-full flex flex-col -mt-[1px]">
      
      {/* SVG Definitions for Leaf Gradient (Kept Original Blue-Green) */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="faqLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1A6BBA" />
            <stop offset="100%" stopColor="#5DBB4D" />
          </linearGradient>
        </defs>
      </svg>

      {/* =========================================
          BACKGROUND IMAGE & LIGHT OVERLAY
          ========================================= */}
      {/* Zoom issue fixed using backgroundSize: 'contain' or 'auto 100%' depending on image aspect ratio */}
      <div 
        className="absolute top-0 left-0 w-full h-full z-0 opacity-20 pointer-events-none" 
        style={{
          backgroundImage: "url('https://res.cloudinary.com/dsrs8hryx/image/upload/q_auto,f_auto/v1790226451/Gemini_Generated_Image_1ez1ba1ez1ba1ez1_lei0b0.jpg')", 
          backgroundSize: '100% auto', // This reduces extreme zooming on large screens
          backgroundPosition: 'top center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
        }}
      />
      {/* Light Gradient Overlay to blend with Morning Ivory */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#FAF7F2] via-[#FAF7F2]/80 to-[#FAF7F2]" />
      
      {/* Ambient Light Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#EAEFF0]/80 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#F0EBE6]/80 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          {/* Subtitle updated to Linen Clay for a premium accent */}
          <p className="font-bold tracking-[0.2em] text-xs uppercase mb-6 text-[#D4BCA6]">
            Clear Your Doubts
          </p>
          {/* Title updated to Dark Charcoal */}
          <h2 className="text-4xl md:text-5xl font-bold text-[#2C3338] tracking-tight font-serif mb-6 drop-shadow-sm">
            Frequently Asked <span className="italic font-light text-[#D4BCA6]">Questions</span>
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
                // Light Mode Styling: White background, Sage Mist borders
                className={`border border-[#C8D0C0]/50 overflow-hidden transition-colors duration-300 backdrop-blur-md relative group ${
                  isOpen ? 'bg-white shadow-[0_10px_30px_rgba(0,0,0,0.05)] border-[#D4BCA6]' : 'bg-white/60 hover:bg-white hover:border-[#C8D0C0]'
                }`}
              >
                {/* Left Accent Line - Uses Sage Mist when closed, Linen Clay when open */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 transition-colors duration-300 ${isOpen ? 'bg-[#D4BCA6]' : 'bg-transparent group-hover:bg-[#C8D0C0]'}`}></div>

                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full flex items-center justify-between p-6 sm:p-8 text-left focus:outline-none"
                >
                  <div className="flex items-start sm:items-center gap-4 sm:gap-6">
                    {/* Leaf Icon on the left side (Original Gradient Preserved) */}
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

                    {/* Question Text styling with Dark Charcoal */}
                    <span className={`font-serif text-lg sm:text-xl font-medium transition-all duration-300 leading-snug ${
                      isOpen ? 'text-[#D4BCA6]' : 'text-[#2C3338] group-hover:text-[#3b3a38]'
                    }`}>
                      {faq.question}
                    </span>
                  </div>
                  
                  {/* Square Toggle Icon Styling */}
                  <div className={`shrink-0 ml-4 w-8 h-8 border flex items-center justify-center transition-all duration-300 ${
                    isOpen 
                      ? 'border-[#D4BCA6] bg-[#FAF7F2] text-[#D4BCA6] shadow-inner' 
                      : 'border-[#EAEFF0] text-[#A0AAB2] bg-white group-hover:border-[#C8D0C0] group-hover:text-[#D4BCA6]'
                  }`}>
                    <svg 
                      className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`} 
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
                      {/* Answer Text Styling - Soft Gray */}
                      <div className="px-6 sm:px-14 pb-8 text-[#596573] font-light leading-relaxed mt-2 pt-4 border-t border-[#EAEFF0] lato-regular ml-0 sm:ml-6">
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