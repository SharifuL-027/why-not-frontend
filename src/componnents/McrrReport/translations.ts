export interface DomainContent {
  title_en: string;
  title_bn: string;
  summary_en: string;
  summary_bn: string;
  detail_en: string[];
  detail_bn: string[];
  gap_en?: string[];
  gap_bn?: string[];
  partner_en?: string;
  partner_bn?: string;
  elders_en?: string;
  elders_bn?: string;
  modality_en: string;
  modality_bn: string;
  psych_en: string;
  psych_bn: string;
  timelineStep: {
    week: string;
    week_bn: string;
    title_en: string;
    title_bn: string;
    action_en: string;
    action_bn: string;
  };
}

export const DOMAIN_DETAILS: Record<string, DomainContent> = {
  D1: {
    title_en: "Communication & Conflict Repair",
    title_bn: "যোগাযোগ ও দ্বন্দ্ব-সংস্কার",
    summary_en: "Your ability to address friction cleanly and restore warmth after arguments.",
    summary_bn: "মতভেদের পর সুস্থভাবে ফিরে আসা এবং উষ্ণতা পুনরুদ্ধারের সক্ষমতা।",
    detail_en: [
      "When disagreements or tensions arise between the two of you, there is a clear and dependable pathway back to safety. You tend to articulate challenging topics rather than bottling them up in silence, and you return to resolve them constructively once intense emotional reactivity has cooled.",
      "This represents a premier relational asset. Repair capacity is the central physiological cushion that enables couples to weather exterior shocks that they cannot control, and it does not demand that exterior pressures vanish first.",
      "However, high competence in internal repair can subtly remain dormant when the primary friction originates from outside interference. Be intentional about applying your shared repair skills directly toward handling outside intrusions together.",
    ],
    detail_bn: [
      "তোমাদের মধ্যে মতভেদ বা উত্তেজনা তৈরি হলে আবার স্বাভাবিক ও নিরাপদ অবস্থায় ফিরে আসার নির্ভরযোগ্য পথ রয়েছে। কঠিন বিষয়গুলো চেপে না রেখে তোমরা তা তুলে ধরো এবং রাগের উত্তাপ কমে গেলে গঠনমূলক আলোচনায় ফিরে এসো।",
      "এটি দাম্পত্যের একটি প্রধান চালিকাশক্তি। দ্বন্দ্বর পর মেরামতের সক্ষমতাই দম্পতিদের নিয়ন্ত্রণের বাইরের বাহ্যিক ঝড় সামলানোর ঢাল হিসেবে কাজ করে।",
      "তবে এই দক্ষতা যখন কেবল নিজেদের মধ্যকার বিষয়ে সীমাবদ্ধ থাকে এবং বাইরের পারিবারিক বা সামাজিক চাপের সময় প্রয়োগ হয় না, তখন চাপ বাড়ে। নিজেদের এই ঐক্যকে বাইরের জটিলতা সামলানোর ক্ষেত্রেও সক্রিয় করো।",
    ],
    modality_en: "Gottman-style conflict repair & attunement training — targeted and structured.",
    modality_bn: "গটম্যান-ধাঁচের দ্বন্দ্ব-সংস্কার ও যোগাযোগ প্রশিক্ষণ — সুনির্দিষ্ট এবং কাঠামোগত।",
    psych_en: "John Gottman's decades of longitudinal relationship research demonstrate that the single strongest differentiator between couples who thrive and those who dissolve is not whether they argue, but their physiological capacity to make and accept bids for repair during and immediately following conflict.",
    psych_bn: "জন গটম্যানের দীর্ঘমেয়াদী গবেষণা প্রমাণ করে যে সফল ও অতৃপ্ত দম্পতির মধ্যে প্রধান পার্থক্য ঝগড়া না করা নয়, বরং ঝগড়ার সময় এবং পরে সংকেত শনাক্ত করে সংস্কার (repair attempt) গ্রহণ করার সক্ষমতা।",
    timelineStep: {
      week: "Week 1",
      week_bn: "সপ্তাহ ১",
      title_en: "Pause & Complete the Bridge",
      title_bn: "বিরতি ও সংযোগ সম্পন্ন করা",
      action_en: "After the next disagreement: initiate a 20-minute cool-down pause, then one partner explicitly says, 'I value us, and I want to finish hearing your thoughts.'",
      action_bn: "পরবর্তী মতভেদের পর: ২০ মিনিটের বিরতি নাও, তারপর একজন স্পষ্টভাবে বলো: 'আমাদের সম্পর্ক আমার কাছে গুরুত্বপূর্ণ, আমি শান্তভাবে তোমার কথাটা শুনতে চাই।'",
    },
  },

  D2: {
    title_en: "Emotional Attunement & Trust",
    title_bn: "আবেগীয় সংবেদনশীলতা ও আস্থা",
    summary_en: "Depth of mutual security, reading subtle cues, and freedom from suspicion.",
    summary_bn: "পারস্পরিক নিরাপত্তা, না-বলা মানসিক অবস্থা উপলব্ধি এবং গভীর আস্থা।",
    detail_en: [
      "You genuinely feel perceived, acknowledged, and validated. Your partner detects your subtle shifts in mood without demanding verbal explanations, and psychological energy is not depleted by pervasive suspicion, surveillance, or doubt.",
      "Trust operating at this degree of clarity is by no means automatic; it deserves recognition as a foundational pillar rather than being taken for granted.",
      "Intimacy and emotional attunement are far easier to preserve when secluded in isolation, but can face substantial dilution within a bustling, high-density household. Actively safeguard sacred micro-moments reserved strictly for the two of you.",
    ],
    detail_bn: [
      "তুমি নিজেকে মূল্যবান ও স্বীকৃত অনুভব করো। সঙ্গী তোমার না-বলা আবেগ ও মেজাজের পরিবর্তন বুঝতে পারেন এবং সন্দেহের পেছনে মানসিক শক্তি অপচয় হয় না।",
      "এই গভীর আস্থা সর্বত্র পাওয়া যায় না; একে সাধারণ কিছু না ভেবে সম্পর্কের একটি অমূল্য স্তম্ভ হিসেবে উদযাপন করা প্রয়োজন।",
      "দুজনে একা থাকলে এই ঘনিষ্ঠতা রক্ষা করা সহজ, তবে যৌথ পরিবারের ব্যস্ততার মাঝে তা ম্লান হয়ে যেতে পারে। তাই প্রতিদিন কেবল নিজেদের জন্য কিছুটা সংরক্ষিত সময় রক্ষা করো।",
    ],
    modality_en: "Emotionally Focused Therapy (EFT) & attachment-informed couples intervention.",
    modality_bn: "ইমোশনালি ফোকাসড থেরাপি (EFT) ও নিরাপদ অ্যাটাচমেন্ট-ভিত্তিক যুগল কাউন্সেলিং।",
    psych_en: "Dr. Sue Johnson's Emotionally Focused Therapy (EFT) highlights that perceived emotional responsiveness (A.R.E. — Accessibility, Responsiveness, Engagement) activates neural safety signals that quiet the amygdala and foster unbreakable dyadic resilience.",
    psych_bn: "ড. সু জনসনের ইমোশনালি ফোকাসড থেরাপি দেখায় যে সঙ্গীর আবেগীয় সান্নিধ্য ও সংবেদনশীলতা মানুষের স্নায়ুতন্ত্রে নিরাপত্তা তৈরি করে, যা সব ধরনের প্রতিকূলতার বিরুদ্ধে সুরক্ষা দেয়।",
    timelineStep: {
      week: "Week 2",
      week_bn: "সপ্তাহ ২",
      title_en: "Unspoken Appreciation",
      title_bn: "না-বলা প্রশংসা ও কৃতজ্ঞতা",
      action_en: "Each evening for 7 days: spend 60 uninterrupted seconds naming one specific quality or kindness you noticed in your partner that day.",
      action_bn: "প্রতি সন্ধ্যায় ৭ দিন ধরে: কোনো বিভ্রান্তি ছাড়া ৬০ সেকেন্ড সময় নিয়ে সঙ্গীর এমন একটি আচরণ বা সহমর্মিতার প্রশংসা করো যা সেদিন তোমার ভালো লেগেছে।",
    },
  },

  D3: {
    title_en: "Values & Life-Goal Congruence",
    title_bn: "মূল্যবোধ ও জীবনলক্ষ্যের সামঞ্জস্য",
    summary_en: "Shared financial principles, spiritual pace, child-rearing, and career priorities.",
    summary_bn: "আর্থিক দৃষ্টিভঙ্গি, ধর্মীয় অনুশীলন, সন্তান লালন-পালন ও ভবিষ্যৎ পরিকল্পনার মিল।",
    detail_en: [
      "The two of you broadly share an overarching philosophical trajectory for your joint life, yet several crucial tactical parameters remain open, ambiguous, or deferred.",
      "The positive reality is that your areas of agreement vastly outnumber points of discord, and none of the existing gaps reflect fundamentally incompatible ethical principles. That makes these alignment gaps straightforward to harmonize with intentional conversation.",
      "Unsettled operational expectations do not gracefully fade away; unaddressed, they quietly mutate and resurface during trivial everyday disagreements about domestic chores or budgeting.",
    ],
    detail_bn: [
      "তোমরা জীবনের সামগ্রিক দিকনির্দেশনায় বহুলাংশে একমত, তবে কিছু ব্যবহারিক সিদ্ধান্ত ও প্রত্যাশা এখনো খোলামেলা আলোচনা করা হয়নি।",
      "সুসংবাদ হলো, তোমাদের মিলের জায়গাগুলো অমিলের চেয়ে অনেক বেশি এবং কোনো অমিলই নীতিগত বৈপরীত্য নয়। সুনির্দিষ্ট গঠনমূলক আলোচনার মাধ্যমে এই ফাঁক সহজে পূরণ করা সম্ভব।",
      "অনিষ্পন্ন প্রত্যাশা নিজের থেকে মিলিয়ে যায় না; বরং সময়ের সাথে তা ছোটখাটো আর্থিক বা সাংসারিক খুঁটিনাটি বিষয়ে ক্ষোভ হিসেবে ফিরে আসতে পারে।",
    ],
    modality_en: "Structured value-clarification dialogue & premarital/marital expectation alignment.",
    modality_bn: "কাঠামোগত মূল্যবোধ স্পষ্টীকরণ ও দাম্পত্য প্রত্যাশা সমন্বয় কাউন্সেলিং।",
    psych_en: "Empirical marriage research shows that discrepancies in financial allocation, religious observance, and in-law boundary norms do not cause marital dissolution by themselves; distress arises when expectations remain covert and unnegotiated.",
    psych_bn: "গবেষণা দেখায় যে আর্থিক বা পারিবারিক নিয়মের পার্থক্য নিজে কোনো সম্পর্ক ভাঙে না; সমস্যা হয় যখন সেই প্রত্যাশাগুলো নিয়ে খোলামেলা কথা না বলে অস্পষ্ট রেখে দেওয়া হয়।",
    timelineStep: {
      week: "Week 3",
      week_bn: "সপ্তাহ ৩",
      title_en: "The Five-Year Alignment Blueprint",
      title_bn: "৫ বছরের যৌথ রূপরেখা",
      action_en: "Separately write down: 'What does our ideal, peaceful month look like 3 years from now regarding finances and career balance?' Compare notes without debate.",
      action_bn: "দুজন আলাদাভাবে লেখো: 'আজ থেকে ৩ বছর পর আমাদের আর্থিক ও পেশাগত জীবনের একটি শান্তিময় মাস কেমন দেখাবে?' তর্ক না করে একে অপরের উত্তর মিলিয়ে দেখো।",
    },
  },

  D4: {
    title_en: "Family Integration & Boundary Balance",
    title_bn: "পারিবারিক-সংযোগ ও সীমারেখা",
    summary_en: "Managing in-law expectations, protecting couple autonomy, and sovereign decisions.",
    summary_bn: "পরিবারের প্রত্যাশা রক্ষা, যুগলের নিজস্ব সিদ্ধান্ত এবং সুস্থ সীমারেখা বজায় রাখা।",
    detail_en: [
      "Maintaining external peace with extended household members is currently exacting an unsustainable toll on your private marital sanctum. Fundamental decisions belonging solely to the two of you are regularly being outsourced, overridden, or dictated from beyond.",
      "Importantly, your responses show an abiding affection and respect for the extended family. This confirms that your dynamic is not broken or polarized; it is entirely rectifiable with clear structural delineation.",
      "A relational boundary is never an act of rejection or hostility. The objective is not emotional detachment from family, but establishing a transparent demarcation regarding which decisions reside exclusively between spouses.",
    ],
    detail_bn: [
      "পরিবারের অন্যান্যদের সন্তুষ্ট রাখতে গিয়ে তোমাদের নিজেদের ব্যক্তিগত পরিসর সংকুচিত হচ্ছে এবং যে সিদ্ধান্তগুলো কেবল তোমাদের নেওয়ার কথা, তা পরিবারের বাইরে বা বড়দের হস্তক্ষেপে চলে যাচ্ছে।",
      "সবচেয়ে আশাব্যঞ্জক দিক হলো, তোমরা পরিবারের সম্পর্ক ছিন্ন করতে চাওনি। পরিবারের প্রতি ভালোবাসা বজায় রেখেই সুস্থ সীমারেখা তৈরি করা সম্ভব।",
      "সীমারেখা মানে দূরত্ব বা অবাধ্যতা নয়। এর উদ্দেশ্য পরিবার কমানো নয়, বরং স্পষ্ট করা যে কোন সিদ্ধান্তগুলোর চূড়ান্ত কর্তৃত্ব কেবল তোমাদের দুজনের।",
    ],
    gap_en: [
      "The psychological burden of porous boundaries rarely distributes equally. The spouse who struggles to set boundaries with their biological family carries temporary comfort, while the spouse standing outside the inner circle bears escalating feelings of exclusion and powerlessness.",
      "Over time, this dynamic generates suppressed resentment directed toward the partner rather than the family of origin, because the pathway to confront extended family feels socially prohibited. In homes with children, this implicitly teaches them that self-advocacy and honest communication are unsafe.",
    ],
    gap_bn: [
      "দুর্বল সীমারেখার মানসিক মূল্য কখনোই দুজনের ওপর সমানভাবে পড়ে না। যে সঙ্গী নিজের পরিবারের মুখোমুখি হতে দ্বিধা বোধ করেন, তিনি সাময়িক শান্তি পান; কিন্তু অন্য সঙ্গী বাদ পড়ে গিয়ে দীর্ঘস্থায়ী একাকীত্ব ও ক্ষোভে ভোগেন।",
      "সময়ের সাথে সাথে এই চাপা ক্ষোভ পরিবারের প্রতি না গিয়ে সরাসরি জীবনসঙ্গীর দিকে মোড় নেয়। শিশুদের সামনে এই পরিস্থিতি ঘটলে তারা শিখে ফেলে যে নিজের অবস্থান প্রকাশ করা সম্পর্কের জন্য অনিরাপদ।",
    ],
    partner_en:
      "Communicate boundaries with your biological family directly. This is the single most decisive intervention in this domain. Delegating boundary enforcement to your spouse invariably damages both bonds.",
    partner_bn:
      "নিজের রক্তের পরিবারের সাথে সীমারেখা নিজেকেই নির্ধারণ করতে হবে। সঙ্গীর মাধ্যমে এই বার্তা পৌঁছালে পারিবারিক ও দাম্পত্য উভয় সম্পর্কই মারাত্মকভাবে ক্ষতিগ্রস্ত হয়।",
    elders_en:
      "Recognize the couple as an autonomous adult unit. Offer gentle guidance and mentorship, while leaving final executive decisions to the spouses. Couples granted autonomy consistently foster deeper, genuine gratitude toward elders.",
    elders_bn:
      "দম্পতিকে একটি সার্বভৌম সিদ্ধান্তগ্রহণকারী অংশ হিসেবে মেনে নিন। স্নেহ ও পরামর্শ দিন, কিন্তু চাপিয়ে দেওয়া সিদ্ধান্ত থেকে বিরত থাকুন। যে দম্পতি স্বাধীনভাবে সিদ্ধান্ত নিতে পারে, তারা পরিবারের প্রতি আরো বেশি কৃতজ্ঞ থাকে।",
    modality_en: "Minuchin Structural Family Systems Therapy & boundary differentiation work.",
    modality_bn: "সালভাদর মিনুচিনের স্ট্রাকচারাল ফ্যামিলি সিস্টেমস থেরাপি ও বাউন্ডারি ডিফারেন্সিয়েশন।",
    psych_en: "In Structural Family Theory, Salvador Minuchin established that healthy family ecosystems require permeable yet unambiguous boundaries around subsystems. When boundaries between the spousal subsystem and extended family are enmeshed, marital distress surges exponentially.",
    psych_bn: "সালভাদর মিনুচিনের কাঠামোগত পারিবারিক তত্ত্ব নির্দেশ করে যে সুস্থ পরিবারে প্রতিটি অংশের মাঝে স্পষ্ট সীমারেখা থাকা অপরিহার্য। দম্পতির নিজস্ব সীমানা যখন পরিবারের অন্যান্যদের সাথে গুলিয়ে যায়, তখন দাম্পত্যে তীব্র মানসিক চাপ তৈরি হয়।",
    timelineStep: {
      week: "Week 1",
      week_bn: "সপ্তাহ ১",
      title_en: "Whose Decision Is Whose",
      title_bn: "কোন সিদ্ধান্তটি কার",
      action_en: "Identify 3 specific decisions from the past month that rightfully belonged only to the two of you. Write them down and agree on your joint boundary.",
      action_bn: "গত এক মাসের এমন ৩টি সিদ্ধান্ত চিহ্নিত করো যা কেবল তোমাদের দুজনের নেওয়ার কথা ছিল। সেগুলোকে লিপিবদ্ধ করো এবং নিজেদের সিদ্ধান্তের পরিধি নির্ধারণ করো।",
    },
  },

  D5: {
    title_en: "Social Pressure Resilience",
    title_bn: "সামাজিক চাপ মোকাবিলা",
    summary_en: "Insulating the marriage from societal gossip, public scrutiny, and external judgment.",
    summary_bn: "সমাজের সমালোচনা, পরচর্চা ও পারিবারিক তুলনা থেকে বৈবাহিক বন্ধনকে সুরক্ষিত রাখা।",
    detail_en: [
      "Exterior scrutiny — social chatter, critical commentary, and subtle familial disapproval — is actively penetrating your relationship core. Instead of functioning as an external storm you shelter against side by side, it is turning into internal polarization and estrangement.",
      "This is one of the most frequent catalysts prompting Bangladeshi couples to seek professional guidance, and it is also the domain that exhibits the most immediate recovery when targeted with unified coping tools.",
      "The single most protective psychological maneuver is explicitly labeling outside scrutiny as an external challenge you face together, rather than viewing it as a personal failure or your partner's fault.",
    ],
    detail_bn: [
      "বাইরের কথা, সামাজিক সমালোচনা ও অবাস্তব প্রত্যাশা সরাসরি তোমাদের সম্পর্কের অন্দরে প্রবেশ করছে। বাইরে থেকে আসা এই চাপ একসাথে সামলানোর বদলে তা তোমাদের দুজনের মধ্যে ভুল বোঝাবুঝি ও দূরত্ব বাড়িয়ে দিচ্ছে।",
      "আমাদের সমাজে দম্পতিদের মানসিক কষ্টে পড়ার এটি প্রধানতম কারণ। কিন্তু সুসংবাদ হলো, সঠিক কৌশল ও ঐক্যবদ্ধ পদক্ষেপের মাধ্যমে এই চাপ সবচেয়ে দ্রুত কাটিয়ে ওঠা সম্ভব।",
      "সবচেয়ে কার্যকর আত্মরক্ষা হলো বাইরের এই চাপকে 'আমাদের যৌথ চ্যালেঞ্জ' হিসেবে চিহ্নিত করা, সঙ্গীর দোষ বা তার পরিবারের দুর্বলতা হিসেবে নয়।",
    ],
    gap_en: [
      "When external societal judgments infiltrate the home, couples begin to treat each other as the architect of their misery. Once community chatter takes residence inside the bedroom, the storm is no longer outside — it has taken over the house.",
      "The second hidden consequence is defensive isolation. As social engagements turn into emotional battlegrounds, couples retreat into isolation, which rapidly depletes critical mental health reserves.",
    ],
    gap_bn: [
      "সমাজের চাপ যখন ঘরের ভেতর ঢোকে, তখন দম্পতি পরস্পরকে প্রতিপক্ষ ভাবতে শুরু করে। যখন 'লোকে কী বলবে' ঘরের সাধারণ আলাপে প্রাধান্য পায়, তখন ঝড় আর বাইরে থাকে না — তা সম্পর্কের ভিত নাড়িয়ে দেয়।",
      "এর দ্বিতীয় ক্ষতিকর দিক হলো একাকীত্ব। সামাজিক মেলামেশা যন্ত্রণাদায়ক মনে হওয়ায় দম্পতি যোগাযোগ কমিয়ে দেয়, যা মানসিক স্বাস্থ্যের জন্য মারাত্মক হুমকিস্বরূপ।",
    ],
    partner_en:
      "Unequivocally defend your partner in public when family or acquaintances make disparaging remarks. Comfort whispered in private afterwards cannot mend the wound; the spouse needs to see you stand shoulder-to-shoulder in that exact moment.",
    partner_bn:
      "অন্যদের সামনে সঙ্গীকে নিয়ে কোনো কটূক্তি বা উপহাস হলে তাৎক্ষণিকভাবে দৃঢ়তার সাথে তার পাশে দাঁড়ান। পরে আড়ালে সান্ত্বনা দেওয়ার চেয়ে ওই মুহূর্তে তার সাথে থাকা হাজার গুণ বেশি আস্থার জন্ম দেয়।",
    elders_en:
      "Refuse to funnel community gossip or external expectations into the couple's home. Simply eliminating the phrase 'Do you know what relatives are saying?' relieves an immense proportion of marital anxiety.",
    elders_bn:
      "সমাজের বা আত্মীয়দের নেতিবাচক কথা দম্পতির ঘরে বয়ে আনবেন না। 'লোকে কী বলছে দেখেছ?' — এই ধরনের বাক্য বন্ধ রাখলেই তরুণ দম্পতির ওপর থেকে মানসিক চাপের সিংহভাগ উধাও হয়ে যায়।",
    modality_en: "Dyadic Coping Training (Guy Bodenmann) & Social Support Mapping.",
    modality_bn: "গাই বোডেনম্যানের ডায়াডিক কোপিং ট্রেনিং ও সোশাল সাপোর্ট ম্যাপিং।",
    psych_en: "Guy Bodenmann's Systemic-Transactional Model (STM) reveals that when acute external stress reaches a dyad, the relationship diverges into one of two paths: it becomes 'our stress' (fostering dyadic coping and resilience) or 'your stress' (triggering detachment, blame, and eventual collapse).",
    psych_bn: "মনোবিজ্ঞানী গাই বোডেনম্যানের ডায়াডিক কোপিং মডেল দেখায় যে বাইরে থেকে যখন চাপ আসে, সম্পর্ক দুটি ধারায় বিভক্ত হয়: এটি হয় 'আমাদের উভয়ের যৌথ লড়াই' হয়ে দম্পতিকে এক করে, নয়তো 'তোমার সমস্যা' হয়ে পরস্পরকে দূরে ঠেলে দেয়।",
    timelineStep: {
      week: "Week 2",
      week_bn: "সপ্তাহ ২",
      title_en: "Reclaim One Decision",
      title_bn: "একটি সিদ্ধান্ত ফিরিয়ে নাও",
      action_en: "Formulate a concrete joint decision (e.g., how you spend next weekend) without soliciting outside family validation, and execute it as a sovereign team.",
      action_bn: "বাইরের কারো সম্মতি বা যাচাই ছাড়া পরবর্তী ছুটির দিন কাটানোর মতো একটি ছোট কিন্তু নিজস্ব সিদ্ধান্ত নাও এবং ঐক্যবদ্ধভাবে তা বাস্তবায়ন করো।",
    },
  },

  D6: {
    title_en: "Personal Readiness & Self-Regulation",
    title_bn: "ব্যক্তিগত প্রস্তুতি ও আত্মনিয়ন্ত্রণ",
    summary_en: "Emotional composure under duress, individual maturity, and household responsibility.",
    summary_bn: "চাপের মুখে রাগ নিয়ন্ত্রণ, মানসিক পরিপক্বতা এবং সাংসারিক দায়িত্ব গ্রহণের প্রস্তুতি।",
    detail_en: [
      "You demonstrate notable personal poise and self-regulation in ordinary circumstances, carrying your share of domestic and practical responsibilities with consistency.",
      "This indicates a dependable operational baseline sufficient for standard weekly life demands.",
      "However, personal self-regulation is always the first vulnerability eroded during unrelenting environmental strain. If external pressures in Domains 4 and 5 persist unabated, irritability and emotional fatigue will inevitably manifest here first.",
    ],
    detail_bn: [
      "স্বাভাবিক পরিস্থিতিতে তুমি নিজেকে যথেষ্ট সংযত রাখো এবং সংসার ও জীবনের ব্যবহারিক দায়িত্বগুলো নিষ্ঠার সাথে পালন করছো।",
      "এটি একটি চমৎকার ইতিবাচক লক্ষণ যা দৈনন্দিন জীবনের জন্য যথেষ্ট মজবুত।",
      "মনে রাখতে হবে, দীর্ঘস্থায়ী মানসিক চাপে মানুষের আত্মনিয়ন্ত্রণই সবার আগে ক্ষতিগ্রস্ত হয়। পারিবারিক ও সামাজিক চাপের অবসান না হলে রাগ বা হতাশা এখানে এসে প্রকাশ পেতে পারে।",
    ],
    modality_en: "Cognitive Behavioral Therapy (CBT) & Dialectical Behavior Therapy (DBT) emotion regulation.",
    modality_bn: "সিবিটি (CBT) ও ডিবিটি (DBT) ভিত্তিক মানসিক আবেগ নিয়ন্ত্রণ দক্ষতা।",
    psych_en: "Individual affect regulation and physiological self-soothing are prerequisite competencies for relationship longevity. John Bowlby's attachment theory underscores that personal emotional stability serves as the anchor during systemic family turbulence.",
    psych_bn: "ব্যক্তিগত আবেগ নিয়ন্ত্রণ ও মানসিক স্থিরতা দীর্ঘস্থায়ী সম্পর্কের অপরিহার্য ভিত্তি। নিজের আবেগকে শান্ত রাখার দক্ষতা সম্পর্কের কঠিন সময়ে নোঙরের মতো কাজ করে।",
    timelineStep: {
      week: "Week 4",
      week_bn: "সপ্তাহ ৪",
      title_en: "Sustain the Warmth & Celebrate",
      title_bn: "উষ্ণতা প্রকাশ ও ইতিবাচক পর্যালোচনা",
      action_en: "Reflect together on your 4-week milestones; intentionally thank each other for every small step taken toward protecting your sanctuary.",
      action_bn: "চার সপ্তাহের পদক্ষেপগুলো পর্যালোচনা করো এবং নিজেদের সম্পর্কের নিরাপত্তা ও স্বকীয়তা রক্ষায় সঙ্গীর প্রতিটি ক্ষুদ্র প্রচেষ্টার জন্য আন্তরিক কৃতজ্ঞতা জানাও।",
    },
  },
};

export const MILESTONE_PLAN = [
  {
    weekNumber: 1,
    week_en: "Week 1",
    week_bn: "সপ্তাহ ১",
    title_en: "Whose decision is whose",
    title_bn: "কোন সিদ্ধান্তটি কার",
    subtitle_en: "Establishing the couple's sovereign boundary",
    subtitle_bn: "দম্পতির স্বাধীন সিদ্ধান্তের পরিধি নির্ধারণ",
    action_en:
      "Sit together and catalog the decisions made over the past month. Identify which matters belong strictly to the two of you (finances, personal time, marital privacy) versus those open to consultation. Explicitly agree that neither will commit to an extended family expectation without discussing it privately first.",
    action_bn:
      "দুজনে একসাথে বসে গত মাসের সিদ্ধান্তগুলো পর্যালোচনা করো। চিহ্নিত করো কোন বিষয়গুলো কেবল তোমাদের দুজনের (অর্থের ব্যবহার, ব্যক্তিগত সময়, দাম্পত্যের গোপনীয়তা) এবং কোনগুলো পরিবারের সাথে পরামর্শযোগ্য। স্পষ্ট সম্মতি নাও যে একান্ত আলাপের আগে পরিবারের কাউকে কোনো কথা দেওয়া হবে না।",
    badge_en: "Boundary Clarity",
    badge_bn: "স্পষ্ট সীমারেখা",
  },
  {
    weekNumber: 2,
    week_en: "Week 2",
    week_bn: "সপ্তাহ ২",
    title_en: "Take one back",
    title_bn: "একটি সিদ্ধান্ত ফিরিয়ে নাও",
    subtitle_en: "Practicing autonomous decision-making",
    subtitle_bn: "স্বাধীন সিদ্ধান্ত বাস্তবায়নের অনুশীলন",
    action_en:
      "Pick one specific area previously decided by extended family or social expectations — such as how you spend your weekend or a minor domestic purchase. Make the choice entirely between the two of you, execute it quietly, and experience the sense of mutual agency without seeking external permission.",
    action_bn:
      "এমন একটি নির্দিষ্ট ক্ষেত্র বেছে নাও যা আগে পরিবারের বড়রা বা সামাজিক রেওয়াজ ঠিক করে দিত (যেমন ছুটির দিন কাটানো বা ছোট কোনো সাংসারিক কেনাকাটা)। বাইরের অনুমোদন না খুঁজে কেবল নিজেদের পছন্দে সিদ্ধান্তটি কার্যকর করো এবং নিজেদের কর্তৃত্ব অনুভব করো।",
    badge_en: "Autonomous Action",
    badge_bn: "স্বাধীন পদক্ষেপ",
  },
  {
    weekNumber: 3,
    week_en: "Week 3",
    week_bn: "সপ্তাহ ৩",
    title_en: "Whose family speaks",
    title_bn: "কার পরিবারকে কে বলবে",
    subtitle_en: "Enforcing biological buffer lines",
    subtitle_bn: "রক্তের সম্পর্ককে নিজে সামলানোর নীতি",
    action_en:
      "Formulate the rule of origin: each partner speaks directly, calmly, and privately to their own biological family regarding upcoming decisions and boundaries. Never send your partner into the firing line with your relatives. Offer complete emotional shelter when either partner is facing criticism.",
    action_bn:
      "নিয়ম নির্ধারণ করো: প্রত্যেক সঙ্গী তার নিজের রক্তের পরিবারের সাথে শান্তভাবে ও একান্তভাবে সীমারেখার কথা বলবে। সঙ্গীকে নিজের পরিবারের মুখোমুখি সমালোচনার মুখে ফেলবে না। কেউ বাইরে বা পরিবারের সমালোচনার শিকার হলে অন্য সঙ্গী তাকে পরম সুরক্ষা দেবে।",
    badge_en: "Protective Shield",
    badge_bn: "সুরক্ষামূলক প্রাচীর",
  },
  {
    weekNumber: 4,
    week_en: "Week 4",
    week_bn: "সপ্তাহ ৪",
    title_en: "Keep the warmth visible",
    title_bn: "উষ্ণতা দৃশ্যমান রাখা",
    subtitle_en: "Balancing boundaries with active affection",
    subtitle_bn: "সীমারেখার সাথে শ্রদ্ধাশীল সম্পর্কের মেলবন্ধন",
    action_en:
      "Demonstrate genuine warmth and generosity toward both families in non-decision areas. Visit, share a meal, or send gifts voluntarily. This powerfully signals that setting healthy marital boundaries is not an act of hostility, but the foundation that keeps extended family relationships sustainable.",
    action_bn:
      "সিদ্ধান্তের বাইরের ক্ষেত্রগুলোতে উভয় পরিবারের প্রতি আন্তরিক শ্রদ্ধা ও ভালোবাসা প্রকাশ করো। উপহার দেওয়া বা একসাথে খাওয়া-দাওয়া করার মাধ্যমে বুঝিয়ে দাও যে সীমারেখা বজায় রাখা কোনো অবাধ্যতা নয়, বরং পরিবারকে দীর্ঘমেয়াদে ভালোবাসার সুস্থ ভিত্তি।",
    badge_en: "Sustainable Warmth",
    badge_bn: "স্থায়ী আন্তরিকতা",
  },
];

