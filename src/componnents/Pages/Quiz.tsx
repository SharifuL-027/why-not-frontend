import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { QuizInstrument } from "../types/instrument";
import { fetchQuizConfig, submitAnswers } from "../api/instruments";

interface NormalizedQuestion {
  id: string;
  text_en: string;
  text_bn: string;
  scale: "likert5" | "likert4" | "likert5zero" | "yesno" | "multipleChoice";
  options_en?: string[];
  options_bn?: string[];
}

function normalizeQuestions(instrument: QuizInstrument): NormalizedQuestion[] {
  const { scoringType, data } = instrument;
  const list: NormalizedQuestion[] = [];

  if (scoringType === "vector_matching") {
    data.items.A.forEach((it: any) =>
      list.push({
        id: it.id,
        text_en: it.en || it.text_en || it.bn,
        text_bn: it.bn || it.text_bn || it.en,
        scale: "likert5",
      })
    );
    data.items.B.forEach((it: any) =>
      list.push({
        id: it.id,
        text_en: it.en || it.text_en || it.bn,
        text_bn: it.bn || it.text_bn || it.en,
        scale: "likert5",
      })
    );
    data.items.C.forEach((it: any) =>
      list.push({
        id: it.id,
        text_en: it.en || it.text_en || it.bn,
        text_bn: it.bn || it.text_bn || it.en,
        scale: "likert5",
      })
    );
    data.items.D.forEach((it: any) =>
      list.push({
        id: it.id,
        text_en: it.en || it.text_en || it.bn,
        text_bn: it.bn || it.text_bn || it.en,
        scale: "yesno",
      })
    );
    data.items.E.forEach((it: any) =>
      list.push({
        id: it.id,
        text_en: it.en || it.text_en || it.bn,
        text_bn: it.bn || it.text_bn || it.en,
        scale: "multipleChoice",
        options_en: it.options_en || it.options,
        options_bn: it.options || it.options_en,
      })
    );
  }

  if (scoringType === "sum_and_band") {
    data.items.forEach((it: any) =>
      list.push({
        id: String(it.id),
        text_en: it.text_en || it.en || it.text_bn,
        text_bn: it.text_bn || it.text_en || it.en,
        scale: "likert4",
      })
    );
  }

  if (scoringType === "domain_pomp_composite") {
    data.presentationOrder.forEach((code: string) => {
      const it = data.items.find((x: any) => x.id === code);
      if (it) {
        list.push({
          id: it.id,
          text_en: it.text_en || it.en || it.text_bn,
          text_bn: it.text_bn || it.text_en || it.en,
          scale: "likert5zero",
        });
      }
    });
  }

  if (scoringType === "domain_mean_average") {
    data.presentationOrder.forEach((code: string) => {
      const it = data.items.find((x: any) => x.id === code);
      if (it) {
        list.push({
          id: it.id,
          text_en: it.text_en || it.en || it.text_bn,
          text_bn: it.text_bn || it.text_en || it.en,
          scale: "likert5",
        });
      }
    });
  }

  if (scoringType === "mcrrs_triage") {
    data.forms.M.items.forEach((it: any) =>
      list.push({
        id: it.id,
        text_en: it.text_en || it.en || it.text_bn,
        text_bn: it.text_bn || it.text_en || it.en,
        scale: "likert5",
      })
    );
  }

  return list;
}

// Global Layout Wrapper declared OUTSIDE component to prevent remounting and input focus loss
function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full min-h-screen flex flex-col bg-[#FAF7F2] lg:pl-[50px] pt-28 pb-20 px-4 sm:px-6">
      <div className="relative z-10 w-full max-w-3xl mx-auto flex-1 flex flex-col justify-center">
        {children}
      </div>
    </div>
  );
}

// Scale labels bilingual
const SCALE_LABELS = {
  likert5: {
    en: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
    bn: ["একেবারেই একমত নই", "একমত নই", "নিরপেক্ষ", "একমত", "সম্পূর্ণ একমত"],
  },
  likert4: {
    en: ["Never / Not at all", "Sometimes", "Often", "Almost Always"],
    bn: ["কখনো না / একেবারেই না", "মাঝে মাঝে", "প্রায়ই", "প্রায় সবসময়"],
  },
  likert5zero: {
    en: ["Never", "Rarely", "Sometimes", "Often", "Almost Always"],
    bn: ["কখনো না", "খুব কম", "মাঝে মাঝে", "প্রায়ই", "প্রায় সবসময়"],
  },
  yesno: {
    en: ["Yes", "No"],
    bn: ["হ্যাঁ", "না"],
  },
};

