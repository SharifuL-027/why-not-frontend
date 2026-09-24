import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { QuizInstrument } from "../types/instrument";
import { fetchQuizConfig, submitAnswers } from "../api/instruments";

interface NormalizedQuestion {
  id: string;
  text_bn: string;
  scale: "likert5" | "likert4" | "likert5zero" | "yesno" | "multipleChoice";
  options?: string[];
}

function normalizeQuestions(instrument: QuizInstrument): NormalizedQuestion[] {
  const { scoringType, data } = instrument;
  const list: NormalizedQuestion[] = [];

  if (scoringType === "vector_matching") {
    data.items.A.forEach((it: any) => list.push({ id: it.id, text_bn: it.bn, scale: "likert5" }));
    data.items.B.forEach((it: any) => list.push({ id: it.id, text_bn: it.bn, scale: "likert5" }));
    data.items.C.forEach((it: any) => list.push({ id: it.id, text_bn: it.bn, scale: "likert5" }));
    data.items.D.forEach((it: any) => list.push({ id: it.id, text_bn: it.bn, scale: "yesno" }));
    data.items.E.forEach((it: any) =>
      list.push({ id: it.id, text_bn: it.bn, scale: "multipleChoice", options: it.options })
    );
  }

  if (scoringType === "sum_and_band") {
    data.items.forEach((it: any) =>
      list.push({ id: String(it.id), text_bn: it.text_bn, scale: "likert4" })
    );
  }

  if (scoringType === "domain_pomp_composite") {
    data.presentationOrder.forEach((code: string) => {
      const it = data.items.find((x: any) => x.id === code);
      if (it) list.push({ id: it.id, text_bn: it.text_bn || it.text_en, scale: "likert5zero" });
    });
  }

  if (scoringType === "domain_mean_average") {
    data.presentationOrder.forEach((code: string) => {
      const it = data.items.find((x: any) => x.id === code);
      if (it) list.push({ id: it.id, text_bn: it.text_bn || it.text_en, scale: "likert5" });
    });
  }

  if (scoringType === "mcrrs_triage") {
    data.forms.M.items.forEach((it: any) =>
      list.push({ id: it.id, text_bn: it.text_bn || it.text_en, scale: "likert5" })
    );
  }

  return list;
}

const PCS_SCALE_LABELS_BN = ["কখনো না", "খুব কম", "মাঝে মাঝে", "প্রায়ই", "প্রায় সবসময়"];

/**
 * Personal Info Form - Premium Dark Mode
 */
