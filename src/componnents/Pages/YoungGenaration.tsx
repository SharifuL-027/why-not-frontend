import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

// ==========================================
// Global Shared Parallax Background (Light Theme)
// ==========================================
const SharedBackground = () => (
  <>
    {/* Preserved Original Gradient for specific SVG Icons if needed */}
    <svg width="0" height="0" className="absolute">
      <defs>
        <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1A6BBA" />
          <stop offset="100%" stopColor="#5DBB4D" />
        </linearGradient>
      </defs>
    </svg>
    
    {/* Heavy Ivory Overlay to mute the background image as per guidelines */}
    <div 
      className="fixed inset-0 z-0 opacity-100 pointer-events-none"
      style={{
        backgroundImage: "url('https://res.cloudinary.com/dsrs8hryx/image/upload/v1790752894/bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb_iovzvu.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    />
    <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#F9F6F0]/50 via-[#F9F6F0]/70 to-[#F9F6F0] pointer-events-none" />
    
    {/* Soft Ambient Glows */}
    <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-[#EFECE5]/80 rounded-full blur-[150px] pointer-events-none z-0"></div>
    <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-[#EAEFF0]/80 rounded-full blur-[150px] pointer-events-none z-0"></div>
  </>
);

// ==========================================
// Data Source
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
    id: 8,
    category: "AWARENESS",
    readTime: "3 MIN READ",
    title: "Everyone Thinks They Know You. But Does Anyone Really Understand You?",
    excerpt: "\"I'm fine.\" The most common reply when you don't feel fine at all. On loneliness, overthinking, and feeling misunderstood.",
    fullText: (
      <>
        <p className="mb-4">You laugh with your friends, scroll through social media, react to memes, attend classes, meet deadlines, and keep going with your daily life. But sometimes, when everything gets quiet, your mind gets loud.</p>
        <p className="mb-4">You may feel lonely even when you're surrounded by people. You may overthink a simple message, compare your life with someone else's highlight reel, worry about your future, or feel pressured to be successful before you've even figured out who you are.</p>
        <p className="mb-4">Sometimes, you want to explain what's happening inside you, but you can't find the right words. And sometimes, you stay silent because you're afraid someone will say, "You're just overthinking. Stop being so sensitive."</p>
        <p className="mb-4 border-l-2 border-[#A38771] pl-4 italic text-[#4A4A4A]">"If any of this feels familiar, take a moment. You are not weak, and you are not alone."</p>
        <p className="mb-4"><strong>What might be happening beneath the surface?</strong> Today's young generation faces a complex mix of academic pressure, career uncertainty, family expectations, relationship challenges, social comparison, online pressure, and the struggle to feel accepted. These experiences do not automatically mean you have a psychological disorder. However, when stress becomes persistent or starts affecting your sleep, concentration, relationships, motivation, or everyday functioning, it deserves attention.</p>
        <p className="mb-4"><strong>1. Loneliness in a hyperconnected world.</strong> Having hundreds of online contacts does not necessarily mean having someone you can trust with your real feelings. A lack of meaningful connection can affect emotional well-being.</p>
        <p className="mb-4"><strong>2. Overthinking and constant comparison.</strong> Social media often shows other people's best moments, not their complete lives. Constant comparison may leave you feeling inadequate, behind, or unsure of your own worth.</p>
        <p className="mb-4"><strong>3. Anxiety about the future.</strong> "What if I fail?" "What if I disappoint my parents?" "What if I never become successful?" Occasional worry is normal. But persistent, difficult-to-manage anxiety can interfere with everyday life.</p>
        <p className="mb-4"><strong>4. Emotional exhaustion.</strong> You may keep saying yes, trying to please everyone, hiding your frustration, and expecting yourself to handle everything alone. Over time, this can leave you feeling overwhelmed or emotionally drained.</p>
        <p className="mb-4"><strong>5. Feeling misunderstood.</strong> Sometimes, you don't need someone to lecture you, judge you, or immediately offer a solution. You need someone who will listen, help you understand your feelings, and explore what you can do next.</p>
        <p className="mb-4"><strong>You don't have to figure everything out alone.</strong> You don't need to wait until things become unbearable before seeking psychological support. Talking with a qualified mental health professional can help you explore your emotions, understand unhelpful patterns, develop healthier coping strategies, and make more informed decisions about your life. Seeking support doesn't mean you cannot handle life. It means you are willing to take your well-being seriously.</p>
        <p className="mb-4">At <strong>Why Not You Psychology</strong>, we believe that every person deserves a safe, respectful space to talk, reflect, and grow, without being labelled or judged. If you have been feeling overwhelmed, disconnected, anxious, or simply unsure about what is going on inside you, consider taking the first step: book an online counselling session at <a href="https://whynotyoupsy.com" target="_blank" rel="noopener noreferrer" className="underline">whynotyoupsy.com</a>.</p>
        <p className="mb-4 italic">You don't have to have all the answers before you ask for support.</p>
        <p className="mb-4"><strong>Why Not You?</strong> <em>Get the support. Change yourself.</em></p>
        <p className="text-sm italic text-[#4A4A4A]">A small reminder: Feeling lonely, worried, or confused sometimes is part of being human. If these feelings persist, become overwhelming, or interfere with daily life, consider speaking with a qualified mental health professional. This post is for awareness and is not a diagnosis.</p>
      </>
    )
  },
  {
    id: 9,
    category: "AWARENESS",
    readTime: "4 MIN READ",
    title: "Always Online. But Are We Really Connected?",
    excerpt: "You replied to 47 messages today. But did you have one real conversation? A look at scrolling, loneliness, and a small REAL CONNECTION challenge.",
    fullText: (
      <>
        <p className="mb-4">You wake up and check your phone. You scroll while eating. You check notifications between classes. You watch reels when you're bored, open another app when you feel lonely, and keep scrolling even when you know it's time to sleep. Your screen time says "Just 5 more minutes." And somehow, an hour disappears.</p>
        <p className="mb-4">Let's be honest. Our phones are not just devices anymore. They're our entertainment, our social lives, our escape from boredom, and sometimes, our way of avoiding feelings we don't know how to handle.</p>
        <p className="mb-4 border-l-2 border-[#A38771] pl-4 italic text-[#4A4A4A]">"Are we using our devices to connect with people, or using them to avoid the discomfort of real connection?"</p>
        <p className="mb-4"><strong>1. A thousand followers, but nobody to talk to?</strong> Online reactions can feel good, but likes and comments are not the same as having someone who listens, understands, and shows up when you need them.</p>
        <p className="mb-4"><strong>2. Scrolling instead of socialising.</strong> Sometimes it feels easier to watch other people's lives than to make plans, start a conversation, or risk feeling awkward in person. But real relationships grow through shared experiences, not just shared posts.</p>
        <p className="mb-4"><strong>3. The comparison trap.</strong> Someone is travelling. Someone has a new relationship. Someone else seems to have the perfect life. And suddenly, your ordinary Tuesday feels like a personal failure. Remember: you're comparing your full life with carefully selected moments from someone else's.</p>
        <p className="mb-4"><strong>4. When your phone becomes your emotional escape.</strong> Feeling stressed? Scroll. Feeling lonely? Scroll. Feeling bored, anxious, or disappointed? Scroll again. Taking a break can be perfectly fine. But if scrolling becomes your main way of handling difficult feelings, you may miss opportunities to understand those feelings and find other ways to cope.</p>
        <p className="mb-4"><strong>5. Less presence, fewer meaningful moments.</strong> Have you ever sat with friends while everyone looked at their own screens? You were physically together, but nobody was really there. Small moments, like sharing a joke, listening without interruption, or taking a walk together, can help build the connection we all need.</p>
        <p className="mb-4"><strong>What does psychology tell us?</strong> The American Psychological Association explains that social media is not automatically harmful or beneficial for young people. Its effects depend on how it is used, what people experience online, and their individual circumstances. The World Health Organization also recognises social connection as an important part of well-being. Its 2025 information on social connection notes that loneliness affects people across age groups, with young people reporting particularly high levels. So the goal is not to hate technology or disappear from the digital world. It is to build a healthier relationship with it.</p>
        <p className="mb-4"><strong>Try the REAL CONNECTION challenge.</strong> You don't need to throw your phone away. Start with a few small changes:</p>
        <p className="mb-4"><strong>R: Reclaim one screen-free moment.</strong> Enjoy a meal, a walk, or a conversation without checking notifications.</p>
        <p className="mb-4"><strong>E: Engage with someone in real life.</strong> Call a friend, talk to a family member, or make plans to meet someone you trust.</p>
        <p className="mb-4"><strong>A: Ask yourself why you're scrolling.</strong> Are you enjoying it, looking for information, avoiding a task, or trying not to feel lonely?</p>
        <p className="mb-4"><strong>L: Let yourself be present.</strong> Listen, make eye contact when comfortable, share your thoughts, and allow conversations to happen without needing to document every moment.</p>
        <p className="mb-4">Start small. Consistency matters more than perfection.</p>
        <p className="mb-4"><strong>And if being alone feels easier than connecting?</strong> Maybe you have been disappointed by people. Maybe you feel awkward in social situations. Maybe you worry about being judged, or you simply don't know how to explain what you're feeling. You don't have to blame yourself. Sometimes, understanding the reasons behind your habits and feelings is the first step towards changing them.</p>
        <p className="mb-4">At <strong>Why Not You Psychology</strong>, we believe that meaningful change begins with understanding yourself, not judging yourself. If device use, loneliness, anxiety, or difficulties in relationships are affecting your everyday life, online counselling may give you a supportive space to explore what's happening and develop healthier coping strategies. Visit <a href="https://whynotyoupsy.com" target="_blank" rel="noopener noreferrer" className="underline">whynotyoupsy.com</a> to explore online counselling.</p>
        <p className="mb-4 italic">Your phone can connect you to the world. Don't forget to connect with the people in it.</p>
        <p className="mb-4"><strong>Why Not You?</strong> <em>Get the support. Change yourself.</em></p>
        <p className="text-sm italic text-[#4A4A4A]">This post is for mental health awareness, not diagnosis. Using devices frequently does not automatically mean you have a psychological problem. If loneliness or emotional distress persists or affects daily life, consider speaking with a qualified mental health professional.</p>
      </>
    )
  },
  {
    id: 10,
    category: "WELL-BEING",
    readTime: "4 MIN READ",
    title: "Mentally Exhausted? Maybe It's Time to Check In With Yourself.",
    excerpt: "You look okay on the outside. But how are things going on inside? Six everyday habits that wear us down, and five small changes to start with.",
    fullText: (
      <>
        <p className="mb-4">One day, you're super motivated. You have plans, dreams, and energy to chase them. The next day, even the smallest task feels exhausting. Sometimes you stay up late scrolling, wake up tired, skip meals, avoid people, and struggle to focus. Sometimes you feel like talking to everyone. Other times, you want to be left alone.</p>
        <p className="mb-4">You may keep changing your habits, chasing quick comfort, or trying to escape uncomfortable feelings. You might even wonder: "Why can't I just get my life together?"</p>
        <p className="mb-4 border-l-2 border-[#A38771] pl-4 italic text-[#4A4A4A]">"You are not a failure because you're struggling. But your struggles deserve attention."</p>
        <p className="mb-4"><strong>What could be affecting your mental well-being?</strong> Modern life offers freedom, entertainment, opportunities, and new ways to connect. But it can also bring pressures and habits that make it harder to maintain emotional balance.</p>
        <p className="mb-4"><strong>1. The sleep-deprived lifestyle.</strong> Late-night scrolling, irregular sleep, and constantly changing routines can leave you tired, irritable, and less able to concentrate. Sleep is not wasted time; it supports your emotional and cognitive functioning.</p>
        <p className="mb-4"><strong>2. Living for instant rewards.</strong> Endless videos, gaming, notifications, and constantly switching between activities can make it harder to protect time for focused work and meaningful offline experiences. The issue is not enjoying these activities; it is when they repeatedly interfere with sleep, responsibilities, relationships, or personal goals.</p>
        <p className="mb-4"><strong>3. Escaping feelings instead of understanding them.</strong> When stress hits, you might avoid responsibilities, withdraw from people, or seek distractions. These strategies may provide temporary relief, but if they become your only coping methods, the original problem may remain unresolved.</p>
        <p className="mb-4"><strong>4. Unhealthy routines and inconsistent habits.</strong> Irregular meals, little physical activity, insufficient rest, and a lack of daily structure can affect how you feel and function. Small habits may seem insignificant individually, but a sustainable routine can help support your overall well-being.</p>
        <p className="mb-4"><strong>5. Conflicting lifestyles and social pressure.</strong> You may feel pulled between family expectations, friends, relationships, personal values, and the pressure to fit in. When your choices repeatedly conflict with what matters to you, it can become difficult to feel grounded or satisfied.</p>
        <p className="mb-4"><strong>6. Emotional overload and feeling lost.</strong> Academic pressure, career uncertainty, relationship difficulties, financial worries, and fear of failure can accumulate. You may find yourself overwhelmed, unable to make decisions, or unsure where to begin.</p>
        <p className="mb-4">These experiences do not automatically indicate a mental health disorder. But when emotional difficulties persist or begin interfering with everyday life, it is worth taking them seriously.</p>
        <p className="mb-4"><strong>Mental stability isn't about being happy every day.</strong> It doesn't mean never feeling sad, angry, anxious, confused, or disappointed. Psychological well-being means developing the ability to understand your emotions, adapt to challenges, make thoughtful decisions, and seek support when you need it. You don't have to control everything in your life. You can start by taking responsibility for the small things within your control.</p>
        <p className="mb-4"><strong>Start with five small changes.</strong></p>
        <p className="mb-4"><strong>Protect your sleep.</strong> Build a reasonably consistent sleep and waking routine.</p>
        <p className="mb-4"><strong>Move your body.</strong> Find enjoyable ways to include physical activity in your day.</p>
        <p className="mb-4"><strong>Create space away from screens.</strong> Make time for rest, hobbies, and face-to-face conversations.</p>
        <p className="mb-4"><strong>Understand your patterns.</strong> Notice what tends to happen before you feel overwhelmed, withdraw, or lose motivation.</p>
        <p className="mb-4"><strong>Talk to someone you trust.</strong> You do not need to solve every problem alone.</p>
        <p className="mb-4">Remember, change is not about becoming a perfect person overnight. It is about making choices that gradually support the life you want to live.</p>
        <p className="mb-4"><strong>When self-help doesn't feel like enough.</strong> Perhaps you've already tried to change your habits, but the same patterns keep returning. Perhaps you feel emotionally overwhelmed, disconnected from others, unable to concentrate, or uncertain about yourself. You don't need to wait until everything falls apart before asking for help. Speaking with a qualified psychologist or mental health professional can help you explore the factors affecting your well-being, recognise unhelpful patterns, and develop practical strategies suited to your circumstances.</p>
        <p className="mb-4">At <strong>Why Not You Psychology</strong>, we believe that understanding yourself is an important step towards meaningful change. Explore online counselling at <a href="https://whynotyoupsy.com" target="_blank" rel="noopener noreferrer" className="underline">whynotyoupsy.com</a>, and give yourself the opportunity to pause, reflect, and move forward with support.</p>
        <p className="mb-4"><strong>Why Not You?</strong> <em>Get the support. Change yourself.</em></p>
        <p className="text-sm italic text-[#4A4A4A]"><strong>A gentle reminder:</strong> Everyone experiences difficult periods. If changes in your mood, sleep, behaviour, or daily functioning persist, become severe, or make everyday life difficult, consider seeking professional assessment. This post is for awareness and is not a diagnosis.</p>
      </>
    )
  },
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
        <p className="mb-4 border-l-2 border-[#A38771] pl-4 italic text-[#4A4A4A]">"Most of what families call disobedience is actually a structural mismatch in communication pacing."</p>
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
    readTime: "2 MIN READ",
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
    readTime: "3 MIN READ",
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

  const featuredPost = postsData.find(p => p.isFeatured);
  const standardPosts = postsData.filter(p => !p.isFeatured);

  return (
    <div className="relative w-full min-h-screen lg:pl-12.5 overflow-hidden flex flex-col pt-32 pb-24 px-4 sm:px-6 bg-[#F9F6F0]">
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
            className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-10 py-10 bg-[#F9F6F0]/90 backdrop-blur-sm lg:pl-[50px]"
          >
            {/* Click outside to close */}
            <div className="absolute inset-0 cursor-pointer" onClick={() => setSelectedPost(null)}></div>
            
            <motion.div 
              initial={{ y: 50, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 20, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative w-full max-w-3xl bg-white border border-[#EFECE5] shadow-[0_15px_40px_rgba(0,0,0,0.08)] max-h-full flex flex-col overflow-hidden rounded-sm"
            >
              {/* Top Accent Bar */}
              <div className="h-1.5 w-full bg-[#A38771]"></div>
              
              {/* Close Button */}
              <button 
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-[#F9F6F0] border border-[#EFECE5] text-[#222222] hover:text-[#A38771] hover:border-[#A38771] hover:bg-white flex items-center justify-center transition-all duration-300 z-10 rounded-sm"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Modal Content Scrollable Area */}
              <div className="p-8 sm:p-12 overflow-y-auto custom-scrollbar relative">
                
                {/* Decorative Subtle Icon */}
                <svg className="absolute top-10 right-10 w-40 h-40 text-[#EFECE5] opacity-30 pointer-events-none -rotate-12" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4C20 4 14 3 9 8C4 13 4 20 4 20C4 20 11 20 16 15C21 10 20 4 20 4Z" />
                </svg>

                <div className="flex items-center gap-3 mb-6 relative z-10">
                  <span className="text-xs font-bold text-[#222222] bg-[#EFECE5] uppercase tracking-widest px-3 py-1 rounded-sm">
                    {selectedPost.category}
                  </span>
                  <span className="text-xs text-[#A38771] tracking-widest uppercase font-bold">{selectedPost.readTime}</span>
                </div>
                
                <h2 className="text-2xl sm:text-4xl font-serif text-[#222222] mb-8 leading-tight relative z-10">
                  {selectedPost.title}
                </h2>
                
                <div className="text-base sm:text-lg text-[#4A4A4A] leading-loose lato-regular relative z-10 space-y-4">
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
          className="mb-16 border-b border-[#EFECE5] pb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[#A38771] font-bold tracking-[0.2em] uppercase text-xs sm:text-sm">
              BORN AFTER 1997 · AND THE ADULTS AROUND THEM
            </span>
          </div>
          <h1 className="text-4xl sm:text-3xl md:text-5xl text-[#222222] font-serif tracking-tight drop-shadow-sm mb-8 leading-tight max-w-4xl">
            A generation raised on a screen <br className="hidden md:block" />
            <span className="italic font-light text-[#A38771]">is not a generation raised badly</span>
          </h1>
          <p className="text-[#4A4A4A] text-base sm:text-lg max-w-3xl leading-relaxed lato-regular border-l-2 border-[#A38771] pl-5">
            Gen Z and Gen A think, decide and relate differently from the generation teaching them — faster access to information, thinner tolerance for boredom, a wider vocabulary for feelings and a narrower one for conflict. This page collects what the research actually shows, what we see in our own practice, and things you can try.
          </p>
        </motion.div>

        {/* =========================================
            POSTS & RESEARCH SECTION (GRID)
            ========================================= */}
        <div className="mb-24">
          <div className="flex items-center gap-3 mb-10">
            <h2 className="text-2xl sm:text-3xl font-serif text-[#222222] tracking-wide">Posts & research</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-[#EFECE5] to-transparent ml-4"></div>
          </div>

          {/* Featured Post Card */}
          {featuredPost && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              onClick={() => setSelectedPost(featuredPost)}
              className="bg-white border border-[#EFECE5] p-8 sm:p-12 mb-6 cursor-pointer group hover:border-[#A38771] shadow-sm hover:shadow-[0_15px_40px_rgba(0,0,0,0.04)] transition-all duration-500 relative overflow-hidden flex flex-col md:flex-row gap-8 items-center rounded-sm"
            >
              {/* Background Accent */}
              <svg className="absolute -bottom-10 -right-10 w-64 h-64 text-[#EFECE5] opacity-30 group-hover:opacity-60 group-hover:-translate-x-4 group-hover:-translate-y-4 transition-all duration-700 pointer-events-none" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4C20 4 14 3 9 8C4 13 4 20 4 20C4 20 11 20 16 15C21 10 20 4 20 4Z" />
              </svg>

              <div className="flex-1 relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-bold text-[#222222] bg-[#EFECE5] uppercase tracking-widest px-3 py-1 rounded-sm">
                    Featured
                  </span>
                  <span className="text-xs text-[#A38771] font-bold uppercase tracking-widest">{featuredPost.category} · {featuredPost.readTime}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#222222] mb-4 font-serif group-hover:text-[#A38771] transition-colors duration-300">
                  {featuredPost.title}
                </h3>
                <p className="text-[#4A4A4A] leading-relaxed mb-8">
                  {featuredPost.excerpt}
                </p>
                <div className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#222222] group-hover:text-[#A38771] transition-colors border-b border-transparent group-hover:border-[#A38771] pb-1">
                  Read the post
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Placeholder for featured image */}
              <div className="w-full md:w-1/3 aspect-[4/3] bg-[#F9F6F0] border border-[#EFECE5] overflow-hidden relative z-10 shrink-0 group-hover:border-[#A38771] transition-colors rounded-sm">
                 <div className="absolute inset-0 bg-white/10 mix-blend-overlay"></div>
                 <img src="https://res.cloudinary.com/dsrs8hryx/image/upload/v1790752894/WhatsApp_Image_2026-09-29_at_12.54.19_AM_sio0ua.jpg" alt="Featured" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
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
                className="bg-white border border-[#EFECE5] p-8 flex flex-col group cursor-pointer hover:border-[#A38771] shadow-sm hover:shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-all duration-300 relative overflow-hidden rounded-sm"
              >
                {/* Accent top line on hover */}
                <div className="absolute top-0 left-0 w-full h-1 bg-[#A38771] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out z-20"></div>

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[10px] font-bold text-[#A38771] uppercase tracking-widest">{post.category}</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest">{post.readTime}</span>
                </div>
                
                <h3 className="text-lg font-bold text-[#222222] mb-3 font-serif group-hover:text-[#A38771] transition-colors duration-300">
                  {post.title}
                </h3>
                
                <p className="text-sm text-[#4A4A4A] leading-relaxed mb-8 flex-1">
                  {post.excerpt}
                </p>

                <div className="mt-auto inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#A0AAB2] group-hover:text-[#222222] transition-colors">
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
          className="bg-[#F9F6F0] border border-[#EFECE5] p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative overflow-hidden group rounded-sm"
        >
          {/* Decorative Background Element */}
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-[#EFECE5] via-transparent to-transparent opacity-50 pointer-events-none"></div>

          <div className="flex-1 relative z-10">
            <h2 className="text-xl sm:text-2xl font-serif text-[#222222] mb-2">
              Reading about your generation is one thing — <span className="text-[#A38771]">knowing where you stand is another</span>
            </h2>
            <p className="text-sm text-[#4A4A4A] lato-regular">
              Career Fit, General Aptitude, Responsibility Rating and the wellbeing screen all live on the Online Assessment page.
            </p>
          </div>

          <Link 
            to="/tests" 
            className="shrink-0 relative overflow-hidden bg-[#C8D0C0] text-[#222222] font-bold text-sm uppercase tracking-widest px-8 py-4 transition-all duration-300 flex justify-center items-center gap-3 z-10 shadow-sm hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] group rounded-sm border border-transparent hover:bg-[#b5bead]"
          >
            <span className="relative z-10">Open the assessment catalogue</span>
          </Link>
        </motion.div>

      </div>
    </div>
  );
}