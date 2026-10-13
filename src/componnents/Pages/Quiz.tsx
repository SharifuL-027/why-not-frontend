import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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
    data.items.A.forEach((it: any) => list.push({ id: it.id, text_bn: it.en || it.bn, scale: "likert5" }));
    data.items.B.forEach((it: any) => list.push({ id: it.id, text_bn: it.en || it.bn, scale: "likert5" }));
    data.items.C.forEach((it: any) => list.push({ id: it.id, text_bn: it.en || it.bn, scale: "likert5" }));
    data.items.D.forEach((it: any) => list.push({ id: it.id, text_bn: it.en || it.bn, scale: "yesno" }));
    data.items.E.forEach((it: any) =>
      list.push({ id: it.id, text_bn: it.en || it.bn, scale: "multipleChoice", options: it.options })
    );
  }

  if (scoringType === "sum_and_band") {
    data.items.forEach((it: any) =>
      list.push({ id: String(it.id), text_bn: it.text_en || it.text_bn, scale: "likert4" })
    );
  }

  if (scoringType === "domain_pomp_composite") {
    data.presentationOrder.forEach((code: string) => {
      const it = data.items.find((x: any) => x.id === code);
      if (it) list.push({ id: it.id, text_bn: it.text_en || it.text_bn, scale: "likert5zero" });
    });
  }

  if (scoringType === "domain_mean_average") {
    data.presentationOrder.forEach((code: string) => {
      const it = data.items.find((x: any) => x.id === code);
      if (it) list.push({ id: it.id, text_bn: it.text_en || it.text_bn, scale: "likert5" });
    });
  }

  if (scoringType === "mcrrs_triage") {
    data.forms.M.items.forEach((it: any) =>
      list.push({ id: it.id, text_bn: it.text_en || it.text_bn, scale: "likert5" })
    );
  }

  return list;
}

const PCS_SCALE_LABELS_EN = ["Never", "Rarely", "Sometimes", "Often", "Almost Always"];

