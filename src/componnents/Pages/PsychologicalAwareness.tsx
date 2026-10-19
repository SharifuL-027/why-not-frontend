import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

// ==========================================
// User Provided 4 Awareness Posts Data
// ==========================================
interface Post {
  id: number;
  category: string;
  readTime: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  fullText: React.ReactNode;
  isFeatured?: boolean;
}

const awarenessPostsData: Post[] = [
  {
    id: 1,
    isFeatured: true,
    category: "PARENTING",
    readTime: "5 MIN READ",
    title: "He Was Only Thirteen. Are We Sure We Know Our Children?",
    excerpt: "A tragic incident involving a 13-year-old boy prompts a deeper look into authoritative parenting, teenage gangs, and how well we truly know our children.",
    imageUrl: "https://res.cloudinary.com/dsrs8hryx/image/upload/v1790752895/child_f16s4x.jpg",
    fullText: (
      <>
        <p className="mb-6">A few days ago, a 13-year-old boy lost his life over a mobile phone. The news shook us. Then came a second layer of the story: reports that he had been involved with a local teenage gang. And almost immediately, the conversation shifted. How did a boy that young own an expensive iPhone? How was he riding a motorbike without a licence? Where were his parents?</p>
        <p className="mb-8">Those questions are understandable. But before we point at one grieving family, psychology asks us to turn the question inward, gently and honestly: <strong>Am I certain that I know what is happening in my own child's life?</strong></p>

        <h3 className="text-xl font-bold text-[#222222] font-serif mb-4">Love is not the same as parenting</h3>
        <p className="mb-4">Almost every parent loves their child. That is rarely the problem. The difficulty is that love, on its own, does not guarantee good parenting. A parent can love deeply and still be absent, still say "yes" to every demand, still mistake a costly gift for care.</p>
        <p className="mb-4">Developmental research consistently shows that children do best with what psychologists call authoritative parenting. This style combines warmth with clear, consistent limits. It is not harsh control, and it is not endless permission. Children raised with warmth but no boundaries often struggle with self-control and frustration tolerance. Children raised with rules but no warmth often learn to hide rather than to trust.</p>
        <p className="mb-8">When a young teenager is handed an expensive phone or the keys to a motorbike, the object itself is not the danger. The danger is the message that may come with it: your wants will be met without effort, and the rules of the world do not quite apply to you.</p>

        <h3 className="text-xl font-bold text-[#222222] font-serif mb-4">Why teenagers are drawn to gangs</h3>
        <p className="mb-4">No child is born to join a gang. Adolescents go looking for three things: belonging, identity, and respect. If they do not find these at home or at school, they will find them somewhere else.</p>
        <p className="mb-4">The adolescent brain is still under construction. The emotional and reward-seeking systems mature early, while the prefrontal cortex, which governs judgement, impulse control, and thinking about consequences, keeps developing into the mid-twenties. Research shows that teenagers take noticeably more risks when their peers are watching. A group that offers a nickname, a sense of power, and a place to belong can feel irresistible to a child who feels unseen at home.</p>
        <p className="mb-8 border-l-2 border-[#A38771] pl-4 italic text-[#4A4A4A]">A gang is often not the cause of a child's problems. It is the answer the child found for problems nobody noticed.</p>

        <h3 className="text-xl font-bold text-[#222222] font-serif mb-4">The myth of "I know my child"</h3>
        <p className="mb-4">Many parents believe they monitor their children well. Yet studies on parental monitoring reveal something important: most of what parents actually know about their teenagers comes not from checking or controlling, but from what children choose to tell them. And children tell parents things when they feel safe, heard, and not immediately judged.</p>
        <p className="mb-8">So the real question is not "Do I check my child's phone?" It is "Would my child come to me if something went wrong?"</p>

        <h3 className="text-xl font-bold text-[#222222] font-serif mb-4">A quiet self-check for every parent</h3>
        <p className="mb-4">Take a moment with these questions. Answer them only for yourself:</p>
        <ul className="list-disc pl-5 space-y-3 mb-8 text-[#4A4A4A]">
          <li>Do I know who my child's closest friends are, and where they spend their evenings?</li>
          <li>When did my child last tell me something difficult, without being forced to?</li>
          <li>Do I give things to make up for the time I cannot give?</li>
          <li>Can my child hear "no" from me without it becoming a battle I eventually lose?</li>
          <li>Do I notice changes in mood, sleep, spending, or secrecy, or do I explain them away?</li>
          <li>Am I modelling the honesty, patience, and respect for rules that I expect from my child?</li>
        </ul>
        <p className="mb-8">If some of these made you pause, that is not a sign of failure. It is a sign of awareness, and awareness is where better parenting begins.</p>

        <h3 className="text-xl font-bold text-[#222222] font-serif mb-4">This is not about blame</h3>
        <p className="mb-4">A child's death is a tragedy for a family and a loss for all of us. The purpose of reflecting on it is not to condemn parents who are already grieving. It is to make sure that fewer families ever have to grieve in the same way. Parenting in a world of smartphones, social media, and fast-changing peer cultures is harder than it has ever been, and no parent should have to navigate it by guesswork.</p>
        <p className="mb-8">Being a good parent is not a title we give ourselves. It is a skill we keep examining, learning, and strengthening.</p>
      </>
    )
  },
  {
    id: 2,
    category: "CAREER PSYCHOLOGY",
    readTime: "6 MIN READ",
    title: "Choosing a Career, or Borrowing One? What 440 Bangladeshi Teenagers Revealed About Their Futures",
    excerpt: "A survey of 440 adolescents reveals a generation choosing careers more out of safety and fear than genuine self-knowledge.",
    imageUrl: "https://res.cloudinary.com/dsrs8hryx/image/upload/v1790752894/WhatsApp_Image_2026-09-29_at_12.54.19_AM_sio0ua.jpg", // এখানে আপনার ২ নম্বর পোস্টের ছবির লিংক দিন
    fullText: (
      <>
        <p className="mb-8">Ask a teenager in Bangladesh what they want to become, and you will usually get an answer. Ask them <em>why</em>, and the answer often gets thinner. Our survey of 440 adolescents (220 boys and 220 girls) set out to understand how young people are making one of the most important decisions of their lives. The findings are hopeful in some places and worrying in others. Above all, they show a generation choosing careers more out of fear than out of self-knowledge.</p>

        <h3 className="text-xl font-bold text-[#222222] font-serif mb-4">Security first, self second</h3>
        <p className="mb-4">When asked why they reject a particular career path, teenagers gave strikingly similar reasons. Government jobs were rejected mainly for low salary (44.8%). Private jobs were rejected for lack of job security and pension. Business was avoided because of the risk of failure (31.1%) and a lack of capital (29.1%).</p>
        <p className="mb-4">Across every sector, the dominant concern was the same: <strong>Will I be safe?</strong> Very few answers suggested young people asked: <em>Will this suit me?</em></p>
        <p className="mb-8">Psychologically, this matters. Career research, from Holland's person–environment fit theory to Social Cognitive Career Theory, shows that satisfaction, performance, and long-term mental health depend heavily on the match between a person's interests, abilities, and values and the demands of their work. A career chosen only for security can provide income while quietly draining motivation, which is a pattern we later see in adults who feel stuck, burnt out, or unfulfilled.</p>

        <h3 className="text-xl font-bold text-[#222222] font-serif mb-4">A striking gender divide</h3>
        <p className="mb-4">Girls and boys are imagining very different futures. 84.1% of girls want to build their careers in Bangladesh, compared with only 50% of boys. This gap is not a matter of chance; it is statistically strong (χ²(2) = 58.6, p &lt; .001, Cramér's V = .37). Nearly one in five boys (19.1%) explicitly does not want to work in Bangladesh, and almost a third (30.9%) are unsure.</p>
        <p className="mb-4">Girls leaned heavily toward private jobs (49.1%), teaching (23.2%), medicine (19.1%), and online business (27.7% among business choices). They are pioneering home-based digital entrepreneurship. Boys leaned more toward government service, corporate jobs, and import–export business.</p>
        <p className="mb-8 border-l-2 border-[#A38771] pl-4 italic text-[#4A4A4A]">Yet not a single girl chose programming or data analysis. This suggests that some doors remain closed in young minds long before they are closed in the job market.</p>

        <h3 className="text-xl font-bold text-[#222222] font-serif mb-4">"Luck decides" is a warning sign</h3>
        <p className="mb-4">Almost a quarter of respondents (23.9%) said they avoid business because "luck is a factor", and boys said this far more often than girls (29.5% vs 18.2%).</p>
        <p className="mb-8">In psychological terms, this reflects an <em>external locus of control</em>: the belief that outcomes depend on fate rather than effort. Young people who hold this belief tend to avoid challenges, give up sooner, and take less ownership of their decisions. It is a mindset that parents and teachers can reshape, but only if they notice it.</p>

        <h3 className="text-xl font-bold text-[#222222] font-serif mb-4">BCS and YouTube, side by side</h3>
        <p className="mb-8">One of the most revealing results: the BCS civil service and becoming a YouTuber were chosen by exactly the same number of adolescents (26 each, 5.9%). The most traditional and the most modern career dreams now carry equal weight in the teenage imagination. This is not necessarily bad, but it raises an important question. Are these choices based on genuine aptitude, or on what looks prestigious in the family on one hand and glamorous on a screen on the other?</p>

        <h3 className="text-xl font-bold text-[#222222] font-serif mb-4">The undecided one-fifth</h3>
        <p className="mb-8">About 21.1% of respondents are not sure where they want to build their future. Uncertainty at this age is normal. Developmental psychologists describe adolescence as a period of exploration. The problem is not being unsure; the problem is being unsure without guidance. Left alone, undecided teenagers often default to whatever their peers, relatives, or social media suggest.</p>

        <h3 className="text-xl font-bold text-[#222222] font-serif mb-4">What this means for parents and young people</h3>
        <p className="mb-4">Choosing a career is not simply picking a job title. It is a question of identity: Who am I, what am I good at, and what kind of life do I want? The data shows that many of our young people are answering that question with borrowed answers, shaped by salary rumours, family pressure, and fear of failure rather than an honest understanding of themselves.</p>
        <p className="mb-8">The good news is that self-knowledge can be built. Interests, aptitudes, personality, and work values can all be assessed scientifically, giving a young person a clearer map before they invest years in a path.</p>
      </>
    )
  },
  {
    id: 3,
    category: "MENTAL HEALTH",
    readTime: "7 MIN READ",
    title: "Seven Years of Crisis: How Is Bangladesh's Mind Holding Up?",
    excerpt: "From the pandemic to the 2024 uprisings and floods, exploring the cumulative psychological toll of back-to-back crises on the people of Bangladesh.",
    imageUrl: "https://res.cloudinary.com/dsrs8hryx/image/upload/v1790752896/WhatsApp_Image_2026-09-29_at_12.54.18_AM_fht6zf.jpg", // এখানে আপনার ৩ নম্বর পোস্টের ছবির লিংক দিন
    fullText: (
      <>
        <p className="mb-8">Think back to early 2020. First came the pandemic, with lockdowns, lost incomes, and the fear of losing loved ones. Before we could fully recover, prices began to climb. Then came load-shedding, gas shortages, fuel price hikes, political turmoil, floods, and the constant background noise of wars on the other side of the world, reaching us through our screens every hour. Each crisis on its own was hard. The real story, psychologically, is that they came one after another, with almost no time to recover in between. So how is the mind of Bangladesh doing now?</p>

        <h3 className="text-xl font-bold text-[#222222] font-serif mb-4">Where we started: already a heavy burden</h3>
        <p className="mb-4">Even before these crises peaked, the country was carrying a significant mental health load. The National Mental Health Survey of Bangladesh in 2019 estimated that 16.8% of adults and 13.6% of children had a mental health condition, and more than 90% of them did not seek treatment. In practical terms, that is roughly one in six adults, and most of them are suffering in silence.</p>
        <p className="mb-8">The resources to help were very limited. WHO figures for 2020 estimated only about 1.17 mental health professionals per 100,000 people, with roughly 270 psychiatrists and 565 psychologists and other paid mental health workers across government and NGOs.</p>

        <h3 className="text-xl font-bold text-[#222222] font-serif mb-4">Then the storms arrived, one after another</h3>
        <ul className="list-none space-y-4 mb-8 text-[#4A4A4A]">
          <li><strong>The pandemic:</strong> In the early months of COVID-19, distress rose sharply. One large online survey of more than 10,000 people in April 2020 found that about 64%, 87%, and 61% of respondents reported high levels of depression, anxiety, and stress respectively. The signal was clear: the nation was frightened.</li>
          <li><strong>The economic squeeze:</strong> Next came the cost-of-living crisis. Price pressure kept rising in Bangladesh even as other countries recovered. Financial strain is one of the strongest known predictors of anxiety and depression. When a parent cannot predict whether this month's salary will cover rice, rent, and school fees, the body stays in a constant state of alarm.</li>
          <li><strong>Political unrest:</strong> The events of July–August 2024 left deep wounds. Among 217 injured survivors treated in Dhaka hospitals, 82.5% met the threshold for depression and 64.1% for PTSD. Researchers noted that the uprising left a marked impression on population mental health, including among children exposed through television and social media. Trauma does not only affect people who were physically present; it affects those who watched it happen on their phones.</li>
          <li><strong>Disasters on top:</strong> Natural hazards added another layer. After the 2024 flash flood in Feni, a study found 52.80% of survivors suffering from severe depression, 44.17% from severe anxiety, and 46.90% from severe stress.</li>
        </ul>

        <h3 className="text-xl font-bold text-[#222222] font-serif mb-4">What psychology tells us about "crisis after crisis"</h3>
        <p className="mb-4">Human beings can survive a single hard blow remarkably well. What wears us down is cumulative stress. Psychologists call this <em>allostatic load</em>: the wear and tear on the body and mind from being on alert for too long. Sleep becomes shallow. Patience becomes short. Small problems start to feel enormous.</p>
        <p className="mb-4">Three patterns are especially visible in Bangladesh today:</p>
        <ul className="list-disc pl-5 space-y-3 mb-6 text-[#4A4A4A]">
          <li><strong>Chronic uncertainty:</strong> Not knowing what tomorrow's prices, power supply, or political situation will look like is, for many people, more exhausting than a known hardship.</li>
          <li><strong>Learned helplessness:</strong> When efforts repeatedly fail to change outcomes, people stop trying, and hopelessness quietly replaces frustration.</li>
          <li><strong>Secondary trauma through screens:</strong> Endless scrolling through violence, war, and bad news keeps the nervous system activated even in the safety of one's home.</li>
        </ul>
        <p className="mb-8 border-l-2 border-[#A38771] pl-4 italic text-[#4A4A4A]">Many people do not describe this as "depression" or "anxiety". They say they are tired, irritable, can't sleep, have headaches, or don't enjoy anything anymore. These are real signals, not weaknesses.</p>

        <h3 className="text-xl font-bold text-[#222222] font-serif mb-4">So, how are we really doing?</h3>
        <p className="mb-4">The honest answer is that we do not yet have a fresh nationwide picture. The 2019 National Mental Health Survey remains the latest and only large-scale representative survey in the country. What we do have is a growing body of smaller studies, and almost all of them point in the same direction: stress is widespread, trauma is concentrated in the hardest-hit groups, and help-seeking remains far too low.</p>
        <p className="mb-8">The most important gap is not in the statistics. It is the distance between how people feel and whether they recognise it, name it, and do something about it.</p>
      </>
    )
  },
  {
    id: 4,
    category: "RELATIONSHIPS",
    readTime: "6 MIN READ",
    title: "Married, But Are We Still Together? The Changing Face of Marriage in Bangladesh",
    excerpt: "Analyzing the rising divorce rates in Bangladesh and the quiet psychological erosion that precedes infidelity and marital breakdown.",
    imageUrl: "https://res.cloudinary.com/dsrs8hryx/image/upload/v1790752894/lol_niux6h.jpg", // এখানে আপনার ৪ নম্বর পোস্টের ছবির লিংক দিন
    fullText: (
      <>
        <p className="mb-8">A few years into marriage, many couples in Bangladesh describe the same quiet change. They still share a home, a bed, and responsibilities, but the conversations have become shorter, the silences longer, and each partner spends the evening glowing blue behind a phone screen. For some, this distance slowly turns into conflict. For a growing number, it ends in separation. What is happening to marriage in our country, and why?</p>

        <h3 className="text-xl font-bold text-[#222222] font-serif mb-4">What the numbers say</h3>
        <p className="mb-4">According to the Bangladesh Bureau of Statistics (BBS), the crude divorce rate hovered between 0.6 and 1.1 per 1,000 people from 2006 to 2021, then rose to 1.4 in 2022. Put simply, for every 10,000 people, 8 got divorced in 2020, 7 in 2021, and 14 in 2022. The 2023 survey showed a slight easing to 11 per 10,000, so the trend is not a straight line upward. Even so, the overall picture is clear: marital breakdown is more common today than it was a decade ago, and it is no longer only an urban phenomenon, since rural rates are now slightly higher than those in cities.</p>
        <p className="mb-8">Another striking shift is <em>who</em> is leaving. In 2022, the Dhaka South City Corporation recorded 7,698 divorces, and wives filed about 70 percent of the applications; in Dhaka North, the figure was about 65 percent.</p>

        <h3 className="text-xl font-bold text-[#222222] font-serif mb-4">Why marriages are breaking</h3>
        <p className="mb-4">For the first time, BBS published data on the causes of divorce. The leading reason was extramarital relationships (23%), followed closely by the inability to maintain conjugal life (22%). Other causes included failure to support the family, family pressure, physical abuse, and sexual incapacity. Behind these categories are deeper psychological patterns.</p>
        <ol className="list-decimal pl-5 space-y-4 mb-8 text-[#4A4A4A]">
          <li><strong>Emotional disconnection comes before infidelity.</strong> Affairs rarely begin with attraction to someone new. They usually begin with loneliness inside the marriage. When a spouse feels unseen, unheard, or unappreciated, the attention of a stranger online can feel like water in a desert.</li>
          <li><strong>Social media lowers the barriers.</strong> In the past, a secret relationship required effort and risk. Today it requires only a phone. Online interaction often feels "less real", and therefore less wrong, until it has already gone too far. Psychologists recognise mechanisms like phubbing (ignoring your partner for your phone), constant comparison, and secret chats that replace honest conversation.</li>
          <li><strong>Economic pressure spills into the bedroom.</strong> According to the Family Stress Model, economic strain makes people more irritable and less patient, which leads to harsher arguments and less warmth. Couples do not usually fight about money itself; they fight because money worries have drained their capacity for kindness.</li>
          <li><strong>Changing expectations, changing tolerance.</strong> More women are educated and earning, and they are less willing to endure abuse or neglect in silence. This is not the "breaking" of family values. It is a demand that marriage offer respect and dignity, not only duty.</li>
          <li><strong>The four silent destroyers.</strong> Relationship researcher John Gottman identified four communication patterns that predict divorce: criticism, contempt, defensiveness, and stonewalling. Contempt is the most damaging of all. In many Bangladeshi households, these patterns are made worse by interference from in-laws and a cultural expectation that problems should never be discussed openly.</li>
        </ol>

        <h3 className="text-xl font-bold text-[#222222] font-serif mb-4">The marriages that last</h3>
        <p className="mb-8 border-l-2 border-[#A38771] pl-4 italic text-[#4A4A4A]">Strong marriages are not the ones without conflict. They are the ones where partners repair after conflict.</p>
        <p className="mb-8">Research consistently shows that lasting couples turn towards each other's small bids for attention, protect regular time together, speak about problems gently, and treat each other as friends as well as spouses. Trust is built in small daily moments, and it is lost the same way.</p>

        <h3 className="text-xl font-bold text-[#222222] font-serif mb-4">An honest question for every couple</h3>
        <p className="mb-4">Take a moment and reflect: When did we last talk without screens? Do I know what worries my partner these days? Do our arguments end in understanding, or in silence? Would I be comfortable if my spouse read my private messages?</p>
        <p className="mb-8">If these questions feel uncomfortable, that discomfort is useful information. Most marriages do not end suddenly. They erode quietly over years, and they can usually be saved when problems are recognised early.</p>
      </>
    )
  }
];

export default function AwarenessPosts() {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const featuredPost = awarenessPostsData[0]; // 1st post as featured
  const standardPosts = awarenessPostsData.slice(1); // 2nd, 3rd, 4th posts

  return (
    <div className="relative w-full min-h-screen lg:pl-[50px] overflow-hidden flex flex-col pt-32 pb-32 px-4 sm:px-6 md:px-10 bg-[#F9F6F0] font-sans">
      
      {/* =========================================
          MODAL (POPUP) SECTION FOR FULL READING
          ========================================= */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-10 py-10 bg-[#222222]/80 backdrop-blur-md lg:pl-[50px]"
          >
            <div className="absolute inset-0 cursor-pointer" onClick={() => setSelectedPost(null)}></div>
            
            <motion.div 
              initial={{ y: 50, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 20, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative w-full max-w-4xl bg-white border border-[#EFECE5] shadow-[0_20px_60px_rgba(0,0,0,0.15)] max-h-full flex flex-col overflow-hidden rounded-sm"
            >
              <div className="h-1.5 w-full bg-[#A38771]"></div>
              
              <button 
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm border border-[#EFECE5] text-[#222222] hover:text-[#A38771] hover:border-[#A38771] flex items-center justify-center transition-all duration-300 z-20 rounded-sm"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="overflow-y-auto custom-scrollbar relative flex-1">
                {/* Modal Header Image */}
                {selectedPost.imageUrl && (
                  <div className="w-full h-64 sm:h-80 relative overflow-hidden bg-[#F9F6F0]">
                    <img src={selectedPost.imageUrl} alt={selectedPost.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent"></div>
                  </div>
                )}

                <div className="p-8 sm:p-14 relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-xs sm:text-sm font-bold text-[#222222] uppercase tracking-[0.2em] border border-[#EFECE5] px-4 py-1.5 bg-[#F9F6F0] rounded-sm">
                      {selectedPost.category}
                    </span>
                    <span className="text-xs sm:text-sm text-[#A38771] font-bold tracking-[0.1em] uppercase">{selectedPost.readTime}</span>
                  </div>
                  
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium font-serif text-[#222222] mb-10 leading-tight">
                    {selectedPost.title}
                  </h2>
                  
                  <div className="text-lg text-[#4A4A4A] leading-loose lato-regular">
                    {selectedPost.fullText}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex-1 flex flex-col gap-24">
        
        {/* =========================================
            SECTION 1: HERO
            ========================================= */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col justify-center border-b border-[#EFECE5] pb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <span className="text-[#A38771] font-bold tracking-[0.25em] uppercase text-sm sm:text-base">
              AWARENESS & INSIGHTS
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#222222] font-serif tracking-tight drop-shadow-sm mb-10 leading-[1.1]">
            Understanding the mind <br />
            <span className="italic font-light text-[#A38771]">is where change begins</span>
          </h1>
          <p className="text-[#4A4A4A] text-lg sm:text-2xl max-w-4xl leading-relaxed lato-regular border-l-4 border-[#A38771] pl-6 py-2">
            Read through these four core awareness articles to understand the profound psychological shifts happening in parenting, career choices, mental health, and relationships.
          </p>
        </motion.div>

        {/* =========================================
            SECTION 2: 4 POSTS GRID
            ========================================= */}
        <div>
          <div className="flex items-center gap-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif text-[#222222] tracking-wide">Awareness Articles</h2>
            <div className="flex-1 h-[1px] bg-[#EFECE5] ml-6"></div>
          </div>

          {/* Featured Post (1st Post) */}
          {featuredPost && (
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              onClick={() => setSelectedPost(featuredPost)}
              className="bg-white border border-[#EFECE5] shadow-sm hover:shadow-[0_15px_40px_rgba(0,0,0,0.04)] mb-12 flex flex-col md:flex-row group cursor-pointer hover:border-[#A38771] transition-all duration-500 relative overflow-hidden rounded-sm"
            >
              <div className="w-full md:w-1/2 lg:w-3/5 p-8 sm:p-12 relative z-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xs font-bold text-[#222222] bg-[#F9F6F0] border border-[#EFECE5] uppercase tracking-widest px-3 py-1 rounded-sm">
                    {featuredPost.category}
                  </span>
                  <span className="text-xs text-[#A38771] font-bold uppercase tracking-widest">{featuredPost.readTime}</span>
                </div>
                
                <h3 className="text-3xl sm:text-4xl font-bold text-[#222222] mb-6 font-serif group-hover:text-[#A38771] transition-colors duration-300 leading-snug">
                  {featuredPost.title}
                </h3>
                
                <p className="text-base sm:text-lg text-[#4A4A4A] leading-relaxed mb-10">
                  {featuredPost.excerpt}
                </p>

                <div className="mt-auto inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-[#222222] group-hover:text-[#A38771] transition-colors">
                  Read Article
                  <span className="w-8 h-8 flex items-center justify-center border border-[#EFECE5] group-hover:border-[#A38771] bg-[#F9F6F0] group-hover:bg-white transition-colors rounded-sm">
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Featured Image Box */}
              <div className="w-full md:w-1/2 lg:w-2/5 aspect-[4/3] md:aspect-auto bg-[#EFECE5] border-l border-[#EFECE5] overflow-hidden relative z-10 shrink-0 flex items-center justify-center">
                {featuredPost.imageUrl ? (
                  <img src={featuredPost.imageUrl} alt={featuredPost.title} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" />
                ) : (
                  <span className="text-xs text-gray-400 uppercase tracking-widest font-mono">[ Image 1 Placeholder ]</span>
                )}
              </div>
            </motion.div>
          )}

          {/* Grid Posts (2nd, 3rd, 4th Post) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {standardPosts.map((post, idx) => (
              <motion.div 
                key={post.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                onClick={() => setSelectedPost(post)}
                className="bg-white border border-[#EFECE5] shadow-sm flex flex-col group cursor-pointer hover:border-[#A38771] hover:shadow-[0_15px_40px_rgba(0,0,0,0.04)] transition-all duration-500 relative overflow-hidden rounded-sm"
              >
                {/* Image Box */}
                <div className="w-full h-48 sm:h-56 bg-[#EFECE5] overflow-hidden relative border-b border-[#EFECE5] flex items-center justify-center">
                  {post.imageUrl ? (
                    <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" />
                  ) : (
                    <span className="text-xs text-gray-400 uppercase tracking-widest font-mono">[ Image {post.id} Placeholder ]</span>
                  )}
                </div>
                
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[10px] font-bold text-[#A38771] uppercase tracking-widest">{post.category}</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest">{post.readTime}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-[#222222] mb-4 font-serif group-hover:text-[#A38771] transition-colors duration-300 leading-snug">
                    {post.title}
                  </h3>
                  
                  <p className="text-sm text-[#4A4A4A] leading-relaxed mb-8 flex-1">
                    {post.excerpt}
                  </p>

                  <div className="mt-auto inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#222222] group-hover:text-[#A38771] transition-colors">
                    Read
                    <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* =========================================
            SECTION 3: CALL TO ACTION
            ========================================= */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white border border-[#EFECE5] p-12 sm:p-20 text-center relative overflow-hidden group shadow-sm mt-10 rounded-sm"
        >
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-serif text-[#222222] mb-6 leading-tight">
              Ready to take the next step in your <span className="italic text-[#A38771]">Psychological Journey?</span>
            </h2>
            <p className="text-lg text-[#4A4A4A] mb-12 lato-regular leading-relaxed">
              Reading about psychology is the first step. Applying it to your own life is where real change happens.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link 
                to="/counselling"
                className="relative overflow-hidden bg-[#A38771] text-white font-bold text-sm sm:text-base uppercase tracking-widest px-10 py-5 transition-all duration-300 flex justify-center items-center gap-3 shadow-sm hover:shadow-md group/btn border border-transparent rounded-sm hover:bg-[#8e7460]"
              >
                <span className="relative z-10">Book a Session</span>
                <svg className="w-5 h-5 relative z-10 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              
              <Link 
                to="/tests"
                className="relative overflow-hidden bg-[#F9F6F0] text-[#222222] font-bold text-sm sm:text-base uppercase tracking-widest px-10 py-5 transition-all duration-300 flex justify-center items-center gap-3 border border-[#EFECE5] hover:border-[#A38771] hover:bg-white group/btn2 rounded-sm"
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