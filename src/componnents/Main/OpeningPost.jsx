import React from "react";
import { motion } from "framer-motion";

const english = {
  lang: "en",
  label: "English",
  heading: "Know yourself. Change yourself.",
  intro:
    "Most people in Bangladesh who are struggling inside never ask for help. The National Mental Health Survey found that about one adult in six lives with a mental health condition, and more than nine in ten of them receive no treatment at all. Distance keeps some away and cost keeps others away. For many, the barrier is the fear of what people will say.",
  boxTitle: "Why Not You?",
  boxText:
    "Was built to remove those barriers. We are a Bangladeshi psychology platform led by a licensed psychologist. Anyone, from any district, can use it to understand their own mind, measure it with tested tools and talk to a trained professional, in Bangla or English, from a phone.",
  questionTitle: "Our name is a question we want every visitor to ask.",
  questionText:
    "Why should a calmer mind, a clearer sense of self or the right career belong only to someone else? Why not you?",
  pillars: [
    {
      title: "Understand your mind",
      text: "Our awareness articles explain stress, relationships, parenting and life online in plain language, written by psychologists for ordinary readers.",
    },
    {
      title: "Measure what matters",
      text: "Our psychological tests cover mental health, personality and career fit. Our intelligence tests serve six age bands, from age 11 to adulthood. You pay by card or mobile wallet, answer online and receive your result. Your answers stay confidential.",
    },
    {
      title: "Talk to someone qualified",
      text: "Our counsellors work with individuals, couples, adolescents and families, online or in person.",
    },
    {
      title: "Heal through art",
      text: "Our art therapy workshops use drawing, colour and creative work to help people express what is hard to say in words.",
    },
    {
      title: "Grow up well in a digital age",
      text: "Our New Generation page looks at what screens, social media and pressure are doing to young minds, and what parents and teachers can do about it.",
    },
    {
      title: "Hire the right people",
      text: "Organisations can use our selection and recruitment assessments, designed for Bangladeshi workplaces, for six job levels from support staff to general manager.",
    },
  ],
  ctaTitle: "Start where you are.",
  ctaText:
    "Read one article, take one test or book one conversation. The first step is small, and it can change a great deal.",
  ctaButton: "Book a Session",
  closing: "Why not you?",
};

const bangla = {
  lang: "bn",
  label: "বাংলা",
  heading: "নিজেকে জানুন, নিজেকে বদলান।",
  intro:
    "বাংলাদেশে মনের কষ্টে থাকা বেশিরভাগ মানুষ কখনো সাহায্য চান না। জাতীয় মানসিক স্বাস্থ্য জরিপ অনুযায়ী প্রতি ছয়জন প্রাপ্তবয়স্কের প্রায় একজন কোনো না কোনো মানসিক স্বাস্থ্য সমস্যায় ভুগছেন, আর তাঁদের দশজনের নয়জনেরও বেশি কোনো চিকিৎসাই পান না। কাউকে দূরত্ব আটকে রাখে, কাউকে খরচ। অনেকের কাছে সবচেয়ে বড় বাধা হলো লোকে কী বলবে সেই ভয়।",
  boxTitle: "হোয়াই নট ইউ?",
  boxText:
    "তৈরি হয়েছে এই বাধাগুলো সরিয়ে দিতে। এটি বাংলাদেশের একটি মনোবিজ্ঞানভিত্তিক প্ল্যাটফর্ম, যার নেতৃত্বে আছেন একজন লাইসেন্সপ্রাপ্ত মনোবিজ্ঞানী। দেশের যেকোনো জেলা থেকে, হাতের ফোনেই, বাংলা বা ইংরেজিতে, যে কেউ এখানে নিজের মনকে বুঝতে পারবেন, পরীক্ষিত পদ্ধতিতে তা যাচাই করতে পারবেন এবং একজন প্রশিক্ষিত পেশাজীবীর সঙ্গে কথা বলতে পারবেন।",
  questionTitle: "আমাদের নামটি আসলে একটি প্রশ্ন, যা আমরা চাই প্রত্যেকে নিজেকে করুক।",
  questionText:
    "শান্ত মন, নিজের প্রতি স্পষ্ট ধারণা কিংবা মানানসই একটি পেশা কেন শুধু অন্য কারও হবে? কেন আপনার নয়?",
  pillars: [
    {
      title: "মনকে বুঝুন",
      text: "আমাদের সচেতনতামূলক লেখায় মনোবিজ্ঞানীরা মানসিক চাপ, সম্পর্ক, সন্তান লালন-পালন আর অনলাইন জীবনের কথা সহজ ভাষায় লেখেন, সাধারণ পাঠকের জন্য।",
    },
    {
      title: "যা জরুরি তা যাচাই করুন",
      text: "আমাদের মনোবৈজ্ঞানিক পরীক্ষাগুলো মানসিক স্বাস্থ্য, ব্যক্তিত্ব ও পেশাগত উপযুক্ততা যাচাই করে। বুদ্ধিমত্তা পরীক্ষাগুলো ১১ বছর থেকে প্রাপ্তবয়স্ক পর্যন্ত ছয়টি বয়সভিত্তিক ভাগে সাজানো। কার্ড বা মোবাইল ওয়ালেটে ফি দিন, অনলাইনে উত্তর দিন, ফলাফল পেয়ে যান। আপনার উত্তর গোপন থাকে।",
    },
    {
      title: "যোগ্য কারও সঙ্গে কথা বলুন",
      text: "আমাদের কাউন্সেলররা ব্যক্তি, দম্পতি, কিশোর-কিশোরী ও পরিবারের সঙ্গে কাজ করেন, অনলাইনে অথবা সরাসরি।",
    },
    {
      title: "শিল্পের মাধ্যমে সুস্থতা",
      text: "আমাদের আর্ট থেরাপি কর্মশালায় আঁকা, রং আর সৃজনশীল কাজের মাধ্যমে মানুষ সেই কথাগুলো প্রকাশ করতে পারেন, যা মুখে বলা কঠিন।",
    },
    {
      title: "ডিজিটাল যুগে সুস্থভাবে বেড়ে ওঠা",
      text: "আমাদের নতুন প্রজন্ম পাতায় দেখা হয়েছে স্ক্রিন, সামাজিক মাধ্যম আর চাপ তরুণ মনের ওপর কী প্রভাব ফেলছে, আর বাবা-মা ও শিক্ষকেরা কী করতে পারেন।",
    },
    {
      title: "সঠিক মানুষ নিয়োগ দিন",
      text: "প্রতিষ্ঠানগুলো আমাদের নির্বাচন ও নিয়োগ মূল্যায়ন ব্যবহার করতে পারে। এগুলো বাংলাদেশের কর্মক্ষেত্রের জন্য তৈরি, সাপোর্ট স্টাফ থেকে জেনারেল ম্যানেজার পর্যন্ত ছয়টি পদস্তরের জন্য।",
    },
  ],
  ctaTitle: "যেখানে আছেন, সেখান থেকেই শুরু করুন।",
  ctaText:
    "একটি লেখা পড়ুন, একটি পরীক্ষা দিন অথবা একটি কাউন্সেলিং সেশন বুক করুন। প্রথম পদক্ষেপটি ছোট, কিন্তু তা অনেক কিছু বদলে দিতে পারে।",
  ctaButton: "সেশন বুক করুন",
  closing: "কেন আপনার নয়?",
};

