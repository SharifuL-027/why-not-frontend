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
      className="max-w-xl mx-auto my-10 p-8 bg-[#132644] border border-[#3c5685]/50 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative z-10"
    >
      <h2 className="text-2xl font-serif text-white mb-6 border-b border-[#3c5685]/40 pb-4">আপনার তথ্য প্রদান করুন</h2>
      <div className="flex flex-col gap-5">
        {fields.map((f) => (
          <div key={f.key}>
            <label className="block text-xs uppercase tracking-widest text-[#ffba12] mb-2 font-medium">
              {f.label_bn || f.label_en}
            </label>
            {(f.type === "text" || f.type === "email") && (
              <input
                type={f.type}
                onChange={(e) => update(f.key, e.target.value)}
                className="w-full bg-[#0A1930] border border-[#3c5685] text-white px-4 py-3 outline-none focus:border-[#ffba12] transition-colors shadow-inner"
              />
            )}
            {f.type === "singleChoice" && (
              <select
                onChange={(e) => update(f.key, e.target.value)}
                defaultValue=""
                className="w-full bg-[#0A1930] border border-[#3c5685] text-white px-4 py-3 outline-none focus:border-[#ffba12] transition-colors cursor-pointer"
              >
                <option value="" disabled className="text-white/40">বাছাই করুন</option>
                {f.options.map((opt: string) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            )}
            {f.type === "multiSelect" && (
              <div className="flex flex-wrap gap-2">
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
                      className={`text-sm px-4 py-2 border transition-colors ${
                        isSel
                          ? "bg-[#ffba12] text-[#0A1930] border-[#ffba12] font-bold"
                          : "bg-[#0A1930] border-[#3c5685] text-white/70 hover:border-[#ffba12]/50"
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
        className="w-full bg-[#ffba12] hover:bg-white text-[#0A1930] font-bold text-sm uppercase tracking-widest py-4 mt-8 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-[0_0_15px_rgba(255,186,18,0.2)]"
      >
        পরবর্তী ধাপ →
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
    <div className="relative w-full min-h-screen flex flex-col bg-[#303133] lg:pl-[320px] pt-32 pb-20 px-4 sm:px-6">
      <div 
        className="absolute inset-0 z-10 opacity-10"
        style={{
          backgroundImage: "url('https://res.cloudinary.com/dsrs8hryx/image/upload/v1790162126/Gemini_Generated_Image_shc2z5shc2z5shc2.jpg_20260923171442_uwpltk.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0A1930]/90 via-[#0A1930]/80 to-[#0A1930]" />
      <div className="relative z-10 w-full max-w-2xl mx-auto flex-1 flex flex-col justify-center">
        {children}
      </div>
    </div>
  );

  // Premium Loading
  if (loading || !instrument) {
    return (
      <LayoutWrapper>
        <div className="flex flex-col items-center justify-center">
          <div className="w-12 h-12 border-2 border-[#3c5685] border-t-[#ffba12] animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-6 text-[#ffba12] tracking-[0.2em] uppercase text-sm font-medium">লোড হচ্ছে...</p>
        </div>
      </LayoutWrapper>
    );
  }

  // ধাপ ০: Age gate
  const isMcrrs = instrument.scoringType === "mcrrs_triage";
  if (isMcrrs && !ageConfirmed) {
    return (
      <LayoutWrapper>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#132644] p-8 sm:p-12 border border-[#3c5685]/50 shadow-[0_20px_50px_rgba(0,0,0,0.5)] text-center">
          <h2 className="text-xl sm:text-2xl font-serif text-white mb-8">{instrument.data.ageGate.question_bn}</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={() => setAgeConfirmed(true)} className="flex-1 bg-[#ffba12] hover:bg-white text-[#0A1930] font-bold py-4 uppercase tracking-wider transition-colors shadow-lg">
              হ্যাঁ, ১৮+
            </button>
            <button onClick={() => (window.location.href = "/")} className="flex-1 bg-transparent border border-[#3c5685] text-white/70 hover:bg-[#3c5685]/30 hover:text-white font-bold py-4 uppercase tracking-wider transition-colors">
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
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#132644] p-8 border border-[#3c5685]/50 shadow-2xl">
          <h2 className="text-xl font-serif text-[#ffba12] mb-4 uppercase tracking-wider border-b border-[#3c5685]/40 pb-3">সম্মতি প্রয়োজন</h2>
          <p className="text-white/80 leading-relaxed mb-8 lato-regular text-sm sm:text-base">
            {instrument.data.consent.text_bn}
          </p>
          <button onClick={() => setConsentAck(true)} className="w-full bg-[#ffba12] hover:bg-white text-[#0A1930] font-bold text-sm uppercase tracking-widest py-4 transition-colors shadow-[0_0_15px_rgba(255,186,18,0.2)]">
            আমি সম্মত আছি — শুরু করুন
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
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-[#132644] p-8 border border-[#3c5685]/50 shadow-2xl">
          <h2 className="text-xl font-serif text-white mb-6 leading-relaxed">{rq.text_bn}</h2>
          <div className="flex flex-col gap-3">
            {rq.options.map((opt: any) => (
              <button
                key={opt.value}
                disabled={!opt.enabled}
                onClick={() => setRouteChosen(opt.value)}
                className={`text-left px-5 py-4 border text-sm sm:text-base transition-colors ${
                  opt.enabled
                    ? "border-[#3c5685] bg-[#0A1930] text-white hover:border-[#ffba12] hover:bg-[#ffba12]/10"
                    : "border-[#3c5685]/30 bg-[#0A1930]/50 text-white/30 cursor-not-allowed"
                }`}
              >
                {opt.label_bn} {opt.note && <span className="text-white/50 text-xs block mt-1">({opt.note})</span>}
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
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full">
          <div className="bg-[#132644] p-4 mb-6 border-l-4 border-[#ffba12] shadow-md">
            <p className="text-sm text-white/80 font-medium">{instrument.data.careModule.note_bn}</p>
          </div>
          <div className="flex flex-col gap-5">
            {careItems.map((c: any) => (
              <div key={c.id} className="bg-[#132644] border border-[#3c5685]/50 p-6 shadow-lg">
                <div className="text-base font-serif text-white mb-4">{c.text_bn}</div>
                <div className="flex flex-wrap sm:flex-nowrap gap-3">
                  {instrument.data.careModule.answerOptions.map((opt: any) => (
                    <button
                      key={opt.value}
                      onClick={() => setCareAnswers((prev) => ({ ...prev, [c.id]: opt.value }))}
                      className={`flex-1 py-3 px-2 border text-xs sm:text-sm font-semibold transition-colors ${
                        careAnswers[c.id] === opt.value
                          ? "bg-[#ffba12] text-[#0A1930] border-[#ffba12]"
                          : "bg-[#0A1930] text-white/70 border-[#3c5685] hover:border-[#ffba12]/50"
                      }`}
                    >
                      {opt.label_bn}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button disabled={!careAllAnswered || submitting} onClick={submitFinal} className="w-full bg-[#ffba12] hover:bg-white text-[#0A1930] font-bold text-sm uppercase tracking-widest py-4 mt-8 disabled:opacity-30 transition-colors shadow-[0_0_15px_rgba(255,186,18,0.2)]">
            {submitting ? "জমা হচ্ছে..." : "শেষ করুন →"}
          </button>
        </motion.div>
      </LayoutWrapper>
    );
  }

  // ধাপ ৩: মূল প্রশ্ন UI (With Animation)
  return (
    <LayoutWrapper>
      
      {/* Progress Bar */}
      <div className="flex gap-1.5 mb-3 w-full">
        {questions.map((_, i) => (
          <div key={i} className="flex-1 h-1.5 bg-[#3c5685]/30 overflow-hidden">
            <motion.div 
              initial={false}
              animate={{ width: i <= cursor ? "100%" : "0%" }}
              className="h-full bg-[#ffba12]"
            />
          </div>
        ))}
      </div>
      
      <div className="flex justify-between items-end mb-6">
        <span className="text-[#ffba12] font-bold tracking-[0.2em] uppercase text-xs">
          প্রশ্ন {cursor + 1} <span className="text-white/40">/ {questions.length}</span>
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={cursor} // Trigger animation on question change
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-[#132644] border border-[#3c5685]/50 p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] w-full"
        >
          <div className="text-xl sm:text-2xl font-serif text-white mb-8 leading-snug drop-shadow-sm">
            {q.text_bn}
          </div>

          {/* Likert 5 */}
          {q.scale === "likert5" && (
            <div className="flex gap-2 sm:gap-3">
              {[1, 2, 3, 4, 5].map((v) => (
                <button
                  key={v}
                  onClick={() => selectAnswer(v)}
                  className={`flex-1 aspect-square border-2 font-bold text-lg transition-all duration-200 ${
                    answers[q.id] === v
                      ? "bg-[#ffba12] text-[#0A1930] border-[#ffba12] scale-105 shadow-[0_0_15px_rgba(255,186,18,0.3)]"
                      : "bg-[#0A1930] text-white/80 border-[#3c5685] hover:border-[#ffba12]/70 hover:bg-[#ffba12]/5"
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
                  className={`flex-1 aspect-square border-2 font-bold text-lg transition-all duration-200 ${
                    answers[q.id] === v
                      ? "bg-[#ffba12] text-[#0A1930] border-[#ffba12] scale-105 shadow-[0_0_15px_rgba(255,186,18,0.3)]"
                      : "bg-[#0A1930] text-white/80 border-[#3c5685] hover:border-[#ffba12]/70 hover:bg-[#ffba12]/5"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          )}

          {/* Likert 5 Zero with Labels */}
          {q.scale === "likert5zero" && (
            <div className="flex flex-col gap-3">
              <div className="flex gap-2 sm:gap-3">
                {[0, 1, 2, 3, 4].map((v) => (
                  <button
                    key={v}
                    onClick={() => selectAnswer(v)}
                    className={`flex-1 aspect-square border-2 font-bold text-lg transition-all duration-200 ${
                      answers[q.id] === v
                        ? "bg-[#ffba12] text-[#0A1930] border-[#ffba12] scale-105 shadow-[0_0_15px_rgba(255,186,18,0.3)]"
                        : "bg-[#0A1930] text-white/80 border-[#3c5685] hover:border-[#ffba12]/70 hover:bg-[#ffba12]/5"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
              <div className="flex justify-between text-xs text-white/40 font-medium tracking-wide px-1">
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
                  className={`flex-1 py-4 border-2 font-bold uppercase tracking-widest transition-all duration-200 ${
                    answers[q.id] === v
                      ? "bg-[#ffba12] text-[#0A1930] border-[#ffba12] shadow-[0_0_15px_rgba(255,186,18,0.3)]"
                      : "bg-[#0A1930] text-white/80 border-[#3c5685] hover:border-[#ffba12]/70"
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
                  className={`text-left px-5 py-4 border-2 text-sm sm:text-base transition-all duration-200 ${
                    answers[q.id] === i
                      ? "bg-[#ffba12]/10 border-[#ffba12] text-[#ffba12] font-bold"
                      : "bg-[#0A1930] border-[#3c5685] text-white/80 hover:border-[#ffba12]/50"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex justify-between items-center mt-10 pt-6 border-t border-[#3c5685]/40">
            <button
              disabled={cursor === 0}
              onClick={prev}
              className="px-4 py-2 text-sm font-semibold uppercase tracking-widest text-white/50 hover:text-[#ffba12] disabled:opacity-0 transition-colors"
            >
              ← আগের
            </button>
            <button
              disabled={answers[q.id] === undefined || submitting}
              onClick={next}
              className="px-8 py-3 bg-[#ffba12] hover:bg-white text-[#0A1930] text-sm uppercase tracking-widest font-bold disabled:opacity-30 disabled:bg-[#3c5685] disabled:text-white/50 transition-colors shadow-lg"
            >
              {submitting
                ? "জমা হচ্ছে..."
                : cursor === questions.length - 1
                ? "শেষ করুন →"
                : "পরের →"}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
      
    </LayoutWrapper>
  );
}