export const SUB_INDICATOR_TRANSLATIONS: Record<
  string,
  { en: string; bn: string; meaning_en: string; meaning_bn: string }
> = {
  "D4-01": {
    en: "Partner handles intrusion",
    bn: "পরিবারের হস্তক্ষেপ সঙ্গী সামলে নেন",
    meaning_en: "Active defense against unwarranted encroachment into private affairs.",
    meaning_bn: "ব্যক্তিগত বিষয়ে পরিবারের অপ্রয়োজনীয় হস্তক্ষেপ সঙ্গী নিজে সক্রিয়ভাবে সামলান।",
  },
  "D4-02": {
    en: "Own needs pushed to the back",
    bn: "পরিবারকে খুশি রাখতে নিজেদের প্রয়োজন পিছিয়ে পড়ে",
    meaning_en: "Degree to which marital growth is sacrificed for extended pleasing.",
    meaning_bn: "পরিবারকে খুশি রাখতে গিয়ে দাম্পত্যের একান্ত প্রয়োজন কতটা অবহেলিত হয়।",
  },
  "D4-03": {
    en: "Elders make the decisions",
    bn: "নিজেদের সিদ্ধান্ত পরিবারের বড়রাই নিয়ে নেন",
    meaning_en: "Level of external control over spousal choices and independence.",
    meaning_bn: "দম্পতির স্বাধীন সিদ্ধান্তের ওপর পরিবারের বয়োজ্যেষ্ঠদের কর্তৃত্বের মাত্রা।",
  },
  "D4-04": {
    en: "Warm with both families",
    bn: "দুই পরিবারের সাথেই সহজ ও উষ্ণ সম্পর্ক",
    meaning_en: "Ease of natural connection without excessive emotional friction.",
    meaning_bn: "উভয় পক্ষের পরিবারের সাথে কৃত্রিমতাহীন স্বাভাবিক ও সম্মানজনক সংযোগ।",
  },
  "D5-01": {
    en: "Facing criticism together",
    bn: "বাইরের সমালোচনা একসাথে মোকাবিলা করা",
    meaning_en: "Solidarity as a dyadic team when external disapproval arises.",
    meaning_bn: "সমাজ বা প্রতিবেশীর নেতিবাচক মন্তব্যের বিরুদ্ধে একতাবদ্ধ হয়ে দাঁড়ানো।",
  },
  "D5-02": {
    en: "Community talk creates distance",
    bn: "সমাজের আলোচনা নিজেদের মধ্যে দূরত্ব তৈরি করে",
    meaning_en: "Vulnerability of marital cohesion to outside gossip and rumors.",
    meaning_bn: "বাইরের পরচর্চা ও কথা নিজেদের বোঝাপড়ায় কতটা দূরত্ব ও সন্দেহ তৈরি করে।",
  },
  "D5-03": {
    en: "Worrying about it alone",
    bn: "বাইরে কী বলা হচ্ছে তা নিয়ে একাই দুশ্চিন্তা করা",
    meaning_en: "Isolation in carrying the psychological weight of societal pressure.",
    meaning_bn: "সমাজের সমালোচনার মানসিক ভার সঙ্গীর সাথে ভাগ না করে একাই বহন করা।",
  },
  "D5-04": {
    en: "People who would stand by us",
    bn: "কঠিন সময়ে পাশে দাঁড়ানোর বিশ্বস্ত মানুষ থাকা",
    meaning_en: "Availability of genuine, supportive allies during challenging times.",
    meaning_bn: "বিপদের মুহূর্তে নিঃশর্ত সমর্থন ও ভালোবাসা দেওয়ার মতো মানুষের উপস্থিতি।",
  },
};