function Part({ c }) {
  const isBn = c.lang === "bn";
  // Bangla script needs slightly more line height and no letter-spacing on caps-style labels
  const body = isBn ? "leading-loose" : "leading-relaxed";
  const label = isBn ? "tracking-normal" : "uppercase tracking-widest";

  return (
    <motion.div
      lang={c.lang}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto bg-white border border-[#EFECE5] shadow-sm p-8 sm:p-12 md:p-16 rounded-sm"
    >
      {/* Header */}
      <div className="mb-8 border-b border-[#EFECE5] pb-6">
        <span className="text-[#A38771] text-xs font-bold uppercase tracking-[0.2em] mb-2 block">
          Why Not You? · {c.label}
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif text-[#222222]">{c.heading}</h1>
      </div>

      {/* Body */}
      <div className={`space-y-6 text-[#222222] font-light ${body} text-base sm:text-lg`}>
        <p className="text-[#4A4A4A] border-l-2 border-[#A38771] pl-4">{c.intro}</p>

        {/* Platform highlight box */}
        <div className="bg-[#F9F6F0] p-6 sm:p-8 border border-[#EFECE5] rounded-sm my-8">
          <h3 className={`text-xl font-serif text-[#222222] mb-3 ${isBn ? "" : "uppercase tracking-wider"}`}>
            {c.boxTitle}
          </h3>
          <p className={`text-sm sm:text-base ${body}`}>{c.boxText}</p>
        </div>

        <div className="border-t border-[#EFECE5] pt-8 mt-8">
          <h3 className={`text-2xl font-serif text-[#222222] mb-4 ${isBn ? "leading-snug" : ""}`}>
            {c.questionTitle}
          </h3>
          <p className={`font-medium text-[#A38771] mb-6 ${body}`}>{c.questionText}</p>

          {/* Pillars */}
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {c.pillars.map((p) => (
              <li key={p.title} className="bg-[#F9F6F0] p-6 border border-[#EFECE5] rounded-sm">
                <h4 className={`font-bold text-xs ${label} text-[#A38771] mb-2 ${isBn ? "text-sm" : ""}`}>
                  {p.title}
                </h4>
                <p className={`text-sm text-[#4A4A4A] ${body}`}>{p.text}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="text-center pt-10 border-t border-[#EFECE5] mt-10">
          <h4 className="text-xl font-serif text-[#222222] mb-3">{c.ctaTitle}</h4>
          <p className={`text-sm text-[#4A4A4A] mb-6 ${body}`}>{c.ctaText}</p>
          <p className="font-serif text-2xl text-[#A38771] mb-6">{c.closing}</p>
          <a
            href="/counselling"
            className={`inline-block bg-[#222222] text-[#F9F6F0] font-bold text-xs ${label} px-10 py-4 rounded-sm hover:bg-[#A38771] transition-all duration-300 shadow-sm ${isBn ? "text-sm" : ""}`}
          >
            {c.ctaButton}
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function OpeningPost() {
  return (
    <section className="bg-[#F9F6F0] py-20 px-4 sm:px-6 font-sans space-y-12">
      <Part c={english} />
      <Part c={bangla} />
    </section>
  );
}