import React from "react";
import { motion } from "framer-motion";

// ==========================================
// Extracted Data (From Image) + Premium Copy
// ==========================================
const contactDetails = {
  phone: "+880 1711 902441",
  email: "whynotyou.psy@gmail.com",
  hours: "Saturday to Thursday, 10am-8pm"
};

const teamMembers = [
  {
    initials: "RS",
    name: "Roksana Sultana, PhD",
    title: "Founder & Lead Psychologist",
    expertise: "Clinical Practice · Art Therapy · Wellbeing Design",
    bio: "Pioneering a holistic approach to mental health, Dr. Sultana integrates rigorous clinical methodology with profound empathy, establishing a sanctuary where cognitive restructuring meets human dignity."
  },
  {
    initials: "FZ",
    name: "Farzana Ferdous Zaman",
    title: "Child Psychologist & Special Educator",
    expertise: "Child Development · Behavioral Intervention",
    bio: "Dedicated to unraveling the complexities of early psychological development, bridging the critical communication gaps between neurodivergent children and their ecosystems."
  },
  {
    initials: "NC",
    name: "Nowsaba Chowdhury",
    title: "Psychologist & Speech Therapist",
    expertise: "Linguistic Psychology · Confidence Coaching",
    bio: "Empowering individuals to reclaim their voice. Her unique dual-discipline approach treats both the physiological mechanics of speech and the psychological barriers that accompany them."
  },
  {
    initials: "SM",
    name: "Sania Mahima",
    title: "Clinical Psychologist & Therapist",
    expertise: "Adolescent Care · Anxiety Management",
    bio: "Specializing in the modern pressures faced by students and young professionals, utilizing structured, short-term cognitive therapies to dismantle anxiety and restore focus."
  }
];