// Language Toggle Component declared outside Quiz to prevent re-creation
function LanguageToggle({
  lang,
  onToggle,
}: {
  lang: "en" | "bn";
  onToggle: (newLang: "en" | "bn") => void;
}) {
  return (
    <div className="flex items-center gap-2 select-none">
      <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A8691]">
        {lang === "en" ? "Language:" : "ভাষা:"}
      </span>
      <div className="flex items-center gap-1 bg-white p-1 border border-[#EAEFF0] rounded-sm shadow-xs">
        <button
          type="button"
          onClick={() => onToggle("en")}
          className={`px-3 py-1 text-xs font-bold rounded-sm transition-all cursor-pointer ${
            lang === "en"
              ? "bg-[#2C3338] text-white shadow-xs"
              : "text-[#7A8691] hover:text-[#2C3338] bg-transparent"
          }`}
        >
          EN
        </button>
        <button
          type="button"
          onClick={() => onToggle("bn")}
          className={`px-3 py-1 text-xs font-bold rounded-sm transition-all cursor-pointer ${
            lang === "bn"
              ? "bg-[#2C3338] text-white shadow-xs"
              : "text-[#7A8691] hover:text-[#2C3338] bg-transparent"
          }`}
        >
          বাংলা
        </button>
      </div>
    </div>
  );
}

