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
    expertise: "Psychologist · Art Therapist · Trainer . Artist",
    bio: "Pioneering a holistic approach to mental health, Dr. Sultana integrates rigorous clinical methodology with profound empathy, establishing a sanctuary where cognitive restructuring meets human dignity.",
    imageUrl: "https://res.cloudinary.com/dsrs8hryx/image/upload/v1790752895/roksana_mznmtb.jpg" // <-- এখানে রোকসানা ম্যামের বড় ছবির লিংক দিবেন
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
// Global Shared Background (Light & Minimal)
// ==========================================
const SharedBackground = () => (
  <>
    <div 
      className="fixed inset-0 z-0 opacity-20 pointer-events-none"
      style={{
        backgroundImage: "url('https://res.cloudinary.com/dsrs8hryx/image/upload/q_auto,f_auto/v1790243857/Brain_with_flowers_and_butterflies_20260924155650_m67qjb.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    />
    {/* Heavy Ivory Overlay to mute the background image */}
    <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#F9F6F0]/95 via-[#F9F6F0]/90 to-[#F9F6F0] pointer-events-none" />
    
    {/* Soft Ambient Glows */}
    <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-[#EFECE5]/80 rounded-full blur-[150px] pointer-events-none z-0"></div>
    <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-[#EAEFF0]/80 rounded-full blur-[150px] pointer-events-none z-0"></div>
  </>
);

export default function AboutUs() {
  return (
    <div className="relative w-full min-h-screen lg:pl-[50px] overflow-hidden flex flex-col pt-32 pb-32 px-4 sm:px-6 md:px-10 font-sans bg-[#F9F6F0]">
      <SharedBackground />

      <div className="relative z-10 w-full max-w-7xl mx-auto flex-1 flex flex-col gap-24 sm:gap-32">
        
        {/* =========================================
            SECTION 1: PREMIUM HERO
            ========================================= */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col justify-center border-b border-[#EFECE5] pb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <span className="text-[#A38771] font-bold tracking-[0.25em] uppercase text-sm sm:text-base">
              Who We Are
            </span>
          </div>
          <h1 className="text-4xl sm:text-3xl md:text-5xl font-medium text-[#222222] font-serif tracking-tight drop-shadow-sm mb-10 leading-[1.1]">
            Elevating the Mind <br className="hidden sm:block" />
            <span className="italic font-light text-[#A38771]">Through Science & Empathy</span>
          </h1>
          <p className="text-[#4A4A4A] text-lg sm:text-2xl max-w-4xl leading-relaxed lato-regular border-l-4 border-[#A38771] pl-6 py-2">
            We are a collective of dedicated psychological professionals redefining mental wellness. By stripping away the clinical coldness of traditional therapy, we provide a structured, dignified, and highly effective environment for personal evolution.
          </p>
        </motion.div>

        {/* =========================================
            SECTION 2: OUR ETHOS (PHILOSOPHY)
            ========================================= */}
        <div>
          <div className="flex items-center gap-4 mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#222222] tracking-wide">Our Core Ethos</h2>
            <div className="flex-1 h-[1px] bg-gradient-to-r from-[#EFECE5] to-transparent ml-6"></div>
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
                className="bg-white border border-[#EFECE5] p-10 hover:border-[#A38771] shadow-sm hover:shadow-[0_15px_40px_rgba(0,0,0,0.04)] transition-all duration-500 group relative overflow-hidden flex flex-col rounded-sm"
              >
                {/* Animated Top Border */}
                <div className="absolute top-0 left-0 w-full h-1 bg-[#A38771] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out z-20"></div>
                
                <div className="w-12 h-12 bg-[#F9F6F0] border border-[#EFECE5] flex items-center justify-center mb-8 group-hover:border-[#A38771] transition-colors rounded-sm">
                  <svg className="w-5 h-5 text-[#A38771]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#222222] mb-4 font-serif group-hover:text-[#A38771] transition-colors">{item.title}</h3>
                <p className="text-base text-[#4A4A4A] leading-loose flex-1">
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#222222] tracking-wide mb-6">The Minds Behind the Practice</h2>
            <p className="text-lg sm:text-xl text-[#4A4A4A] max-w-3xl leading-relaxed">
              Our specialists are carefully curated not just for their academic credentials, but for their profound capacity to understand and reconstruct the human experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamMembers.map((member, idx) => {
              const isFeatured = idx === 0;

              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className={`relative bg-white border border-[#EFECE5] flex group hover:border-[#A38771] shadow-sm hover:shadow-[0_15px_40px_rgba(0,0,0,0.04)] transition-all duration-500 overflow-hidden rounded-sm ${
                    isFeatured ? "flex-col md:flex-row md:col-span-2 p-0" : "flex-col p-8 sm:p-12"
                  }`}
                >
                  {isFeatured ? (
                    // =====================================
                    // LARGE EDITORIAL CARD (For Founder)
                    // =====================================
                    <>
                      {/* Left Side: Large Image */}
                      <div className="w-full md:w-2/5 lg:w-1/2 h-72 md:h-auto bg-[#F9F6F0] relative overflow-hidden shrink-0 border-b md:border-b-0 md:border-r border-[#EFECE5]">
                        {member.imageUrl ? (
                          <img 
                            src={member.imageUrl} 
                            alt={member.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-5xl font-serif font-bold text-[#222222]">{member.initials}</span>
                          </div>
                        )}
                      </div>

                      {/* Right Side: Information */}
                      <div className="p-8 sm:p-12 md:w-3/5 lg:w-1/2 flex flex-col justify-center relative z-10">
                        {/* Decorative Subtle Icon */}
                        <svg className="absolute -bottom-8 -right-8 w-48 h-48 text-[#EFECE5] opacity-40 pointer-events-none transition-all duration-700 group-hover:opacity-80 group-hover:-rotate-12" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20 4C20 4 14 3 9 8C4 13 4 20 4 20C4 20 11 20 16 15C21 10 20 4 20 4Z" />
                        </svg>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                          <h3 className="font-bold text-[#222222] font-serif group-hover:text-[#A38771] transition-colors duration-300 text-3xl sm:text-4xl">
                            {member.name}
                          </h3>
                        </div>
                        <div className="text-xs text-[#A38771] uppercase tracking-[0.15em] font-bold mb-2">
                          {member.title}
                        </div>
                        <div className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-widest font-bold mb-8">
                          {member.expertise}
                        </div>
                        <p className="text-[#4A4A4A] leading-relaxed border-l-2 border-[#EFECE5] pl-5 group-hover:border-[#A38771] transition-colors duration-300 text-lg">
                          {member.bio}
                        </p>
                      </div>
                    </>
                  ) : (
                    // =====================================
                    // STANDARD CARDS (For Other Members)
                    // =====================================
                    <>
                      {/* Decorative Subtle Icon */}
                      <svg className="absolute -bottom-8 -right-8 w-40 h-40 text-[#EFECE5] opacity-40 pointer-events-none transition-all duration-700 group-hover:opacity-80 group-hover:-rotate-12" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 4C20 4 14 3 9 8C4 13 4 20 4 20C4 20 11 20 16 15C21 10 20 4 20 4Z" />
                      </svg>

                      {/* Initials Stamp */}
                      <div className="shrink-0 mb-6 z-10">
                        <div className="border border-[#EFECE5] bg-[#F9F6F0] flex items-center justify-center shadow-sm group-hover:border-[#A38771] transition-colors duration-500 relative rounded-sm w-16 h-16">
                          <div className="absolute -top-2 -right-2 bg-white p-1 border border-[#EFECE5] group-hover:border-[#A38771] transition-colors rounded-sm">
                            <svg className="w-3 h-3 text-[#A38771]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M20 4C20 4 14 3 9 8C4 13 4 20 4 20C4 20 11 20 16 15C21 10 20 4 20 4ZM4 20L10 14" />
                            </svg>
                          </div>
                          <span className="font-serif font-bold text-[#222222] text-2xl">
                            {member.initials}
                          </span>
                        </div>
                      </div>

                      {/* Information */}
                      <div className="flex-1 relative z-10 flex flex-col justify-center">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                          <h3 className="font-bold text-[#222222] font-serif group-hover:text-[#A38771] transition-colors duration-300 text-2xl">
                            {member.name}
                          </h3>
                        </div>
                        <div className="text-xs text-[#A38771] uppercase tracking-[0.15em] font-bold mb-2">
                          {member.title}
                        </div>
                        <div className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-widest font-bold mb-6">
                          {member.expertise}
                        </div>
                        <p className="text-[#4A4A4A] leading-relaxed border-l-2 border-[#EFECE5] pl-5 group-hover:border-[#A38771] transition-colors duration-300 text-sm">
                          {member.bio}
                        </p>
                      </div>
                    </>
                  )}
                </motion.div>
              );
            })}
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
          className="bg-white border-t-4 border-[#A38771] border-l border-r border-b border-[#EFECE5] p-12 sm:p-20 relative overflow-hidden group shadow-sm mt-10 flex flex-col lg:flex-row items-center justify-between gap-16 rounded-sm"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#EFECE5]/50 via-transparent to-transparent pointer-events-none"></div>

          <div className="flex-1 relative z-10 w-full">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[1px] bg-[#A38771]"></span>
              <span className="text-[#A38771] font-bold tracking-[0.2em] uppercase text-xs">Direct Access</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif text-[#222222] mb-6 leading-tight drop-shadow-sm">
              The <span className="italic text-[#A38771]">Concierge Desk</span>
            </h2>
            <p className="text-lg text-[#4A4A4A] mb-8 lato-regular leading-relaxed max-w-xl">
              We bypass automated ticketing systems and impersonal forms. Reach out directly to our dedicated desk to schedule a session, inquire about assessments, or ask for guidance.
            </p>
          </div>

          <div className="shrink-0 relative z-10 w-full lg:w-auto flex flex-col gap-6">
            
            {/* Phone Block */}
            <a href={`tel:${contactDetails.phone.replace(/\s+/g, '')}`} className="flex items-center gap-6 p-6 bg-[#F9F6F0] border border-[#EFECE5] hover:border-[#A38771] hover:bg-white transition-colors group/card w-full min-w-[300px] rounded-sm">
              <div className="w-12 h-12 flex items-center justify-center border border-[#EFECE5] bg-white group-hover/card:border-[#A38771] transition-colors rounded-sm">
                <svg className="w-5 h-5 text-[#A38771]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M3 5h2l2 4-2 2a11 11 0 008 8l2-2 4 2v2a1 1 0 01-1 1c-9 0-16-7-16-16a1 1 0 011-1z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Call or WhatsApp</p>
                <p className="text-xl font-mono text-[#222222] group-hover/card:text-[#A38771] transition-colors">{contactDetails.phone}</p>
              </div>
            </a>

            {/* Email Block */}
            <a href={`mailto:${contactDetails.email}`} className="flex items-center gap-6 p-6 bg-[#F9F6F0] border border-[#EFECE5] hover:border-[#A38771] hover:bg-white transition-colors group/card w-full min-w-[300px] rounded-sm">
              <div className="w-12 h-12 flex items-center justify-center border border-[#EFECE5] bg-white group-hover/card:border-[#A38771] transition-colors rounded-sm">
                <svg className="w-5 h-5 text-[#A38771]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Direct Email</p>
                <p className="text-lg text-[#222222] group-hover/card:text-[#A38771] transition-colors">{contactDetails.email}</p>
              </div>
            </a>

            {/* Operating Hours */}
            <div className="flex items-center gap-6 p-6 border border-transparent w-full min-w-[300px]">
              <div className="w-12 h-12 flex items-center justify-center">
                <svg className="w-6 h-6 text-[#A38771]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Operating Hours</p>
                <p className="text-sm text-[#4A4A4A]">{contactDetails.hours}</p>
                <p className="text-xs text-[#A38771] mt-1 italic">Replies typically within 1 working day.</p>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </div>
  );
}