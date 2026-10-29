import React, { useState } from "react";

type Lang = "en" | "bn";
interface Band { label_en: string; label_bn: string; color: string; }
interface DR { name_en: string; name_bn: string; scored: boolean; index?: number; band?: Band; }
interface McrrsData {
  form: string; careFlag: boolean;
  domainResults: Record<string, DR>;
  total: { index: number; band: Band } | null;
  pri: { index: number; band: Band } | null;
  tier: number; strongest?: string; focusAreas?: string[];
  referralResources?: { need_bn: string; service: string; number: string; hours_bn: string; }[];
  tier4Message_bn?: string; tier4Message_en?: string;
  disclaimer_bn?: string; disclaimer_en?: string;
}

const DOMAIN_DATA: Record<string, {
  en: { detail: string[]; gap?: string[]; partner?: string; elders?: string; modality: string; psych: string; plan: {w:string;a:string}[] };
  bn: { detail: string[]; gap?: string[]; partner?: string; elders?: string; modality: string; psych: string; plan: {w:string;a:string}[] };
}> = {
  D1: {
    en: {
      detail: ["When something goes wrong between you, there is a way back. You raise difficult things rather than storing them, and you return to them once the heat has gone out of it.", "This is a real asset. Repair capacity is what allows couples to survive pressure they cannot control, and it does not depend on the pressure easing first.", "Skill here can quietly go unused when the trouble is coming from outside rather than from between you. Aim it at the outside problem as well."],
      modality: "Couple communication training, or Gottman-style conflict repair — usually brief and structured.",
      psych: "Conflict repair capacity is one of the strongest predictors of long-term relationship satisfaction. John Gottman's research shows that couples who can de-escalate and repair are more resilient than those who avoid all conflict.",
      plan: [{w:"Week 1",a:"After the next disagreement: wait 20 minutes, then one of you says 'I want to finish the conversation.'"},{w:"Week 2",a:"Identify one topic you have been avoiding. Write it down. You do not have to raise it yet — just name it to yourself."},{w:"Week 3",a:"Raise the avoided topic — briefly, calmly, at a time when neither of you is under other pressure."},{w:"Week 4",a:"After any significant disagreement: within 48 hours, one sentence each about what you wish had gone differently."}],
    },
    bn: {
      detail: ["তোমাদের মধ্যে কোনো সমস্যা হলে ফেরার পথ আছে। কঠিন বিষয় চেপে না রেখে তুলে ধরো, এবং উত্তাপ কমে গেলে আবার আলোচনায় ফেরো।", "এটি একটি বাস্তব শক্তি। মেরামতের সক্ষমতাই দম্পতিকে নিয়ন্ত্রণের বাইরের চাপ সামলাতে সাহায্য করে।", "যখন বাইরের সমস্যা থেকে ঝামেলা আসে, তখন এই দক্ষতা কাজে না লাগলে নষ্ট হয়।"],
      modality: "কাপল কমিউনিকেশন ট্রেনিং, বা Gottman-ধাঁচের দ্বন্দ্ব-সংস্কার।",
      psych: "দ্বন্দ্ব সংস্কারের সক্ষমতা দীর্ঘমেয়াদী সম্পর্কের সন্তুষ্টির সবচেয়ে শক্তিশালী নির্দেশকগুলির একটি।",
      plan: [{w:"সপ্তাহ ১",a:"পরের মতভেদের পর: ২০ মিনিট অপেক্ষা করো, তারপর একজন বলো 'আমি কথোপকথন শেষ করতে চাই।'"},{w:"সপ্তাহ ২",a:"একটি বিষয় খোঁজো যা এড়িয়ে যাচ্ছো। লেখো।"},{w:"সপ্তাহ ৩",a:"এড়ানো বিষয়টি তোলো — সংক্ষেপে, শান্তভাবে।"},{w:"সপ্তাহ ৪",a:"যেকোনো বড় মতভেদের পর: ৪৮ ঘণ্টার মধ্যে, প্রত্যেকের একটি বাক্য।"}],
    },
  },
  D2: {
    en: {
      detail: ["You feel noticed. Your partner reads your mood without being told, and you are not spending energy on suspicion.", "Trust at this level is not universal, and it is worth naming as the asset it is rather than assuming it is standard.", "Closeness is easy to keep when you are alone together and harder in a full household. Protect the time that belongs only to the two of you."],
      modality: "Emotionally Focused Therapy or attachment-informed couples work.",
      psych: "Sue Johnson's Emotionally Focused Therapy shows that emotional responsiveness — feeling seen and safe — is the foundation that makes everything else in a relationship work.",
      plan: [{w:"Week 1",a:"Each evening: one minute each. 'One thing I noticed about you today.' No distractions."},{w:"Week 2",a:"Name something you appreciate about your partner that you have not said recently."},{w:"Week 3",a:"Tell your partner one thing you find hard to say. Small is fine."},{w:"Week 4",a:"Schedule one hour with no agenda. Just the two of you."}],
    },
    bn: {
      detail: ["তুমি অনুভব করো যে তোমাকে লক্ষ্য করা হচ্ছে। তোমার সঙ্গী না বলেও তোমার মনের অবস্থা বোঝেন।", "এই মাত্রার আস্থা সবার থাকে না।", "একা থাকলে ঘনিষ্ঠতা বজায় রাখা সহজ, পুরো পরিবারের মাঝে কঠিন।"],
      modality: "Emotionally Focused Therapy বা attachment-informed couples work।",
      psych: "সু জনসনের গবেষণা দেখায় যে আবেগীয় সাড়া — নিরাপদ ও দেখা অনুভব করা — সম্পর্কের সব কিছুর ভিত্তি।",
      plan: [{w:"সপ্তাহ ১",a:"প্রতি সন্ধ্যায়: 'আজ তোমার মধ্যে একটি বিষয় লক্ষ্য করলাম।'"},{w:"সপ্তাহ ২",a:"সঙ্গীর সম্পর্কে এমন কিছু প্রকাশ করো যা সম্প্রতি বলোনি।"},{w:"সপ্তাহ ৩",a:"একটি ছোট কথা বলো যা বলতে কঠিন মনে হয়।"},{w:"সপ্তাহ ৪",a:"কোনো নির্দিষ্ট উদ্দেশ্য ছাড়া এক ঘণ্টা একসাথে থাকো।"}],
    },
  },
  D3: {
    en: {
      detail: ["You broadly agree on the direction of your life together, but some specifics have not been settled.", "You agree on more than you disagree on, and none of the gaps looks like a difference of principle. That is the easier kind of gap to close.", "Unsettled expectations do not stay quiet. They tend to come back later as an argument about something small."],
      modality: "Expectation-focused structured premarital or marital counselling.",
      psych: "Research shows that differences in life goals, religious practice, and financial priorities are among the most common sources of long-term marital conflict when left unaddressed.",
      plan: [{w:"Week 1",a:"List three expectations about your shared life that you have never directly discussed."},{w:"Week 2",a:"Each of you writes: 'In five years, what does a good week look like for us?'"},{w:"Week 3",a:"Compare the answers. Note where you agree. Note where you differ without deciding who is right."},{w:"Week 4",a:"Pick one specific area of difference. Agree on one small step toward alignment."}],
    },
    bn: {
      detail: ["তোমরা জীবনের দিকনির্দেশনায় মোটামুটি একমত, তবে কিছু নির্দিষ্ট বিষয় এখনো স্পষ্ট হয়নি।", "মতের মিল বেশি, বিরোধ নীতিগত নয়।", "অনিষ্পন্ন প্রত্যাশা চুপ করে থাকে না।"],
      modality: "Structured premarital বা marital counselling।",
      psych: "গবেষণা দেখায় জীবনলক্ষ্য, ধর্ম ও আর্থিক অগ্রাধিকারের পার্থক্য দীর্ঘমেয়াদী দাম্পত্য দ্বন্দ্বের সাধারণ উৎস।",
      plan: [{w:"সপ্তাহ ১",a:"তিনটি প্রত্যাশার তালিকা করো যা কখনো সরাসরি আলোচনা হয়নি।"},{w:"সপ্তাহ ২",a:"প্রত্যেকে লেখো: '৫ বছর পর একটি ভালো সপ্তাহ কেমন দেখাবে?'"},{w:"সপ্তাহ ৩",a:"উত্তর তুলনা করো। মিল ও পার্থক্য লক্ষ্য করো।"},{w:"সপ্তাহ ৪",a:"একটি নির্দিষ্ট পার্থক্য বেছে সামঞ্জস্যের দিকে একটি ছোট পদক্ষেপ নাও।"}],
    },
  },
  D4: {
    en: {
      detail: ["Keeping family relationships smooth appears to be costing the two of you your own space, and decisions that belong to you are being made elsewhere.", "Nothing in your answers suggests you have given up on the family relationship. That matters, and it is what makes this fixable rather than a rupture.", "A boundary is not distance. The aim is not less family — it is a clear line about which decisions are yours. Without that line the pressure keeps arriving and neither of you has anywhere to stand."],
      gap: ["The cost of a weak boundary usually falls unevenly. Whoever cannot stand up to their own family carries less of it; whoever is left outside the decision carries more. Over time this produces a particular kind of resentment that travels toward the partner rather than toward the family, because the route toward the family is closed.", "Where there are children, they learn that stating your own view is not safe — and they carry that into their own relationships later."],
      partner: "Set the boundary with your own family yourself. This is the single largest step available in this area. Having it delivered by your spouse damages both relationships.",
      elders: "Accept that the couple has a domain of its own — advice yes, decisions no. A couple allowed to make their own decisions end up more grateful to the family, not less.",
      modality: "Family-systems or structural couples work focused on boundaries — it deals directly with who decides what.",
      psych: "In structural family theory, Salvador Minuchin showed that a healthy family has workable boundaries around each of its parts — the couple is one subsystem, the parents another. A boundary is not a wall; it is clarity about which decisions belong to which part.",
      plan: [{w:"Week 1",a:"List three decisions made in the last month that felt like they should have been yours alone."},{w:"Week 2",a:"Agree with your partner on one small decision area that belongs only to the two of you, and practise it for a week without exception."},{w:"Week 3",a:"Have one conversation with the relevant family member — alone, calmly — about that boundary."},{w:"Week 4",a:"Review: what changed, what did not. Decide whether you want to extend the boundary to a second area."}],
    },
    bn: {
      detail: ["পারিবারিক সম্পর্ক মসৃণ রাখতে গিয়ে তোমাদের নিজস্ব জায়গা হারিয়ে যাচ্ছে এবং তোমাদের সিদ্ধান্তগুলো অন্য কোথাও নেওয়া হচ্ছে।", "তোমাদের উত্তর দেখায় তোমরা পারিবারিক সম্পর্ক ছেড়ে দাওনি — এটাই এটাকে সংশোধনযোগ্য করে তোলে।", "সীমারেখা মানে দূরত্ব নয়। লক্ষ্য হল কোন সিদ্ধান্তগুলো তোমাদের সে বিষয়ে একটি স্পষ্ট রেখা।"],
      gap: ["দুর্বল সীমারেখার মূল্য সাধারণত অসমানভাবে পড়ে। যে নিজের পরিবারের সাথে দাঁড়াতে পারে না, সে কম বহন করে; যাকে সিদ্ধান্তের বাইরে রাখা হয় সে বেশি বহন করে।", "শিশুরা থাকলে তারা শিখে নেয় যে নিজের মত বলা নিরাপদ নয়।"],
      partner: "নিজের পরিবারের সাথে সীমারেখা নিজেই স্থাপন করুন। সঙ্গীর মাধ্যমে করালে উভয় সম্পর্কই ক্ষতিগ্রস্ত হয়।",
      elders: "দম্পতির নিজস্ব এলাকা মেনে নিন — পরামর্শ হ্যাঁ, সিদ্ধান্ত না।",
      modality: "Family-systems বা boundary-কেন্দ্রিক couples work।",
      psych: "সালভাদর মিনুচিনের কাঠামোগত পারিবারিক তত্ত্বে দেখানো হয়েছে সুস্থ পরিবারে প্রতিটি অংশের চারপাশে কার্যকর সীমারেখা থাকে।",
      plan: [{w:"সপ্তাহ ১",a:"গত মাসে তিনটি সিদ্ধান্ত লেখো যেগুলো তোমাদের একার হওয়ার কথা ছিল।"},{w:"সপ্তাহ ২",a:"সঙ্গীর সাথে একটি ছোট সিদ্ধান্তের এলাকা ঠিক করো — এক সপ্তাহ মেনে চলো।"},{w:"সপ্তাহ ৩",a:"সংশ্লিষ্ট পরিবারের সদস্যের সাথে একা, শান্তভাবে কথা বলো।"},{w:"সপ্তাহ ৪",a:"পর্যালোচনা করো: কী পরিবর্তন হয়েছে, কী হয়নি।"}],
    },
  },
  D5: {
    en: {
      detail: ["Pressure from outside — talk, criticism, disapproval — is reaching inside your relationship. It is turning into distance between you rather than something you face side by side.", "This is the most common reason couples in this situation come for help, and it is also one of the most responsive to short, focused work.", "The single most protective move is naming the pressure as a shared external problem, rather than as one partner's family or one partner's fault."],
      gap: ["When outside pressure gets inside, the damage takes a peculiar form: the couple begin to treat each other as the source of the problem. From the day 'your family' enters the house, the pressure is no longer outside.", "The second cost is withdrawal — shrinking social support is one of the strongest known risks to mental health."],
      partner: "Stand up for the other in public when someone speaks harshly. Support offered privately afterwards is not enough — the person under attack needs to see, in that moment, who is beside them.",
      elders: "Not carry outside criticism into the house. Simply not saying 'do you know what people are saying?' removes a large share of the pressure on a couple.",
      modality: "Dyadic coping training and support mapping — practical work on facing external stress as a pair.",
      psych: "Guy Bodenmann's dyadic coping theory shows that when stress arrives from outside, a couple goes one of two ways: it becomes 'our problem' and draws them together, or it becomes 'your problem' and pushes them apart.",
      plan: [{w:"Week 1",a:"Name the outside pressure out loud between the two of you: 'This is coming from outside. It is not your fault and it is not mine.'"},{w:"Week 2",a:"Agree on one thing you will not bring inside the house."},{w:"Week 3",a:"Identify one person outside the two of you who is genuinely supportive. Make contact."},{w:"Week 4",a:"Review your social circle: are there people whose presence consistently makes things worse? Quietly reduce exposure."}],
    },
    bn: {
      detail: ["বাইরের চাপ — কথা, সমালোচনা, অসম্মতি — সম্পর্কের ভেতরে ঢুকছে এবং তোমাদের মধ্যে দূরত্ব তৈরি করছে।", "এই পরিস্থিতিতে দম্পতিরা সবচেয়ে বেশি সাহায্য চায়, এবং এটি সংক্ষিপ্ত কাজেও সবচেয়ে ভালো সাড়া দেয়।", "সবচেয়ে সুরক্ষামূলক পদক্ষেপ হল চাপকে একটি ভাগ করা বাহ্যিক সমস্যা হিসেবে নামকরণ করা।"],
      gap: ["বাইরের চাপ ভেতরে ঢুকলে ক্ষতি অদ্ভুত আকার নেয়: দম্পতি একে অপরকে সমস্যার উৎস মনে করতে শুরু করে।", "দ্বিতীয় মূল্য হল প্রত্যাহার — সামাজিক সহায়তা কমে যাওয়া মানসিক স্বাস্থ্যের সবচেয়ে শক্তিশালী পরিচিত ঝুঁকি।"],
      partner: "কেউ কঠোরভাবে কথা বললে প্রকাশ্যে সঙ্গীর পাশে দাঁড়াও।",
      elders: "বাইরের সমালোচনা ঘরে নিয়ে আসবেন না।",
      modality: "Dyadic coping training ও support mapping।",
      psych: "গাই বোডেনম্যানের dyadic coping তত্ত্ব দেখায় বাইরের চাপ এলে দম্পতি দুই পথে যায়: 'আমাদের সমস্যা' হয়ে একত্রিত করে, নয়তো 'তোমার সমস্যা' হয়ে দূরে ঠেলে দেয়।",
      plan: [{w:"সপ্তাহ ১",a:"বাইরের চাপকে জোরে নাম দাও: 'এটা বাইরে থেকে আসছে। এটা তোমার দোষ নয়।'"},{w:"সপ্তাহ ২",a:"একটি বিষয় ঠিক করো যা ঘরে নিয়ে আসবে না।"},{w:"সপ্তাহ ৩",a:"একজন সত্যিকারের সহায়ক মানুষ খোঁজো। যোগাযোগ করো।"},{w:"সপ্তাহ ৪",a:"সামাজিক বৃত্ত পর্যালোচনা করো এবং ক্ষতিকর সংযোগ কমাও।"}],
    },
  },
  D6: {
    en: {
      detail: ["You hold yourself together in most situations and you are carrying your share of the practical load.", "This is a solid working level, and it is enough for the demands of an ordinary week.", "Steadiness is the first thing to go under prolonged pressure. If the strain in your other domains continues, this is where it will show up first."],
      modality: "Individual emotion-regulation work (CBT/DBT-based).",
      psych: "Self-regulation capacity — the ability to manage emotional reactions under stress — is a foundational individual skill that directly affects relationship quality during difficult periods.",
      plan: [{w:"Week 1",a:"Notice when your regulation breaks down. What time of day? After which events? Just observe."},{w:"Week 2",a:"Identify your earliest warning sign that regulation is slipping."},{w:"Week 3",a:"Build one pause into the moments you identified: 'I need five minutes.'"},{w:"Week 4",a:"Tell your partner about this system. Ask them to name when they see the warning sign."}],
    },
    bn: {
      detail: ["বেশিরভাগ পরিস্থিতিতে তুমি নিজেকে সামলে রাখো এবং ব্যবহারিক দায়িত্ব বহন করছো।", "এটি একটি কার্যকর মাত্রা।", "দীর্ঘস্থায়ী চাপে স্থিরতাই প্রথমে যায়।"],
      modality: "ব্যক্তিগত emotion-regulation কাজ (CBT/DBT-ভিত্তিক)।",
      psych: "আত্মনিয়ন্ত্রণ সক্ষমতা — চাপের মধ্যে আবেগীয় প্রতিক্রিয়া পরিচালনার ক্ষমতা — সম্পর্কের মানকে সরাসরি প্রভাবিত করে।",
      plan: [{w:"সপ্তাহ ১",a:"লক্ষ্য করো কখন নিয়ন্ত্রণ ভেঙে পড়ে।"},{w:"সপ্তাহ ২",a:"নিয়ন্ত্রণ হারানোর সবচেয়ে আগের সংকেত চিহ্নিত করো।"},{w:"সপ্তাহ ৩",a:"'আমার পাঁচ মিনিট দরকার' — এই বিরতি অনুশীলন করো।"},{w:"সপ্তাহ ৪",a:"সঙ্গীকে এই সিস্টেমের কথা বলো।"}],
    },
  },
};