export default function Quiz() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  // Language state (toggle between English and Bengali)
  const [lang, setLang] = useState<"en" | "bn">("en");

  const [instrument, setInstrument] = useState<QuizInstrument | null>(null);
  const [questions, setQuestions] = useState<NormalizedQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [cursor, setCursor] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Intake / Consent / Payment States
  const [hasStarted, setHasStarted] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);
  const [paymentAcknowledged, setPaymentAcknowledged] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("bKash");

  // Participant Information Form
  const [participantInfo, setParticipantInfo] = useState({
    name: "",
    email: "",
    age: "25-29",
    gender: "Prefer not to say",
    extra: {} as Record<string, any>,
  });

  // MCRRS-BD specific care module state
  const [careAnswers, setCareAnswers] = useState<Record<string, string>>({});
  const [careDone, setCareDone] = useState(false);

  useEffect(() => {
    if (!slug) return;
    fetchQuizConfig(slug).then((inst) => {
      setInstrument(inst);
      setQuestions(normalizeQuestions(inst));
      setLoading(false);
    });
  }, [slug]);

  const testName =
    lang === "en"
      ? instrument?.instrumentName?.en || instrument?.instrumentName?.bn || "Psychological Assessment"
      : instrument?.instrumentName?.bn || instrument?.instrumentName?.en || "মনস্তাত্ত্বিক মূল্যায়ন";
  const testFee = instrument?.price ?? 0;

  const isMcrrs = instrument?.scoringType === "mcrrs_triage";
  const careItems = isMcrrs ? instrument?.data?.careModule?.items || [] : [];
  const careAllAnswered = careItems.every((c: any) => careAnswers[c.id] !== undefined);

  // Validation
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(participantInfo.email.trim());
  const isNameValid = participantInfo.name.trim().length >= 2;
  const canStartAssessment =
    consentChecked && isEmailValid && isNameValid && paymentAcknowledged;

  const selectAnswer = (value: any) => {
    const q = questions[cursor];
    setAnswers((prev) => ({ ...prev, [q.id]: value }));
  };

  const submitFinal = async () => {
    setSubmitting(true);
    const finalAnswers = isMcrrs
      ? { ...answers, ...careAnswers, _form: "M" }
      : answers;

    const payloadPersonalInfo = {
      name: participantInfo.name.trim(),
      email: participantInfo.email.trim(),
      age: participantInfo.age,
      gender: participantInfo.gender,
      ...participantInfo.extra,
      paymentMethod: testFee > 0 ? paymentMethod : "Free",
      fee: testFee,
    };

    try {
      const result = await submitAnswers(
        slug!,
        finalAnswers,
        consentChecked,
        instrument?.data?.consent?.version || "v1",
        payloadPersonalInfo
      );

      setSubmitting(false);
      if (result.paymentRequired) {
        navigate(`/tests/${slug}/result/${result.responseId}?amount=${result.amount}`);
      } else {
        navigate(`/tests/${slug}/result/${result.responseId}`);
      }
    } catch (err) {
      setSubmitting(false);
      alert(lang === "en" ? "Submission error. Please ensure all answers are completed." : "সাবমিট করতে সমস্যা হয়েছে। সব প্রশ্নের উত্তর দিয়ে আবার চেষ্টা করুন।");
    }
  };

  const handleNext = async () => {
    if (cursor < questions.length - 1) {
      setCursor((c) => c + 1);
      return;
    }
    if (isMcrrs && !careDone) {
      setCareDone(true);
      return;
    }
    await submitFinal();
  };

  const handlePrev = () => {
    if (cursor > 0) {
      setCursor((c) => c - 1);
    }
  };

  // Loading State
  if (loading || !instrument) {
    return (
      <LayoutWrapper>
        <div className="flex flex-col items-center justify-center py-20">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="w-12 h-12 border-3 border-[#A38771] border-t-transparent rounded-full mb-6"
          />
          <p className="text-[#2C3338] font-serif font-bold tracking-widest uppercase text-sm">
            {lang === "en" ? "Loading Assessment Configuration..." : "মূল্যায়ন প্রস্তুতি চলছে..."}
          </p>
        </div>
      </LayoutWrapper>
    );
  }

  // =========================================================================
  // STEP 1: PRE-ASSESSMENT INTAKE, CONSENT & PAYMENT SCREEN
  // =========================================================================
  if (!hasStarted) {
    return (
      <LayoutWrapper>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white border border-[#EAEFF0] shadow-[0_10px_35px_rgba(0,0,0,0.04)] rounded-md overflow-hidden my-4"
        >
          {/* Header Banner: NAME OF THE TEST */}
          <div className="bg-[#FAF7F2] border-b border-[#EAEFF0] p-6 sm:p-10">
            <div className="flex justify-between items-start gap-4 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#5DBB4D]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#A38771]">
                  {lang === "en" ? "Official Assessment" : "মনস্তাত্ত্বিক মূল্যায়ন"}
                </span>
              </div>
              <LanguageToggle lang={lang} onToggle={setLang} />
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#2C3338] tracking-tight leading-snug mb-4">
              {testName}
            </h1>
            <div className="flex flex-wrap gap-3 text-xs text-[#596573] font-medium">
              <span className="px-3.5 py-1.5 bg-white border border-[#EAEFF0] rounded-sm">
                ⏱ {instrument.estimatedMinutes?.[0]}–{instrument.estimatedMinutes?.[1]} {lang === "en" ? "Minutes" : "মিনিট"}
              </span>
              <span className="px-3.5 py-1.5 bg-white border border-[#EAEFF0] rounded-sm">
                📝 {questions.length} {lang === "en" ? "Items" : "প্রশ্ন"}
              </span>
              <span className="px-3.5 py-1.5 bg-white border border-[#EAEFF0] rounded-sm font-semibold text-[#2C3338]">
                💳 {lang === "en" ? "Fee:" : "ফি:"} {testFee > 0 ? `৳ ${testFee}` : (lang === "en" ? "Free" : "বিনামূল্যে")}
              </span>
            </div>
          </div>

          <div className="p-6 sm:p-10 space-y-8">
            {/* 1. CONSENT OF THE PARTICIPANT */}
            <div className="border border-[#EAEFF0] rounded-sm p-6 bg-[#FAF7F2]/60">
              <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-[#A38771] mb-3 flex items-center gap-2">
                <span>01</span> {lang === "en" ? "CONSENT OF THE PARTICIPANT" : "অংশগ্রহণকারীর সম্মতি (CONSENT)"}
              </h2>
              <div className="text-xs sm:text-sm text-[#596573] leading-relaxed mb-5 space-y-2">
                {lang === "en" ? (
                  <>
                    <p>
                      This psychometric instrument is a standardized self-reflection screening tool.
                      It provides evidence-informed insight into your behavioural tendencies and is not a clinical or custodial diagnosis.
                    </p>
                    <p>
                      Your responses and contact details are handled with strict confidentiality.
                      Participation is voluntary and you may withdraw at any time prior to submission.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      এই মূল্যায়নটি একটি নির্ভরযোগ্য আত্ম-অনুসন্ধানমূলক টুল। এটি আপনার মানসিক ও আচরণগত প্রবণতা সম্পর্কে প্রাথমিক ধারণা দেয় এবং কোনো রোগ নির্ণয় বা আইনি রায় নয়।
                    </p>
                    <p>
                      আপনার দেওয়া প্রতিটি উত্তর ও যোগাযোগের তথ্য সম্পূর্ণ গোপন রাখা হবে। এতে অংশগ্রহণ সম্পূর্ণ ঐচ্ছিক এবং সাবমিট করার পূর্ব পর্যন্ত আপনি যেকোনো সময় থামতে পারেন।
                    </p>
                  </>
                )}
              </div>

              {/* Mandatory Consent Checkbox */}
              <label className="flex items-start gap-3.5 cursor-pointer select-none group bg-white border border-[#EAEFF0] p-4 rounded-sm hover:border-[#A38771] transition-colors">
                <input
                  type="checkbox"
                  id="consentCheckbox"
                  checked={consentChecked}
                  onChange={(e) => setConsentChecked(e.target.checked)}
                  className="mt-0.5 w-4 h-4 text-[#A38771] rounded border-gray-300 focus:ring-[#A38771] cursor-pointer"
                />
                <span className="text-xs sm:text-sm text-[#2C3338] font-medium leading-snug">
                  {lang === "en"
                    ? "I am 18 or older (or the participant’s parent/guardian), and I have read and agree to the above."
                    : "আমি নিশ্চিত করছি যে আমার বয়স ১৮ বছর বা তার বেশি (অথবা অভিভাবকের সম্মতিসহ অংশগ্রহণ করছি), এবং আমি উপরের শর্তাবলীর সাথে একমত।"}
                </span>
              </label>
            </div>

            {/* 2. INFORMATION OF THE PARTICIPANT */}
            <div className="border border-[#EAEFF0] rounded-sm p-6 bg-[#FAF7F2]/60">
              <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-[#A38771] mb-2 flex items-center gap-2">
                <span>02</span> {lang === "en" ? "INFORMATION OF THE PARTICIPANT" : "অংশগ্রহণকারীর তথ্য (INFORMATION)"}
              </h2>
              <p className="text-xs text-[#7A8691] mb-5">
                {lang === "en"
                  ? "(As per the questionnaire’s verification and reporting requirement)"
                  : "(প্রশ্নমালার প্রতিবেদন ও যাচাইকরণের জন্য আবশ্যক তথ্য)"}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Email Field */}
                <div className="sm:col-span-2">
                  <label htmlFor="p_email" className="block text-xs font-bold uppercase tracking-wider text-[#2C3338] mb-1.5">
                    1. {lang === "en" ? "Email Address" : "ইমেইল ঠিকানা"} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="p_email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={participantInfo.email}
                    onChange={(e) => {
                      const val = e.target.value;
                      setParticipantInfo((prev) => ({ ...prev, email: val }));
                    }}
                    placeholder={lang === "en" ? "e.g. participant@example.com" : "যেমন: example@gmail.com"}
                    className="w-full bg-white border border-[#EAEFF0] text-[#2C3338] text-sm px-4 py-3 outline-none focus:border-[#A38771] rounded-sm transition-colors"
                  />
                  <p className="text-[11px] text-[#7A8691] mt-1">
                    {lang === "en"
                      ? "Your assessment report will be delivered securely to this email."
                      : "আপনার মূল্যায়নের পূর্ণাঙ্গ রিপোর্ট এই ঠিকানায় পাঠানো হবে।"}
                  </p>
                </div>

                {/* Full Name Field */}
                <div>
                  <label htmlFor="p_name" className="block text-xs font-bold uppercase tracking-wider text-[#2C3338] mb-1.5">
                    2. {lang === "en" ? "Full Name" : "পুরো নাম"} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="p_name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={participantInfo.name}
                    onChange={(e) => {
                      const val = e.target.value;
                      setParticipantInfo((prev) => ({ ...prev, name: val }));
                    }}
                    placeholder={lang === "en" ? "Enter your name..." : "আপনার নাম লিখুন..."}
                    className="w-full bg-white border border-[#EAEFF0] text-[#2C3338] text-sm px-4 py-3 outline-none focus:border-[#A38771] rounded-sm transition-colors"
                  />
                </div>

                {/* Age Range */}
                <div>
                  <label htmlFor="p_age" className="block text-xs font-bold uppercase tracking-wider text-[#2C3338] mb-1.5">
                    3. {lang === "en" ? "Age Range" : "বয়সসীমা"} <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="p_age"
                    name="age"
                    value={participantInfo.age}
                    onChange={(e) => {
                      const val = e.target.value;
                      setParticipantInfo((prev) => ({ ...prev, age: val }));
                    }}
                    className="w-full bg-white border border-[#EAEFF0] text-[#2C3338] text-sm px-4 py-3 outline-none focus:border-[#A38771] rounded-sm transition-colors cursor-pointer"
                  >
                    <option value="18-24">18–24 {lang === "en" ? "years" : "বছর"}</option>
                    <option value="25-29">25–29 {lang === "en" ? "years" : "বছর"}</option>
                    <option value="30-34">30–34 {lang === "en" ? "years" : "বছর"}</option>
                    <option value="35-39">35–39 {lang === "en" ? "years" : "বছর"}</option>
                    <option value="40-49">40–49 {lang === "en" ? "years" : "বছর"}</option>
                    <option value="50+">50+ {lang === "en" ? "years" : "বছর"}</option>
                  </select>
                </div>

                {/* Gender */}
                <div>
                  <label htmlFor="p_gender" className="block text-xs font-bold uppercase tracking-wider text-[#2C3338] mb-1.5">
                    4. {lang === "en" ? "Gender" : "লিঙ্গ"}
                  </label>
                  <select
                    id="p_gender"
                    name="gender"
                    value={participantInfo.gender}
                    onChange={(e) => {
                      const val = e.target.value;
                      setParticipantInfo((prev) => ({ ...prev, gender: val }));
                    }}
                    className="w-full bg-white border border-[#EAEFF0] text-[#2C3338] text-sm px-4 py-3 outline-none focus:border-[#A38771] rounded-sm transition-colors cursor-pointer"
                  >
                    <option value="Female">{lang === "en" ? "Female" : "নারী"}</option>
                    <option value="Male">{lang === "en" ? "Male" : "পুরুষ"}</option>
                    <option value="Non-binary / Other">{lang === "en" ? "Other" : "অন্যান্য"}</option>
                    <option value="Prefer not to say">{lang === "en" ? "Prefer not to say" : "বলতে অনিচ্ছুক"}</option>
                  </select>
                </div>

                {/* Test-specific Demographic Helper if present */}
                {isMcrrs && (
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#2C3338] mb-1.5">
                      5. {lang === "en" ? "Relationship Duration" : "সম্পর্কের স্থিতিকাল"}
                    </label>
                    <select
                      onChange={(e) => {
                        const val = e.target.value;
                        setParticipantInfo((prev) => ({
                          ...prev,
                          extra: { ...prev.extra, duration_band: val },
                        }));
                      }}
                      defaultValue="1-3 years"
                      className="w-full bg-white border border-[#EAEFF0] text-[#2C3338] text-sm px-4 py-3 outline-none focus:border-[#A38771] rounded-sm transition-colors cursor-pointer"
                    >
                      <option value="Under 1 year">{lang === "en" ? "Under 1 year" : "১ বছরের কম"}</option>
                      <option value="1-3 years">{lang === "en" ? "1–3 years" : "১–৩ বছর"}</option>
                      <option value="3-5 years">{lang === "en" ? "3–5 years" : "৩–৫ বছর"}</option>
                      <option value="5-10 years">{lang === "en" ? "5–10 years" : "৫–১০ বছর"}</option>
                      <option value="10+ years">{lang === "en" ? "10+ years" : "১০+ বছর"}</option>
                    </select>
                  </div>
                )}
              </div>
            </div>

            {/* 3. PAYMENT */}
            <div className="border border-[#EAEFF0] rounded-sm p-6 bg-[#FAF7F2]/60">
              <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-[#A38771] mb-2 flex items-center gap-2">
                <span>03</span> {lang === "en" ? "PAYMENT" : "পেমেন্ট (PAYMENT)"}
              </h2>

              <div className="flex items-center justify-between py-3 border-b border-[#EAEFF0] mb-4">
                <span className="text-sm font-medium text-[#2C3338]">
                  {lang === "en" ? "Assessment Fee:" : "মূল্যায়ন ফি:"}
                </span>
                <span className="text-xl font-bold font-serif text-[#2C3338]">
                  {testFee > 0 ? `৳ ${testFee}` : (lang === "en" ? "Free (Subsidized)" : "বিনামূল্যে")}
                </span>
              </div>

              {/* Exact user requested notice in English and Bengali */}
              <p className="text-xs sm:text-sm text-[#596573] leading-relaxed mb-5 bg-white p-4 border border-[#EAEFF0] rounded-sm border-l-3 border-l-[#A38771]">
                {lang === "en"
                  ? `Fee: ৳${testFee}. Refundable only if the assessment has not been started. Payment records are kept separately as required by law. See Refund Policy.`
                  : `ফি: ৳${testFee}। মূল্যায়ন শুরু না হওয়া পর্যন্ত রিফান্ডযোগ্য। আইন অনুযায়ী পেমেন্ট রেকর্ড আলাদাভাবে সংরক্ষিত থাকে। রিফান্ড নীতিমালা দেখুন।`}
              </p>

              {testFee > 0 && (
                <div className="mb-5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#2C3338] mb-2">
                    {lang === "en" ? "Payment Method" : "পেমেন্ট মাধ্যম"}
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {["bKash", "Nagad", "Card"].map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setPaymentMethod(method)}
                        className={`py-3 px-2 border text-xs sm:text-sm font-bold uppercase tracking-wider rounded-sm transition-all ${
                          paymentMethod === method
                            ? "bg-[#2C3338] text-white border-[#2C3338] shadow-sm"
                            : "bg-white text-[#596573] border-[#EAEFF0] hover:border-[#A38771]"
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Payment Terms Checkbox */}
              <label className="flex items-start gap-3.5 cursor-pointer select-none group bg-white border border-[#EAEFF0] p-4 rounded-sm hover:border-[#A38771] transition-colors">
                <input
                  type="checkbox"
                  id="paymentCheckbox"
                  checked={paymentAcknowledged}
                  onChange={(e) => setPaymentAcknowledged(e.target.checked)}
                  className="mt-0.5 w-4 h-4 text-[#A38771] rounded border-gray-300 focus:ring-[#A38771] cursor-pointer"
                />
                <span className="text-xs sm:text-sm text-[#2C3338] font-medium leading-snug">
                  {lang === "en"
                    ? `I acknowledge the assessment fee (${testFee > 0 ? `৳${testFee}` : "Free"}), data retention regulations, and non-refundable commencement terms.`
                    : `আমি মূল্যায়ন ফি (${testFee > 0 ? `৳${testFee}` : "বিনামূল্যে"}), আইনগত তথ্য সংরক্ষণ নীতি এবং মূল্যায়ন শুরুর পর নন-রিফান্ডেবল শর্তাবলীতে সম্মতি দিচ্ছি।`}
                </span>
              </label>
            </div>

            {/* Validation Hint */}
            {!canStartAssessment && (
              <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 px-4 py-2.5 rounded-sm">
                {lang === "en"
                  ? "Please check the participant consent, enter a valid email & name, and acknowledge the fee terms to begin."
                  : "অনুগ্রহ করে সম্মতি দিন, সঠিক নাম ও ইমেইল ঠিকানা লিখুন এবং ফি-এর শর্তাবলীতে সম্মতি দিন।"}
              </p>
            )}

            {/* START BUTTON */}
            <button
              disabled={!canStartAssessment}
              onClick={() => setHasStarted(true)}
              className="w-full bg-[#2C3338] hover:bg-black disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-bold text-sm uppercase tracking-[0.2em] py-4 sm:py-5 transition-all duration-300 flex justify-center items-center gap-3 rounded-sm shadow-md"
            >
              <span>{lang === "en" ? "Begin Assessment" : "মূল্যায়ন শুরু করুন"}</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </motion.div>
      </LayoutWrapper>
    );
  }

  // =========================================================================
  // STEP 2: MCRRS CARE MODULE INTERLUDE (IF APPLICABLE)
  // =========================================================================
  if (isMcrrs && careDone) {
    return (
      <LayoutWrapper>
        <div className="w-full max-w-2xl mx-auto">
          <div className="flex justify-end mb-4">
            <LanguageToggle lang={lang} onToggle={setLang} />
          </div>

          <div className="bg-[#FAF7F2] p-5 mb-8 border-l-4 border-[#A38771] shadow-sm rounded-sm">
            <h3 className="text-base font-bold text-[#2C3338] mb-1">
              {lang === "en" ? "Safety & Wellbeing Check" : "সুরক্ষা ও মানসিক স্বাস্থ্য পরীক্ষা"}
            </h3>
            <p className="text-sm text-[#4A4A4A] leading-relaxed">
              {lang === "en"
                ? instrument.data.careModule?.note_en || "Just three brief questions remaining. These do not impact your compatibility score."
                : instrument.data.careModule?.note_bn || "আর মাত্র তিনটি প্রশ্ন। এগুলোর উত্তর আপনার স্কোরের কোনো অংশ হবে না।"}
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {careItems.map((c: any) => (
              <div key={c.id} className="bg-white border border-[#EAEFF0] p-6 sm:p-8 shadow-sm rounded-sm">
                <div className="text-base sm:text-lg font-serif text-[#2C3338] mb-6 leading-snug">
                  {lang === "en" ? c.text_en || c.text_bn : c.text_bn || c.text_en}
                </div>
                <div className="flex gap-3">
                  {[
                    { value: "yes", label: lang === "en" ? "Yes" : "হ্যাঁ" },
                    { value: "no", label: lang === "en" ? "No" : "না" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setCareAnswers((prev) => ({ ...prev, [c.id]: opt.value }))}
                      className={`flex-1 py-3.5 px-4 border text-xs sm:text-sm font-bold uppercase tracking-wider rounded-sm transition-all ${
                        careAnswers[c.id] === opt.value
                          ? "bg-[#2C3338] text-white border-[#2C3338]"
                          : "bg-[#FAF7F2] text-[#2C3338] border-[#EAEFF0] hover:border-[#A38771]"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            disabled={!careAllAnswered || submitting}
            onClick={submitFinal}
            className="w-full mt-10 bg-[#2C3338] hover:bg-black disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold text-sm uppercase tracking-widest py-4 transition-all duration-300 rounded-sm"
          >
            {submitting ? (lang === "en" ? "Calculating Results..." : "ফলাফল তৈরি হচ্ছে...") : (lang === "en" ? "Submit Completed Assessment" : "সম্পূর্ণ মূল্যায়ন জমা দিন")}
          </button>
        </div>
      </LayoutWrapper>
    );
  }

  // =========================================================================
  // STEP 3: MAIN ASSESSMENT QUESTIONS UI (WITH EN / BN TOGGLE)
  // =========================================================================
  const q = questions[cursor];
  const progressPercent = Math.round(((cursor + 1) / questions.length) * 100);
  const currentAnswer = answers[q?.id];

  // Dynamic question text according to chosen language
  const currentQuestionText = lang === "en" ? q?.text_en : q?.text_bn;

  return (
    <LayoutWrapper>
      {/* Header Bar with EN / BN Toggle */}
      <div className="mb-6 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#7A8691]">
            <span>{testName}</span>
          </div>

          {/* Language Toggle Switch */}
          <LanguageToggle lang={lang} onToggle={setLang} />
        </div>

        <div className="flex justify-between items-center text-xs font-bold uppercase tracking-[0.2em] text-[#7A8691] mt-1">
          <span className="text-[#A38771]">
            {lang === "en"
              ? `Question ${cursor + 1} of ${questions.length}`
              : `প্রশ্ন ${cursor + 1} / ${questions.length}`}
          </span>
          <span className="text-[#596573] font-mono">{progressPercent}%</span>
        </div>

        {/* Visual Progress Bar */}
        <div className="w-full h-1.5 bg-[#EAEFF0] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#A38771] transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-white border border-[#EAEFF0] p-8 sm:p-12 md:p-16 shadow-[0_4px_25px_rgba(0,0,0,0.03)] w-full rounded-sm">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${cursor}-${lang}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            {/* Question Text in Selected Language */}
            <div className="text-xl sm:text-2xl md:text-3xl font-serif text-[#2C3338] mb-10 leading-snug">
              {currentQuestionText}
            </div>

            {/* Likert 5 Scales */}
            {q?.scale === "likert5" && (
              <div className="flex flex-col gap-3">
                <div className="flex gap-2 sm:gap-3">
                  {[1, 2, 3, 4, 5].map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => selectAnswer(v)}
                      className={`flex-1 py-4 border font-bold text-base sm:text-lg transition-colors rounded-sm ${
                        currentAnswer === v
                          ? "bg-[#2C3338] text-white border-[#2C3338] shadow-sm"
                          : "bg-[#FAF7F2] text-[#2C3338] border-[#EAEFF0] hover:border-[#A38771] hover:bg-white"
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between text-[11px] uppercase tracking-wider text-[#7A8691] font-semibold px-1">
                  <span>{SCALE_LABELS.likert5[lang][0]}</span>
                  <span>{SCALE_LABELS.likert5[lang][4]}</span>
                </div>
              </div>
            )}

            {/* Likert 4 Scales (FADSS) */}
            {q?.scale === "likert4" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[0, 1, 2, 3].map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => selectAnswer(v)}
                    className={`py-4 px-5 border text-left font-medium text-sm sm:text-base transition-colors rounded-sm flex items-center justify-between ${
                      currentAnswer === v
                        ? "bg-[#2C3338] text-white border-[#2C3338] shadow-sm font-bold"
                        : "bg-[#FAF7F2] text-[#2C3338] border-[#EAEFF0] hover:border-[#A38771] hover:bg-white"
                    }`}
                  >
                    <span>{SCALE_LABELS.likert4[lang][v]}</span>
                    <span className="font-mono text-xs opacity-70">[{v}]</span>
                  </button>
                ))}
              </div>
            )}

            {/* Likert 5 Zero (PCS-BD: 0 to 4) */}
            {q?.scale === "likert5zero" && (
              <div className="flex flex-col gap-3">
                <div className="flex gap-2 sm:gap-3">
                  {[0, 1, 2, 3, 4].map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => selectAnswer(v)}
                      className={`flex-1 py-4 border font-bold text-base sm:text-lg transition-colors rounded-sm ${
                        currentAnswer === v
                          ? "bg-[#2C3338] text-white border-[#2C3338] shadow-sm"
                          : "bg-[#FAF7F2] text-[#2C3338] border-[#EAEFF0] hover:border-[#A38771] hover:bg-white"
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between text-[11px] uppercase tracking-wider text-[#7A8691] font-semibold px-1">
                  <span>{SCALE_LABELS.likert5zero[lang][0]}</span>
                  <span>{SCALE_LABELS.likert5zero[lang][4]}</span>
                </div>
              </div>
            )}

            {/* Yes / No */}
            {q?.scale === "yesno" && (
              <div className="flex gap-4">
                {[0, 1].map((idx) => {
                  const val = idx === 0 ? "Yes" : "No";
                  const displayLabel = SCALE_LABELS.yesno[lang][idx];
                  return (
                    <button
                      key={val}
                      type="button"
                      onClick={() => selectAnswer(val)}
                      className={`flex-1 py-4 sm:py-5 border font-bold text-sm uppercase tracking-widest transition-colors rounded-sm ${
                        currentAnswer === val
                          ? "bg-[#2C3338] text-white border-[#2C3338] shadow-sm"
                          : "bg-[#FAF7F2] text-[#2C3338] border-[#EAEFF0] hover:border-[#A38771] hover:bg-white"
                      }`}
                    >
                      {displayLabel}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Multiple Choice (e.g. CFI Part E) */}
            {q?.scale === "multipleChoice" && (
              <div className="flex flex-col gap-3">
                {(lang === "en" ? q.options_en || q.options_bn : q.options_bn || q.options_en)?.map((opt, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => selectAnswer(i)}
                    className={`text-left px-6 py-4 border text-sm sm:text-base transition-colors rounded-sm flex items-center justify-between ${
                      currentAnswer === i
                        ? "bg-[#2C3338] text-white border-[#2C3338] shadow-sm font-semibold"
                        : "bg-[#FAF7F2] text-[#2C3338] border-[#EAEFF0] hover:border-[#A38771] hover:bg-white"
                    }`}
                  >
                    <span>{opt}</span>
                    <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-xs">
                      {currentAnswer === i ? "✓" : ""}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Bottom Navigation Buttons */}
        <div className="flex items-center justify-between mt-12 pt-8 border-t border-[#EAEFF0]">
          <button
            type="button"
            onClick={handlePrev}
            disabled={cursor === 0}
            className="px-6 py-3 border border-[#EAEFF0] text-[#596573] hover:text-[#2C3338] hover:border-[#2C3338] disabled:opacity-30 disabled:pointer-events-none text-xs font-bold uppercase tracking-widest rounded-sm transition-colors"
          >
            {lang === "en" ? "← Previous" : "← পূর্ববর্তী"}
          </button>

          <button
            type="button"
            disabled={currentAnswer === undefined || submitting}
            onClick={handleNext}
            className="px-8 py-3.5 bg-[#2C3338] hover:bg-black disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white text-xs font-bold uppercase tracking-widest rounded-sm transition-all shadow-sm"
          >
            {cursor === questions.length - 1
              ? submitting
                ? (lang === "en" ? "Submitting..." : "জমা হচ্ছে...")
                : (lang === "en" ? "Submit Assessment" : "মূল্যায়ন জমা দিন")
              : (lang === "en" ? "Next Item →" : "পরবর্তী প্রশ্ন →")}
          </button>
        </div>
      </div>
    </LayoutWrapper>
  );
}