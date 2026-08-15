import React from 'react';
import { motion } from 'framer-motion';

const experts = [
  {
    id: 1,
    name: "Dr. Sarah Jenkins, Ph.D.",
    description: "Specializes in behavioral assessments and cognitive alignment. Dr. Jenkins spent 12 years researching career dissatisfaction before developing the foundational profiling matrix used in our assessments today.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Dr. Marcus Chen, Psy.D.",
    description: "An industry-leading expert in workplace dynamics and human potential. Dr. Chen's expertise lies in mapping your raw psychological traits directly to high-performing industry roles and environments.",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800&auto=format&fit=crop"
  }
];

// Animation variants for staggered text reveals
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } // Custom cubic-bezier for a very smooth, premium slide
  }
};

const MeetExperts = () => {
  return (
    
    <section className="bg-[#ffffff] py-32 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Elegant Minimalist Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-32"
        >
          
          <h2 className="text-4xl md:text-5xl playfair-display-bold text-slate-600 tracking-tight">
            Meet the minds behind <br className="hidden md:block" />
            <span className=" text-[#633F45]">the science</span>
          </h2>
        </motion.div>

        {/* Editorial Alternating Layout */}
        <div className="flex flex-col gap-32">
          {experts.map((expert, index) => {
            const isEven = index % 2 === 0;

            return (
              <div 
                key={expert.id} 
                className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-24 ${
                  isEven ? '' : 'lg:flex-row-reverse'
                }`}
              >
                
                {/* 1. Image Side (Cinematic Reveal) */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="w-full lg:w-1/2 relative group"
                >
                  {/* Subtle decorative background offset (Using the Accent color) */}
                  <div className={`absolute top-6 bottom-6 -z-10 bg-[#E8D4D0]/60 rounded-3xl w-full ${isEven ? '-left-6' : '-right-6'} transition-transform duration-700 group-hover:scale-[1.02]`}></div>
                  
                  {/* Main Image Container */}
                  <div className="relative aspect-4/5 sm:aspect-square lg:aspect-4/5 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(99,63,69,0.15)] border border-[#E8D4D0]/30">
                    <motion.img 
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      src={expert.image} 
                      alt={expert.name}
                      className="w-full h-full object-cover"
                    />
                    {/* Soft warm overlay to blend image with theme */}
                    <div className="absolute inset-0 bg-[#B98286]/10 mix-blend-overlay pointer-events-none group-hover:opacity-0 transition-opacity duration-700"></div>
                  </div>
                </motion.div>

                {/* 2. Text Side (Staggered Typography) */}
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  className="w-full lg:w-1/2 flex flex-col justify-center"
                >
                  <motion.div variants={itemVariants} className="flex items-center gap-4 mb-6">
                    
                  </motion.div>
                  
                  <motion.h3 
                    variants={itemVariants}
                    className="text-4xl sm:text-5xl playfair-display-bold text-[#352B2D] mb-6 font-serif"
                  >
                    {expert.name}
                  </motion.h3>
                  
                  <motion.p 
                    variants={itemVariants}
                    className="text-lg text-[#633F45]/80 leading-relaxed mb-8"
                  >
                    {expert.description}
                  </motion.p>
                  
                </motion.div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default MeetExperts;