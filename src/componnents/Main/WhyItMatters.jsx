import React from 'react';
import { motion } from 'framer-motion';

const WhyItMatters = () => {
  
  const benefits = [
    {
      id: 1,
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="url(#leafGrad)">
          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M12 22V12M12 12C12 12 6 10 6 4C10 4 12 12 12 12ZM12 12C12 12 18 14 18 20C14 20 12 12 12 12Z" />
        </svg>
      ),
      title: "Save Years of Wasted Time",
      description: "The average person changes majors 3 times and careers 5 times. Psychological profiling gets you on the right path from day one, saving you years of frustration and lost tuition."
    },
    {
      id: 2,
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="url(#leafGrad)">
          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M12 2C12 2 4 6 4 14C4 18 8 22 12 22C16 22 20 18 20 14C20 6 12 2 12 2ZM12 22V12" />
        </svg>
      ),
      title: "Prevent Clinical Burnout",
      description: "Burnout doesn't just come from working hard; it comes from working out of alignment with your natural psychological traits. We align your career with your cognitive strengths."
    },
    {
      id: 3,
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="url(#leafGrad)">
          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M20 4C20 4 14 3 9 8C4 13 4 20 4 20C4 20 11 20 16 15C21 10 20 4 20 4ZM4 20L10 14" />
        </svg>
      ),
      title: "Maximize Financial ROI",
      description: "When you operate within your natural zone of genius, rapid career progression follows. Our assessment ensures you enter an industry where you have an unfair psychological advantage."
    },
    {
      id: 4,
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="url(#leafGrad)">
          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M12 22V10M12 10C12 10 8 7 8 3C12 3 12 10 12 10ZM12 14C12 14 16 11 16 7C20 7 20 14 12 14Z" />
        </svg>
      ),
      title: "Deep Personal Fulfillment",
      description: "A career is where you will spend 80,000 hours of your life. Make sure those hours are spent doing something that brings you profound meaning and personal satisfaction."
    }
  ];

  return (
    // এখানে lg:pl-[320px] যোগ করা হয়েছে যাতে সাইডবারের জন্য জায়গা ছেড়ে দেয়
    <section className="bg-[#0A1930] py-15 relative overflow-hidden lg:pl-[50px] w-full flex flex-col">
      
      {/* SVG Definitions for Global Gradients (Blue to Green) */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1A6BBA" />
            <stop offset="100%" stopColor="#5DBB4D" />
          </linearGradient>
        </defs>
      </svg>

      {/* Abstract Ambient Background (Ice Blue & Nature Green Glow) */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#1A6BBA]/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#5DBB4D]/10 rounded-full blur-[150px] pointer-events-none"></div>

      {/* Main Content Wrapper */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Text Content */}
          <div className="max-w-xl" style={{ perspective: '1000px' }}>
            <motion.h2 
              initial={{ opacity: 0, rotateX: 45, z: -50 }}
              whileInView={{ opacity: 1, rotateX: 0, z: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="text-4xl sm:text-5xl font-serif text-white mb-8 tracking-tight leading-tight drop-shadow-md"
            >
              Your future is too important to leave to chance
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, rotateX: 30, y: 30 }}
              whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-lg text-white/70 mb-8 lato-regular leading-relaxed"
            >
              Most students and professionals choose their careers based on societal pressure, passing trends, or sheer guesswork. This leads to the "Sunday Scaries," burnout, and mid-life career crises. 
              <br/><br/>
              By mapping your foundational psychological traits before you commit to a path, you ensure that your career becomes a source of energy, rather than a drain on it.
            </motion.p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" style={{ perspective: '1200px' }}>
            {benefits.map((benefit, index) => {
              return (
                <motion.div
                  key={benefit.id}
                  initial={{ opacity: 0, rotateY: 45, x: 50, scale: 0.8 }}
                  whileInView={{ opacity: 1, rotateY: 0, x: 0, scale: 1 }}
                  whileHover={{ 
                    scale: 1.05, 
                    rotateX: 5, 
                    rotateY: -5,
                    z: 30,
                    boxShadow: "0px 20px 40px rgba(0,0,0,0.4)" 
                  }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
                  className="bg-[#132644]/90 border border-[#3c5685]/40 backdrop-blur-sm p-8 transform-gpu cursor-pointer group hover:border-[#5DBB4D]/50 transition-colors relative overflow-hidden"
                >
                  {/* Subtle inner hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1A6BBA]/0 to-[#5DBB4D]/0 group-hover:from-[#1A6BBA]/5 group-hover:to-[#5DBB4D]/5 transition-colors duration-500"></div>

                  <div className="relative z-10 w-14 h-14 flex items-center justify-center mb-6 border border-[#3c5685] bg-[#0A1930] group-hover:border-[#5DBB4D]/50 transition-colors duration-300">
                    {benefit.icon}
                  </div>
                  
                  <h3 className="relative z-10 text-xl font-serif font-semibold text-white mb-4 group-hover:text-[#5DBB4D] transition-colors">
                    {benefit.title}
                  </h3>
                  
                  <p className="relative z-10 text-sm text-white/60 leading-relaxed group-hover:text-white/80 transition-colors">
                    {benefit.description}
                  </p>
                </motion.div>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyItMatters;