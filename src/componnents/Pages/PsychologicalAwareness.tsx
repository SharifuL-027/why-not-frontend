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
  },
  {
    id: 5,
    category: "WOMEN'S WELL-BEING",
    readTime: "6 MIN READ",
    title: "The Woman Who Cares for Everyone... Who Cares for Her?",
    excerpt: "Behind a familiar smile, many housewives carry unpaid work, financial dependence, and emotional loneliness. A psychological awareness feature on the silent struggles at home.",
    imageUrl: "https://res.cloudinary.com/kpuio2i4/image/upload/v1792906423/awareness_housewife_pycs7c.jpg", // এখানে ৫ নম্বর পোস্টের ছবির লিংক দিন (awareness_housewife.jpeg)
    fullText: (
      <>
        <p className="mb-4">She wakes up early. She prepares breakfast, manages the household, looks after children or elderly family members, remembers everyone's needs, and tries to keep the family running smoothly. She may be a wife, a mother, a daughter-in-law, a caregiver, and a thousand other things to the people around her.</p>
        <p className="mb-8">But beyond all these roles, <strong>she is also a human being, with feelings, dreams, fears, needs, and a life of her own.</strong> And sometimes, she is tired in ways that sleep alone cannot fix.</p>

        <h3 className="text-xl font-bold text-[#222222] font-serif mb-4">The silent struggles behind a familiar smile</h3>
        <p className="mb-8">In many Bangladeshi families, women carry a substantial share of unpaid domestic work and caregiving. Their contribution can be essential to family life, yet it may go unrecognised or be treated as an obligation rather than valuable work. For some housewives, the emotional burden becomes even heavier when several challenges occur together.</p>
        <ol className="list-decimal pl-5 space-y-4 mb-8 text-[#4A4A4A]">
          <li><strong>When her work is never really finished.</strong> Cooking, cleaning, childcare, caring for relatives, and managing everyday family needs can leave little time for rest or personal interests. When her efforts are taken for granted, she may begin to feel invisible, unappreciated, or emotionally exhausted.</li>
          <li><strong>When financial dependence limits her choices.</strong> A woman who has no independent income may find it difficult to make personal decisions, pursue her ambitions, or access support without asking someone else for money. Financial dependence does not automatically mean unhappiness, but limited choice and control can add to emotional strain.</li>
          <li><strong>When family expectations leave no room for her own needs.</strong> She may feel pressure to be the ideal wife, the patient daughter-in-law, the devoted mother, and the person who keeps everyone happy. But who listens when she is unhappy? Who asks whether she needs a break? And does she feel safe enough to say that she is struggling?</li>
          <li><strong>When marital or family relationships become emotionally difficult.</strong> Frequent conflict, criticism, controlling behaviour, humiliation, or a lack of emotional support can undermine a woman's sense of security and self-worth. Research involving married women in Bangladesh has found associations between attitudes that justify domestic violence and poorer mental health outcomes. Violence and coercive control should never be dismissed as ordinary family disagreements.</li>
          <li><strong>When loneliness exists inside a busy household.</strong> A woman can live with many people and still feel emotionally alone. She may have no one with whom she can speak openly about her disappointments, fears, or personal aspirations. She may remain silent to avoid conflict, judgement, or being misunderstood.</li>
          <li><strong>When motherhood becomes an overwhelming responsibility.</strong> Caring for children can be deeply meaningful, but it can also bring exhaustion, worry, and changes in identity and relationships. During pregnancy and after childbirth, some women experience significant mental health difficulties that deserve timely, compassionate professional attention, not blame or shame.</li>
        </ol>

        <h3 className="text-xl font-bold text-[#222222] font-serif mb-4">When should we pay attention?</h3>
        <p className="mb-4">Stress and sadness are normal human experiences. But sometimes, emotional difficulties become persistent and begin affecting daily life. Pay attention if you or someone you care about experiences:</p>
        <ul className="list-disc pl-5 space-y-3 mb-6 text-[#4A4A4A]">
          <li>Persistent sadness, emptiness, or loss of interest in previously enjoyable activities.</li>
          <li>Frequent worry, irritability, or difficulty relaxing.</li>
          <li>Sleep difficulties or significant changes in appetite.</li>
          <li>Feeling worthless, helpless, or guilty much of the time.</li>
          <li>Difficulty concentrating or managing everyday responsibilities.</li>
          <li>Emotional withdrawal or feeling disconnected from family and friends.</li>
        </ul>
        <p className="mb-4">These signs do not automatically mean that someone has a mental health disorder. They are reasons to pause, understand what is happening, and consider professional support if the difficulties persist or interfere with everyday life.</p>
        <p className="mb-8 border-l-2 border-[#A38771] pl-4 italic text-[#4A4A4A]">A woman's emotional pain is not a personal failure. And asking for help is not a failure of motherhood, marriage, or family responsibility.</p>

        <h3 className="text-xl font-bold text-[#222222] font-serif mb-4">What can make a difference?</h3>
        <p className="mb-4">Supporting women's mental health is not simply about asking women to become more resilient. Families and communities also have a role to play.</p>
        <ul className="list-disc pl-5 space-y-3 mb-8 text-[#4A4A4A]">
          <li><strong>Recognise her contribution.</strong> Domestic work and caregiving deserve respect, appreciation, and a fairer sharing of responsibilities.</li>
          <li><strong>Make space for her identity.</strong> Encourage her education, friendships, interests, ambitions, and opportunities for personal growth.</li>
          <li><strong>Listen without judging.</strong> Sometimes, a woman needs understanding before advice. Avoid dismissing her concerns as overthinking or unnecessary sensitivity.</li>
          <li><strong>Support her autonomy and safety.</strong> Respectful relationships allow women to express opinions, make decisions, and seek help without intimidation.</li>
          <li><strong>Make time for her well-being.</strong> Rest, social connection, meaningful activities, and access to healthcare are important, not selfish luxuries.</li>
        </ul>

        <h3 className="text-xl font-bold text-[#222222] font-serif mb-4">Dear housewife, this message is for you</h3>
        <p className="mb-2">You do not have to prove your exhaustion before you deserve rest.</p>
        <p className="mb-2">You do not have to hide your feelings to protect everyone's comfort.</p>
        <p className="mb-2">You do not have to wait until you reach a breaking point before seeking support.</p>
        <p className="mb-2">Your identity is bigger than the responsibilities you fulfil for others.</p>
        <p className="mb-8">You deserve to be heard, respected, and supported, not only for what you do for your family, but for who you are.</p>

        <h3 className="text-xl font-bold text-[#222222] font-serif mb-4">Why Not You Psychology is here to support your well-being</h3>
        <p className="mb-4">At <strong>Why Not You Psychology</strong>, we believe that understanding yourself can be an important first step towards positive change. If you have been struggling with stress, low mood, anxiety, relationship difficulties, emotional exhaustion, or uncertainty about your own feelings, consider exploring the support available through our website. You can take the first step in two ways:</p>
        <p className="mb-4"><strong>1. Explore psychological assessment.</strong> A suitable psychological questionnaire may help you reflect on particular aspects of your emotional well-being. Screening results are not, by themselves, a diagnosis; they should be interpreted appropriately and followed by professional assessment when needed.</p>
        <p className="mb-4"><strong>2. Consider online counselling.</strong> A counselling session can offer a confidential, supportive space to discuss your concerns, understand your experiences, and explore practical ways forward with a qualified professional.</p>
        <p className="mb-4">Visit <a href="https://whynotyoupsy.com" target="_blank" rel="noopener noreferrer" className="underline">whynotyoupsy.com</a>. You deserve care, too.</p>
        <p className="mb-4"><strong>Why Not You?</strong> <em>Get the support. Change yourself.</em></p>
        <p className="mb-8 text-sm italic text-[#4A4A4A]">This feature is for psychological awareness and does not replace professional assessment or treatment. If you are experiencing persistent distress, consider consulting a qualified mental health professional. If you are experiencing violence or feel unsafe at home, seek support from a trusted person or an appropriate local support service when it is safe to do so.</p>
      </>
    )
  },
  {
    id: 6,
    category: "ETHICS & VALUES",
    readTime: "5 MIN READ",
    title: "When Lying Becomes Business as Usual: What Happens to Our Values?",
    excerpt: "\"Everyone does it.\" \"Business is business.\" What the psychology of rationalisation and ethical fading says about dishonesty, and why it matters in Bangladesh.",
    imageUrl: "https://res.cloudinary.com/kpuio2i4/image/upload/v1792906422/awareness_dishonesty_okaxkm.jpg", // এখানে ৬ নম্বর পোস্টের ছবির লিংক দিন (awareness_dishonesty.jpeg)
    fullText: (
      <>
        <p className="mb-4">"Everyone does it." "Business is business." "If I tell the truth, I will lose the deal." "A little cheating is necessary to survive." Have you ever heard these excuses?</p>
        <p className="mb-4">Perhaps someone exaggerates a product's quality, hides an important fact from a customer, manipulates an invoice, makes a false promise, or offers a bribe to get an unfair advantage. And when questioned, they simply say, "That's how the world works." But does the fact that something is common make it right?</p>
        <p className="mb-8 border-l-2 border-[#A38771] pl-4 italic text-[#4A4A4A]">When dishonesty becomes normal, the problem is no longer just about money. It is also about values, accountability, and the kind of society we are building.</p>

        <h3 className="text-xl font-bold text-[#222222] font-serif mb-4">The psychology behind dishonesty</h3>
        <p className="mb-4">Why do people sometimes lie, cheat, or justify unethical behaviour, even when they know it is wrong? Psychological and behavioural research offers several important insights.</p>
        <ol className="list-decimal pl-5 space-y-4 mb-8 text-[#4A4A4A]">
          <li><strong>When we start justifying what we know is wrong.</strong> People may tell themselves that a dishonest act is acceptable because the situation is difficult, the amount is small, or someone else would do the same. This kind of rationalisation can make it easier to cross ethical boundaries.</li>
          <li><strong>When personal gain becomes more important than integrity.</strong> The desire for money, status, success, or recognition can influence decisions. When winning becomes more important than fairness, people may begin overlooking the harm their choices cause others.</li>
          <li><strong>When repeated dishonesty starts to feel normal.</strong> A person may initially feel uncomfortable about a dishonest decision. But when similar behaviour is repeatedly accepted or rewarded in their environment, they may become less likely to question it. Researchers call one related process <em>ethical fading</em>: the moral implications of a decision become less noticeable when attention shifts towards financial or practical goals.</li>
          <li><strong>When everyone blames someone else.</strong> An employee blames the manager. The manager blames market competition. The business owner blames the system. The customer says they were only trying to get the best deal. When everyone shifts responsibility, accountability disappears. Yet every person still has choices to make, and those choices matter.</li>
        </ol>

        <h3 className="text-xl font-bold text-[#222222] font-serif mb-4">Why this matters in Bangladesh</h3>
        <p className="mb-4">Corruption and dishonest business practices can undermine trust, increase costs, disadvantage honest businesses, and make people feel that fairness is impossible.</p>
        <p className="mb-4">Transparency International Bangladesh's National Household Survey 2023 reported that 70.9% of surveyed households had experienced corruption in service sectors during the reference period from May 2023 to April 2024. This figure concerns reported experiences with service-sector corruption; it is not a measure of how many Bangladeshis are dishonest.</p>
        <p className="mb-8">The wider lesson is that corruption cannot be addressed through rules and punishment alone. Transparent systems, ethical leadership, accountability, and responsible individual decisions all matter.</p>

        <h3 className="text-xl font-bold text-[#222222] font-serif mb-4">Does dishonesty mean someone is mentally unhealthy?</h3>
        <p className="mb-4">Not necessarily. <strong>Dishonesty is an ethical and behavioural issue, not a mental health diagnosis.</strong> People may act dishonestly for different reasons, including financial pressure, social influence, personal gain, or a workplace culture that rewards unethical behaviour. No single explanation applies to everyone. Psychological self-awareness can nevertheless help us examine the thinking behind our decisions. Ask yourself:</p>
        <ul className="list-disc pl-5 space-y-3 mb-4 text-[#4A4A4A]">
          <li>Do I make excuses when my actions harm someone else?</li>
          <li>Do I value winning more than being fair?</li>
          <li>Can I admit a mistake without immediately blaming someone else?</li>
          <li>Would I consider this action acceptable if someone did it to me?</li>
          <li>Do I act according to my values even when nobody is watching?</li>
        </ul>
        <p className="mb-8">These questions are not about judging yourself as a good or bad person. They are an opportunity to reflect, take responsibility, and make better choices.</p>

        <h3 className="text-xl font-bold text-[#222222] font-serif mb-4">Building a culture of integrity starts with us</h3>
        <ul className="list-disc pl-5 space-y-3 mb-4 text-[#4A4A4A]">
          <li>Tell the truth, even when an honest conversation is uncomfortable.</li>
          <li>Keep promises and communicate clearly about what you can deliver.</li>
          <li>Refuse to mislead customers, colleagues, or business partners for personal gain.</li>
          <li>Take responsibility for mistakes and correct them where possible.</li>
          <li>Encourage transparent procedures and fair treatment in your workplace.</li>
          <li>Reward integrity, not merely profit, speed, or success.</li>
        </ul>
        <p className="mb-8">Ethical behaviour does not guarantee immediate success. But trust, fairness, and accountability are essential foundations for healthy professional relationships and sustainable organisations.</p>

        <h3 className="text-xl font-bold text-[#222222] font-serif mb-4">A healthier mind. A stronger sense of responsibility.</h3>
        <p className="mb-4">Personal integrity requires more than knowing the difference between right and wrong. It also requires the willingness to examine our motives, recognise our rationalisations, and accept responsibility for our decisions.</p>
        <p className="mb-4">If you find yourself struggling with stress, anger, impulsive decisions, relationship difficulties, or recurring patterns that affect your personal or professional life, psychological support may help you understand those challenges and develop healthier ways of responding.</p>
        <p className="mb-4">At <strong>Why Not You Psychology</strong>, we believe that meaningful change begins with self-understanding. Our psychological assessment options and online counselling services can provide opportunities for reflection and professional support, where appropriate. Psychological tests are not tools for declaring someone honest, dishonest, corrupt, or morally good; their purpose depends on the particular assessment and its validated use.</p>
        <p className="mb-4">Choose awareness. Choose accountability. Choose integrity. Visit <a href="https://whynotyoupsy.com" target="_blank" rel="noopener noreferrer" className="underline">whynotyoupsy.com</a> to explore psychological assessment and online counselling options.</p>
        <p className="mb-4"><strong>Why Not You?</strong> <em>Get the support. Change yourself.</em></p>
        <p className="mb-8 text-sm italic text-[#4A4A4A]">This post is intended for psychological awareness and ethical reflection. It does not diagnose individuals or imply that dishonesty is a mental disorder.</p>
      </>
    )
  },
  {
    id: 7,
    category: "ENVIRONMENT",
    readTime: "7 MIN READ",
    title: "The Environment Is Not Someone Else's Responsibility. It Starts With Us.",
    excerpt: "You complain about dirty roads. But where did that packet go after you finished eating? Why we keep habits that harm our surroundings, and how to change them.",
    imageUrl: "https://res.cloudinary.com/kpuio2i4/image/upload/v1792906421/awareness_environment_nghumj.jpg", // এখানে ৭ নম্বর পোস্টের ছবির লিংক দিন (awareness_environment.jpeg)
    fullText: (
      <>
        <p className="mb-4">You complain about dirty roads. But where did that packet go after you finished eating? You dislike the smell of polluted air. But do you burn rubbish or ignore smoke when it comes from your own surroundings? You worry about the future of your children. But do you think twice before taking another plastic bag, throwing waste into a drain, or leaving a public place dirty?</p>
        <p className="mb-8">These are uncomfortable questions. But sometimes, meaningful change begins when we stop asking only what the government should do and start asking what we can do differently.</p>

        <h3 className="text-xl font-bold text-[#222222] font-serif mb-4">Bangladesh: a beautiful country under environmental pressure</h3>
        <p className="mb-4">From the air we breathe in Dhaka to the rivers, canals, roads, and neighbourhoods we share, environmental pollution affects our health and quality of life. The World Bank's <em>Bangladesh Country Environmental Analysis</em> identified air pollution, unsafe water and inadequate sanitation, and exposure to hazardous substances such as lead as major environmental health concerns.</p>
        <p className="mb-4">Its 2024 report estimated that environmental health risks were associated with more than 272,000 premature deaths and 5.2 billion days of illness annually in Bangladesh. These figures cover multiple environmental risks, not pollution from littering alone.</p>
        <p className="mb-4">Plastic waste is another serious concern. The World Bank reported that annual per-capita plastic consumption in urban Bangladesh increased from 3 kg in 2005 to 9 kg in 2020.</p>
        <p className="mb-8 border-l-2 border-[#A38771] pl-4 italic text-[#4A4A4A]">The problem is not simply that we produce waste. It is also how we consume, dispose of, reuse, and manage it.</p>

        <h3 className="text-xl font-bold text-[#222222] font-serif mb-4">Why do we continue habits that harm our environment?</h3>
        <p className="mb-4">Environmental awareness is important, but knowing what is right does not always mean doing it. Psychology helps us understand why.</p>
        <ol className="list-decimal pl-5 space-y-4 mb-8 text-[#4A4A4A]">
          <li><strong>"Everyone does it."</strong> When littering becomes common in a public place, people may begin to see it as normal and feel less responsible for keeping the place clean. When a harmful habit becomes socially acceptable, changing it requires changing the social norm.</li>
          <li><strong>"One person cannot make a difference."</strong> It is easy to believe that one discarded bottle or one unnecessary plastic bag is insignificant. But repeated actions by many people can create a substantial collective problem. Small individual actions matter most when they become shared habits and are supported by effective waste collection and public policy.</li>
          <li><strong>"Someone else will clean it."</strong> When responsibility is passed to cleaners, city corporations, or other people, we may overlook our own role. Public services are essential. But civic responsibility also means avoiding unnecessary waste and disposing of it properly.</li>
          <li><strong>Convenience wins over intention.</strong> We may know that reusable bags are preferable to unnecessary single-use bags, yet still choose the easiest option when shopping. Making better choices easier, such as carrying a reusable bag, keeping a waste container nearby, or sorting recyclable materials where facilities exist, can help turn good intentions into routine behaviour.</li>
          <li><strong>We notice the problem but feel helpless.</strong> Pollution can seem too large for an individual to influence, which may lead to frustration or inaction. The answer is not to pretend that personal habits can solve every environmental problem. Industrial emissions, transport systems, urban planning, waste infrastructure, and government enforcement also require serious action. The goal is to recognise both our personal responsibility and the need for collective solutions.</li>
        </ol>

        <h3 className="text-xl font-bold text-[#222222] font-serif mb-4">What can we learn from other countries?</h3>
        <p className="mb-4">Environmental progress is possible when public awareness, infrastructure, regulation, and everyday behaviour work together.</p>
        <ul className="list-none space-y-4 mb-4 text-[#4A4A4A]">
          <li><strong>Japan: habits of sorting and responsibility.</strong> Many Japanese communities use detailed waste-separation rules and designated collection schedules. These systems encourage residents to learn and follow shared disposal practices. Requirements vary by municipality, but the broader lesson is that consistent routines can support community responsibility.</li>
          <li><strong>Singapore: rules supported by enforcement.</strong> Singapore uses enforcement against littering alongside public education and organised waste-management systems. This illustrates how clear expectations and consistent consequences can reinforce responsible public behaviour.</li>
          <li><strong>Bangladesh: a pioneering step, with work still to do.</strong> Bangladesh became the first country to introduce a nationwide ban on thin plastic shopping bags in 2002. Yet plastic bags remain widely used. This shows that introducing a rule is not enough on its own: implementation, affordable alternatives, public participation, and everyday habits matter too.</li>
        </ul>
        <p className="mb-8">No country has eliminated environmental pollution. These examples demonstrate that progress requires more than awareness alone.</p>

        <h3 className="text-xl font-bold text-[#222222] font-serif mb-4">The psychology of change: start with one habit</h3>
        <p className="mb-4">You do not need to become an environmental activist overnight. Start with actions that fit your daily life.</p>
        <ul className="list-disc pl-5 space-y-3 mb-4 text-[#4A4A4A]">
          <li><strong>Carry a reusable bag</strong> when it is practical, and decline unnecessary packaging.</li>
          <li><strong>Never throw rubbish into roads, drains, rivers, or open spaces.</strong> Use appropriate waste collection facilities.</li>
          <li><strong>Reduce what you throw away.</strong> Reuse items where safe and practical, and separate recyclable waste when local facilities accept it.</li>
          <li><strong>Avoid burning rubbish.</strong> Open burning can release harmful pollutants.</li>
          <li><strong>Influence your social circle positively.</strong> Encourage family members, colleagues, and friends to keep shared spaces clean without humiliating or shaming them.</li>
          <li><strong>Support collective action.</strong> Follow local waste rules, support better municipal services, and encourage businesses and institutions to reduce pollution.</li>
        </ul>
        <p className="mb-8">Here is a simple challenge: choose one environmentally responsible habit and practise it consistently for the next seven days. Then encourage one other person to join you. Small actions become more powerful when they become shared routines.</p>

        <h3 className="text-xl font-bold text-[#222222] font-serif mb-4">Can we change our environmental behaviour by changing our mindset?</h3>
        <p className="mb-4">Yes, although mindset is only one part of the solution. Our habits are influenced by our beliefs, emotions, social expectations, convenience, and surroundings. We are more likely to maintain a behaviour when we understand its purpose, can realistically practise it, and receive encouragement from the people around us.</p>
        <p className="mb-4">Psychological self-awareness can help us identify excuses, recognise automatic habits, and take responsibility for our choices. Organisations and communities can reinforce these changes by making responsible behaviour accessible and socially supported.</p>
        <p className="mb-8 border-l-2 border-[#A38771] pl-4 italic text-[#4A4A4A]">A cleaner environment needs better systems, and people willing to use those systems responsibly.</p>

        <h3 className="text-xl font-bold text-[#222222] font-serif mb-4">Change begins with awareness. Growth begins with action.</h3>
        <p className="mb-4">At <strong>Why Not You Psychology</strong>, we believe that understanding human behaviour is an important step towards meaningful personal and social change. If you want to understand your habits, motivation, stress responses, or other aspects of your psychological well-being, you can explore suitable psychological assessments and online counselling options through our website. Psychological assessment and counselling are not environmental treatments. However, they may help people explore personal difficulties and behaviour patterns when those are relevant to their concerns.</p>
        <p className="mb-4">Visit <a href="https://whynotyoupsy.com" target="_blank" rel="noopener noreferrer" className="underline">whynotyoupsy.com</a>. Let's build healthier habits, stronger communities, and a more responsible relationship with the world we share.</p>
        <p className="mb-4"><strong>Why Not You?</strong> <em>Get the support. Change yourself.</em></p>
        <p className="mb-8 text-sm italic text-[#4A4A4A]">This feature is for public awareness. Environmental pollution requires action from individuals, businesses, communities, and governments. Personal responsibility complements, not replaces, effective environmental policy and infrastructure.</p>
      </>
    )
  },
  {
    id: 8,
    category: "CIVIC BEHAVIOUR",
    readTime: "6 MIN READ",
    title: "A Nation Cannot Be Organised If Its People Ignore the Rules",
    excerpt: "Public discipline begins in the mind and shows up in everyday behaviour. The psychology of queues, traffic, and shared spaces, plus a 7-day civic responsibility challenge.",
    imageUrl: "https://res.cloudinary.com/kpuio2i4/image/upload/v1792906421/awareness_discipline_nz6iwu.jpg", 
    fullText: (
      <>
        <p className="mb-4">Have you ever seen someone push ahead in a queue while others wait patiently? A driver who ignores traffic rules because they are in a hurry? Someone who throws rubbish into the street, blocks a footpath, makes unnecessary noise, or treats a public place as if it belongs to nobody?</p>
        <p className="mb-4">These may look like small incidents. But when such behaviours are repeated across communities, they create inconvenience, conflict, unsafe conditions, and a loss of trust.</p>
        <p className="mb-8 border-l-2 border-[#A38771] pl-4 italic text-[#4A4A4A]">A society's quality of life depends not only on its laws, but also on how people behave when nobody is watching.</p>

        <h3 className="text-xl font-bold text-[#222222] font-serif mb-4">Why does public discipline matter in Bangladesh?</h3>
        <p className="mb-4">In our daily lives, we depend on shared systems: roads, footpaths, public transport, hospitals, schools, markets, offices, and public services. When people disregard common rules, everyone pays a price.</p>
        <ul className="list-disc pl-5 space-y-3 mb-4 text-[#4A4A4A]">
          <li><strong>On the roads:</strong> ignoring traffic rules can increase danger and delay other road users.</li>
          <li><strong>In public spaces:</strong> littering and obstruction make shared areas less accessible and pleasant.</li>
          <li><strong>In queues and service centres:</strong> pushing ahead or demanding special treatment undermines fairness.</li>
          <li><strong>In communities:</strong> unnecessary noise, disrespect, and disregard for others' rights can create avoidable tension.</li>
          <li><strong>In workplaces:</strong> lateness, failure to honour commitments, and neglect of shared responsibilities can weaken cooperation.</li>
        </ul>
        <p className="mb-8">These problems are not unique to Bangladesh. However, improving everyday civic behaviour is an important part of building safer, more respectful, and more liveable communities here.</p>

        <h3 className="text-xl font-bold text-[#222222] font-serif mb-4">The psychology behind disorganised behaviour</h3>
        <p className="mb-4">Why might someone understand a rule but still choose to ignore it?</p>
        <ol className="list-decimal pl-5 space-y-4 mb-4 text-[#4A4A4A]">
          <li><strong>"If others can do it, why can't I?"</strong> People often look at the behaviour of those around them to decide what is acceptable. When rule-breaking appears common, it can gradually seem normal.</li>
          <li><strong>"My convenience matters more."</strong> A person may focus on saving a few minutes or avoiding a small inconvenience without considering the cost to others. Responsible behaviour requires looking beyond immediate personal benefit.</li>
          <li><strong>"Someone else will take care of it."</strong> When people believe that public cleanliness, order, and safety are solely someone else's responsibility, they may contribute less to maintaining them.</li>
          <li><strong>"Rules are only for other people."</strong> A sense of entitlement can lead people to expect exceptions for themselves while demanding compliance from everyone else. Fair communities require people to recognise that the same reasonable rules apply to all.</li>
          <li><strong>"I know the rule, but I act on impulse."</strong> Hurry, frustration, distraction, and poor planning can sometimes contribute to careless decisions. Developing patience, self-regulation, and awareness of consequences can help people respond more thoughtfully.</li>
        </ol>
        <p className="mb-8"><strong>Understanding these patterns is not an excuse for irresponsible behaviour. It is a starting point for changing it.</strong></p>

        <h3 className="text-xl font-bold text-[#222222] font-serif mb-4">Is public discipline connected with mental health?</h3>
        <p className="mb-4">Mental health is not simply the absence of a psychological disorder. The World Health Organization describes it in terms of well-being, coping with life's stresses, functioning, and contributing to one's community. Psychological skills such as emotional regulation, patience, perspective-taking, and responsible decision-making can support healthier interactions with others.</p>
        <p className="mb-4">However, it is important to be clear: <strong>breaking public rules does not automatically mean that someone has a mental health problem.</strong> Public behaviour is also influenced by social norms, education, infrastructure, fair enforcement, and the examples set by families, leaders, and institutions.</p>
        <p className="mb-8">A more organised society requires both responsible individuals and systems that make responsible behaviour possible.</p>

        <h3 className="text-xl font-bold text-[#222222] font-serif mb-4">The 7-day civic responsibility challenge</h3>
        <p className="mb-4">Let's begin with ourselves. For the next seven days, practise these simple habits:</p>
        <ul className="list-disc pl-5 space-y-3 mb-4 text-[#4A4A4A]">
          <li><strong>Respect the queue.</strong> Wait your turn, even when nobody is checking.</li>
          <li><strong>Follow road and pedestrian rules.</strong> Think about the safety of everyone sharing the road.</li>
          <li><strong>Keep shared spaces clean.</strong> Dispose of rubbish properly and avoid obstructing public areas.</li>
          <li><strong>Respect other people's time.</strong> Be punctual, honour commitments, and communicate when plans change.</li>
          <li><strong>Control your response.</strong> When frustrated, pause before speaking or acting.</li>
          <li><strong>Respect shared rules.</strong> Do not expect special treatment simply because you are in a hurry or feel entitled to it.</li>
          <li><strong>Lead by example.</strong> Encourage better behaviour politely instead of humiliating others.</li>
        </ul>
        <p className="mb-8">One person's actions may seem small. But when responsible habits become shared expectations, they can help strengthen community life.</p>

        <h3 className="text-xl font-bold text-[#222222] font-serif mb-4">A better Bangladesh begins with a better everyday culture</h3>
        <p className="mb-4">We often ask why our roads, public places, institutions, and communities cannot be more organised. Perhaps we should also ask: <em>Am I contributing to the problem, or helping to solve it?</em> Do I respect rules only when I fear a penalty, or do I understand why those rules matter? Do I consider the rights of others when making everyday decisions? Can I take responsibility for my own behaviour without blaming everyone else?</p>
        <p className="mb-8">These questions are not about judging an entire nation. They are about recognising that social progress requires individual responsibility, effective institutions, and collective effort.</p>

        <h3 className="text-xl font-bold text-[#222222] font-serif mb-4">Want to understand your own habits and behaviour?</h3>
        <p className="mb-4">Sometimes, stress, impulsivity, anger, poor emotional regulation, or difficulties with planning can affect how a person responds to everyday situations. If you are concerned about recurring patterns in your own life, psychological assessment or counselling may help you explore those concerns, where appropriate.</p>
        <p className="mb-4">At <strong>Why Not You Psychology</strong>, we believe that meaningful personal growth begins with awareness, reflection, and a willingness to change. Explore the available psychological assessment and online counselling options at <a href="https://whynotyoupsy.com" target="_blank" rel="noopener noreferrer" className="underline">whynotyoupsy.com</a>.</p>
        <p className="mb-4 italic">A stronger mind. A more responsible citizen. A better community.</p>
        <p className="mb-4"> <strong>Why Not You?</strong> <em>Get the support. Change yourself.</em></p>
        <p className="mb-8 text-sm italic text-[#4A4A4A]">This feature is for psychological and civic awareness. It is not a diagnosis of people who break rules. Positive social change also requires accessible public services, fair enforcement, good infrastructure, and accountability from institutions.</p>
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