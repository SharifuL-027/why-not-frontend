import React from 'react';
import { motion } from 'framer-motion';

const benefits = [
  {
    id: 1,
    icon: (
      <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Save Years of Wasted Time",
    description: "The average person changes majors 3 times and careers 5 times. Psychological profiling gets you on the right path from day one, saving you years of frustration and lost tuition."
  },
  {
    id: 2,
    icon: (
      <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Prevent Clinical Burnout",
    description: "Burnout doesn't just come from working hard; it comes from working out of alignment with your natural psychological traits. We align your career with your cognitive strengths."
  },
  {
    id: 3,
    icon: (
      <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    title: "Maximize Financial ROI",
    description: "When you operate within your natural zone of genius, rapid career progression follows. Our assessment ensures you enter an industry where you have an unfair psychological advantage."
  },
  {
    id: 4,
    icon: (
      <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Deep Personal Fulfillment",
    description: "A career is where you will spend 80,000 hours of your life. Make sure those hours are spent doing something that brings you profound meaning and personal satisfaction."
  }
];

const WhyItMatters = () => {
  return (
    <section className="bg-[#0a0f16] py-24 relative overflow-hidden">
      
      {/* Abstract Ambient Background (Updated to Warm Amber/Gold to match icons) */}
      <div className="absolute top-0 right-0 w-150 h-150 bg-amber-900/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-125 h-125 bg-blue-900/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Split Layout: Text on Left, Cards on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Heading & Context (Wrapped in Perspective for 3D Text) */}
          <div className="max-w-xl" style={{ perspective: '1000px' }}>
            <motion.p 
              initial={{ opacity: 0, rotateX: -90, y: 20 }}
              whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              style={{ transformOrigin: "top" }}
              className="text-amber-400 font-bold tracking-widest text-xs uppercase mb-4 drop-shadow-md"
            >
              The Cost of Guessing
            </motion.p>
            
            <motion.h2 
              initial={{ opacity: 0, rotateX: 45, z: -50 }}
              whileInView={{ opacity: 1, rotateX: 0, z: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="text-4xl sm:text-5xl font-bold text-white mb-6 tracking-tight leading-tight"
            >
              Your future is too important to leave to <span className="font-serif italic text-slate-300 font-light">chance.</span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, rotateX: 30, y: 30 }}
              whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-lg text-slate-400 mb-8 leading-relaxed"
            >
              Most students and professionals choose their careers based on societal pressure, passing trends, or sheer guesswork. This leads to the "Sunday Scaries," burnout, and mid-life career crises. 
              <br/><br/>
              By mapping your foundational psychological traits before you commit to a path, you ensure that your career becomes a source of energy, rather than a drain on it.
            </motion.p>
          </div>

          {/* Right Column: Benefit Cards (Wrapped in Perspective for 3D Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" style={{ perspective: '1200px' }}>
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.id}
                // 3D Entrance Animation
                initial={{ opacity: 0, rotateY: 45, x: 50, scale: 0.8 }}
                whileInView={{ opacity: 1, rotateY: 0, x: 0, scale: 1 }}
                // 3D Hover Animation
                whileHover={{ 
                  scale: 1.05, 
                  rotateX: 5, 
                  rotateY: -5,
                  z: 30,
                  boxShadow: "0px 20px 40px rgba(0,0,0,0.4)" 
                }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.15,
                  ease: "easeOut"
                }}
                className="bg-white/3 border border-white/10 backdrop-blur-sm p-8 rounded-3xl transform-gpu cursor-pointer"
              >
                <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(251,191,36,0.1)]">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 drop-shadow-sm">
                  {benefit.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyItMatters;