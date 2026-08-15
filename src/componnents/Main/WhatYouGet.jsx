import React from 'react';
import { motion } from 'framer-motion';

const deliverables = [
  {
    id: 1,
    title: "Comprehensive Psychological Profile",
    description: "A deep dive into your cognitive strengths, stress triggers, and natural working style based on your assessment data.",
    icon: (
      <svg className="w-6 h-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  },
  {
    id: 2,
    title: "Top 3 Optimal Career Matches",
    description: "We don't give you a generic list. We pinpoint the top three specific industries and roles where you have an unfair advantage.",
    icon: (
      <svg className="w-6 h-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    id: 3,
    title: "Step-by-Step Action Plan",
    description: "Knowing your path isn't enough. We provide a structured roadmap outlining the exact skills, certifications, or networking steps to get there.",
    icon: (
      <svg className="w-6 h-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    id: 4,
    title: "Exclusive Doctor's Notes",
    description: "Personalized insights written directly by our professional doctors, offering guidance on how to navigate your specific challenges.",
    icon: (
      <svg className="w-6 h-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    )
  }
];

const WhatYouGet = () => {
  return (
    // Creamy off-white background matching your request
    <section className="bg-[#FDFBF7] py-24 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-20 mt-10">
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl playfair-medium text-slate-900 mb-6 tracking-tight font-serif"
          >
            Inside your personalized roadmap
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-slate-600 max-w-2xl lato-regular mx-auto leading-relaxed"
          >
            After you complete the assessment, our doctors analyze your data to generate a comprehensive, actionable guide to your professional future.
          </motion.p>
        </div>

        {/* Deliverables Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {deliverables.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="flex items-start gap-6">
                {/* Icon Container */}
                <div className="shrink-0 w-14 h-14 bg-[#FDFBF7] rounded-full flex items-center justify-center border border-slate-100 group-hover:bg-teal-50 group-hover:scale-110 transition-all duration-300">
                  {item.icon}
                </div>
                
                {/* Text Content */}
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 playfair-bold">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed lato-regular text-sm sm:text-base">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhatYouGet;