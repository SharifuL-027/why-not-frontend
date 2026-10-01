import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function ArtTherapy() {
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

  const scrollToForm = () => {
    document.getElementById("art-therapy-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const experts = [
    { initials: "RS", name: "Roksana Sultana, PhD" },
    { initials: "FZ", name: "Farzana Ferdous Zaman" },
    { initials: "NC", name: "Nowsaba Chowdhury" },
    { initials: "SM", name: "Sania Mahima" }
  ];

  return (
    <div className="w-full min-h-screen font-sans bg-[#F9F6F0]">
      
      {/* =========================================
          SECTION 1: HERO (Light Ivory)
          ========================================= */}
      <section className="pt-40 pb-20 px-6 sm:px-12 md:px-20 lg:pl-[90px] max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1"
        >
          <h1 className="text-4xl sm:text-3xl md:text-5xl font-serif text-[#222222] leading-[1.1] mb-4">
            Healing Beyond Words
          </h1>
          <p className="text-[#A38771] italic text-lg sm:text-xl font-serif mb-8">
            Art therapy is a blend of psychology & art.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex-1 max-w-lg border-l-2 border-[#A38771]/30 pl-6 md:pl-10"
        >
          <p className="text-[#4A4A4A] text-lg leading-relaxed mb-8">
            For when talking isn't enough, we use art to understand what's happening inside. A specialized therapeutic approach blending psychological theory with the creative process to improve mental, emotional, and physical well-being.
          </p>
          <p className="text-[#4A4A4A] text-lg leading-relaxed mb-8">
            This is not about making "good" art. It is about expressing what words cannot capture.
          </p>
          <button 
            onClick={scrollToForm}
            className="bg-[#C05C44] hover:bg-[#a84d37] text-white px-10 py-4 font-bold uppercase tracking-widest text-sm transition-colors duration-300 rounded-sm shadow-sm"
          >
            Book a Session
          </button>
        </motion.div>
      </section>

      {/* =========================================
          SECTION 2: WHAT IS ART THERAPY? (Deep Green)
          ========================================= */}
      <section className="bg-[#1E3A34] text-[#F9F6F0] py-24 px-6 sm:px-12 md:px-20 lg:pl-[90px]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="flex-1"
          >
            <h2 className="text-3xl sm:text-4xl font-serif mb-6 text-white">What is Art Therapy?</h2>
            <p className="text-[#F9F6F0]/80 leading-relaxed text-lg mb-6">
              Art therapy is an integrative mental health and human services profession that enriches the lives of individuals, families, and communities through active art-making, creative process, applied psychological theory, and human experience within a psychotherapeutic relationship.
            </p>
            <p className="text-[#A38771] font-bold tracking-widest uppercase text-sm mb-4">The Core Methodology</p>
            <p className="text-[#F9F6F0]/80 leading-relaxed">
              By engaging the mind and body simultaneously, it bypasses the traditional verbal defenses we build up, allowing true feelings and subconscious patterns to emerge onto the canvas or paper.
            </p>
          </motion.div>

          <div className="flex-1 flex flex-col gap-10">
            {[
              {
                title: "It's Not an Art Class",
                desc: "No artistic talent is required. The focus is entirely on the process of creation and the feelings it evokes, not on creating a masterpiece."
              },
              {
                title: "It's a Safe Space",
                desc: "You choose what to share and what to keep private. Your artwork serves as a container for intense emotions, making them safer to observe."
              },
              {
                title: "It's for Everyone",
                desc: "Children processing developmental changes, teens navigating identity, and adults recovering from trauma or burnout can all deeply benefit."
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="border-l border-[#A38771]/50 pl-6"
              >
                <h3 className="text-xl font-serif text-white mb-2">{item.title}</h3>
                <p className="text-[#F9F6F0]/60 leading-relaxed text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 3: WHY IT WORKS (Light Ivory)
          ========================================= */}
      <section className="py-24 px-6 sm:px-12 md:px-20 lg:pl-[90px] max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-serif text-[#222222] mb-6">Why Art Therapy Works</h2>
          <p className="text-[#4A4A4A] text-lg leading-relaxed mb-6">
            Research shows that creating art engages different parts of the brain than talking does. It bypasses the language centers (which are often blocked during trauma or extreme stress), allowing us to access memories, emotions, and thoughts that might be too difficult or painful to put into words.
          </p>
          <p className="text-[#4A4A4A] text-lg leading-relaxed">
            By externalizing a problem—putting it on paper—it becomes something you can look at objectively, manipulate, and eventually understand and resolve.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-serif text-[#222222] mb-6">How Art Therapy Shapes Personality</h3>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <span className="text-[#C05C44] font-bold mt-1">01</span>
                <div>
                  <h4 className="font-bold text-[#222222] mb-1">Boosts Self-Esteem</h4>
                  <p className="text-[#4A4A4A] text-sm leading-relaxed">The act of creating something tangible provides an immediate sense of accomplishment and agency.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="text-[#C05C44] font-bold mt-1">02</span>
                <div>
                  <h4 className="font-bold text-[#222222] mb-1">Enhances Emotional Resilience</h4>
                  <p className="text-[#4A4A4A] text-sm leading-relaxed">Provides a safe sandbox to experience and tolerate frustration, imperfection, and problem-solving.</p>
                </div>
              </li>
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#EFECE5] p-8 rounded-sm flex items-center justify-center min-h-[250px]"
          >
            <span className="text-xs text-[#A38771] uppercase tracking-widest font-mono">[ Placeholder for Therapy Image ]</span>
          </motion.div>
        </div>
      </section>

      {/* =========================================
          SECTION 4: EFFECTIVENESS STATS (Warm Beige)
          ========================================= */}
      <section className="bg-[#EFECE5] py-24 px-6 sm:px-12 md:px-20 lg:pl-[90px]">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center sm:text-left"
          >
            <span className="text-[#A38771] text-xs font-bold uppercase tracking-[0.2em] mb-2 block">Data Driven</span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#222222]">How Effective is Art Therapy?</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { stat: "73%", title: "Reduction in Symptoms", text: "of patients experienced a significant reduction in depression and anxiety symptoms after 10-12 consistent sessions." },
              { stat: "1,000+", title: "Clinical Studies", text: "have rigorously shown the effectiveness of art therapy in treating a wide range of psychological and psychosomatic conditions." },
              { stat: "80%", title: "Improved Regulation", text: "of individuals report highly improved emotional regulation, self-awareness, and self-esteem through art interventions." }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="bg-white border border-[#A38771]/20 p-8 shadow-sm rounded-sm"
              >
                <div className="text-5xl font-serif text-[#C05C44] mb-4">{item.stat}</div>
                <h4 className="font-bold text-[#222222] mb-3">{item.title}</h4>
                <p className="text-sm text-[#4A4A4A] leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>

          <div className="bg-[#1E3A34] text-white p-8 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="font-serif text-lg">Backed by the American Art Therapy Association (AATA)</p>
            <p className="text-sm text-[#F9F6F0]/70 max-w-md border-l border-[#F9F6F0]/20 pl-4">
              "Art therapy is an effective treatment for persons experiencing developmental, medical, educational, and social or psychological impairment."
            </p>
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 5: EXPERT PROFILE (Light Ivory)
          ========================================= */}
      <section className="py-24 px-6 sm:px-12 md:px-20 lg:pl-[90px] max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-2/5 aspect-[3/4] bg-[#EFECE5] overflow-hidden border border-[#A38771]/30 rounded-sm"
        >
          <img 
            src="https://res.cloudinary.com/dsrs8hryx/image/upload/v1790752894/roksana_2_peisij.jpg" 
            alt="Roksana Sultana" 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-3/5"
        >
          <span className="text-[#A38771] text-xs font-bold uppercase tracking-[0.2em] mb-2 block">Lead Specialist</span>
          <h2 className="text-4xl font-serif text-[#222222] mb-2">Roksana Sultana, PhD</h2>
          <p className="text-sm text-[#C05C44] uppercase tracking-widest font-bold mb-8">Psychologist · Art Therapist</p>
          
          <p className="text-[#4A4A4A] leading-relaxed mb-6">
            With over 15 years of clinical and assessment practice, Dr. Sultana pioneers the integration of art-based methods in Bangladesh. She specializes in working with adults and adolescents dealing with profound stress, trauma, and life transitions.
          </p>
          <p className="text-[#4A4A4A] leading-relaxed mb-10">
            Her approach is rooted in the belief that when cognitive and verbal channels are overwhelmed by trauma or anxiety, the creative process offers a dignified, non-threatening pathway back to the self.
          </p>

          <blockquote className="border-l-2 border-[#C05C44] pl-6 py-2">
            <p className="font-serif italic text-2xl text-[#A38771] leading-snug">
              "Art is a safe place to put your feelings when they don't have anywhere else to go."
            </p>
          </blockquote>
        </motion.div>
      </section>

      {/* =========================================
          SECTION 6: EXACT PREVIOUS BOOKING FORM
          ========================================= */}
      <section id="art-therapy-form" className="bg-[#1E3A34] text-[#F9F6F0] py-24 px-6 sm:px-12 md:px-20 lg:pl-[90px]">
        <div className="max-w-4xl mx-auto flex flex-col gap-12">
          
          <div className="text-center mb-4">
            <h2 className="text-3xl sm:text-4xl font-serif mb-4 text-white">Begin Your Healing Journey</h2>
            <p className="text-[#F9F6F0]/70 leading-relaxed max-w-2xl mx-auto">
              Art therapy sessions are available for individuals, couples, and specialized groups. No prior art experience is needed—only a willingness to explore.
            </p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white border border-[#EFECE5] shadow-2xl p-8 sm:p-12 md:p-14 w-full rounded-sm text-[#222222]"
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
      </section>

    </div>
  );
}