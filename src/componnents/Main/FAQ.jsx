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
  // State to track which accordion is open. null means all are closed.
  const [openId, setOpenId] = useState(null);

  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="bg-[#ffffff] py-32 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <p className="text-[#5c3b3d] font-bold tracking-[0.2em] text-xs uppercase mb-6">
            Clear Your Doubts
          </p>
          <h2 className="text-4xl md:text-5xl playfair-display-bold text-[#352B2D] tracking-tight font-serif mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-[#633F45]/80 lato-regular leading-relaxed max-w-2xl mx-auto">
            Everything you need to know about the assessment, our clinical process, and the roadmap you will receive.
          </p>
        </motion.div>

        {/* Accordion List */}
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
                className={`border border-[#E8D4D0] rounded-2xl overflow-hidden transition-colors duration-300 ${
                  isOpen ? 'bg-white shadow-[0_10px_30px_rgba(99,63,69,0.08)]' : 'bg-[#FBF6F4] hover:bg-white/50'
                }`}
              >
                {/* Accordion Button */}
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full flex items-center justify-between p-6 sm:p-8 text-left focus:outline-none group"
                >
                  <span className={`font-serif text-lg sm:text-xl playfair-display-semibold transition-colors duration-300 ${
                    isOpen ? 'text-[#B98286]' : 'text-[#352B2D] group-hover:text-[#633F45]'
                  }`}>
                    {faq.question}
                  </span>
                  
                  {/* Animated Plus/Minus Icon */}
                  <div className={`shrink-0 ml-4 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                    isOpen 
                      ? 'border-[#B98286] bg-[#B98286] text-white' 
                      : 'border-[#E8D4D0] text-[#B98286] group-hover:border-[#B98286]'
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

                {/* Animated Dropdown Answer */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                      <div className="px-6 sm:px-8 pb-8 text-[#633F45]/80 leading-relaxed border-t border-[#E8D4D0]/50 mt-2 pt-6 lato-regular">
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