import React from 'react';
import { motion } from 'framer-motion';

const WhatYouGet = () => {
  // Deliverables array কম্পোনেন্টের ভেতরে আনা হয়েছে যাতে গ্লোবাল SVG গ্রেডিয়েন্ট (url(#bgGrad)) ব্যবহার করা যায়
  const deliverables = [
    {
      id: 1,
      title: "Why it matters",
      description: "A wrong direction costs years that are hard to recover, and the cost is rarely visible until the third or fourth year.",
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="url(#bgGrad)">
          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      )
    },
    {
      id: 2,
      title: "You receive",
      description: "Ranked fields and roles, study paths for each, and the strengths worth building on — as a PDF report written for you, not for a file.",
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="url(#bgGrad)">
          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    }
  ];

  return (
    // lg:pl-[320px] যোগ করা হয়েছে যাতে সাইডবারের জায়গা ছেড়ে দেয়
    <section className="bg-[#0A1930] py-32 relative overflow-hidden lg:pl-[320px] w-full flex flex-col">
      
      {/* SVG Definitions for Global Blue-Green Gradient */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1A6BBA" />
            <stop offset="100%" stopColor="#5DBB4D" />
          </linearGradient>
        </defs>
      </svg>

      {/* Background Decorative Glows (Blue & Green) */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#1A6BBA]/15 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#5DBB4D]/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* =========================================
              LEFT SIDE: IMAGE SECTION
              ========================================= */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-1/2 relative"
          >
            {/* Square Image Container with Sharp Borders */}
            <div className="relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-[#3c5685]/40 group bg-[#0A1930]">
              
              <img 
                src="https://res.cloudinary.com/dsrs8hryx/image/upload/q_auto,f_auto/v1790155267/image.png_2K_20260923152028_bhlga5.jpg" 
                alt="Making the right career decision" 
                className="w-full h-[450px] sm:h-[500px] lg:h-[600px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-90"
              />
              
              {/* Dark Gradient Overlay for seamless blending */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#132644] via-[#132644]/30 to-transparent" />
              
              {/* Floating Badge - Square and Premium */}
              <div className="absolute bottom-6 left-6 right-6 bg-[#132644]/90 backdrop-blur-md border border-[#3c5685]/50 p-5 flex items-center gap-5 shadow-xl hover:border-[#5DBB4D]/40 transition-colors duration-300">
                 {/* Blue-Green Gradient Square Icon Box */}
                 <div className="w-14 h-14 bg-gradient-to-br from-[#1A6BBA] to-[#5DBB4D] flex items-center justify-center shrink-0 shadow-inner">
                    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                 </div>
                 <div>
                    <h4 className="text-white font-serif tracking-wide font-bold text-base">Evidence Based</h4>
                    <p className="text-white/60 text-xs mt-1 uppercase tracking-widest">Not just assumptions</p>
                 </div>
              </div>
            </div>
            
            {/* Decorative Dots behind image */}
            <div className="absolute -z-10 -top-6 -left-6 w-32 h-32 bg-[radial-gradient(#3c5685_2px,transparent_2px)] [background-size:16px_16px] opacity-30"></div>
          </motion.div>


          {/* =========================================
              RIGHT SIDE: TEXT & DATA SECTION
              ========================================= */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white mb-8 tracking-tight leading-tight drop-shadow-md"
            >
              The most expensive decision a young person makes is usually made on{' '}
              {/* Blue-Green Gradient Text instead of Golden */}
              <span className="bg-linear-to-r from-[#1A6BBA] to-[#5DBB4D] bg-clip-text text-transparent font-bold">
                someone else's advice.
              </span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-white/70 lato-regular leading-relaxed mb-12"
            >
              Subject choice and first career move are settled, for most people, by whoever spoke loudest — a parent, a cousin who did well, a coaching centre. The <strong className="text-white font-semibold">Career Fit Inventory</strong> replaces that with evidence: your interests, aptitudes and work temperament measured together, then read against realistic directions.
            </motion.p>

            {/* Cards for "Why it matters" & "You receive" */}
            <div className="flex flex-col gap-6">
              {deliverables.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + (index * 0.15) }}
                  // Sharp Square Card
                  className="bg-[#132644]/90 p-8 border border-[#3c5685]/40 shadow-lg relative overflow-hidden group hover:border-[#5DBB4D]/50 transition-colors duration-300"
                >
                  {/* Left Accent border line (Blue-Green Gradient) */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#1A6BBA] to-[#5DBB4D]"></div>
                  
                  {/* Subtle inner hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1A6BBA]/0 to-[#5DBB4D]/0 group-hover:from-[#1A6BBA]/5 group-hover:to-[#5DBB4D]/5 transition-colors duration-500"></div>

                  <div className="flex gap-6 relative z-10">
                    {/* Square Icon Container */}
                    <div className="shrink-0 w-14 h-14 bg-[#0A1930] flex items-center justify-center border border-[#3c5685]/60 group-hover:border-[#5DBB4D]/50 transition-colors duration-300">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-serif font-bold text-white mb-3 group-hover:text-[#5DBB4D] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-white/60 leading-relaxed lato-regular group-hover:text-white/80 transition-colors">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default WhatYouGet;