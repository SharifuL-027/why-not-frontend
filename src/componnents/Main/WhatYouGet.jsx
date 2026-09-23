import React from 'react';
import { motion } from 'framer-motion';

const deliverables = [
  {
    id: 1,
    title: "Why it matters",
    description: "A wrong direction costs years that are hard to recover, and the cost is rarely visible until the third or fourth year.",
    icon: (
      <svg className="w-6 h-6 text-[#ffba12]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    )
  },
  {
    id: 2,
    title: "You receive",
    description: "Ranked fields and roles, study paths for each, and the strengths worth building on — as a PDF report written for you, not for a file.",
    icon: (
      <svg className="w-6 h-6 text-[#5DBB4D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  }
];

const WhatYouGet = () => {
  return (
    <section className="bg-[#0A1930] py-20 lg:py-32 relative overflow-hidden">
      
      {/* Background Decorative Glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#1A6BBA]/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#5DBB4D]/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-8 xl:px-16 relative z-10">
        
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          
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
            {/* Image Container with Glow & Border */}
            <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(10,25,48,0.8)] border border-[#3c5685]/30 group">
              
              {/* 
                এখানে Unsplash থেকে একটি ডেমো ইমেজ দেওয়া হয়েছে যা ডিসিশন বা পথ নির্দেশ করে।
                আপনি চাইলে আপনার নিজের ক্লাউডিনারি (Cloudinary) বা লোকাল ইমেজের লিংক বসিয়ে দিতে পারেন। 
              */}
              <img 
                src="https://res.cloudinary.com/dsrs8hryx/image/upload/q_auto,f_auto/v1790155267/image.png_2K_20260923152028_bhlga5.jpg" 
                alt="Making the right career decision" 
                className="w-full h-[500px] lg:h-[600px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              
              {/* Navy Blue Gradient Overlay on Image for better blending */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1930] via-[#0A1930]/40 to-transparent opacity-80" />
              
              {/* Floating Badge on Image */}
              <div className="absolute bottom-8 left-8 right-8 bg-[#132644]/80 backdrop-blur-md border border-[#3c5685]/50 p-4 rounded-xl flex items-center gap-4">
                 <div className="w-12 h-12 bg-[#ffba12] rounded-full flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-[#0A1930]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                 </div>
                 <div>
                    <h4 className="text-white font-bold text-sm">Evidence Based</h4>
                    <p className="text-white/70 text-xs mt-0.5">Not just assumptions</p>
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
              className="text-3xl sm:text-4xl lg:text-5xl font-medium playfair-display-bold text-white mb-6 tracking-tight leading-tight"
            >
              The most expensive decision a young person makes is usually made on <span className="text-[#ffba12] italic">someone else's advice.</span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-white/70 lato-regular leading-relaxed mb-10"
            >
              Subject choice and first career move are settled, for most people, by whoever spoke loudest — a parent, a cousin who did well, a coaching centre. The <strong className="text-white font-semibold">Career Fit Inventory</strong> replaces that with evidence: your interests, aptitudes and work temperament measured together, then read against realistic directions.
            </motion.p>

            {/* Cards for "Why it matters" & "You receive" */}
            <div className="flex flex-col gap-5">
              {deliverables.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + (index * 0.15) }}
                  className="bg-[#132644] p-6 rounded-2xl border border-[#3c5685]/30 shadow-lg relative overflow-hidden group hover:border-[#ffba12]/50 transition-colors duration-300"
                >
                  {/* Left Accent border line */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1 ${index === 0 ? 'bg-[#ffba12]' : 'bg-[#5DBB4D]'}`}></div>
                  
                  <div className="flex gap-5">
                    <div className="shrink-0 w-12 h-12 rounded-full bg-[#0A1930] flex items-center justify-center border border-[#3c5685]/50 group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-serif font-bold text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-white/70 leading-relaxed lato-regular">
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