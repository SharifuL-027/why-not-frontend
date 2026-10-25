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
      desc: "20+ years of clinical and assessment practice. Works with adults and couples in relationships, life direction and recovery from prolonged stress, and uses art-based methods where words are hard."
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
    <div className="relative w-full min-h-screen bg-[#F9F6F0] overflow-hidden flex flex-col pt-40 md:pt-34 pb-24 px-4 sm:px-6">
      
      {/* =======================================================
          WHOLE PAGE PARALLAX BACKGROUND IMAGE & GRADIENT OVERLAY
          ======================================================= */}
      {/* Fixed zooming issue using backgroundSize: '100% auto' and top alignment. 
          Applied a heavy Ivory overlay (90%) to match the "pale version" instruction. */}
      <div 
  className="absolute inset-0 z-5 opacity-30 pointer-events-none"
  style={{
    backgroundImage: "url('https://res.cloudinary.com/dsrs8hryx/image/upload/v1790752896/WhatsApp_Image_2026-09-28_at_11.47.36_AM_nqgpjn.jpg')",
    backgroundSize: 'cover', /* '100% auto' এর বদলে 'cover' করা হয়েছে */
    backgroundPosition: 'center', /* 'top center' এর বদলে 'center' করা হয়েছে */
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed', 
  }}