const DO = ["D1","D2","D3","D4","D5","D6"];

function sc(v: number) { if(v>=85)return"#15803d"; if(v>=70)return"#16a34a"; if(v>=55)return"#d97706"; if(v>=40)return"#ea580c"; return"#dc2626"; }
function bc(b?: Band) { if(!b)return"#9ca3af"; if(b.color==="green")return"#15803d"; if(b.color==="lightgreen")return"#16a34a"; if(b.color==="amber")return"#d97706"; if(b.color==="orange")return"#ea580c"; return"#dc2626"; }
function bb(b?: Band) { if(!b)return{bg:"#f3f4f6",tx:"#374151",bd:"#d1d5db"}; if(b.color==="green")return{bg:"#14532d",tx:"#fff",bd:"#166534"}; if(b.color==="lightgreen")return{bg:"#dcfce7",tx:"#166534",bd:"#86efac"}; if(b.color==="amber")return{bg:"#fef3c7",tx:"#92400e",bd:"#fcd34d"}; if(b.color==="orange")return{bg:"#ffedd5",tx:"#9a3412",bd:"#fdba74"}; return{bg:"#fee2e2",tx:"#991b1b",bd:"#fca5a5"}; }

const PS: React.CSSProperties = { background:"#fff", borderRadius:"2px", boxShadow:"0 1px 3px rgba(0,0,0,.08),0 8px 32px rgba(0,0,0,.06)", padding:"52px 60px", maxWidth:"820px", margin:"0 auto 20px auto", fontFamily:"'Georgia','Times New Roman',serif" };

