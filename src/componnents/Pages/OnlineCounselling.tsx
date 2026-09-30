import React, { useState } from "react";
import { motion } from "framer-motion";

export default function OnlineCounselling() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    specialist: "",
    concern: "",
    days: [] as string[],
    times: [] as string[],
    language: [] as string[],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Toggle helpers for multi-select arrays
  const toggleArrayItem = (key: "days" | "times" | "language", value: string) => {
    setFormData((prev) => {
      const current = prev[key];
      if (current.includes(value)) {
        return { ...prev, [key]: current.filter((item) => item !== value) };
      } else {
        return { ...prev, [key]: [...current, value] };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: "", phone: "", specialist: "", concern: "", days: [], times: [], language: [] });
      setTimeout(() => setSubmitted(false), 5000);
    }, 2000);
  };

  const scrollToForm = (expertName?: string) => {
    if (expertName) {
      setFormData((prev) => ({ ...prev, specialist: expertName }));
    }
    document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const experts = [
    {
      initials: "RS",
      name: "Roksana Sultana, PhD",
      title: "PSYCHOLOGIST - ART THERAPIST - WELLBEING SPECIALIST",
      desc: "15+ years of clinical and assessment practice. Works with adults and couples in relationships, life direction and recovery from prolonged stress, and uses art-based methods where words are hard."
    },
    {
      initials: "FZ",
      name: "Farzana Ferdous Zaman",
      title: "CHILD PSYCHOLOGIST - SPECIAL CHILD EDUCATOR",
      desc: "For parents worried about a child's development, learning or behaviour at school. Assessment and parent guidance, including children with special educational needs."
    },
    {
      initials: "NC",
      name: "Nowsaba Chowdury",
      title: "PSYCHOLOGIST - SPEECH THERAPIST",
      desc: "Speech and language difficulties in children and adults, and the confidence and social strain that usually travel with them."
    },
    {
      initials: "SM",
      name: "Sania Mahima",
      title: "CLINICAL PSYCHOLOGIST - THERAPIST",
      desc: "Anxiety, low mood and adolescent difficulties. Structured, short-course therapy for students and young professionals."
    }
  ];

  const counselTopics = [
    {
      title: "Relationship counselling",
      desc: "Couples, marriage decisions, in-law and family strain. Sessions may be individual or joint."
    },
    {
      title: "Adolescent & child counselling",
      desc: "Behaviour, school difficulty, screen use and development, with the parents kept in the loop."
    },
    {
      title: "Career counselling",
      desc: "Subject and career decisions for students, and direction changes for working adults."
    }
  ];

  const steps = [
    {
      num: "01",
      title: "Describe the concern",
      desc: "A few lines is enough. It reaches only the specialist you choose."
    },
    {
      num: "02",
      title: "Give the days and times that suit you",
      desc: "Mark two or three preferences rather than one fixed slot."
    },
    {
      num: "03",
      title: "We call you to confirm",
      desc: "Your request reaches WNY directly. We ring the number you gave to settle the time and explain how the session runs."
    }
  ];

  return (
    <div className="relative w-full min-h-screen bg-[#0A1930] lg:pl-[50px] overflow-hidden flex flex-col pt-34 pb-24 px-4 sm:px-6">
      
      {/* SVG Definitions for Global Blue-Green Gradient */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1A6BBA" />
            <stop offset="100%" stopColor="#5DBB4D" />
          </linearGradient>
        </defs>
      </svg>

      {/* =======================================================
          WHOLE PAGE PARALLAX BACKGROUND IMAGE & GRADIENT OVERLAY
          ======================================================= */}
      <div 
        className="absolute inset-0 z-0 opacity-85 pointer-events-none"
        style={{
          backgroundImage: "url('https://res.cloudinary.com/dsrs8hryx/image/upload/v1790244691/image.png_2K_20260924160842_o0uxxt.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'left',
          backgroundAttachment: 'fixed', 
        }}
      />
      <div className="absolute inset-0 z-0 bg-linear-to-b from-[#0A1930] via-[#0A1930]/85 to-[#0A1930] pointer-events-none" />

      {/* Background Decorative Glows */}
      

      <div className="relative z-10 w-full max-w-5xl mx-auto flex-1">
        
        {/* =========================================
            HERO SECTION
            ========================================= */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-20 border-b border-[#3c5685]/40 pb-10"
        >
          <div className="flex items-center gap-3 mb-6">
            <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="url(#leafGrad)">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M20 4C20 4 14 3 9 8C4 13 4 20 4 20C4 20 11 20 16 15C21 10 20 4 20 4ZM4 20L10 14" />
            </svg>
            <span className="text-transparent bg-linear-to-r from-[#1A6BBA] to-[#5DBB4D] bg-clip-text font-bold tracking-[0.2em] uppercase text-xs sm:text-sm">
              ONLINE SESSIONS - ENGLISH OR BENGALI
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-white font-serif tracking-tight drop-shadow-lg mb-6 leading-tight">
            Meet the person you will <br className="hidden md:block" />
            <span className="italic font-light text-transparent bg-gradient-to-r from-[#1A6BBA] to-[#5DBB4D] bg-clip-text">actually be talking to</span>
          </h1>
          <p className="text-gray-200 text-base sm:text-[22px] max-w-3xl leading-relaxed lato-regular border-l-2 border-[#5DBB4D] pl-4">
            Choose the specialist whose work fits your situation; or describe the concern and let us route you. Every first session begins with a short call from us — you will never be handed a link and left to it.
          </p>
        </motion.div>

        {/* =========================================
            OUR EXPERTS SECTION
            ========================================= */}
        <div className="mb-24">
          <div className="flex items-center gap-3 mb-10 border-b border-[#3c5685]/40 pb-4">
            <svg className="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="url(#leafGrad)">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2.5} d="M20 4C20 4 14 3 9 8C4 13 4 20 4 20C4 20 11 20 16 15C21 10 20 4 20 4ZM4 20L10 14" />
            </svg>
            <h2 className="text-3xl font-serif text-white tracking-wide">Our experts</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {experts.map((exp, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="relative bg-[#132644]/90 backdrop-blur-md border border-[#3c5685]/40 p-8 sm:p-10 flex flex-col group hover:border-[#5DBB4D]/50 hover:shadow-[0_15px_40px_rgba(0,0,0,0.4)] transition-all duration-500 overflow-hidden"
              >
                {/* Decorative Background Leaf Watermark */}
                <svg 
                  className="absolute -bottom-8 -right-8 w-40 h-40 text-[#5DBB4D] opacity-5 group-hover:opacity-10 group-hover:scale-125 group-hover:-rotate-12 transition-all duration-700 pointer-events-none" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M20 4C20 4 14 3 9 8C4 13 4 20 4 20C4 20 11 20 16 15C21 10 20 4 20 4Z" />
                </svg>

                {/* Animated Top Border Gradient */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#1A6BBA] to-[#5DBB4D] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out z-20"></div>

                <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-8">
                  {/* Premium Initials Stamp */}
                  <div className="w-16 h-16 shrink-0 bg-[#0A1930] border border-[#3c5685]/80 group-hover:border-[#5DBB4D] flex items-center justify-center relative transition-colors duration-500 shadow-inner">
                    <div className="absolute -top-2.5 -right-2.5 bg-[#132644] p-1 border border-[#3c5685]/40 group-hover:border-[#5DBB4D]/50 transition-colors">
                      <svg className="w-3.5 h-3.5 text-[#5DBB4D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M20 4C20 4 14 3 9 8C4 13 4 20 4 20C4 20 11 20 16 15C21 10 20 4 20 4ZM4 20L10 14" />
                      </svg>
                    </div>
                    <span className="text-2xl font-serif font-bold text-transparent bg-gradient-to-br from-[#1A6BBA] to-[#5DBB4D] bg-clip-text">
                      {exp.initials}
                    </span>
                  </div>
                  
                  {/* Name & Title */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 font-serif group-hover:text-[#5DBB4D] transition-colors duration-300">
                      {exp.name}
                    </h3>
                    <div className="text-xs text-gray-200 uppercase tracking-[0.15em] font-bold leading-relaxed">
                      {exp.title}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-md text-white/70 font-serif leading-loose flex-1 mb-10 relative z-10 border-l-2 border-[#3c5685]/40 pl-5 group-hover:border-[#5DBB4D]/40 transition-colors duration-300">
                  {exp.desc}
                </p>

                {/* Action Button */}
                <button 
                  onClick={() => scrollToForm(exp.name)}
                  className="mt-auto self-start relative z-10 flex items-center gap-4 group/btn outline-none"
                >
                  <span className="text-sm font-bold uppercase tracking-widest text-white/50 group-hover/btn:text-white transition-colors duration-300">
                    Book a session
                  </span>
                  <span className="w-10 h-10 flex items-center justify-center bg-[#0A1930] border border-[#3c5685]/60 group-hover/btn:border-[#5DBB4D] group-hover/btn:bg-[#5DBB4D]/10 transition-all duration-300">
                    <svg className="w-4 h-4 text-white/50 group-hover/btn:text-[#5DBB4D] group-hover/btn:translate-x-1 group-hover/btn:scale-110 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </button>

              </motion.div>
            ))}
          </div>
        </div>

        {/* =========================================
            WHAT WE COUNSEL ON SECTION
            ========================================= */}
        <div className="mb-24">
          <div className="flex items-center gap-3 mb-8 border-b border-[#3c5685]/40 pb-4">
            <svg className="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="url(#leafGrad)">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-2xl sm:text-3xl font-serif text-white tracking-wide">What we counsel on</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {counselTopics.map((topic, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-[#132644]/80 backdrop-blur-md border border-[#3c5685]/40 p-8 hover:bg-[#1A6BBA]/10 hover:border-[#5DBB4D]/50 transition-all duration-300 group shadow-lg"
              >
                <h3 className="text-lg font-bold text-white mb-3 font-serif group-hover:text-[#5DBB4D] transition-colors">{topic.title}</h3>
                <p className="text-sm text-white/70 leading-relaxed">{topic.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* =========================================
            HOW A SESSION GETS FIXED (STEPS)
            ========================================= */}
        <div className="mb-24">
          <div className="text-[#5DBB4D] text-xs font-bold uppercase tracking-[0.2em] mb-3">Booking - Three Steps</div>
          <div className="flex items-center gap-3 mb-8 border-b border-[#3c5685]/40 pb-4">
            <svg className="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="url(#leafGrad)">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h2 className="text-2xl sm:text-3xl font-serif text-white tracking-wide">How a session gets fixed</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {steps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-[#132644]/80 backdrop-blur-md border border-[#3c5685]/50 p-8 relative overflow-hidden group hover:border-[#5DBB4D]/60 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
              >
                <div className="text-6xl font-mono font-extrabold text-white/5 absolute -right-4 -top-4 group-hover:text-[#1A6BBA]/10 group-hover:scale-110 transition-all duration-500 pointer-events-none">
                  {step.num}
                </div>
                
                <div className="w-10 h-10 border border-[#1A6BBA] text-[#5DBB4D] flex items-center justify-center font-mono text-sm font-bold mb-6 bg-[#0A1930] shadow-inner group-hover:bg-gradient-to-br group-hover:from-[#1A6BBA] group-hover:to-[#5DBB4D] group-hover:text-[#0A1930] group-hover:border-transparent transition-all duration-300">
                  {step.num}
                </div>
                
                <h3 className="text-lg font-bold text-white mb-3 font-serif relative z-10">{step.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed relative z-10">{step.desc}</p>
                
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-[#1A6BBA] to-[#5DBB4D] group-hover:w-full transition-all duration-500 ease-out"></div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* =========================================
            BOOKING FORM SECTION
            ========================================= */}
        <motion.div 
          id="booking-form"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#132644]/90 backdrop-blur-md border border-[#3c5685]/50 shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-8 sm:p-12 md:p-14 max-w-4xl mx-auto"
        >
          <div className="mb-10">
            <div className="text-[#1A6BBA] text-xs font-bold uppercase tracking-[0.2em] mb-2">Book a session</div>
            <h2 className="text-xl sm:text-2xl font-serif text-white border-b border-[#3c5685]/40 pb-4">
              Confirmation goes to +880 1711 902441 · whynotyou.psy@gmail.com
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Name */}
              <div>
                <label className="block text-xs font-bold tracking-widest text-[#5DBB4D] mb-3 uppercase">Your name</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-[#0A1930]/80 border border-[#3c5685]/60 text-white px-5 py-3 outline-none focus:border-[#5DBB4D] transition-colors"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-bold tracking-widest text-[#5DBB4D] mb-3 uppercase">Phone we should call</label>
                <input
                  required
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-[#0A1930]/80 border border-[#3c5685]/60 text-white px-5 py-3 outline-none focus:border-[#5DBB4D] transition-colors"
                />
              </div>
            </div>

            {/* Specialist Dropdown */}
            <div>
              <label className="block text-xs font-bold tracking-widest text-[#5DBB4D] mb-3 uppercase">Specialist</label>
              <div className="relative">
                <select
                  value={formData.specialist}
                  onChange={(e) => setFormData({...formData, specialist: e.target.value})}
                  className="w-full bg-[#0A1930]/80 border border-[#3c5685]/60 text-white px-5 py-4 outline-none focus:border-[#5DBB4D] transition-colors appearance-none cursor-pointer"
                >
                  <option value="" className="text-white/40">Select a specialist (Optional)</option>
                  {experts.map(exp => (
                    <option key={exp.initials} value={exp.name}>{exp.name}</option>
                  ))}
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-[#5DBB4D]">▼</div>
              </div>
            </div>

            {/* Concern Textarea */}
            <div>
              <label className="block text-xs font-bold tracking-widest text-[#5DBB4D] mb-3 uppercase">
                Briefly, what is going on? What would you like help with?
              </label>
              <textarea
                rows={4}
                value={formData.concern}
                onChange={(e) => setFormData({...formData, concern: e.target.value})}
                className="w-full bg-[#0A1930]/80 border border-[#3c5685]/60 text-white px-5 py-4 outline-none focus:border-[#5DBB4D] transition-colors resize-none"
              ></textarea>
            </div>

            {/* Preferred Days (Square Toggles) */}
            <div>
              <label className="block text-xs font-bold tracking-widest text-[#5DBB4D] mb-3 uppercase">Preferred days</label>
              <div className="flex flex-wrap gap-3">
                {["Sat", "Sun", "Mon", "Tue", "Wed", "Thu"].map((day) => {
                  const isSelected = formData.days.includes(day);
                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => toggleArrayItem("days", day)}
                      className={`px-5 py-2 text-sm transition-all duration-300 border ${
                        isSelected
                          ? "bg-gradient-to-r from-[#1A6BBA]/20 to-[#5DBB4D]/20 text-[#5DBB4D] border-[#5DBB4D] font-bold"
                          : "bg-[#0A1930] border-[#3c5685]/50 text-white/60 hover:text-white hover:border-[#1A6BBA]/50"
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Preferred Time (Square Toggles) */}
            <div>
              <label className="block text-xs font-bold tracking-widest text-[#5DBB4D] mb-3 uppercase">Preferred time</label>
              <div className="flex flex-wrap gap-3">
                {["Morning", "Afternoon", "Evening after 6pm"].map((time) => {
                  const isSelected = formData.times.includes(time);
                  return (
                    <button
                      key={time}
                      type="button"
                      onClick={() => toggleArrayItem("times", time)}
                      className={`px-5 py-2 text-sm transition-all duration-300 border ${
                        isSelected
                          ? "bg-gradient-to-r from-[#1A6BBA]/20 to-[#5DBB4D]/20 text-[#5DBB4D] border-[#5DBB4D] font-bold"
                          : "bg-[#0A1930] border-[#3c5685]/50 text-white/60 hover:text-white hover:border-[#1A6BBA]/50"
                      }`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Language (Square Toggles) */}
            <div>
              <label className="block text-xs font-bold tracking-widest text-[#5DBB4D] mb-3 uppercase">Language</label>
              <div className="flex flex-wrap gap-3">
                {["English", "বাংলা"].map((lang) => {
                  const isSelected = formData.language.includes(lang);
                  return (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => toggleArrayItem("language", lang)}
                      className={`px-6 py-2 text-sm transition-all duration-300 border ${
                        isSelected
                          ? "bg-gradient-to-r from-[#1A6BBA]/20 to-[#5DBB4D]/20 text-[#5DBB4D] border-[#5DBB4D] font-bold"
                          : "bg-[#0A1930] border-[#3c5685]/50 text-white/60 hover:text-white hover:border-[#1A6BBA]/50"
                      }`}
                    >
                      {lang}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Success Message */}
            {submitted && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#5DBB4D]/10 border border-[#5DBB4D]/40 text-[#5DBB4D] p-4 text-sm font-bold text-center flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Request sent successfully! We will contact you soon.
              </motion.div>
            )}

            {/* Submit Button & Disclaimer */}
            <div className="pt-6 border-t border-[#3c5685]/40 text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto relative overflow-hidden bg-[#0A1930] disabled:bg-[#132644] disabled:text-white/30 disabled:cursor-not-allowed text-[#5DBB4D] hover:text-[#0A1930] border border-[#5DBB4D] font-bold text-sm uppercase tracking-widest px-12 py-4 transition-all duration-500 flex justify-center items-center gap-3 group mx-auto"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#1A6BBA] to-[#5DBB4D] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out z-0"></div>
                <span className="relative z-10">{isSubmitting ? "Sending..." : "Request this session"}</span>
              </button>
              
              <p className="text-white/40 text-xs mt-4 tracking-wide">
                You will get a call from WNY within one working day. Nothing is charged until the time is agreed.
              </p>
            </div>

          </form>

        </motion.div>

      </div>
    </div>
  );
}