import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
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
      }}
    />
    <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#0A1930]/95 via-[#0A1930]/85 to-[#0A1930] pointer-events-none" />
    <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-[#1A6BBA]/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
    <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-[#5DBB4D]/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
  </>
);

// ==========================================
// Data Source (From Image + Extra Generated)
// ==========================================
interface Post {
  id: number;
  category: string;
  readTime: string;
  title: string;
  excerpt: string;
  fullText: React.ReactNode;
  isFeatured?: boolean;
}

const postsData: Post[] = [
  {
    id: 1,
    isFeatured: true,
    category: "COMMENTARY",
    readTime: "9 MIN READ",
    title: "The generation gap is not about respect. It is about speed",
    excerpt: "Parents read slowness as thoughtfulness; their children read it as indifference. Most of what families call disobedience is a mismatch in expected response time - and it is fixable once both sides can name it.",
    fullText: (
      <>
        <p className="mb-4">Parents often misinterpret their children's demand for immediate answers as a lack of respect or patience. However, growing up in a digital-first environment means Generation Z and Alpha are neurologically wired to process information and expect feedback loops at a much faster rate.</p>
        <p className="mb-4">When a teenager asks a question and the parent takes a long pause to think, the teenager's brain often reads this "slowness" as indifference or a dismissal of their feelings. Conversely, parents read the teenager's rapid-fire demands as disrespectful or overwhelming.</p>
        <p className="mb-4 border-l-2 border-[#5DBB4D] pl-4 italic text-white/80">"Most of what families call disobedience is actually a structural mismatch in communication pacing."</p>
        <p>To fix this, families need to establish a shared vocabulary. Parents can simply say, "I hear you, and I need 10 minutes to process this before I answer," which satisfies the child's need for immediate acknowledgment while giving the parent the time they need.</p>
      </>
    )
  },
  {
    id: 2,
    category: "RESEARCH",
    readTime: "6 MIN READ",
    title: "What social media does to attention, and what it does not",
    excerpt: "Separating the findings that replicate from the ones that only make headlines.",
    fullText: (
      <>
        <p className="mb-4">We frequently hear that social media destroys attention spans, shrinking them to the size of a goldfish's. But actual clinical research paints a much more nuanced picture.</p>
        <p className="mb-4">What social media actually does is train the brain for <strong>rapid context-switching</strong>. Young people haven't lost the ability to focus; they have adapted to aggressively filter out information that doesn't immediately engage them. If a topic is highly stimulating or relevant, their capacity for "hyper-focus" remains completely intact.</p>
        <p>The problem arises in traditional classroom settings, which rely on slow, linear information delivery. The challenge isn't fixing broken attention spans, but rather bridging the gap between digital pacing and analog learning.</p>
      </>
    )
  },
  {
    id: 3,
    category: "DEVELOPMENT",
    readTime: "7 MIN READ",
    title: "Identity at sixteen when the audience is public",
    excerpt: "Adolescent identity work has always been performed. What changes when the performance is recorded.",
    fullText: (
      <>
        <p className="mb-4">Trying on different identities is a core developmental milestone of being sixteen. In the past, this trial-and-error happened in the fleeting moments of a school hallway or a local hangout. Mistakes were made, lessons were learned, and the memory faded.</p>
        <p className="mb-4">Today, identity work happens on a public stage. Every phase, every mistake, and every experiment is documented, recorded, and archived on social media platforms.</p>
        <p>This creates a high-stakes environment where young people feel immense pressure to maintain a consistent "personal brand" before they even know who they truly are. As practitioners, we see a sharp rise in anxiety directly linked to this lack of a "safe, unrecorded space" to simply figure things out.</p>
      </>
    )
  },
  {
    id: 4,
    category: "COMMENTARY",
    readTime: "5 MIN READ",
    title: "Why Gen A children negotiate instead of obeying",
    excerpt: "A note for parents who were raised on instruction and are now raising children who ask why.",
    fullText: (
      <>
        <p className="mb-4">"Because I said so" used to be a complete sentence in parenting. For Gen Alpha, it is merely the opening line of a negotiation.</p>
        <p className="mb-4">This generation has been raised in an era of unprecedented access to information. They know that answers exist for almost everything. When they are given an instruction without a rationale, their natural instinct—fostered by their environment—is to push back and ask "why?".</p>
        <p>While exhausting for parents who expect traditional obedience, this is actually a sign of advanced critical thinking. Redirecting this energy from argument to collaborative problem-solving is the key to modern parenting.</p>
      </>
    )
  },
  {
    id: 5,
    category: "ACTIVITY",
    readTime: "15 MIN TO TRY",
    title: "The one-page future letter",
    excerpt: "A writing exercise for students stuck between what they want and what is expected of them.",
    fullText: (
      <>
        <p className="mb-4">This exercise is designed to help teenagers separate their own authentic desires from the expectations projected onto them by parents, teachers, and society.</p>
        <p className="mb-4"><strong>The Prompt:</strong> Write a letter to your current self from a version of you 10 years in the future. But here is the catch: you cannot mention your job title or your salary.</p>
        <p>Instead, describe what your morning routine looks like, how your body feels, what kind of people you are having coffee with, and what problem you are trying to solve that day. This strips away the pressure of "picking a career" and focuses entirely on uncovering intrinsic values.</p>
      </>
    )
  },
  {
    id: 6,
    category: "RESEARCH",
    readTime: "8 MIN READ",
    title: "Career expectation and reality among recent graduates",
    excerpt: "Where aspiration and the actual job market diverge, and what that gap does to mood.",
    fullText: (
      <>
        <p className="mb-4">Recent data shows a significant spike in depressive symptoms among graduates in the first 18 months post-university. The primary driver? A massive gap between the expectation of "impactful work" and the reality of entry-level corporate structures.</p>
        <p className="mb-4">Social media algorithms constantly feed young adults stories of overnight startup success or digital nomads living freely. When this is contrasted with a standard 9-to-5 spreadsheet role, it creates a profound sense of failure, even if the graduate is objectively doing very well.</p>
        <p>Recalibrating expectations without crushing ambition is the most critical intervention we can provide during the transition from academia to the workforce.</p>
      </>
    )
  },
  {
    id: 7,
    category: "ACTIVITY",
    readTime: "FOR CLASSROOMS",
    title: "Ten minutes of boredom, on purpose",
    excerpt: "A teacher-led exercise in tolerating stillness, with what to expect in the first week.",
    fullText: (
      <>
        <p className="mb-4">Boredom is the birthplace of creativity, yet modern students rarely experience it due to constant digital stimulation.</p>
        <p className="mb-4">We recommend teachers implement "Ten Minutes of Stillness." No phones, no books, no talking. Just sitting in a chair.</p>
        <p><strong>What to expect:</strong> The first few days will feature extreme physical restlessness, giggling, and expressed frustration. By week two, students report feeling a strange sense of relief during this time. By week four, it becomes a requested transition period that noticeably resets the classroom's baseline anxiety levels.</p>
      </>
    )
  }
];

export default function YoungGeneration() {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  // Separation of featured and standard posts
  const featuredPost = postsData.find(p => p.isFeatured);
  const standardPosts = postsData.filter(p => !p.isFeatured);

  return (
    <div className="relative w-full min-h-screen lg:pl-[50px] overflow-hidden flex flex-col pt-32 pb-24 px-4 sm:px-6">
      <SharedBackground />

      {/* =========================================
          MODAL (POPUP) SECTION
          ========================================= */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-10 py-10 bg-[#0A1930]/90 backdrop-blur-sm lg:pl-[50px]"
          >
            {/* Click outside to close */}
            <div className="absolute inset-0 cursor-pointer" onClick={() => setSelectedPost(null)}></div>
            
            <motion.div 
              initial={{ y: 50, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 20, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative w-full max-w-3xl bg-[#132644] border border-[#5DBB4D]/50 shadow-[0_20px_60px_rgba(0,0,0,0.8)] max-h-full flex flex-col overflow-hidden"
            >
              {/* Top Accent Bar */}
              <div className="h-1.5 w-full bg-gradient-to-r from-[#1A6BBA] to-[#5DBB4D]"></div>
              
              {/* Close Button */}
              <button 
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-[#0A1930] border border-[#3c5685] text-white/50 hover:text-white hover:border-red-500 hover:bg-red-500/10 flex items-center justify-center transition-all duration-300 z-10"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Modal Content Scrollable Area */}
              <div className="p-8 sm:p-12 overflow-y-auto custom-scrollbar relative">
                {/* Decorative Leaf in Modal */}
                <svg className="absolute top-10 right-10 w-40 h-40 text-[#5DBB4D] opacity-5 pointer-events-none -rotate-12" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4C20 4 14 3 9 8C4 13 4 20 4 20C4 20 11 20 16 15C21 10 20 4 20 4Z" />
                </svg>

                <div className="flex items-center gap-3 mb-6 relative z-10">
                  <span className="text-xs font-bold text-transparent bg-gradient-to-r from-[#1A6BBA] to-[#5DBB4D] bg-clip-text uppercase tracking-widest border border-[#3c5685]/60 px-3 py-1 bg-[#0A1930]">
                    {selectedPost.category}
                  </span>
                  <span className="text-xs text-white/40 tracking-widest uppercase">{selectedPost.readTime}</span>
                </div>
                
                <h2 className="text-2xl sm:text-4xl font-serif text-white mb-8 leading-tight relative z-10 drop-shadow-md">
                  {selectedPost.title}
                </h2>
                
                <div className="text-base sm:text-lg text-white/80 leading-loose lato-regular relative z-10 space-y-4">
                  {selectedPost.fullText}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 w-full max-w-6xl mx-auto flex-1">
        
        {/* =========================================
            HERO SECTION
            ========================================= */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 border-b border-[#3c5685]/40 pb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="url(#leafGrad)">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M20 4C20 4 14 3 9 8C4 13 4 20 4 20C4 20 11 20 16 15C21 10 20 4 20 4ZM4 20L10 14" />
            </svg>
            <span className="text-[#5DBB4D] font-bold tracking-[0.2em] uppercase text-xs sm:text-sm">
              BORN AFTER 1997 · AND THE ADULTS AROUND THEM
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium text-white font-serif tracking-tight drop-shadow-lg mb-8 leading-tight max-w-4xl">
            A generation raised on a screen <br className="hidden md:block" />
            <span className="italic font-light text-transparent bg-linear-to-r from-[#1A6BBA] to-[#5DBB4D] bg-clip-text">is not a generation raised badly</span>
          </h1>
          <p className="text-white/70 text-base sm:text-lg max-w-3xl leading-relaxed lato-regular border-l-2 border-[#5DBB4D] pl-5">
            Gen Z and Gen A think, decide and relate differently from the generation teaching them — faster access to information, thinner tolerance for boredom, a wider vocabulary for feelings and a narrower one for conflict. This page collects what the research actually shows, what we see in our own practice, and things you can try.
          </p>
        </motion.div>

        {/* =========================================
            POSTS & RESEARCH SECTION (GRID)
            ========================================= */}
        <div className="mb-24">
          <div className="flex items-center gap-3 mb-10">
            <h2 className="text-2xl sm:text-3xl font-serif text-white tracking-wide">Posts & research</h2>
            <div className="flex-1 h-px bg-linear-to-r from-[#3c5685]/40 to-transparent ml-4"></div>
          </div>

          {/* Featured Post Card */}
          {featuredPost && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              onClick={() => setSelectedPost(featuredPost)}
              className="bg-[#132644]/80 backdrop-blur-md border border-[#3c5685]/50 p-8 sm:p-12 mb-6 cursor-pointer group hover:border-[#5DBB4D]/60 hover:shadow-[0_15px_40px_rgba(0,0,0,0.4)] transition-all duration-500 relative overflow-hidden flex flex-col md:flex-row gap-8 items-center"
            >
              {/* Background Leaf */}
              <svg className="absolute -bottom-10 -right-10 w-64 h-64 text-[#5DBB4D] opacity-5 group-hover:opacity-10 group-hover:-translate-x-4 group-hover:-translate-y-4 transition-all duration-700 pointer-events-none" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4C20 4 14 3 9 8C4 13 4 20 4 20C4 20 11 20 16 15C21 10 20 4 20 4Z" />
              </svg>

              <div className="flex-1 relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-bold text-[#0A1930] bg-linear-to-r from-[#1A6BBA] to-[#5DBB4D] uppercase tracking-widest px-3 py-1">
                    Featured
                  </span>
                  <span className="text-xs text-white/50 uppercase tracking-widest">{featuredPost.category} · {featuredPost.readTime}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 font-serif group-hover:text-[#5DBB4D] transition-colors duration-300">
                  {featuredPost.title}
                </h3>
                <p className="text-white/60 leading-relaxed mb-8">
                  {featuredPost.excerpt}
                </p>
                <div className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#1A6BBA] group-hover:text-[#5DBB4D] transition-colors border-b border-transparent group-hover:border-[#5DBB4D] pb-1">
                  Read the post
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Placeholder for featured image as seen in source */}
              <div className="w-full md:w-1/3 aspect-[4/3] bg-[#0A1930] border border-[#3c5685]/50 overflow-hidden relative z-10 shrink-0 group-hover:border-[#5DBB4D]/50 transition-colors">
                 <div className="absolute inset-0 bg-linear-to-br from-[#1A6BBA]/20 to-[#5DBB4D]/20 mix-blend-overlay"></div>
                 {/* Replace src with your actual asset if needed */}
                 <img src="https://res.cloudinary.com/dsrs8hryx/image/upload/v1790249359/Young_adults_connected_by_techno__20260924172834_bkz82s.jpg" alt="Featured" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
              </div>
            </motion.div>
          )}

          {/* Grid Posts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {standardPosts.map((post, idx) => (
              <motion.div 
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => setSelectedPost(post)}
                className="bg-[#132644]/60 backdrop-blur-sm border border-[#3c5685]/30 p-8 flex flex-col group cursor-pointer hover:bg-[#132644]/90 hover:border-[#5DBB4D]/50 hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-all duration-300 relative overflow-hidden"
              >
                {/* Accent top line on hover */}
                <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-[#1A6BBA] to-[#5DBB4D] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out z-20"></div>

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[10px] font-bold text-[#5DBB4D] uppercase tracking-widest">{post.category}</span>
                  <span className="text-[#3c5685]">•</span>
                  <span className="text-[10px] text-white/40 uppercase tracking-widest">{post.readTime}</span>
                </div>
                
                <h3 className="text-lg font-bold text-white mb-3 font-serif group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#1A6BBA] group-hover:to-[#5DBB4D] group-hover:bg-clip-text transition-all duration-300">
                  {post.title}
                </h3>
                
                <p className="text-sm text-white/50 leading-relaxed mb-8 flex-1">
                  {post.excerpt}
                </p>

                <div className="mt-auto inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/40 group-hover:text-[#5DBB4D] transition-colors">
                  Read
                  <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* =========================================
            BOTTOM CALL TO ACTION (ASSESSMENT BANNER)
            ========================================= */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-[#1A6BBA]/10 to-[#5DBB4D]/10 border border-[#5DBB4D]/30 p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative overflow-hidden group"
        >
          {/* Decorative Background Element */}
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-[#5DBB4D]/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>

          <div className="flex-1 relative z-10">
            <h2 className="text-xl sm:text-2xl font-serif text-white mb-2">
              Reading about your generation is one thing — <span className="text-[#5DBB4D]">knowing where you stand is another</span>
            </h2>
            <p className="text-sm text-white/60 lato-regular">
              Career Fit, General Aptitude, Responsibility Rating and the wellbeing screen all live on the Online Assessment page.
            </p>
          </div>

          <Link 
  to="/tests" // Ekhane apnar actual page er route ti boshiye diben
  className="shrink-0 relative overflow-hidden bg-gradient-to-r from-[#1A6BBA] to-[#5DBB4D] text-[#0A1930] font-bold text-sm uppercase tracking-widest px-8 py-4 transition-all duration-300 flex justify-center items-center gap-3 z-10 shadow-[0_5px_20px_rgba(93,187,77,0.3)] hover:shadow-[0_10px_30px_rgba(93,187,77,0.5)] group"
>
  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/20 transition-colors duration-300"></div>
  <span className="relative z-10">Open the assessment catalogue</span>
</Link>
        </motion.div>

      </div>
    </div>
  );
}