function PH({id,pg}:{id?:string;pg?:number}) {
  return (
    <div style={{display:"flex",justifyContent:"space-between",marginBottom:"32px",position:"relative"}}>
      {pg && <span style={{position:"absolute",left:"50%",transform:"translateX(-50%)",fontSize:"10px",color:"#bbb",fontFamily:"sans-serif"}}>{pg}</span>}
      <span />
      <span style={{fontSize:"10px",color:"#bbb",fontFamily:"sans-serif"}}>{id?`MC-${id.slice(-8).toUpperCase()} · Pilot Edition 1:0-P`:"MCRRS-BD · Pilot Edition 1:0-P"}</span>
    </div>
  );
}

function SH({c="#1E4D10",children}:{c?:string;children:React.ReactNode}) {
  return (<><h2 style={{fontSize:"19px",fontWeight:700,color:c,margin:"0 0 6px 0",fontFamily:"Georgia,serif"}}>{children}</h2><div style={{height:"2px",background:c,marginBottom:"18px"}}/></>);
}

function T({children,style}:{children:React.ReactNode;style?:React.CSSProperties}) {
  return <p style={{fontSize:"13px",color:"#2c2c2c",lineHeight:"1.82",margin:"0 0 12px 0",fontFamily:"Georgia,serif",...style}}>{children}</p>;
}

function CB({children,bc:bColor="#e07b00"}:{children:React.ReactNode;bc?:string}) {
  return (<div style={{borderLeft:`4px solid ${bColor}`,background:"#f9f5ee",padding:"12px 16px",margin:"14px 0",borderRadius:"0 3px 3px 0"}}><p style={{fontSize:"13px",color:"#2c2c2c",lineHeight:"1.75",margin:0,fontStyle:"italic",fontFamily:"Georgia,serif"}}>{children}</p></div>);
}

function HR() { return <div style={{height:"1px",background:"#e8e8e8",margin:"18px 0"}}/>; }

function LangBtn({lang,toggle}:{lang:Lang;toggle:()=>void}) {
  return (<button onClick={toggle} id="lang-toggle-btn" style={{display:"flex",alignItems:"center",gap:"8px",padding:"7px 18px",borderRadius:"999px",border:"1.5px solid #2D5016",background:"#fff",cursor:"pointer",fontSize:"13px",fontWeight:700,color:"#2D5016",fontFamily:"sans-serif"}}><span style={{opacity:lang==="bn"?1:0.35}}>বাংলা</span><span style={{width:"1px",height:"13px",background:"#2D5016",opacity:0.25}}/><span style={{opacity:lang==="en"?1:0.35}}>English</span></button>);
}