function PersonalInfoForm({
  fields,
  onDone,
}: {
  fields: any[];
  onDone: (info: Record<string, any>) => void;
}) {
  const [info, setInfo] = useState<Record<string, any>>({});
  const update = (key: string, value: any) => setInfo((prev) => ({ ...prev, [key]: value }));
  const allRequiredFilled = fields.every((f) => !f.required || info[f.key]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
      className="max-w-xl mx-auto my-10 p-8 sm:p-12 bg-[#132644]/90 backdrop-blur-md border border-[#3c5685]/50 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative z-10"
    >
      <h2 className="text-2xl font-serif text-white mb-8 border-b border-[#3c5685]/40 pb-4 flex items-center gap-3">
        <svg className="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="url(#leafGrad)">
          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2.5} d="M20 4C20 4 14 3 9 8C4 13 4 20 4 20C4 20 11 20 16 15C21 10 20 4 20 4ZM4 20L10 14" />
        </svg>
        আপনার তথ্য প্রদান করুন
      </h2>
      
      <div className="flex flex-col gap-6">
        {fields.map((f) => (
          <div key={f.key}>
            <label className="block text-xs uppercase tracking-widest text-[#5DBB4D] mb-2 font-bold">
              {f.label_bn || f.label_en}
            </label>
            {(f.type === "text" || f.type === "email") && (
              <input
                type={f.type}
                onChange={(e) => update(f.key, e.target.value)}
                className="w-full bg-[#0A1930]/80 border border-[#3c5685]/60 text-white px-4 py-3 outline-none focus:border-[#5DBB4D] transition-colors"
                placeholder="লিখুন..."
              />
            )}
            {f.type === "singleChoice" && (
              <select
                onChange={(e) => update(f.key, e.target.value)}
                defaultValue=""
                className="w-full bg-[#0A1930]/80 border border-[#3c5685]/60 text-white px-4 py-3 outline-none focus:border-[#5DBB4D] transition-colors cursor-pointer appearance-none"
              >
                <option value="" disabled className="text-white/40">বাছাই করুন</option>
                {f.options.map((opt: string) => (
                  <option key={opt} value={opt} className="bg-[#132644] text-white">{opt}</option>
                ))}
              </select>
            )}
            {f.type === "multiSelect" && (
              <div className="flex flex-wrap gap-3">
                {f.options.map((opt: string) => {
                  const selected: string[] = info[f.key] || [];
                  const isSel = selected.includes(opt);
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() =>
                        update(
                          f.key,
                          isSel ? selected.filter((s) => s !== opt) : [...selected, opt]
                        )
                      }
                      className={`text-sm px-5 py-2.5 border transition-all duration-300 font-medium ${
                        isSel
                          ? "bg-[#1A6BBA]/20 text-[#5DBB4D] border-[#5DBB4D] shadow-[0_0_15px_rgba(93,187,77,0.2)]"
                          : "bg-[#0A1930] border-[#3c5685]/60 text-white/70 hover:border-[#5DBB4D]/50 hover:text-white"
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        disabled={!allRequiredFilled}
        onClick={() => onDone(info)}
        className="w-full mt-10 relative overflow-hidden bg-gradient-to-r from-[#1A6BBA] to-[#5DBB4D] disabled:from-[#3c5685] disabled:to-[#3c5685] disabled:text-white/40 disabled:cursor-not-allowed text-white font-bold text-base uppercase tracking-widest py-4 transition-all duration-300 flex justify-center items-center gap-3 group border border-transparent shadow-[0_5px_20px_rgba(26,107,186,0.3)] hover:shadow-[0_10px_30px_rgba(93,187,77,0.5)]"
      >
        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300"></div>
        <span className="relative z-10">পরবর্তী ধাপ</span>
        {allRequiredFilled && (
          <svg className="w-5 h-5 relative z-10 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        )}
      </button>
    </motion.div>
  );
}

export default function Quiz() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [instrument, setInstrument] = useState<QuizInstrument | null>(null);
  const [questions, setQuestions] = useState<NormalizedQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [personalInfo, setPersonalInfo] = useState<Record<string, any> | null>(null);
  const [cursor, setCursor] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [consentAck, setConsentAck] = useState(false);
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [routeChosen, setRouteChosen] = useState<string | null>(null);
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

  // ==========================================
  // Global Layout Wrapper for Premium Background
  // ==========================================
  const LayoutWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="relative w-full min-h-screen flex flex-col bg-[#0A1930] lg:pl-[50px] pt-32 pb-20 px-4 sm:px-6 overflow-hidden">
      
      {/* SVG Definitions for Global Blue-Green Gradient */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1A6BBA" />
            <stop offset="100%" stopColor="#5DBB4D" />
          </linearGradient>
        </defs>
      </svg>

      <div 
        className="absolute inset-0 z-0 opacity-15"
        style={{
          backgroundImage: "url('/watermarked_img_4680048593054709329.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0A1930]/90 via-[#0A1930]/80 to-[#0A1930]" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#1A6BBA]/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#5DBB4D]/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      
      <div className="relative z-10 w-full max-w-3xl mx-auto flex-1 flex flex-col justify-center">
        {children}
      </div>
    </div>
  );

  // Premium Leaf Loading
  if (loading || !instrument) {
    return (
      <LayoutWrapper>
        <div className="flex flex-col items-center justify-center">
          <div className="w-16 h-16 relative flex items-center justify-center animate-[spin_4s_linear_infinite]">
            <svg className="w-10 h-10 text-[#5DBB4D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M20 4C20 4 14 3 9 8C4 13 4 20 4 20C4 20 11 20 16 15C21 10 20 4 20 4ZM4 20L10 14" />
            </svg>
          </div>
          <p className="mt-6 text-transparent bg-gradient-to-r from-[#1A6BBA] to-[#5DBB4D] bg-clip-text font-bold tracking-[0.2em] uppercase text-sm">লোড হচ্ছে...</p>
        </div>
      </LayoutWrapper>
    );
  }

  // ধাপ ০: Age gate
  const isMcrrs = instrument.scoringType === "mcrrs_triage";
  if (isMcrrs && !ageConfirmed) {
    return (
      <LayoutWrapper>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#132644]/90 backdrop-blur-md p-8 sm:p-12 border border-[#3c5685]/50 shadow-[0_20px_50px_rgba(0,0,0,0.5)] text-center">
          <h2 className="text-xl sm:text-2xl font-serif text-white mb-10 leading-relaxed">{instrument.data.ageGate.question_bn}</h2>
          <div className="flex flex-col sm:flex-row gap-5">
            <button onClick={() => setAgeConfirmed(true)} className="flex-1 bg-gradient-to-r from-[#1A6BBA] to-[#5DBB4D] text-white font-bold py-4 uppercase tracking-widest transition-all shadow-[0_5px_20px_rgba(93,187,77,0.3)] hover:shadow-[0_10px_30px_rgba(93,187,77,0.5)]">
              হ্যাঁ, ১৮+
            </button>
            <button onClick={() => (window.location.href = "/")} className="flex-1 bg-[#0A1930] border border-[#3c5685] text-white/70 hover:border-red-500/50 hover:text-red-400 font-bold py-4 uppercase tracking-widest transition-colors">
              না
            </button>
          </div>
        </motion.div>
      </LayoutWrapper>
    );
  }

  // ধাপ ১: সম্মতি
  const consentRequired = instrument.data.consent?.required;
  if (consentRequired && !consentAck) {
    return (
      <LayoutWrapper>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#132644]/90 backdrop-blur-md p-8 sm:p-12 border border-[#3c5685]/50 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <h2 className="text-xl font-serif text-transparent bg-gradient-to-r from-[#1A6BBA] to-[#5DBB4D] bg-clip-text mb-6 uppercase tracking-widest border-b border-[#3c5685]/40 pb-4">সম্মতি প্রয়োজন</h2>
          <p className="text-white/80 leading-relaxed mb-10 lato-regular text-sm sm:text-base border-l-2 border-[#5DBB4D] pl-4">
            {instrument.data.consent.text_bn}
          </p>
          <button onClick={() => setConsentAck(true)} className="w-full relative overflow-hidden bg-gradient-to-r from-[#1A6BBA] to-[#5DBB4D] text-white font-bold text-sm uppercase tracking-widest py-4 transition-all duration-300 flex justify-center items-center gap-3 group border border-transparent shadow-[0_10px_30px_rgba(26,107,186,0.3)]">
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300"></div>
            <span className="relative z-10">আমি সম্মত আছি — শুরু করুন</span>
            <svg className="w-5 h-5 relative z-10 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M20 4C20 4 14 3 9 8C4 13 4 20 4 20C4 20 11 20 16 15C21 10 20 4 20 4ZM4 20L10 14" />
            </svg>
          </button>
        </motion.div>
      </LayoutWrapper>
    );
  }

  // ধাপ ২ক: রাউটিং প্রশ্ন
  if (isMcrrs && routeChosen === null) {
    const rq = instrument.data.routingQuestion;
    return (
      <LayoutWrapper>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-[#132644]/90 backdrop-blur-md p-8 sm:p-12 border border-[#3c5685]/50 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <h2 className="text-xl sm:text-2xl font-serif text-white mb-8 leading-relaxed">{rq.text_bn}</h2>
          <div className="flex flex-col gap-4">
            {rq.options.map((opt: any) => (
              <button
                key={opt.value}
                disabled={!opt.enabled}
                onClick={() => setRouteChosen(opt.value)}
                className={`text-left px-6 py-5 border text-sm sm:text-base transition-colors duration-300 ${
                  opt.enabled
                    ? "border-[#3c5685] bg-[#0A1930]/80 text-white hover:border-[#5DBB4D] hover:bg-[#5DBB4D]/10 hover:text-[#5DBB4D]"
                    : "border-[#3c5685]/30 bg-[#0A1930]/50 text-white/30 cursor-not-allowed"
                }`}
              >
                <span className="font-semibold block">{opt.label_bn}</span>
                {opt.note && <span className="text-white/40 text-xs block mt-1 tracking-wide">{opt.note}</span>}
              </button>
            ))}
          </div>
        </motion.div>
      </LayoutWrapper>
    );
  }

  // ধাপ ২খ: ব্যক্তিগত তথ্য
  const personalInfoFields = instrument.data.personalInfoFields || instrument.data.demographics;
  if (personalInfoFields && personalInfoFields.length > 0 && personalInfo === null) {
    return <LayoutWrapper><PersonalInfoForm fields={personalInfoFields} onDone={setPersonalInfo} /></LayoutWrapper>;
  }

  // ধাপ ৩ ও ৪: কুইজ লজিক
  const q = questions[cursor];
  const selectAnswer = (value: any) => setAnswers((prev) => ({ ...prev, [q.id]: value }));
  const careItems = isMcrrs ? instrument.data.careModule.items : [];
  const careAllAnswered = careItems.every((c: any) => careAnswers[c.id] !== undefined);

  const submitFinal = async () => {
    setSubmitting(true);
    const finalAnswers = isMcrrs ? { ...answers, ...careAnswers, _form: routeChosen } : answers;
    const result = await submitAnswers(
      slug!, finalAnswers, consentAck, instrument.data.consent?.version, personalInfo ?? undefined
    );
    setSubmitting(false);
    if (result.paymentRequired) {
      navigate(`/tests/${slug}/payment/${result.responseId}?amount=${result.amount}`);
    } else {
      navigate(`/tests/${slug}/result/${result.responseId}`);
    }
  };

  const next = async () => {
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
  const prev = () => cursor > 0 && setCursor((c) => c - 1);

  // ধাপ ৪: Care module স্ক্রিন
  if (isMcrrs && careDone) {
    return (
      <LayoutWrapper>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-2xl mx-auto">
          <div className="bg-[#1A6BBA]/10 p-5 mb-8 border-l-4 border-[#5DBB4D] shadow-md backdrop-blur-sm">
            <p className="text-sm text-white/80 font-medium leading-relaxed">{instrument.data.careModule.note_bn}</p>
          </div>
          <div className="flex flex-col gap-6">
            {careItems.map((c: any) => (
              <div key={c.id} className="bg-[#132644]/90 backdrop-blur-md border border-[#3c5685]/50 p-6 sm:p-8 shadow-lg">
                <div className="text-lg font-serif text-white mb-6 leading-snug">{c.text_bn}</div>
                <div className="flex flex-wrap sm:flex-nowrap gap-3">
                  {instrument.data.careModule.answerOptions.map((opt: any) => (
                    <button
                      key={opt.value}
                      onClick={() => setCareAnswers((prev) => ({ ...prev, [c.id]: opt.value }))}
                      className={`flex-1 py-4 px-3 border text-xs sm:text-sm font-semibold transition-all duration-300 uppercase tracking-wider ${
                        careAnswers[c.id] === opt.value
                          ? "bg-gradient-to-r from-[#1A6BBA] to-[#5DBB4D] text-[#0A1930] border-transparent shadow-[0_0_15px_rgba(93,187,77,0.4)]"
                          : "bg-[#0A1930] text-white/70 border-[#3c5685] hover:border-[#5DBB4D]/60 hover:text-white"
                      }`}
                    >
                      {opt.label_bn}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button 
            disabled={!careAllAnswered || submitting} 
            onClick={submitFinal} 
            className="w-full mt-10 relative overflow-hidden bg-gradient-to-r from-[#1A6BBA] to-[#5DBB4D] disabled:from-[#3c5685] disabled:to-[#3c5685] disabled:text-white/40 disabled:cursor-not-allowed text-white font-bold text-sm uppercase tracking-widest py-4 transition-all duration-300 flex justify-center items-center gap-3 group border border-transparent shadow-[0_5px_20px_rgba(26,107,186,0.3)]"
          >
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300"></div>
            <span className="relative z-10">{submitting ? "জমা হচ্ছে..." : "শেষ করুন"}</span>
            {(!submitting && careAllAnswered) && (
              <svg className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            )}
          </button>
        </motion.div>
      </LayoutWrapper>
    );
  }

  // ধাপ ৩: মূল প্রশ্ন UI (With Animation)
  return (
    <LayoutWrapper>
      
      {/* Progress Bar (Square/Gradient) */}
      <div className="flex gap-1 mb-4 w-full">
        {questions.map((_, i) => (
          <div key={i} className="flex-1 h-1.5 bg-[#0A1930] border border-[#3c5685]/30 overflow-hidden">
            <motion.div 
              initial={false}
              animate={{ width: i <= cursor ? "100%" : "0%" }}
              className="h-full bg-gradient-to-r from-[#1A6BBA] to-[#5DBB4D]"
            />
          </div>
        ))}
      </div>
      
      <div className="flex justify-between items-end mb-8">
        <span className="text-[#5DBB4D] font-bold tracking-[0.2em] uppercase text-xs">
          প্রশ্ন {cursor + 1} <span className="text-white/30">/ {questions.length}</span>
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={cursor} // Trigger animation on question change
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-[#132644]/90 backdrop-blur-md border border-[#3c5685]/50 p-6 sm:p-10 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] w-full"
        >
          <div className="text-xl sm:text-2xl md:text-3xl font-serif text-white mb-10 leading-snug drop-shadow-sm">
            {q.text_bn}
          </div>

          {/* Likert 5 */}
          {q.scale === "likert5" && (
            <div className="flex gap-2 sm:gap-3">
              {[1, 2, 3, 4, 5].map((v) => (
                <button
                  key={v}
                  onClick={() => selectAnswer(v)}
                  className={`flex-1 aspect-square border font-bold text-lg transition-all duration-300 ${
                    answers[q.id] === v
                      ? "bg-linear-to-r from-[#1A6BBA] to-[#5DBB4D] text-[#0A1930] border-transparent scale-105 shadow-[0_0_20px_rgba(93,187,77,0.4)]"
                      : "bg-[#0A1930] text-white/80 border-[#3c5685]/60 hover:border-[#5DBB4D]/60 hover:bg-[#5DBB4D]/10 hover:text-white"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          )}

          {/* Likert 4 */}
          {q.scale === "likert4" && (
            <div className="flex gap-2 sm:gap-3">
              {[0, 1, 2, 3].map((v) => (
                <button
                  key={v}
                  onClick={() => selectAnswer(v)}
                  className={`flex-1 aspect-square border font-bold text-lg transition-all duration-300 ${
                    answers[q.id] === v
                      ? "bg-linear-to-r from-[#1A6BBA] to-[#5DBB4D] text-[#0A1930] border-transparent scale-105 shadow-[0_0_20px_rgba(93,187,77,0.4)]"
                      : "bg-[#0A1930] text-white/80 border-[#3c5685]/60 hover:border-[#5DBB4D]/60 hover:bg-[#5DBB4D]/10 hover:text-white"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          )}

          {/* Likert 5 Zero with Labels */}
          {q.scale === "likert5zero" && (
            <div className="flex flex-col gap-4">
              <div className="flex gap-2 sm:gap-3">
                {[0, 1, 2, 3, 4].map((v) => (
                  <button
                    key={v}
                    onClick={() => selectAnswer(v)}
                    className={`flex-1 aspect-square border font-bold text-lg transition-all duration-300 ${
                      answers[q.id] === v
                        ? "bg-linear-to-r from-[#1A6BBA] to-[#5DBB4D] text-[#0A1930] border-transparent scale-105 shadow-[0_0_20px_rgba(93,187,77,0.4)]"
                        : "bg-[#0A1930] text-white/80 border-[#3c5685]/60 hover:border-[#5DBB4D]/60 hover:bg-[#5DBB4D]/10 hover:text-white"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
              <div className="flex justify-between text-xs text-white/40 font-medium tracking-widest px-1 uppercase">
                <span>{PCS_SCALE_LABELS_BN[0]}</span>
                <span>{PCS_SCALE_LABELS_BN[4]}</span>
              </div>
            </div>
          )}

          {/* Yes / No */}
          {q.scale === "yesno" && (
            <div className="flex gap-4">
              {["Yes", "No"].map((v) => (
                <button
                  key={v}
                  onClick={() => selectAnswer(v)}
                  className={`flex-1 py-4 sm:py-5 border font-bold uppercase tracking-widest transition-all duration-300 ${
                    answers[q.id] === v
                      ? "bg-gradient-to-r from-[#1A6BBA] to-[#5DBB4D] text-[#0A1930] border-transparent shadow-[0_0_20px_rgba(93,187,77,0.4)]"
                      : "bg-[#0A1930] text-white/80 border-[#3c5685]/60 hover:border-[#5DBB4D]/60 hover:bg-[#5DBB4D]/10 hover:text-white"
                  }`}
                >
                  {v === "Yes" ? "হ্যাঁ" : "না"}
                </button>
              ))}
            </div>
          )}

          {/* Multiple Choice */}
          {q.scale === "multipleChoice" && q.options && (
            <div className="flex flex-col gap-3">
              {q.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => selectAnswer(i)}
                  className={`text-left px-5 py-4 sm:py-5 border text-sm sm:text-base transition-all duration-300 ${
                    answers[q.id] === i
                      ? "bg-gradient-to-r from-[#1A6BBA]/20 to-[#5DBB4D]/20 border-[#5DBB4D] text-[#5DBB4D] font-bold"
                      : "bg-[#0A1930] border-[#3c5685]/60 text-white/80 hover:border-[#5DBB4D]/50 hover:bg-[#132644] hover:text-white"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex justify-between items-center mt-12 pt-8 border-t border-[#3c5685]/40">
            <button
              disabled={cursor === 0}
              onClick={prev}
              className="px-4 py-2 text-sm font-bold uppercase tracking-widest text-white/40 hover:text-white disabled:opacity-0 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              আগের
            </button>
            <button
              disabled={answers[q.id] === undefined || submitting}
              onClick={next}
              className="relative overflow-hidden bg-gradient-to-r from-[#1A6BBA] to-[#5DBB4D] disabled:from-[#3c5685] disabled:to-[#3c5685] disabled:text-white/40 disabled:cursor-not-allowed text-white text-sm uppercase tracking-widest font-bold transition-all shadow-[0_5px_20px_rgba(26,107,186,0.3)] flex items-center justify-center gap-2 group px-8 py-3.5 border border-transparent"
            >
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300"></div>
              <span className="relative z-10">
                {submitting
                  ? "জমা হচ্ছে..."
                  : cursor === questions.length - 1
                  ? "শেষ করুন"
                  : "পরের"}
              </span>
              {answers[q.id] !== undefined && !submitting && (
                <svg className={`w-4 h-4 relative z-10 transition-transform duration-300 ${cursor === questions.length - 1 ? 'group-hover:rotate-12 group-hover:scale-110' : 'group-hover:translate-x-1'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {cursor === questions.length - 1 ? (
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  ) : (
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  )}
                </svg>
              )}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
      
    </LayoutWrapper>
  );
}