// ==========================================
// Global Shared Parallax Background
// ==========================================
const SharedBackground = () => (
  <>
    <svg width="0" height="0" className="absolute">
      <defs>
        <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1A6BBA" />
          <stop offset="100%" stopColor="#5DBB4D" />
        </linearGradient>
      </defs>
    </svg>
    <div 
      className="fixed inset-0 z-0 opacity-25 pointer-events-none"
      style={{
        backgroundImage: "url('https://res.cloudinary.com/dsrs8hryx/image/upload/q_auto,f_auto/v1790243857/Brain_with_flowers_and_butterflies_20260924155650_m67qjb.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    />
    <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#0A1930] via-[#0A1930]/85 to-[#0A1930] pointer-events-none" />
    <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-[#1A6BBA]/10 rounded-full blur-[180px] pointer-events-none z-0"></div>
    <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-[#5DBB4D]/10 rounded-full blur-[180px] pointer-events-none z-0"></div>
  </>
);

export default function AboutUs() {
  return (
    <div className="relative w-full min-h-screen lg:pl-[50px] overflow-hidden flex flex-col pt-32 pb-32 px-4 sm:px-6 md:px-10 font-sans">
      <SharedBackground />

      <div className="relative z-10 w-full max-w-7xl mx-auto flex-1 flex flex-col gap-24 sm:gap-32">
        
        {/* =========================================
            SECTION 1: PREMIUM HERO
            ========================================= */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col justify-center border-b border-[#3c5685]/40 pb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <svg className="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="url(#leafGrad)">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M20 4C20 4 14 3 9 8C4 13 4 20 4 20C4 20 11 20 16 15C21 10 20 4 20 4ZM4 20L10 14" />
            </svg>
            <span className="text-[#5DBB4D] font-bold tracking-[0.25em] uppercase text-sm sm:text-base">
              Who We Are
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-medium text-white font-serif tracking-tight drop-shadow-2xl mb-10 leading-[1.1]">
            Elevating the Mind <br className="hidden sm:block" />
            <span className="italic font-light text-transparent bg-gradient-to-r from-[#1A6BBA] to-[#5DBB4D] bg-clip-text">Through Science & Empathy</span>
          </h1>
          <p className="text-white/70 text-lg sm:text-2xl max-w-4xl leading-relaxed lato-regular border-l-4 border-[#1A6BBA] pl-6 py-2">
            We are a collective of dedicated psychological professionals redefining mental wellness. By stripping away the clinical coldness of traditional therapy, we provide a structured, dignified, and highly effective environment for personal evolution.
          </p>
        </motion.div>

        {/* =========================================
            SECTION 2: OUR ETHOS (PHILOSOPHY)
            ========================================= */}
        <div>
          <div className="flex items-center gap-4 mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-wide">Our Core Ethos</h2>
            <div className="flex-1 h-[1px] bg-gradient-to-r from-[#3c5685]/50 to-transparent ml-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Dignity First",
                desc: "We believe that reaching out for help is an act of profound courage. Our entire framework is built to ensure that seeking guidance costs you absolutely nothing in dignity or self-respect."
              },
              {
                title: "Evidence-Based",
                desc: "Every assessment, roadmap, and counseling technique we deploy is anchored in rigorous, peer-reviewed psychological science. We do not deal in assumptions; we deal in data."
              },
              {
                title: "Absolute Discretion",
                desc: "Privacy is not just a policy; it is the cornerstone of our practice. From the moment you connect with us, your psychological footprint is guarded with uncompromising security."
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="bg-[#132644]/60 backdrop-blur-md border border-[#3c5685]/30 p-10 hover:border-[#5DBB4D]/50 hover:bg-[#132644]/90 transition-all duration-500 group relative overflow-hidden flex flex-col"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#1A6BBA] to-[#5DBB4D] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out z-20"></div>
                <div className="w-12 h-12 bg-[#0A1930] border border-[#1A6BBA]/50 flex items-center justify-center mb-8 group-hover:border-[#5DBB4D] transition-colors">
                  <svg className="w-5 h-5 text-[#5DBB4D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 font-serif group-hover:text-[#5DBB4D] transition-colors">{item.title}</h3>
                <p className="text-base text-white/60 leading-loose flex-1">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* =========================================
            SECTION 3: LEADERSHIP & EXPERTS
            ========================================= */}
        <div>
          <div className="mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-wide mb-6">The Minds Behind the Practice</h2>
            <p className="text-lg sm:text-xl text-white/50 max-w-3xl leading-relaxed">
              Our specialists are carefully curated not just for their academic credentials, but for their profound capacity to understand and reconstruct the human experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamMembers.map((member, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`relative bg-[#0A1930]/80 backdrop-blur-sm border border-[#3c5685]/40 p-8 sm:p-12 flex flex-col group hover:bg-[#132644]/90 hover:border-[#5DBB4D]/60 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 overflow-hidden ${idx === 0 ? "md:col-span-2 md:flex-row gap-10" : ""}`}
              >
                {/* Background Leaf Motif */}
                <svg className={`absolute text-[#5DBB4D] opacity-5 pointer-events-none transition-all duration-700 group-hover:opacity-10 group-hover:-rotate-12 ${idx === 0 ? "-bottom-10 -right-10 w-64 h-64" : "-bottom-8 -right-8 w-48 h-48"}`} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4C20 4 14 3 9 8C4 13 4 20 4 20C4 20 11 20 16 15C21 10 20 4 20 4Z" />
                </svg>

                {/* Left side: Initials */}
                <div className="shrink-0 mb-6 md:mb-0">
                  <div className={`border border-[#3c5685]/80 bg-[#132644] flex items-center justify-center shadow-inner group-hover:border-[#5DBB4D] transition-colors duration-500 relative ${idx === 0 ? "w-24 h-24 sm:w-32 sm:h-32" : "w-16 h-16"}`}>
                    <div className="absolute -top-2 -right-2 bg-[#0A1930] p-1 border border-[#3c5685]/40 group-hover:border-[#5DBB4D]/50 transition-colors">
                      <svg className="w-3 h-3 text-[#5DBB4D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M20 4C20 4 14 3 9 8C4 13 4 20 4 20C4 20 11 20 16 15C21 10 20 4 20 4ZM4 20L10 14" />
                      </svg>
                    </div>
                    <span className={`font-serif font-bold text-transparent bg-gradient-to-br from-[#1A6BBA] to-[#5DBB4D] bg-clip-text ${idx === 0 ? "text-4xl sm:text-5xl" : "text-2xl"}`}>
                      {member.initials}
                    </span>
                  </div>
                </div>

                {/* Right side: Info */}
                <div className="flex-1 relative z-10 flex flex-col justify-center">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                    <h3 className={`font-bold text-white font-serif group-hover:text-[#5DBB4D] transition-colors duration-300 ${idx === 0 ? "text-3xl sm:text-4xl" : "text-2xl"}`}>
                      {member.name}
                    </h3>
                  </div>
                  <div className="text-xs text-white/50 uppercase tracking-[0.15em] font-bold mb-2">
                    {member.title}
                  </div>
                  <div className="text-[10px] sm:text-xs text-[#1A6BBA] uppercase tracking-widest font-bold mb-6">
                    {member.expertise}
                  </div>
                  <p className={`text-white/70 leading-relaxed border-l-2 border-[#3c5685]/40 pl-5 group-hover:border-[#5DBB4D]/40 transition-colors duration-300 ${idx === 0 ? "text-lg max-w-3xl" : "text-sm"}`}>
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* =========================================
            SECTION 4: CONCIERGE DESK (NO FORM)
            ========================================= */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-[#132644]/90 backdrop-blur-md border-t-4 border-[#5DBB4D] border-l border-r border-b border-[#3c5685]/40 p-12 sm:p-20 relative overflow-hidden group shadow-2xl mt-10 flex flex-col lg:flex-row items-center justify-between gap-16"
        >
          {/* Subtle overlay effect */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1A6BBA]/10 via-transparent to-transparent pointer-events-none"></div>

          <div className="flex-1 relative z-10 w-full">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[1px] bg-[#5DBB4D]"></span>
              <span className="text-[#5DBB4D] font-bold tracking-[0.2em] uppercase text-xs">Direct Access</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif text-white mb-6 leading-tight drop-shadow-md">
              The <span className="text-transparent bg-gradient-to-r from-[#1A6BBA] to-[#5DBB4D] bg-clip-text">Concierge Desk</span>
            </h2>
            <p className="text-lg text-white/60 mb-8 lato-regular leading-relaxed max-w-xl">
              We bypass automated ticketing systems and impersonal forms. Reach out directly to our dedicated desk to schedule a session, inquire about assessments, or ask for guidance.
            </p>
          </div>

          <div className="shrink-0 relative z-10 w-full lg:w-auto flex flex-col gap-6">
            
            {/* Phone Block */}
            <a href={`tel:${contactDetails.phone.replace(/\s+/g, '')}`} className="flex items-center gap-6 p-6 bg-[#0A1930] border border-[#3c5685]/50 hover:border-[#5DBB4D] hover:bg-[#5DBB4D]/5 transition-colors group/card w-full min-w-[300px]">
              <div className="w-12 h-12 flex items-center justify-center border border-[#1A6BBA]/40 bg-[#132644] group-hover/card:border-[#5DBB4D] transition-colors">
                <svg className="w-5 h-5 text-[#5DBB4D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M3 5h2l2 4-2 2a11 11 0 008 8l2-2 4 2v2a1 1 0 01-1 1c-9 0-16-7-16-16a1 1 0 011-1z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-white/40 uppercase tracking-widest font-bold mb-1">Call or WhatsApp</p>
                <p className="text-xl font-mono text-white group-hover/card:text-[#5DBB4D] transition-colors">{contactDetails.phone}</p>
              </div>
            </a>

            {/* Email Block */}
            <a href={`mailto:${contactDetails.email}`} className="flex items-center gap-6 p-6 bg-[#0A1930] border border-[#3c5685]/50 hover:border-[#5DBB4D] hover:bg-[#5DBB4D]/5 transition-colors group/card w-full min-w-[300px]">
              <div className="w-12 h-12 flex items-center justify-center border border-[#1A6BBA]/40 bg-[#132644] group-hover/card:border-[#5DBB4D] transition-colors">
                <svg className="w-5 h-5 text-[#5DBB4D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-white/40 uppercase tracking-widest font-bold mb-1">Direct Email</p>
                <p className="text-lg text-white group-hover/card:text-[#5DBB4D] transition-colors">{contactDetails.email}</p>
              </div>
            </a>

            {/* Operating Hours */}
            <div className="flex items-center gap-6 p-6 border border-transparent w-full min-w-[300px]">
              <div className="w-12 h-12 flex items-center justify-center">
                <svg className="w-6 h-6 text-[#1A6BBA]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-white/40 uppercase tracking-widest font-bold mb-1">Operating Hours</p>
                <p className="text-sm text-white/80">{contactDetails.hours}</p>
                <p className="text-xs text-[#5DBB4D] mt-1 italic">Replies typically within 1 working day.</p>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </div>
  );
}