function ScoreBar({score,label}:{score:number;label:string}) {
  let pct=0;
  if(score<=40)pct=(score/40)*25; else if(score<=55)pct=25+((score-40)/15)*12.5; else if(score<=70)pct=37.5+((score-55)/15)*25; else if(score<=85)pct=62.5+((score-70)/15)*12.5; else pct=75+((score-85)/15)*25;
  const col=sc(score);
  const segs:Array<[string,number]>=[["#dc2626",25],["#ea580c",12.5],["#d97706",25],["#16a34a",12.5],["#15803d",25]];
  return (
    <div style={{marginBottom:"6px"}}>
      <div style={{textAlign:"center",marginBottom:"10px"}}>
        <span style={{fontSize:"58px",fontWeight:700,color:col,lineHeight:1,fontFamily:"sans-serif"}}>{score}</span>
        <span style={{fontSize:"20px",fontWeight:600,color:col,marginLeft:"10px",fontFamily:"sans-serif"}}>{label}</span>
      </div>
      <div style={{position:"relative",marginBottom:"2px"}}>
        <div style={{display:"flex",height:"26px",borderRadius:"13px",overflow:"hidden"}}>
          {segs.map(([bg,fl],i)=><div key={i} style={{flex:fl,background:bg}}/>)}
        </div>
        <div style={{position:"absolute",top:0,left:`${pct}%`,transform:"translateX(-50%)"}}>
          <div style={{background:col,color:"#fff",fontSize:"11px",fontWeight:700,padding:"2px 7px",borderRadius:"3px",whiteSpace:"nowrap",boxShadow:"0 2px 8px rgba(0,0,0,.2)",fontFamily:"sans-serif"}}>{score}</div>
          <div style={{width:"2px",height:"30px",background:"#111",margin:"0 auto"}}/>
        </div>
      </div>
      <div style={{display:"flex",justifyContent:"space-between",fontSize:"10px",color:"#999",marginTop:"34px",fontFamily:"sans-serif"}}>
        {["lower","40","55","70","85","higher"].map(l=><span key={l}>{l}</span>)}
      </div>
    </div>
  );
}

function HBar({score,color}:{score:number;color:string}) {
  return (
    <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
      <div style={{flex:1,height:"20px",background:"#ebebeb",borderRadius:"3px",overflow:"hidden"}}>
        <div style={{width:`${Math.min(score,100)}%`,height:"100%",background:color,borderRadius:"3px"}}/>
      </div>
      <span style={{fontWeight:700,fontSize:"13px",color,minWidth:"28px",fontFamily:"sans-serif"}}>{score}</span>
    </div>
  );
}

function Gauge({score}:{score:number}) {
  const toR=(d:number)=>d*Math.PI/180;
  const cx=145,cy=120,ro=95,ri=60;
  function arc(sa:number,ea:number,fill:string) {
    const s=toR(sa),e=toR(ea);
    const x1=cx+ro*Math.cos(s),y1=cy+ro*Math.sin(s),x2=cx+ro*Math.cos(e),y2=cy+ro*Math.sin(e);
    const x3=cx+ri*Math.cos(e),y3=cy+ri*Math.sin(e),x4=cx+ri*Math.cos(s),y4=cy+ri*Math.sin(s);
    return <path d={`M${x1},${y1} A${ro},${ro},0,0,1,${x2},${y2} L${x3},${y3} A${ri},${ri},0,0,0,${x4},${y4} Z`} fill={fill}/>;
  }
  const segs:Array<[number,number,string]>=[[-90,-54,"#dc2626"],[-54,-18,"#ea580c"],[-18,18,"#d97706"],[18,54,"#b5a819"],[54,90,"#16a34a"]];
  const ang=-90+(Math.min(Math.max(score,0),100)/100)*180;
  const nl=75,nx=cx+nl*Math.cos(toR(ang)),ny=cy+nl*Math.sin(toR(ang));
  const col=sc(score);
  return (
    <div style={{display:"flex",justifyContent:"center",margin:"12px 0"}}>
      <svg width="290" height="155" viewBox="0 0 290 155">
        {segs.map(([sa,ea,c])=>arc(sa,ea,c))}
        <line x1={cx} y1={cy} x2={nx} y2={ny} stroke="#111" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx={cx} cy={cy} r="7" fill="#111"/>
        <text x={cx} y={cy+24} textAnchor="middle" fill={col} fontSize="24" fontWeight="700" fontFamily="sans-serif">{score}</text>
        <text x={cx} y={cy+40} textAnchor="middle" fill="#888" fontSize="10" fontFamily="sans-serif">Pressure Resilience Index</text>
        <text x={30} y={148} fill="#bbb" fontSize="9" fontFamily="sans-serif">lower</text>
        <text x={240} y={148} fill="#bbb" fontSize="9" fontFamily="sans-serif">higher</text>
      </svg>
    </div>
  );
}

