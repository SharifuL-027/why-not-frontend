import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

// ==========================================
// Research Data (10 Detailed Researches)
// ==========================================
interface Research {
  id: number;
  category: string;
  readTime: string;
  title: string;
  excerpt: string;
  fullText: React.ReactNode;
}

const researchData: Research[] = [
  {
    id: 1,
    category: "NEUROSCIENCE",
    readTime: "8 MIN READ",
    title: "The Impact of Mindfulness on Amygdala Reactivity",
    excerpt: "How psychological awareness and mindful practices physically alter the brain's stress center.",
    fullText: (
      <>
        <p className="mb-4">Recent neuroimaging studies have demonstrated that regular psychological awareness practices, such as mindfulness, lead to decreased cell volume in the amygdala—the brain region responsible for fear, anxiety, and stress.</p>
        <p className="mb-4">Researchers found that as the amygdala shrinks, the pre-frontal cortex (responsible for higher-order functions like concentration and decision-making) becomes thicker. This proves that self-awareness is not just a psychological concept, but a biological mechanism capable of changing brain structure.</p>
        <p className="mb-4 border-l-2 border-[#5DBB4D] pl-4 italic text-white/80">"Awareness acts as a neurological scalpel, pruning reactive stress pathways and reinforcing conscious decision-making circuits."</p>
        <p>In practice, individuals with higher psychological awareness recover from stress 40% faster than those who operate purely on autopilot.</p>
      </>
    )
  },
  {
    id: 2,
    category: "BEHAVIORAL PSYCHOLOGY",
    readTime: "10 MIN READ",
    title: "Cognitive Dissonance and Self-Deception",
    excerpt: "Why our brains lie to us to protect our ego, and how awareness breaks the cycle.",
    fullText: (
      <>
        <p className="mb-4">Cognitive dissonance occurs when we hold two conflicting beliefs, or when our behavior contradicts our values. To resolve this uncomfortable tension, the brain often resorts to self-deception.</p>
        <p className="mb-4">Research indicates that without active psychological awareness, humans will rationalize highly destructive behaviors (like staying in toxic environments or avoiding career changes) simply to avoid the pain of admitting they were wrong.</p>
        <p>By cultivating awareness, individuals learn to sit with the discomfort of being wrong. This drastically accelerates personal growth, as the energy previously spent on protecting the ego is redirected toward solving the actual problem.</p>
      </>
    )
  },
  {
    id: 3,
    category: "CLINICAL RESEARCH",
    readTime: "7 MIN READ",
    title: "The Gut-Brain Axis: Emotional Processing",
    excerpt: "Understanding the bidirectional communication between our digestive system and emotional states.",
    fullText: (
      <>
        <p className="mb-4">The enteric nervous system (often called the 'second brain') contains over 100 million neurons. Research shows that 90% of serotonin is produced in the gut.</p>
        <p className="mb-4">Psychological awareness helps individuals recognize the physical symptoms of emotional distress. For instance, chronic unexplained stomach issues are frequently linked to unexpressed anxiety or repressed trauma.</p>
        <p>Awareness of this connection allows for holistic treatment—addressing both the psychological stressor and supporting the physiological system simultaneously.</p>
      </>
    )
  },
  {
    id: 4,
    category: "WORKPLACE PSYCHOLOGY",
    readTime: "12 MIN READ",
    title: "Psychological Safety in Corporate Teams",
    excerpt: "Why the highest-performing teams are those where psychological awareness is prioritized.",
    fullText: (
      <>
        <p className="mb-4">Google's famous 'Project Aristotle' studied hundreds of its teams to figure out why some stumbled while others soared. The number one defining factor was 'Psychological Safety'.</p>
        <p className="mb-4">Psychological safety is the shared belief that the team is safe for interpersonal risk-taking. It requires high psychological awareness from leaders to foster an environment where employees aren't afraid to admit mistakes or pitch radical ideas.</p>
        <p>Teams lacking this awareness suffer from high turnover, hidden errors, and stagnant innovation.</p>
      </>
    )
  },
  {
    id: 5,
    category: "DEVELOPMENTAL",
    readTime: "9 MIN READ",
    title: "Intergenerational Trauma Transmission",
    excerpt: "How unspoken psychological wounds are passed down, and how awareness stops the chain.",
    fullText: (
      <>
        <p className="mb-4">Epigenetic studies suggest that trauma can leave a chemical mark on a person's genes, which can then be passed down to future generations. However, behavior is an even stronger transmitter.</p>
        <p className="mb-4">Parents who lack psychological awareness unconsciously pass their coping mechanisms, fears, and reactive behaviors to their children. A parent terrified of financial ruin may raise a child who hoards resources, even in abundance.</p>
        <p>Breaking this cycle requires fierce psychological awareness—the ability to look at one's own reactions and say, "This is my trauma talking, not the present reality."</p>
      </>
    )
  },
  {
    id: 6,
    category: "COGNITIVE SCIENCE",
    readTime: "6 MIN READ",
    title: "The Illusion of Multitasking",
    excerpt: "How a lack of awareness regarding our cognitive limits leads to severe burnout.",
    fullText: (
      <>
        <p className="mb-4">The human brain cannot perform two complex cognitive tasks simultaneously. What we call multitasking is actually 'task-switching', and it comes with a heavy neurological cost.</p>
        <p className="mb-4">Research shows that continuous task-switching drops IQ by an average of 10 points (equivalent to losing a night of sleep) and spikes cortisol levels.</p>
        <p>Awareness of our cognitive boundaries allows us to structure our lives around 'deep work' phases, protecting our mental energy and drastically improving output quality.</p>
      </>
    )
  },
  {
    id: 7,
    category: "SOCIAL PSYCHOLOGY",
    readTime: "11 MIN READ",
    title: "Echo Chambers and Confirmation Bias",
    excerpt: "The psychology behind why we only consume information that agrees with us.",
    fullText: (
      <>
        <p className="mb-4">Confirmation bias is the tendency to search for, interpret, favor, and recall information in a way that confirms one's preexisting beliefs.</p>
        <p className="mb-4">In the digital age, algorithms weaponize this bias to keep us engaged, creating massive psychological echo chambers. Without psychological awareness, individuals become highly polarized, losing the ability to empathize or understand differing viewpoints.</p>
        <p>Awareness acts as a circuit breaker, prompting us to actively seek disconfirming evidence and maintain cognitive flexibility.</p>
      </>
    )
  },
  {
    id: 8,
    category: "EMOTIONAL INTELLIGENCE",
    readTime: "8 MIN READ",
    title: "Alexithymia: The Inability to Name Emotions",
    excerpt: "Why having a limited emotional vocabulary traps us in physical stress.",
    fullText: (
      <>
        <p className="mb-4">Alexithymia is a personality construct characterized by the subclinical inability to identify and describe emotions experienced by oneself. Research shows nearly 10% of the population struggles with this.</p>
        <p className="mb-4">When we cannot name an emotion (e.g., confusing anxiety with physical hunger, or sadness with anger), we cannot regulate it. The emotion gets trapped in the body, often leading to psychosomatic illness.</p>
        <p>Developing psychological awareness involves building an emotional vocabulary. Studies show that simply putting a feeling into precise words decreases the electrical activity in the amygdala.</p>
      </>
    )
  },
  {
    id: 9,
    category: "CLINICAL PSYCHOLOGY",
    readTime: "14 MIN READ",
    title: "Imposter Syndrome in High Achievers",
    excerpt: "The psychological paradox where success breeds overwhelming self-doubt.",
    fullText: (
      <>
        <p className="mb-4">Imposter syndrome is a psychological pattern in which an individual doubts their skills, talents, or accomplishments and has a persistent internalized fear of being exposed as a fraud.</p>
        <p className="mb-4">Interestingly, research shows it most frequently affects highly capable individuals. Because they learn things quickly, they assume the task must be easy for everyone, devaluing their own expertise.</p>
        <p>Awareness helps separate 'feelings' from 'facts'. By tracking actual accomplishments objectively, individuals can neurologically rewire their self-perception over time.</p>
      </>
    )
  },
  {
    id: 10,
    category: "ADDICTION RESEARCH",
    readTime: "15 MIN READ",
    title: "Dopamine Deregulation in the Digital Age",
    excerpt: "How endless scrolling hijacks the brain's reward system, and the awareness needed to reclaim it.",
    fullText: (
      <>
        <p className="mb-4">Dopamine is not the chemical of pleasure; it is the chemical of pursuit and motivation. Modern apps are designed to trigger dopamine spikes at unpredictable intervals, creating a behavioral loop identical to a slot machine.</p>
        <p className="mb-4">Over time, the brain's baseline for dopamine drops, making everyday tasks (like reading a book or working) feel unbearably boring and difficult.</p>
        <p>Psychological awareness is the first line of defense. By recognizing the physical urge to check a phone as a neurological craving rather than a conscious choice, individuals can begin 'dopamine fasting' and restore their baseline motivation.</p>
      </>
    )
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
      className="fixed inset-0 z-0 opacity-20 pointer-events-none"
      style={{
        backgroundImage: "url('https://res.cloudinary.com/dsrs8hryx/image/upload/v1790244691/image.png_2K_20260924160842_o0uxxt.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    />
    <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#0A1930]/95 via-[#0A1930]/85 to-[#0A1930] pointer-events-none" />
    <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-[#1A6BBA]/10 rounded-full blur-[180px] pointer-events-none z-0"></div>
    <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-[#5DBB4D]/10 rounded-full blur-[180px] pointer-events-none z-0"></div>
  </>
);

export default function PsychologicalAwareness() {
  const [selectedResearch, setSelectedResearch] = useState<Research | null>(null);

  return (
    <div className="relative w-full min-h-screen lg:pl-[50px] overflow-hidden flex flex-col pt-32 pb-32 px-4 sm:px-6 md:px-10 font-sans">
      <SharedBackground />

      {/* =========================================
          MODAL (POPUP) SECTION FOR RESEARCH
          ========================================= */}
      <AnimatePresence>
        {selectedResearch && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-10 py-10 bg-[#0A1930]/90 backdrop-blur-md lg:pl-[50px]"
          >
            <div className="absolute inset-0 cursor-pointer" onClick={() => setSelectedResearch(null)}></div>
            
            <motion.div 
              initial={{ y: 50, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 20, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative w-full max-w-4xl bg-[#132644] border border-[#5DBB4D]/50 shadow-[0_20px_60px_rgba(0,0,0,0.8)] max-h-full flex flex-col overflow-hidden"
            >
              <div className="h-1.5 w-full bg-gradient-to-r from-[#1A6BBA] to-[#5DBB4D]"></div>
              
              <button 
                onClick={() => setSelectedResearch(null)}
                className="absolute top-4 right-4 w-12 h-12 bg-[#0A1930] border border-[#3c5685] text-white/50 hover:text-white hover:border-red-500 hover:bg-red-500/10 flex items-center justify-center transition-all duration-300 z-20"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="p-8 sm:p-14 overflow-y-auto custom-scrollbar relative">
                <svg className="absolute top-10 right-10 w-48 h-48 text-[#5DBB4D] opacity-5 pointer-events-none -rotate-12" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4C20 4 14 3 9 8C4 13 4 20 4 20C4 20 11 20 16 15C21 10 20 4 20 4Z" />
                </svg>

                <div className="flex items-center gap-4 mb-8 relative z-10">
                  <span className="text-xs sm:text-sm font-bold text-transparent bg-gradient-to-r from-[#1A6BBA] to-[#5DBB4D] bg-clip-text uppercase tracking-[0.2em] border border-[#3c5685]/60 px-4 py-1.5 bg-[#0A1930]">
                    {selectedResearch.category}
                  </span>
                  <span className="text-xs sm:text-sm text-white/40 tracking-[0.1em] uppercase">{selectedResearch.readTime}</span>
                </div>
                
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white mb-10 leading-tight relative z-10 drop-shadow-md">
                  {selectedResearch.title}
                </h2>
                
                <div className="text-lg sm:text-xl text-white/80 leading-loose lato-regular relative z-10 space-y-6">
                  {selectedResearch.fullText}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex-1 flex flex-col gap-24 sm:gap-32">
        
        {/* =========================================
            SECTION 1: HERO (PAGE 1)
            ========================================= */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="min-h-[70vh] flex flex-col justify-center border-b border-[#3c5685]/40 pb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <svg className="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="url(#leafGrad)">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M20 4C20 4 14 3 9 8C4 13 4 20 4 20C4 20 11 20 16 15C21 10 20 4 20 4ZM4 20L10 14" />
            </svg>
            <span className="text-[#5DBB4D] font-bold tracking-[0.25em] uppercase text-sm sm:text-base">
              Explore The Human Mind
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium text-white font-serif tracking-tight drop-shadow-2xl mb-10 leading-[1.1]">
            Psychological <br />
            <span className="italic font-light text-transparent bg-gradient-to-r from-[#1A6BBA] to-[#5DBB4D] bg-clip-text">Awareness</span>
          </h1>
          <p className="text-white/70 text-lg sm:text-2xl max-w-4xl leading-relaxed lato-regular border-l-4 border-[#1A6BBA] pl-6 py-2">
            Understanding your own mind is not just an abstract concept; it is the absolute foundation of a healthy and fulfilling life. Psychological awareness empowers us to identify the blind spots of our subconscious mind and make conscious, intentional decisions.
          </p>
        </motion.div>

        {/* =========================================
            SECTION 2: IMPORTANCE & NEED (PAGE 2)
            ========================================= */}
        <div>
          <div className="flex items-center gap-4 mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-wide">Why It Matters</h2>
            <div className="flex-1 h-[1px] bg-gradient-to-r from-[#3c5685]/50 to-transparent ml-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Box 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="bg-[#132644]/60 backdrop-blur-md border border-[#3c5685]/30 p-10 sm:p-14 hover:border-[#5DBB4D]/50 hover:bg-[#132644]/90 transition-all duration-500 group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#1A6BBA] to-[#5DBB4D]"></div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 font-serif">The Root of Decision Making</h3>
              <p className="text-base sm:text-lg text-white/60 leading-loose">
                Of the thousands of decisions we make every day, 95% stem from our subconscious mind. Without psychological awareness, we are largely driven by past traumas, hidden fears, and cognitive biases. Active awareness pulls us out of 'auto-pilot' mode and places the control of our lives firmly back into our own hands.
              </p>
            </motion.div>

            {/* Box 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-[#132644]/60 backdrop-blur-md border border-[#3c5685]/30 p-10 sm:p-14 hover:border-[#5DBB4D]/50 hover:bg-[#132644]/90 transition-all duration-500 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-[#5DBB4D] to-[#1A6BBA]"></div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 font-serif">Emotional Regulation</h3>
              <p className="text-base sm:text-lg text-white/60 leading-loose">
                Failing to recognize your own emotions means becoming entirely subjected to them. Being able to differentiate between when we are angry, when we are overwhelmed, and when we are simply exhausted is crucial for mental resilience. It acts as a shield against impulsive, destructive behaviors.
              </p>
            </motion.div>

            {/* Box 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="bg-[#132644]/60 backdrop-blur-md border border-[#3c5685]/30 p-10 sm:p-14 hover:border-[#1A6BBA]/50 hover:bg-[#132644]/90 transition-all duration-500 group relative overflow-hidden"
            >
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#1A6BBA] to-[#5DBB4D]"></div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 font-serif">Breaking Interpersonal Cycles</h3>
              <p className="text-base sm:text-lg text-white/60 leading-loose">
                We often repeat the same destructive mistakes in our personal relationships. Becoming aware of our deep psychological patterns helps us understand why we are drawn to specific dynamics or why we react explosively to minor triggers. This awareness is the key to building deep, healthy, and lasting connections.
              </p>
            </motion.div>

            {/* Box 4 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-[#132644]/60 backdrop-blur-md border border-[#3c5685]/30 p-10 sm:p-14 hover:border-[#1A6BBA]/50 hover:bg-[#132644]/90 transition-all duration-500 group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#5DBB4D] to-[#1A6BBA]"></div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 font-serif">Professional Excellence</h3>
              <p className="text-base sm:text-lg text-white/60 leading-loose">
                In the professional world, technical skills are not enough; sustaining performance under pressure requires profound mental fortitude. From overcoming imposter syndrome to preventing chronic burnout—the solution to sustainable excellence begins entirely with tracking and managing your own mental state.
              </p>
            </motion.div>
          </div>
        </div>

        {/* =========================================
            SECTION 3: THE RESEARCH GRID (PAGES 3-4)
            ========================================= */}
        <div>
          <div className="mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-wide mb-6">Scientific Backing</h2>
            <p className="text-lg sm:text-xl text-white/50 max-w-3xl leading-relaxed">
              Read through these 10 core psychological research summaries to understand how profoundly awareness impacts human biology and behavior.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
            {researchData.map((post, idx) => (
              <motion.div 
                key={post.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: (idx % 2) * 0.15 }}
                onClick={() => setSelectedResearch(post)}
                className="bg-[#0A1930]/80 backdrop-blur-sm border border-[#3c5685]/40 p-8 sm:p-12 flex flex-col group cursor-pointer hover:bg-[#132644]/90 hover:border-[#5DBB4D]/60 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 relative overflow-hidden min-h-[350px]"
              >
                {/* Accent top line on hover */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#1A6BBA] to-[#5DBB4D] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out z-20"></div>
                
                {/* Large Background Number */}
                <div className="absolute -top-6 -right-6 text-8xl sm:text-9xl font-mono font-bold text-white/5 group-hover:text-[#1A6BBA]/10 transition-colors duration-500 pointer-events-none select-none">
                  {String(post.id).padStart(2, '0')}
                </div>

                <div className="flex items-center gap-3 mb-6 relative z-10">
                  <span className="text-xs font-bold text-[#5DBB4D] uppercase tracking-widest border border-[#5DBB4D]/30 px-3 py-1">
                    {post.category}
                  </span>
                  <span className="text-xs text-white/30 tracking-[0.15em] uppercase">{post.readTime}</span>
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-5 font-serif group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#1A6BBA] group-hover:to-[#5DBB4D] group-hover:bg-clip-text transition-all duration-300 relative z-10 leading-snug">
                  {post.title}
                </h3>
                
                <p className="text-base sm:text-lg text-white/50 leading-relaxed mb-10 flex-1 relative z-10">
                  {post.excerpt}
                </p>

                <div className="mt-auto inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-[#1A6BBA] group-hover:text-[#5DBB4D] transition-colors relative z-10">
                  Read full research
                  <span className="w-8 h-8 flex items-center justify-center border border-[#1A6BBA]/40 group-hover:border-[#5DBB4D] bg-[#0A1930] transition-colors">
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* =========================================
            SECTION 4: CALL TO ACTION (PAGE 5)
            ========================================= */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-[#132644]/90 backdrop-blur-md border-t-4 border-[#5DBB4D] border-l border-r border-b border-[#3c5685]/40 p-12 sm:p-20 text-center relative overflow-hidden group shadow-2xl mt-10"
        >
          {/* Subtle overlay effect */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1A6BBA]/10 via-transparent to-transparent pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <svg className="w-12 h-12 mx-auto text-[#5DBB4D] mb-8 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <h2 className="text-3xl sm:text-5xl font-serif text-white mb-6 leading-tight">
              Ready to take the next step in your <span className="text-transparent bg-gradient-to-r from-[#1A6BBA] to-[#5DBB4D] bg-clip-text">Psychological Journey?</span>
            </h2>
            <p className="text-lg sm:text-xl text-white/60 mb-12 lato-regular leading-relaxed">
              Reading about psychology is the first step. Applying it to your own life is where real change happens. Connect with an expert today.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link 
                to="/online-counselling"
                className="relative overflow-hidden bg-gradient-to-r from-[#1A6BBA] to-[#5DBB4D] text-[#0A1930] font-bold text-base sm:text-lg uppercase tracking-widest px-10 py-5 transition-all duration-300 flex justify-center items-center gap-3 shadow-[0_10px_30px_rgba(93,187,77,0.3)] hover:shadow-[0_15px_40px_rgba(93,187,77,0.5)] group/btn border border-transparent"
              >
                <div className="absolute inset-0 bg-white/0 group-hover/btn:bg-white/20 transition-colors duration-300"></div>
                <span className="relative z-10">Book a Session</span>
                <svg className="w-5 h-5 relative z-10 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              
              <Link 
                to="/online-assessment"
                className="relative overflow-hidden bg-[#0A1930] text-white font-bold text-base sm:text-lg uppercase tracking-widest px-10 py-5 transition-all duration-300 flex justify-center items-center gap-3 border border-[#3c5685]/80 hover:border-[#1A6BBA] hover:bg-[#1A6BBA]/10 group/btn2"
              >
                <span className="relative z-10">Take an Assessment</span>
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}