/>
      {/* Heavy Ivory Overlay to mute the background image */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#F9F6F0]/95 via-[#F9F6F0]/90 to-[#F9F6F0] pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl mx-auto flex-1">
        
        {/* =========================================
            HERO SECTION
            ========================================= */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-20 border-b border-[#EFECE5] pb-10"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[#A38771] font-bold tracking-[0.2em] uppercase text-xs sm:text-sm">
              ONLINE SESSIONS - ENGLISH OR BENGALI
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl text-[#222222] font-serif tracking-tight drop-shadow-sm mb-6 leading-tight">
            Meet the person you will <br className="hidden md:block" />
            <span className="italic font-light text-[#A38771]">actually be talking to</span>
          </h1>
          <p className="text-[#4A4A4A] text-base sm:text-[22px] max-w-3xl leading-relaxed lato-regular border-l-2 border-[#A38771] pl-4">
            Choose the specialist whose work fits your situation; or describe the concern and let us route you. Every first session begins with a short call from us — you will never be handed a link and left to it.
          </p>
        </motion.div>

        {/* =========================================
            OUR EXPERTS SECTION
            ========================================= */}
        <div className="mb-24">
          <div className="flex items-center gap-3 mb-10 border-b border-[#EFECE5] pb-4">
            <h2 className="text-3xl font-serif text-[#222222] tracking-wide">Our experts</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {experts.map((exp, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="relative bg-white border border-[#EFECE5] p-8 sm:p-10 flex flex-col group hover:border-[#A38771] shadow-sm hover:shadow-[0_15px_30px_rgba(0,0,0,0.04)] transition-all duration-500 overflow-hidden rounded-sm"
              >
                {/* Animated Top Border Line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-[#A38771] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out z-20"></div>

                <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-8">
                  {/* Initials Stamp */}
                  <div className="w-16 h-16 shrink-0 bg-[#EFECE5] flex items-center justify-center relative transition-colors duration-500 rounded-sm">
                    <span className="text-2xl font-serif font-bold text-[#222222]">
                      {exp.initials}
                    </span>
                  </div>
                  
                  {/* Name & Title */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#222222] mb-2 font-serif group-hover:text-[#A38771] transition-colors duration-300">
                      {exp.name}
                    </h3>
                    <div className="text-xs text-[#A38771] uppercase tracking-[0.15em] font-bold leading-relaxed">
                      {exp.title}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-md text-[#4A4A4A] font-serif leading-loose flex-1 mb-10 relative z-10 border-l-2 border-[#EFECE5] pl-5 transition-colors duration-300">
                  {exp.desc}
                </p>

                {/* Action Button */}
                <button 
                  onClick={() => scrollToForm(exp.name)}
                  className="mt-auto self-start relative z-10 flex items-center gap-4 group/btn outline-none"
                >
                  <span className="text-sm font-bold uppercase tracking-widest text-[#222222] group-hover/btn:text-[#A38771] transition-colors duration-300">
                    Book a session
                  </span>
                  <span className="w-10 h-10 flex items-center justify-center bg-[#F9F6F0] border border-[#EFECE5] group-hover/btn:border-[#A38771] transition-all duration-300 rounded-sm">
                    <svg className="w-4 h-4 text-[#222222] group-hover/btn:text-[#A38771] group-hover/btn:translate-x-1 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
          <div className="flex items-center gap-3 mb-8 border-b border-[#EFECE5] pb-4">
            <h2 className="text-2xl sm:text-3xl font-serif text-[#222222] tracking-wide">What we counsel on</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {counselTopics.map((topic, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-[#EFECE5] p-8 transition-all duration-300 rounded-sm"
              >
                <h3 className="text-lg font-bold text-[#222222] mb-3 font-serif">{topic.title}</h3>
                <p className="text-sm text-[#4A4A4A] leading-relaxed">{topic.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* =========================================
            HOW A SESSION GETS FIXED (STEPS)
            ========================================= */}
        <div className="mb-24">
          <div className="text-[#A38771] text-xs font-bold uppercase tracking-[0.2em] mb-3">Booking - Three Steps</div>
          <div className="flex items-center gap-3 mb-8 border-b border-[#EFECE5] pb-4">
            <h2 className="text-2xl sm:text-3xl font-serif text-[#222222] tracking-wide">How a session gets fixed</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {steps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white border border-[#EFECE5] p-8 relative overflow-hidden transition-all duration-300 shadow-sm rounded-sm"
              >
                {/* Large Background Number */}
                <div className="text-6xl font-mono font-extrabold text-[#F9F6F0] absolute -right-4 -top-4 pointer-events-none">
                  {step.num}
                </div>
                
                {/* Small Box Number */}
                <div className="w-10 h-10 border border-[#A38771] text-[#222222] flex items-center justify-center font-mono text-sm font-bold mb-6 bg-[#EFECE5] rounded-sm">
                  {step.num}
                </div>
                
                <h3 className="text-lg font-bold text-[#222222] mb-3 font-serif relative z-10">{step.title}</h3>
                <p className="text-sm text-[#4A4A4A] leading-relaxed relative z-10">{step.desc}</p>
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
          className="bg-white border border-[#EFECE5] shadow-sm p-8 sm:p-12 md:p-14 max-w-4xl mx-auto rounded-sm"
        >
          <div className="mb-10">
            <div className="text-[#A38771] text-xs font-bold uppercase tracking-[0.2em] mb-2">Book a session</div>
            <h2 className="text-xl sm:text-2xl font-serif text-[#222222] border-b border-[#EFECE5] pb-4">
              Confirmation goes to +880 1711 902441 · whynotyou.psy@gmail.com
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Name */}
              <div>
                <label className="block text-xs font-bold tracking-widest text-[#222222] mb-3 uppercase">Your name</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-[#F9F6F0] border border-[#EFECE5] text-[#222222] px-5 py-3 outline-none focus:border-[#A38771] transition-colors rounded-sm"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-bold tracking-widest text-[#222222] mb-3 uppercase">Phone we should call</label>
                <input
                  required
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-[#F9F6F0] border border-[#EFECE5] text-[#222222] px-5 py-3 outline-none focus:border-[#A38771] transition-colors rounded-sm"
                />
              </div>
            </div>

            {/* Specialist Dropdown */}
            <div>
              <label className="block text-xs font-bold tracking-widest text-[#222222] mb-3 uppercase">Specialist</label>
              <div className="relative">
                <select
                  value={formData.specialist}
                  onChange={(e) => setFormData({...formData, specialist: e.target.value})}
                  className="w-full bg-[#F9F6F0] border border-[#EFECE5] text-[#222222] px-5 py-4 outline-none focus:border-[#A38771] transition-colors appearance-none cursor-pointer rounded-sm"
                >
                  <option value="" className="text-[#4A4A4A]">Select a specialist (Optional)</option>
                  {experts.map(exp => (
                    <option key={exp.initials} value={exp.name}>{exp.name}</option>
                  ))}
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-[#222222]">▼</div>
              </div>
            </div>

            {/* Concern Textarea */}
            <div>
              <label className="block text-xs font-bold tracking-widest text-[#222222] mb-3 uppercase">
                Briefly, what is going on? What would you like help with?
              </label>
              <textarea
                rows={4}
                value={formData.concern}
                onChange={(e) => setFormData({...formData, concern: e.target.value})}
                className="w-full bg-[#F9F6F0] border border-[#EFECE5] text-[#222222] px-5 py-4 outline-none focus:border-[#A38771] transition-colors resize-none rounded-sm"
              ></textarea>
            </div>

            {/* Preferred Days */}
            <div>
              <label className="block text-xs font-bold tracking-widest text-[#222222] mb-3 uppercase">Preferred days</label>
              <div className="flex flex-wrap gap-3">
                {["Sat", "Sun", "Mon", "Tue", "Wed", "Thu"].map((day) => {
                  const isSelected = formData.days.includes(day);
                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => toggleArrayItem("days", day)}
                      className={`px-5 py-2 text-sm transition-all duration-300 border rounded-sm ${
                        isSelected
                          ? "bg-[#EFECE5] text-[#222222] border-[#A38771] font-bold"
                          : "bg-[#F9F6F0] border-[#EFECE5] text-[#4A4A4A] hover:border-[#A38771] hover:text-[#222222]"
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Preferred Time */}
            <div>
              <label className="block text-xs font-bold tracking-widest text-[#222222] mb-3 uppercase">Preferred time</label>
              <div className="flex flex-wrap gap-3">
                {["Morning", "Afternoon", "Evening after 6pm"].map((time) => {
                  const isSelected = formData.times.includes(time);
                  return (
                    <button
                      key={time}
                      type="button"
                      onClick={() => toggleArrayItem("times", time)}
                      className={`px-5 py-2 text-sm transition-all duration-300 border rounded-sm ${
                        isSelected
                          ? "bg-[#EFECE5] text-[#222222] border-[#A38771] font-bold"
                          : "bg-[#F9F6F0] border-[#EFECE5] text-[#4A4A4A] hover:border-[#A38771] hover:text-[#222222]"
                      }`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Language */}
            <div>
              <label className="block text-xs font-bold tracking-widest text-[#222222] mb-3 uppercase">Language</label>
              <div className="flex flex-wrap gap-3">
                {["English", "বাংলা"].map((lang) => {
                  const isSelected = formData.language.includes(lang);
                  return (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => toggleArrayItem("language", lang)}
                      className={`px-6 py-2 text-sm transition-all duration-300 border rounded-sm ${
                        isSelected
                          ? "bg-[#EFECE5] text-[#222222] border-[#A38771] font-bold"
                          : "bg-[#F9F6F0] border-[#EFECE5] text-[#4A4A4A] hover:border-[#A38771] hover:text-[#222222]"
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
                className="bg-green-50 border border-green-200 text-green-700 p-4 text-sm font-bold text-center flex items-center justify-center gap-2 rounded-sm"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Request sent successfully! We will contact you soon.
              </motion.div>
            )}

            {/* Submit Button & Disclaimer */}
            <div className="pt-6 border-t border-[#EFECE5] text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto relative overflow-hidden bg-[#222222] disabled:bg-[#EFECE5] disabled:text-[#4A4A4A] disabled:cursor-not-allowed text-[#F9F6F0] hover:bg-[#4A4A4A] border border-transparent font-bold text-sm uppercase tracking-widest px-12 py-4 transition-all duration-300 flex justify-center items-center gap-3 mx-auto rounded-sm shadow-sm"
              >
                <span className="relative z-10">{isSubmitting ? "Sending..." : "Request this session"}</span>
              </button>
              
              <p className="text-[#4A4A4A] text-xs mt-4 tracking-wide">
                You will get a call from WNY within one working day. Nothing is charged until the time is agreed.
              </p>
            </div>

          </form>

        </motion.div>

      </div>
    </div>
  );
}