function Radar({ds,res}:{ds:string[];res:Record<string,DR>}) {
  const cx=130,cy=130,r=95,n=ds.length;
  const toR=(d:number)=>d*Math.PI/180;
  const ang=(i:number)=>-90+(360/n)*i;
  const pt=(i:number,radius:number)=>({x:cx+radius*Math.cos(toR(ang(i))),y:cy+radius*Math.sin(toR(ang(i)))});
  const rings=[25,50,75,100];
  const scores=ds.map(d=>res[d]?.index??0);
  const poly=ds.map((_,i)=>{const p=pt(i,(scores[i]/100)*r);return `${p.x},${p.y}`;}).join(" ");
  const dc=(s:number)=>s>=70?"#16a34a":s>=55?"#d97706":"#dc2626";
  return (
    <svg width="260" height="260" viewBox="0 0 260 260">
      {rings.map((ring,ri)=>(
        <polygon key={ri} points={ds.map((_,i)=>{const p=pt(i,(ring/100)*r);return `${p.x},${p.y}`;}).join(" ")} fill={ri%2===0?"#f8f8f8":"#f3f3f3"} stroke="#ddd" strokeWidth="0.8"/>
      ))}
      {ds.map((_,i)=>{const p=pt(i,r);return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#ddd" strokeWidth="0.8"/>;} )}
      <polygon points={poly} fill="#2D5016" fillOpacity="0.15" stroke="#2D5016" strokeWidth="2" strokeLinejoin="round"/>
      {ds.map((d,i)=>{const p=pt(i,(scores[i]/100)*r);return <circle key={i} cx={p.x} cy={p.y} r="5" fill={dc(scores[i])} stroke="#fff" strokeWidth="1.5"/>;} )}
      {ds.map((d,i)=>{const p=pt(i,r+18);return <text key={i} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="middle" fontSize="11" fontWeight="700" fill="#555" fontFamily="sans-serif">{d}</text>;} )}
      {rings.map((ring,ri)=><text key={ri} x={cx+4} y={cy-(ring/100)*r+4} fontSize="8" fill="#bbb" fontFamily="sans-serif">{ring}</text>)}
    </svg>
  );
}

function DBars({ds,res}:{ds:string[];res:Record<string,DR>}) {
  return (
    <div>
      {ds.map(d=>{
        const dr=res[d]; if(!dr?.scored)return null;
        const col=bc(dr.band),pct=dr.index??0;
        return (
          <div key={d} style={{marginBottom:"11px"}}>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:"11px",fontWeight:700,marginBottom:"3px",fontFamily:"sans-serif"}}>
              <span style={{color:"#dc2626"}}>{d}</span><span style={{color:col}}>{pct}</span>
            </div>
            <div style={{height:"18px",background:"#ebebeb",borderRadius:"3px",overflow:"hidden"}}>
              <div style={{width:`${pct}%`,height:"100%",background:col,borderRadius:"3px"}}/>
            </div>
          </div>
        );
      })}
      <div style={{display:"flex",justifyContent:"space-between",fontSize:"9px",color:"#bbb",marginTop:"4px",fontFamily:"sans-serif"}}>
        {[0,25,50,75,100].map(v=><span key={v}>{v}</span>)}
      </div>
    </div>
  );
}

function STable({ds,res,lang}:{ds:string[];res:Record<string,DR>;lang:Lang}) {
  return (
    <table style={{width:"100%",borderCollapse:"collapse",fontSize:"13px",fontFamily:"sans-serif"}}>
      <thead>
        <tr style={{background:"#2D5016",color:"#fff"}}>
          {["",(lang==="en"?"Area":"ক্ষেত্র"),(lang==="en"?"Score":"স্কোর"),(lang==="en"?"Level":"মাত্রা")].map((h,i)=>(
            <th key={i} style={{padding:"10px 12px",textAlign:i>=2?"center":"left",fontWeight:700}}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {ds.map((d,i)=>{
          const dr=res[d]; if(!dr?.scored)return null;
          const {bg,tx,bd}=bb(dr.band);
          return (
            <tr key={d} style={{background:i%2===0?"#fff":"#f9f9f9",borderBottom:"1px solid #eee"}}>
              <td style={{padding:"10px 12px",fontWeight:800,color:"#dc2626"}}>{d}</td>
              <td style={{padding:"10px 12px",color:"#1a1a1a"}}>{lang==="en"?dr.name_en:dr.name_bn}</td>
              <td style={{padding:"10px 12px",textAlign:"center",fontWeight:800,color:sc(dr.index??0),fontSize:"15px"}}>{dr.index}</td>
              <td style={{padding:"8px 12px",textAlign:"center"}}><span style={{background:bg,color:tx,border:`1px solid ${bd}`,borderRadius:"3px",padding:"3px 12px",fontWeight:700,fontSize:"11px"}}>{lang==="en"?dr.band?.label_en:dr.band?.label_bn}</span></td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function HelpTable({res,lang}:{res:NonNullable<McrrsData["referralResources"]>;lang:Lang}) {
  return (
    <table style={{width:"100%",borderCollapse:"collapse",fontSize:"13px",fontFamily:"sans-serif"}}>
      <thead><tr style={{background:"#2D5016",color:"#fff"}}>{(lang==="en"?["What for","Service","Number","When"]:["কী জন্য","সেবা","নম্বর","সময়"]).map(h=><th key={h} style={{padding:"10px 12px",textAlign:"left",fontWeight:700}}>{h}</th>)}</tr></thead>
      <tbody>{res.map((r,i)=><tr key={i} style={{background:i%2===0?"#fff":"#f9f9f9",borderBottom:"1px solid #eee"}}><td style={{padding:"9px 12px",color:"#333"}}>{r.need_bn}</td><td style={{padding:"9px 12px",color:"#333"}}>{r.service}</td><td style={{padding:"9px 12px",fontWeight:800}}>{r.number}</td><td style={{padding:"9px 12px",color:"#666"}}>{r.hours_bn}</td></tr>)}</tbody>
    </table>
  );
}

function PlanCard({code,name,plan}:{code:string;name:string;plan:{w:string;a:string}[]}) {
  return (
    <div style={{marginBottom:"24px"}}>
      <div style={{fontWeight:700,color:"#d97706",marginBottom:"10px",fontSize:"14px",fontFamily:"sans-serif"}}>{code} — {name}</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px"}}>
        {plan.map((p,i)=>(
          <div key={i} style={{background:"#fff",border:"1px solid #e8e8e8",borderRadius:"6px",padding:"14px 16px",boxShadow:"0 1px 4px rgba(0,0,0,.04)"}}>
            <div style={{fontWeight:700,fontSize:"10px",color:"#d97706",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:"6px",fontFamily:"sans-serif"}}>{p.w}</div>
            <p style={{fontSize:"12.5px",color:"#374151",lineHeight:1.65,margin:0,fontFamily:"Georgia,serif"}}>{p.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function McrrsReport({r,responseId,submittedDate}:{r:McrrsData;responseId?:string;submittedDate?:string;}) {
  const [lang,setLang]=useState<Lang>("bn");
  const tg=()=>setLang(l=>l==="en"?"bn":"en");
  const TL=(e:string,b:string)=>lang==="en"?e:b;

  const all=DO.filter(d=>r.domainResults[d]);
  const scored=all.filter(d=>r.domainResults[d]?.scored);
  const focus=r.focusAreas||[];
  const low=scored.filter(d=>(r.domainResults[d].index??100)<55);
  const total=r.total?.index??0;
  const totalLabel=TL(r.total?.band?.label_en||"",r.total?.band?.label_bn||"");
  const pri=r.pri?.index;
  const internal=["D1","D2","D3","D6"].filter(d=>r.domainResults[d]?.scored);
  const external=["D4","D5"].filter(d=>r.domainResults[d]?.scored);
  const iAvg=internal.length?Math.round(internal.reduce((s,d)=>s+(r.domainResults[d].index??0),0)/internal.length):null;
  const eAvg=external.length?Math.round(external.reduce((s,d)=>s+(r.domainResults[d].index??0),0)/external.length):null;

  if(r.careFlag) {
    return (
      <div style={{background:"#f0f0ee",padding:"20px 16px"}}>
        <div style={{maxWidth:"820px",margin:"0 auto 14px auto",display:"flex",justifyContent:"flex-end"}}><LangBtn lang={lang} toggle={tg}/></div>
        <div style={{...PS,borderLeft:"5px solid #dc2626"}}>
          <PH id={responseId}/>
          <h2 style={{color:"#dc2626",fontSize:"20px",fontWeight:700,marginBottom:"14px",fontFamily:"Georgia,serif"}}>⚠️ {TL("Safety & Wellbeing Notice","নিরাপত্তা ও সুস্থতা বিজ্ঞপ্তি")}</h2>
          <T>{TL(r.tier4Message_en||r.tier4Message_bn||"",r.tier4Message_bn||"")}</T>
          {r.referralResources&&<HelpTable res={r.referralResources} lang={lang}/>}
        </div>
      </div>
    );
  }

  return (
    <div style={{background:"#ddddd9",padding:"20px 16px"}}>
      <div style={{position:"sticky",top:"68px",zIndex:50,maxWidth:"820px",margin:"0 auto 12px auto",display:"flex",justifyContent:"flex-end"}}><LangBtn lang={lang} toggle={tg}/></div>

      {/* ═══ PAGE 1 — BEFORE YOU READ ═══ */}
      <div style={PS}>
        <PH id={responseId} pg={1}/>
        <SH>{TL("Before you read this report","রিপোর্টটি পড়ার আগে")}</SH>
        <T>{TL("You have just completed a questionnaire built specifically for relationships in Bangladesh. Almost every established marital questionnaire in the world was developed in societies where a couple sets up a separate household after marriage and the role of elders is limited. Ours is not such a society. Here the family is inside the relationship — the household, the community, what people say. Until now there has been no instrument built to measure that reality.","আপনি এইমাত্র বাংলাদেশের সম্পর্কের জন্য বিশেষভাবে তৈরি একটি প্রশ্নমালা সম্পন্ন করেছেন। পৃথিবীর প্রায় সব প্রতিষ্ঠিত বৈবাহিক প্রশ্নমালা এমন সমাজে তৈরি হয়েছে যেখানে বিয়ের পর দম্পতি আলাদা সংসার করে এবং বড়দের ভূমিকা সীমিত। আমাদের সমাজ তা নয়। এখানে পরিবার সম্পর্কের ভেতরেই থাকে — সংসার, সমাজ, মানুষ কী বলে। এখন পর্যন্ত এই বাস্তবতা পরিমাপ করার কোনো যন্ত্র ছিল না।")}</T>
        <T>{TL("This scale looks at your relationship across six separate areas: how the two of you talk and settle disagreements, how emotionally connected and trusting you are, how far your goals in life align, how the boundary with family is managed, how outside pressure is handled, and how personally ready you are. A relationship cannot be understood through one number, which is why you receive six separate readings — and the most useful information is usually not in the score but in the shape those six make together.","এই স্কেলটি তোমার সম্পর্ককে ছয়টি আলাদা দিক থেকে দেখে: তোমরা কীভাবে কথা বলো ও মতভেদ মেটাও, আবেগীয়ভাবে কতটা সংযুক্ত ও বিশ্বাসযোগ্য, জীবনলক্ষ্য কতটা মেলে, পারিবারিক সীমারেখা কীভাবে সামলানো হয়, বাইরের চাপ কীভাবে মোকাবেলা করা হয়, এবং ব্যক্তিগতভাবে তুমি কতটা প্রস্তুত।")}</T>
        <T>{TL("In the pages ahead you will find: where your relationship stands now; where the strengths and the gaps are; what those gaps are costing you at present; a four-week step-by-step plan; what other family members can usefully do; the psychology behind all of it; and where to find help if you want it.","সামনের পাতাগুলোতে পাবে: এখন সম্পর্ক কোথায় দাঁড়িয়ে আছে; শক্তি ও ফাঁক কোথায়; চার সপ্তাহের পরিকল্পনা; পরিবারের অন্যরা কীভাবে সাহায্য করতে পারে; এবং সাহায্য কোথায় পাওয়া যাবে।")}</T>
        <CB>{TL("It is equally important to know what this report does not do. It is not a diagnosis. It does not tell you whether your marriage will last — no questionnaire can. It does not score your partner, and it does not decide who is right. It is an honest picture of the relationship as you see it, and a practical plan built from that picture.","এই রিপোর্ট কী করে না তা জানাও সমান জরুরি। এটি কোনো রোগ নির্ণয় নয়। এটি বলে না বিয়ে টিকবে কিনা। এটি সঙ্গীকে স্কোর দেয় না এবং কে সঠিক তা ঠিক করে না।")}</CB>
        <T>{TL("The best way to read it: go through the whole thing once, then leave it for a day or two. Then come back and read only the four-week plan. Relationships change through small habits rather than large decisions.","পড়ার সেরা উপায়: একবার পুরোটা পড়ো, তারপর এক-দুই দিন রেখে দাও। তারপর শুধু চার সপ্তাহের পরিকল্পনা পড়ো। সম্পর্ক বড় সিদ্ধান্তের চেয়ে ছোট অভ্যাসের মাধ্যমে বদলায়।")}</T>
      </div>

      {/* ═══ PAGE 2 — AT A GLANCE ═══ */}
      <div style={PS}>
        <PH id={responseId} pg={2}/>
        <SH>{TL("At a glance","এক নজরে")}</SH>
        <p style={{fontSize:"11px",fontWeight:700,color:"#888",textTransform:"uppercase",letterSpacing:"0.12em",margin:"0 0 10px 0",textAlign:"center",fontFamily:"sans-serif"}}>{TL("Overall Relationship Index","সামগ্রিক সম্পর্ক সূচক")}</p>
        <ScoreBar score={total} label={totalLabel}/>
        <T style={{marginTop:"16px"}}>{TL(`Your overall index is in the ${totalLabel.toLowerCase()} range — the most common result, and not a problem in itself. What matters more than the overall figure is the shape of your profile: which areas are carrying the relationship and which are drawing on it.`,`তোমার সামগ্রিক সূচক ${totalLabel} পরিসরে — সবচেয়ে সাধারণ ফলাফল। সামগ্রিক সংখ্যার চেয়ে বেশি গুরুত্বপূর্ণ তোমার প্রোফাইলের আকৃতি: কোন ক্ষেত্রগুলো সম্পর্ককে বহন করছে এবং কোনগুলো তার উপর নির্ভর করছে।`)}</T>
        {r.strongest&&<p style={{fontSize:"13px",lineHeight:1.8,margin:"0 0 6px 0",fontFamily:"Georgia,serif"}}><strong style={{color:"#16a34a"}}>{TL("Your strongest area:","সবচেয়ে শক্তিশালী ক্ষেত্র:")}</strong>{" "}{TL(r.domainResults[r.strongest]?.name_en,r.domainResults[r.strongest]?.name_bn)} ({r.domainResults[r.strongest]?.index})</p>}
        {focus.length>0&&<p style={{fontSize:"13px",lineHeight:1.8,margin:"0 0 20px 0",fontFamily:"Georgia,serif"}}><strong style={{color:"#dc2626"}}>{TL("Where attention would do the most:","যেখানে মনোযোগ সবচেয়ে বেশি দরকার:")}</strong>{" "}{focus.map(d=>`${TL(r.domainResults[d]?.name_en,r.domainResults[d]?.name_bn)} (${r.domainResults[d]?.index})`).join(" · ")}</p>}
        {iAvg!==null&&eAvg!==null&&(
          <>
            <div style={{fontWeight:700,fontSize:"15px",color:"#c0392b",marginBottom:"12px",fontFamily:"Georgia,serif"}}>{TL("The balance of the two sides","দুই দিকের ভারসাম্য")}</div>
            <div style={{marginBottom:"10px"}}><div style={{fontSize:"12px",fontWeight:700,color:"#dc2626",marginBottom:"4px",fontFamily:"sans-serif"}}>{TL("What the two of you bring","তোমরা দুজনে যা নিয়ে এসো")}</div><HBar score={iAvg} color="#16a34a"/></div>
            <div style={{marginBottom:"10px"}}><div style={{fontSize:"12px",fontWeight:700,color:"#dc2626",marginBottom:"4px",fontFamily:"sans-serif"}}>{TL("The world around you","তোমাদের চারপাশের জগৎ")}</div><HBar score={eAvg} color="#dc2626"/></div>
            <p style={{fontSize:"11px",color:"#888",fontStyle:"italic",marginTop:"6px",fontFamily:"Georgia,serif"}}>{TL(`The two sides differ by ${Math.abs(iAvg-eAvg)} points. The wider the gap, the more the difficulty is situational rather than personal.`,`দুই দিক ${Math.abs(iAvg-eAvg)} পয়েন্ট আলাদা। ব্যবধান যত বেশি, অসুবিধা তত বেশি পরিস্থিতিগত — ব্যক্তিগত নয়।`)}</p>
          </>
        )}
        {pri!==undefined&&pri!==null&&(
          <>
            <HR/>
            <SH c="#c0392b">{TL("The family-pressure question","পারিবারিক-চাপের প্রশ্ন")}</SH>
            <Gauge score={pri}/>
            <CB bc="#ccc">{TL(pri>=70?"Outside pressure is largely handled as a team. The two of you have a reliable pattern for meeting it together.":pri>=55?"Outside pressure gets through some of the time. This is a reading of today, not a forecast, and it is one of the more changeable figures in this report.":"Outside pressure is regularly getting inside the relationship and affecting how the two of you relate to each other.",pri>=70?"বাইরের চাপ মূলত দল হিসেবে সামলানো হচ্ছে।":pri>=55?"বাইরের চাপ কখনো কখনো ভেতরে ঢোকে। এটি আজকের পাঠ, পূর্বাভাস নয়।":"বাইরের চাপ নিয়মিত সম্পর্কের ভেতরে ঢুকছে।")}</CB>
          </>
        )}
        <HR/>
        <SH>{TL("Your profile across six areas","ছয়টি ক্ষেত্রে তোমার প্রোফাইল")}</SH>
        <T>{TL("Each score runs from 0 to 100 and comes directly from your answers. A higher score means more of what that area describes is true for you.","প্রতিটি স্কোর ০ থেকে ১০০ পর্যন্ত এবং সরাসরি তোমার উত্তর থেকে আসে। বেশি স্কোর মানে সেই ক্ষেত্রটি তোমার জন্য বেশি প্রযোজ্য।")}</T>
      </div>

      {/* ═══ PAGE 3 — RADAR + TABLE ═══ */}
      <div style={PS}>
        <PH id={responseId} pg={3}/>
        <div style={{display:"grid",gridTemplateColumns:"auto 1fr",gap:"28px",alignItems:"center",marginBottom:"24px"}}>
          <div style={{border:"1px solid #eee",borderRadius:"6px",background:"#fafafa",padding:"4px"}}><Radar ds={scored} res={r.domainResults}/></div>
          <DBars ds={scored} res={r.domainResults}/>
        </div>
        <STable ds={scored} res={r.domainResults} lang={lang}/>
      </div>

      {/* ═══ PAGE 4 — AREA BY AREA (D1 D2 D3) ═══ */}
      <div style={PS}>
        <PH id={responseId} pg={4}/>
        <SH>{TL("Area by area","ক্ষেত্র অনুযায়ী")}</SH>
        {["D1","D2","D3"].filter(d=>r.domainResults[d]?.scored).map(d=>{
          const dr=r.domainResults[d],c=DOMAIN_DATA[d]?.[lang],col=sc(dr.index??0);
          return (
            <div key={d}>
              <div style={{display:"flex",alignItems:"baseline",gap:"10px",marginBottom:"8px",flexWrap:"wrap"}}>
                <span style={{fontWeight:800,color:"#dc2626",fontSize:"14px",fontFamily:"sans-serif"}}>{d}</span>
                <span style={{fontWeight:700,fontSize:"16px",color:"#1a1a1a",fontFamily:"Georgia,serif"}}>{TL(dr.name_en,dr.name_bn)}</span>
                <span style={{fontSize:"14px",fontWeight:600,color:col,fontFamily:"sans-serif"}}>{dr.index} · {TL(dr.band?.label_en||"",dr.band?.label_bn||"")}</span>
              </div>
              <HR/>
              {c?.detail.map((p,i)=><T key={i}>{p}</T>)}
              <div style={{height:"8px"}}/>
            </div>
          );
        })}
      </div>

      {/* ═══ PAGE 5 — AREA BY AREA (D4 D5 D6) ═══ */}
      <div style={PS}>
        <PH id={responseId} pg={5}/>
        {["D4","D5","D6"].filter(d=>r.domainResults[d]?.scored).map(d=>{
          const dr=r.domainResults[d],c=DOMAIN_DATA[d]?.[lang],col=sc(dr.index??0);
          return (
            <div key={d}>
              <div style={{display:"flex",alignItems:"baseline",gap:"10px",marginBottom:"8px",flexWrap:"wrap"}}>
                <span style={{fontWeight:800,color:"#dc2626",fontSize:"14px",fontFamily:"sans-serif"}}>{d}</span>
                <span style={{fontWeight:700,fontSize:"16px",color:"#1a1a1a",fontFamily:"Georgia,serif"}}>{TL(dr.name_en,dr.name_bn)}</span>
                <span style={{fontSize:"14px",fontWeight:600,color:col,fontFamily:"sans-serif"}}>{dr.index} · {TL(dr.band?.label_en||"",dr.band?.label_bn||"")}</span>
              </div>
              <HR/>
              {c?.detail.map((p,i)=><T key={i}>{p}</T>)}
              <div style={{height:"8px"}}/>
            </div>
          );
        })}
      </div>

      {/* ═══ PAGE 6 — WHAT THE GAPS ARE DOING ═══ */}
      {low.length>0&&(
        <div style={PS}>
          <PH id={responseId} pg={6}/>
          <SH c="#c0392b">{TL("What the gaps are doing","ফাঁকগুলো কী করছে")}</SH>
          {focus.length>0&&(
            <div style={{background:"#f8f8f8",border:"1px solid #ebebeb",borderRadius:"6px",padding:"16px 20px",marginBottom:"22px"}}>
              <p style={{fontSize:"10px",color:"#aaa",textAlign:"center",fontStyle:"italic",margin:"0 0 12px 0",fontFamily:"sans-serif"}}>{TL("Score on each area, on the 0–100 scale","প্রতিটি ক্ষেত্রের স্কোর, ০–১০০ স্কেলে")}</p>
              {focus.map(d=>{
                const dr=r.domainResults[d]; if(!dr?.scored)return null;
                return (<div key={d} style={{marginBottom:"10px"}}><div style={{fontSize:"12px",color:"#333",fontWeight:600,marginBottom:"3px",fontFamily:"sans-serif"}}>{TL(dr.name_en,dr.name_bn)}</div><HBar score={dr.index??0} color={bc(dr.band)}/></div>);
              })}
            </div>
          )}
          {low.map(d=>{
            const dr=r.domainResults[d],c=DOMAIN_DATA[d]?.[lang];
            return (
              <div key={d} style={{marginBottom:"22px"}}>
                <div style={{fontWeight:700,fontSize:"16px",color:"#c0392b",fontFamily:"Georgia,serif",marginBottom:"10px"}}>{TL(dr.name_en,dr.name_bn)} — {dr.index}</div>
                {(c?.gap||c?.detail)?.map((p,i)=><T key={i}>{p}</T>)}
              </div>
            );
          })}
        </div>
      )}

      {/* ═══ PAGE 7 — WHAT OTHERS CAN DO ═══ */}
      {low.some(d=>DOMAIN_DATA[d]?.[lang]?.partner)&&(
        <div style={PS}>
          <PH id={responseId} pg={7}/>
          <SH>{TL("What others around you can do","তোমার আশেপাশের অন্যরা কী করতে পারে")}</SH>
          <T>{TL("A relationship does not sit only between two people; those around it play a part, knowingly or otherwise. You may show this page to them if you wish.","একটি সম্পর্ক শুধু দুজনের মধ্যে নয়; চারপাশের মানুষরা জেনে বা না জেনে একটি ভূমিকা রাখে। চাইলে এই পাতা তাদের দেখাতে পারো।")}</T>
          {low.map(d=>{
            const dr=r.domainResults[d],c=DOMAIN_DATA[d]?.[lang];
            if(!c?.partner)return null;
            return (
              <div key={d} style={{marginBottom:"20px"}}>
                <div style={{fontWeight:700,fontSize:"15px",color:"#c0392b",fontFamily:"Georgia,serif",marginBottom:"10px"}}>{TL(dr.name_en,dr.name_bn)}</div>
                <T><strong style={{color:"#16a34a"}}>{TL("The partner's role.","সঙ্গীর ভূমিকা।")}</strong>{" "}{c.partner}</T>
                <T><strong style={{color:"#d97706"}}>{TL("The elders' role.","বড়দের ভূমিকা।")}</strong>{" "}{c.elders}</T>
              </div>
            );
          })}
        </div>
      )}

      {/* ═══ PAGE 8 — SUPPORT + PSYCHOLOGY ═══ */}
      <div style={PS}>
        <PH id={responseId} pg={8}/>
        <SH>{TL("What kind of support might help","কোন ধরনের সহায়তা সাহায্য করতে পারে")}</SH>
        <T>{TL(r.tier<=1?"Your overall functioning is in the working range. What the profile points to is short, focused work — usually three or four sessions — on the specific areas sitting low.":r.tier===2?"One or more areas are under significant strain. Focused couples or individual work in those specific areas is the most efficient route.":"The overall pattern is under strain across multiple areas. Structured couples work, or parallel individual work, would help most here.",r.tier<=1?"তোমার সামগ্রিক কার্যকারিতা কার্যকর পরিসরে। প্রোফাইলটি যা নির্দেশ করে তা হল সংক্ষিপ্ত, কেন্দ্রীভূত কাজ — সাধারণত তিন বা চারটি সেশন।":r.tier===2?"এক বা একাধিক ক্ষেত্র উল্লেখযোগ্য চাপে রয়েছে।":"সামগ্রিক প্যাটার্ন একাধিক ক্ষেত্রে চাপে রয়েছে।")}</T>
        {focus.map(d=>{const dr=r.domainResults[d],c=DOMAIN_DATA[d]?.[lang];return(<p key={d} style={{fontSize:"13px",lineHeight:1.8,margin:"0 0 10px 0",fontFamily:"Georgia,serif"}}><strong style={{color:"#dc2626"}}>{TL(dr.name_en,dr.name_bn)} —</strong>{" "}{c?.modality}</p>);})}
        <div style={{marginTop:"14px"}}><T style={{fontWeight:700}}>{TL("How you have been feeling lately","সম্প্রতি তুমি কেমন অনুভব করছো")}</T><CB bc="#ccc">{TL("Your answers about the past two weeks do not show marked signs of anxiety or low mood. This is a separate reading and is unrelated to your relationship scores.","গত দুই সপ্তাহ সম্পর্কে তোমার উত্তর উদ্বেগ বা বিষণ্নতার স্পষ্ট লক্ষণ দেখায় না।")}</CB></div>
        <HR/>
        <SH c="#d97706">{TL("The psychology behind this","এর পেছনের মনোবিজ্ঞান")}</SH>
        <T>{TL("Advice is easier to follow when you know where it comes from. Below is the research behind your focus areas, in brief.","পরামর্শ মেনে চলা সহজ হয় যখন জানো এটি কোথা থেকে আসছে।")}</T>
        {focus.map(d=>{const dr=r.domainResults[d],c=DOMAIN_DATA[d]?.[lang];return(<div key={d} style={{marginBottom:"16px"}}><div style={{fontWeight:700,color:"#d97706",marginBottom:"4px",fontFamily:"sans-serif"}}>{TL(dr.name_en,dr.name_bn)}</div><T>{c?.psych}</T></div>);})}
      </div>

      {/* ═══ PAGE 9 — FOUR-WEEK PLAN ═══ */}
      {focus.length>0&&(
        <div style={PS}>
          <PH id={responseId} pg={9}/>
          <h2 style={{fontSize:"19px",fontWeight:700,color:"#d97706",margin:"0 0 6px 0",fontFamily:"Georgia,serif"}}>{TL("Your four-week plan","তোমার চার সপ্তাহের পরিকল্পনা")}</h2>
          <div style={{height:"2px",background:"#d97706",marginBottom:"18px"}}/>
          <T>{TL("The plan below is built from your focus areas. Each week has one specific action. Small and specific beats large and vague every time.","নিচের পরিকল্পনা তোমার ফোকাস ক্ষেত্র থেকে তৈরি। প্রতি সপ্তাহে একটি নির্দিষ্ট পদক্ষেপ আছে। ছোট ও নির্দিষ্ট সবসময় বড় ও অস্পষ্টকে হারায়।")}</T>
          {focus.map(d=>{const dr=r.domainResults[d],c=DOMAIN_DATA[d]?.[lang];if(!c)return null;return <PlanCard key={d} code={d} name={TL(dr.name_en,dr.name_bn)} plan={c.plan}/>;} )}
        </div>
      )}

      {/* ═══ PAGE 10/11 — HELPLINES + FURTHER READING + ABOUT ═══ */}
      {r.referralResources&&r.referralResources.length>0&&(
        <div style={PS}>
          <PH id={responseId} pg={10}/>
          <SH>{TL("If you need someone to talk to","যদি কারো সাথে কথা বলতে চাও")}</SH>
          <T>{TL("These services are free and confidential. They are listed on every report, whatever the score.","এই সেবাগুলো বিনামূল্যে ও গোপনীয়। স্কোর যাই হোক প্রতিটি রিপোর্টে এগুলো তালিকাভুক্ত।")}</T>
          <HelpTable res={r.referralResources} lang={lang}/>
          <div style={{marginTop:"28px"}}>
            <div style={{fontWeight:700,color:"#d97706",marginBottom:"12px",fontSize:"15px",fontFamily:"Georgia,serif"}}>{TL("To read and watch further","আরও পড়তে ও দেখতে")}</div>
            {[{title:"Why Not You — marriage series",desc:TL("Short Bangla videos on the six areas this scale measures.","এই স্কেলের ছয়টি ক্ষেত্রের উপর ছোট বাংলা ভিডিও।"),url:"https://www.whynotyoupsy.com/videos"},{title:"Why Not You — reading room",desc:TL("Bangla articles on relationships, family pressure and mental health.","সম্পর্ক ও মানসিক স্বাস্থ্য নিয়ে বাংলা নিবন্ধ।"),url:"https://www.whynotyoupsy.com/articles"},{title:"The Gottman Institute",desc:TL("Research-based source on communication and conflict repair. English.","যোগাযোগ ও দ্বন্দ্ব সংস্কারে গবেষণা-ভিত্তিক উৎস।"),url:"https://www.gottman.com/blog/"},{title:"ICEEFT — Emotionally Focused Therapy",desc:TL("International centre for emotional connection and trust. English.","আবেগীয় সংযোগ ও আস্থার আন্তর্জাতিক কেন্দ্র।"),url:"https://iceeft.com/what-is-eft/"},{title:"WHO — mental health",desc:TL("Reliable information from the World Health Organization. English.","বিশ্ব স্বাস্থ্য সংস্থার নির্ভরযোগ্য তথ্য।"),url:"https://www.who.int/health-topics/mental-health"}].map((item,i)=>(
              <div key={i} style={{marginBottom:"14px"}}><div style={{fontWeight:700,fontSize:"13.5px",color:"#1a1a1a",fontFamily:"Georgia,serif"}}>{item.title}</div><div style={{fontSize:"12px",color:"#666",marginBottom:"2px",fontFamily:"sans-serif"}}>{item.desc}</div><a href={item.url} target="_blank" rel="noopener noreferrer" style={{fontSize:"12px",color:"#2D5016",fontFamily:"sans-serif"}}>{item.url}</a></div>
            ))}
          </div>
          <HR/>
          <div style={{fontWeight:700,fontSize:"13px",color:"#374151",marginBottom:"10px",fontFamily:"Georgia,serif"}}>{TL("About this report","এই রিপোর্ট সম্পর্কে")}</div>
          <p style={{fontSize:"11.5px",color:"#777",lineHeight:1.75,margin:"0 0 8px 0",fontFamily:"Georgia,serif"}}>{TL(r.disclaimer_en||r.disclaimer_bn||"",r.disclaimer_bn||"")}</p>
          <p style={{fontSize:"11.5px",color:"#777",lineHeight:1.75,margin:"0 0 6px 0",fontFamily:"Georgia,serif"}}>{TL("This report was produced by the Marriage Compatibility & Relationship Readiness Scale — Bangladesh (MCRRS-BD), Pilot Edition 1.0-P. The scores are a direct translation of your own answers.","এই রিপোর্টটি MCRRS-BD, Pilot Edition 1.0-P দ্বারা তৈরি। স্কোরগুলো তোমার নিজের উত্তরের সরাসরি রূপান্তর।")}</p>
          <p style={{fontSize:"11.5px",color:"#999",fontFamily:"sans-serif"}}>{TL("Questions: Kazi Fardous Iqbal, MS (Psychology), Licensed Psychologist · www.whynotyoupsy.com","প্রশ্ন: Kazi Fardous Iqbal, MS (Psychology), Licensed Psychologist · www.whynotyoupsy.com")}</p>
          <div style={{textAlign:"center",marginTop:"10px"}}><span style={{fontSize:"10px",color:"#ccc",fontFamily:"sans-serif"}}>11</span></div>
        </div>
      )}
    </div>
  );
}