/**
 * Personal Info Form - Minimal Light Theme
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
    <div className="max-w-xl mx-auto my-10 p-8 sm:p-12 bg-white border border-[#EAEFF0] shadow-sm relative z-10 rounded-sm">
      <h2 className="text-2xl font-serif text-black mb-8 border-b border-[#EAEFF0] pb-4 flex items-center gap-3">
        Provide Your Details
      </h2>
      
      <div className="flex flex-col gap-6">
        {fields.map((f) => (
          <div key={f.key}>
            <label className="block text-xs uppercase tracking-widest text-black mb-2 font-bold">
              {f.label_en || f.label_bn}
            </label>
            {(f.type === "text" || f.type === "email") && (
              <input
                type={f.type}
                onChange={(e) => update(f.key, e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#EAEFF0] text-black px-4 py-3 outline-none focus:border-[#C8D0C0] transition-colors rounded-sm"
                placeholder="Enter details..."
              />
            )}
            {f.type === "singleChoice" && (
              <select
                onChange={(e) => update(f.key, e.target.value)}
                defaultValue=""
                className="w-full bg-[#FAF7F2] border border-[#EAEFF0] text-black px-4 py-3 outline-none focus:border-[#C8D0C0] transition-colors cursor-pointer appearance-none rounded-sm"
              >
                <option value="" disabled className="text-gray-400">Select an option</option>
                {f.options.map((opt: string) => (
                  <option key={opt} value={opt} className="bg-white text-black">{opt}</option>
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
                      className={`text-sm px-5 py-2.5 border transition-all duration-300 font-medium rounded-sm ${
                        isSel
                          ? "bg-[#C8D0C0] text-black border-[#C8D0C0] shadow-sm font-bold"
                          : "bg-[#FAF7F2] border-[#EAEFF0] text-black hover:border-[#C8D0C0] hover:bg-white"
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
        className="w-full mt-10 relative overflow-hidden bg-[#C8D0C0] hover:bg-[#b5bdad] disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-black font-bold text-base uppercase tracking-widest py-4 transition-all duration-300 flex justify-center items-center gap-3 border border-transparent rounded-sm"
      >
        <span className="relative z-10">Next Step</span>
      </button>
    </div>
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
  // Global Layout Wrapper (Clean Minimal Theme)
  // ==========================================
  const LayoutWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="relative w-full min-h-screen flex flex-col bg-[#FAF7F2] lg:pl-[50px] pt-32 pb-20 px-4 sm:px-6 overflow-hidden">
      <div className="relative z-10 w-full max-w-3xl mx-auto flex-1 flex flex-col justify-center">
        {children}
      </div>
    </div>
  );

  // Premium Loading
  if (loading || !instrument) {
    return (
      <LayoutWrapper>
        <div className="flex flex-col items-center justify-center">
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="w-10 h-10 border-2 border-[#D4BCA6] border-t-transparent rounded-full mb-6"
          />
          <p className="text-[#2C3338] font-bold tracking-[0.2em] uppercase text-sm">Preparing Assessment...</p>
        </div>
      </LayoutWrapper>
    );
  }

  // Step 0: Age gate
  const isMcrrs = instrument.scoringType === "mcrrs_triage";
  if (isMcrrs && !ageConfirmed) {
    return (
      <LayoutWrapper>
        <div className="bg-white p-8 sm:p-12 border border-[#EAEFF0] shadow-sm text-center rounded-sm">
          <h2 className="text-xl sm:text-2xl font-serif text-black mb-10 leading-relaxed">{instrument.data.ageGate.question_en || instrument.data.ageGate.question_bn}</h2>
          <div className="flex flex-col sm:flex-row gap-5">
            <button onClick={() => setAgeConfirmed(true)} className="flex-1 bg-[#C8D0C0] hover:bg-[#b5bdad] text-black font-bold py-4 uppercase tracking-widest transition-all rounded-sm">
              Yes, 18+
            </button>
            <button onClick={() => (window.location.href = "/")} className="flex-1 bg-[#FAF7F2] border border-[#EAEFF0] text-black hover:border-black font-bold py-4 uppercase tracking-widest transition-colors rounded-sm">
              No
            </button>
          </div>
        </div>
      </LayoutWrapper>
    );
  }

  // Step 1: Consent
  const consentRequired = instrument.data.consent?.required;
  if (consentRequired && !consentAck) {
    return (
      <LayoutWrapper>
        <div className="bg-white p-8 sm:p-12 border border-[#EAEFF0] shadow-sm rounded-sm">
          <h2 className="text-xl font-serif text-black mb-6 uppercase tracking-widest border-b border-[#EAEFF0] pb-4">Consent Required</h2>
          <p className="text-[#4A4A4A] font-light leading-relaxed mb-10 text-sm sm:text-base border-l-2 border-[#D4BCA6] pl-5">
            {instrument.data.consent.text_en || instrument.data.consent.text_bn}
          </p>
          <button onClick={() => setConsentAck(true)} className="w-full bg-[#C8D0C0] hover:bg-[#b5bdad] text-black font-bold text-sm uppercase tracking-widest py-4 transition-all duration-300 rounded-sm">
            I Consent — Start
          </button>
        </div>
      </LayoutWrapper>
    );
  }

  // Step 2a: Routing Question
  if (isMcrrs && routeChosen === null) {
    const rq = instrument.data.routingQuestion;
    return (
      <LayoutWrapper>
        <div className="bg-white p-8 sm:p-12 border border-[#EAEFF0] shadow-sm rounded-sm">
          <h2 className="text-xl sm:text-2xl font-serif text-black mb-8 leading-relaxed">{rq.text_en || rq.text_bn}</h2>
          <div className="flex flex-col gap-4">
            {rq.options.map((opt: any) => (
              <button
                key={opt.value}
                disabled={!opt.enabled}
                onClick={() => setRouteChosen(opt.value)}
                className={`text-left px-6 py-5 border text-sm sm:text-base transition-colors duration-300 rounded-sm ${
                  opt.enabled
                    ? "border-[#EAEFF0] bg-[#FAF7F2] text-black hover:border-[#C8D0C0] hover:bg-white font-medium"
                    : "border-[#EAEFF0] bg-[#FAF7F2]/50 text-gray-400 cursor-not-allowed"
                }`}
              >
                <span className="font-semibold block text-black">{opt.label_en || opt.label_bn}</span>
                {opt.note && <span className="text-gray-500 text-xs block mt-1 tracking-wide">{opt.note}</span>}
              </button>
            ))}
          </div>
        </div>
      </LayoutWrapper>
    );
  }

  // Step 2b: Personal Info
  const personalInfoFields = instrument.data.personalInfoFields || instrument.data.demographics;
  if (personalInfoFields && personalInfoFields.length > 0 && personalInfo === null) {
    return <LayoutWrapper><PersonalInfoForm fields={personalInfoFields} onDone={setPersonalInfo} /></LayoutWrapper>;
  }

  // Step 3 & 4: Quiz Logic
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

  // স্ক্রল ও অ্যানিমেশন ইফেক্ট সম্পূর্ণ মুছে ফেলা হয়েছে
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
  
  const prev = () => {
    if (cursor > 0) {
      setCursor((c) => c - 1);
    }
  };

  // Step 4: Care module screen
  if (isMcrrs && careDone) {
    return (
      <LayoutWrapper>
        <div className="w-full max-w-2xl mx-auto">
          <div className="bg-[#FAF7F2] p-5 mb-8 border-l-4 border-[#C8D0C0] shadow-sm rounded-sm">
            <p className="text-sm text-[#4A4A4A] font-medium leading-relaxed">{instrument.data.careModule.note_en || instrument.data.careModule.note_bn}</p>
          </div>
          <div className="flex flex-col gap-6">
            {careItems.map((c: any) => (
              <div key={c.id} className="bg-white border border-[#EAEFF0] p-6 sm:p-8 shadow-sm rounded-sm">
                <div className="text-lg font-serif text-black mb-6 leading-snug">{c.text_en || c.text_bn}</div>
                <div className="flex flex-wrap sm:flex-nowrap gap-3">
                  {instrument.data.careModule.answerOptions.map((opt: any) => (
                    <button
                      key={opt.value}
                      onClick={() => setCareAnswers((prev) => ({ ...prev, [c.id]: opt.value }))}
                      className={`flex-1 py-4 px-3 border text-xs sm:text-sm font-semibold transition-all duration-300 uppercase tracking-wider rounded-sm ${
                        careAnswers[c.id] === opt.value
                          ? "bg-[#C8D0C0] text-black border-[#C8D0C0] shadow-sm"
                          : "bg-[#FAF7F2] text-black border-[#EAEFF0] hover:border-[#C8D0C0] hover:bg-white"
                      }`}
                    >
                      {opt.label_en || opt.label_bn}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button 
            disabled={!careAllAnswered || submitting} 
            onClick={submitFinal} 
            className="w-full mt-10 bg-[#C8D0C0] hover:bg-[#b5bdad] disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-black font-bold text-sm uppercase tracking-widest py-4 transition-all duration-300 rounded-sm"
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </LayoutWrapper>
    );
  }

  // Step 3: Main Question UI
  return (
    <LayoutWrapper>
      
      {/* Progress Text */}
      <div className="flex justify-start items-end mb-6">
        <span className="text-[#D4BCA6] font-bold tracking-[0.2em] uppercase text-xs">
          Question {cursor + 1} / {questions.length}
        </span>
      </div>

      {/* ফ্ল্যাট ও ক্লিন ডিভ — কোনো অ্যানিমেশন বা রিফ্রেশ ইফেক্ট নেই */}
      <div className="bg-white border border-[#EAEFF0] p-8 sm:p-12 md:p-16 shadow-sm w-full rounded-sm">
        
        {/* Main Question Text */}
        <div className="text-2xl sm:text-3xl md:text-4xl font-serif text-black mb-12 leading-snug">
          {q.text_bn}
        </div>

        {/* Likert 5 */}
        {q.scale === "likert5" && (
          <div className="flex gap-2 sm:gap-3">
            {[1, 2, 3, 4, 5].map((v) => (
              <button
                key={v}
                onClick={() => selectAnswer(v)}
                className={`flex-1 aspect-square border font-bold text-lg transition-colors duration-200 rounded-sm ${
                  answers[q.id] === v
                    ? "bg-[#C8D0C0] text-black border-[#C8D0C0] shadow-sm"
                    : "bg-[#FAF7F2] text-[#4A4A4A] border-[#EAEFF0] hover:border-[#C8D0C0] hover:bg-white hover:text-black"
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
                className={`flex-1 aspect-square border font-bold text-lg transition-colors duration-200 rounded-sm ${
                  answers[q.id] === v
                    ? "bg-[#C8D0C0] text-black border-[#C8D0C0] shadow-sm"
                    : "bg-[#FAF7F2] text-[#4A4A4A] border-[#EAEFF0] hover:border-[#C8D0C0] hover:bg-white hover:text-black"
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
                  className={`flex-1 aspect-square border font-bold text-lg transition-colors duration-200 rounded-sm ${
                    answers[q.id] === v
                      ? "bg-[#C8D0C0] text-black border-[#C8D0C0] shadow-sm"
                      : "bg-[#FAF7F2] text-[#4A4A4A] border-[#EAEFF0] hover:border-[#C8D0C0] hover:bg-white hover:text-black"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
            <div className="flex justify-between text-xs text-[#4A4A4A] font-bold tracking-widest px-1 uppercase">
              <span>{PCS_SCALE_LABELS_EN[0]}</span>
              <span>{PCS_SCALE_LABELS_EN[4]}</span>
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
                className={`flex-1 py-4 sm:py-5 border font-bold uppercase tracking-widest transition-colors duration-200 rounded-sm ${
                  answers[q.id] === v
                    ? "bg-[#C8D0C0] text-black border-transparent shadow-sm"
                    : "bg-[#FAF7F2] text-[#4A4A4A] border-[#EAEFF0] hover:border-[#C8D0C0] hover:bg-white hover:text-black"
                }`}
              >
                {v}
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
                className={`text-left px-5 py-4 sm:py-5 border rounded-sm text-sm sm:text-base transition-colors duration-200 ${
                  answers[q.id] === i
                    ? "bg-[#C8D0C0] border-[#C8D0C0] text-black font-bold shadow-sm"
                    : "bg-[#FAF7F2] border-[#EAEFF0] text-[#4A4A4A] hover:border-[#C8D0C0] hover:bg-white hover:text-black"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        )}

        {/* Navigation Controls */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-[#EAEFF0]">
          <button
            disabled={cursor === 0}
            onClick={prev}
            className="px-4 py-2 text-sm font-bold uppercase tracking-widest text-[#4A4A4A] hover:text-black disabled:opacity-30 flex items-center gap-2 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>
          <button
            disabled={answers[q.id] === undefined || submitting}
            onClick={next}
            className="bg-[#C8D0C0] hover:bg-[#b5bdad] disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-black text-sm uppercase tracking-widest font-bold transition-all duration-200 flex items-center justify-center gap-2 px-8 py-3.5 rounded-sm"
          >
            <span>
              {submitting
                ? "Submitting..."
                : cursor === questions.length - 1
                ? "Submit"
                : "Next"}
            </span>
            {answers[q.id] !== undefined && !submitting && (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {cursor === questions.length - 1 ? (
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                ) : (
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                )}
              </svg>
            )}
          </button>
        </div>
      </div>
      
    </LayoutWrapper>
  );
}