import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchAmBatteryQuiz, submitAmBatteryResponse } from "../api/amBatteryPublic";

type Stage = "loading" | "error" | "consent" | "quiz" | "submitting";

export default function AmBatteryQuiz() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [stage, setStage] = useState<Stage>("loading");
  const [error, setError] = useState("");
  const [config, setConfig] = useState<any>(null);

  const [consentAck, setConsentAck] = useState(false);
  const [candidateInfo, setCandidateInfo] = useState({
    name: "",
    applicantId: "",
    position: "",
    organisation: "",
  });

  const [instrumentIndex, setInstrumentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | number>>({});

  useEffect(() => {
    if (!slug) return;
    fetchAmBatteryQuiz(slug)
      .then((data) => {
        setConfig(data);
        setStage("consent");
      })
      .catch((err) => {
        setError(err.message || "এই মূল্যায়নটি পাওয়া যায়নি।");
        setStage("error");
      });
  }, [slug]);

  useEffect(() => {
    if (stage !== "quiz" || !config) return;
    const instruments: any[] = config.instruments || [];
    const allItems: any[] = config.items || [];
    const currentInstrument = instruments[instrumentIndex];
    if (!currentInstrument) return;
    const currentItems = allItems.filter((it) => it.instrumentKey === currentInstrument.key);
    const isLastInstrument = instrumentIndex === instruments.length - 1;
    if (currentItems.length === 0 && !isLastInstrument) {
      setInstrumentIndex((i) => i + 1);
    }
  }, [stage, instrumentIndex, config]);

  // ==========================================
  // Premium Leaf Loading Spinner
  // ==========================================
  if (stage === "loading") {
    return (
      <div className="relative w-full h-screen flex flex-col items-center justify-center bg-[#0A1930] lg:pl-[50px]">
        <div className="w-16 h-16 relative flex items-center justify-center animate-[spin_4s_linear_infinite]">
          <svg className="w-10 h-10 text-[#5DBB4D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M20 4C20 4 14 3 9 8C4 13 4 20 4 20C4 20 11 20 16 15C21 10 20 4 20 4ZM4 20L10 14" />
          </svg>
        </div>
        <p className="mt-6 text-transparent bg-gradient-to-r from-[#1A6BBA] to-[#5DBB4D] bg-clip-text font-bold tracking-[0.2em] uppercase text-sm">
          অ্যাসেসমেন্ট লোড হচ্ছে...
        </p>
      </div>
    );
  }

  // ==========================================
  // Premium Sharp Error State
  // ==========================================
  if (stage === "error") {
    return (
      <div className="relative w-full h-screen flex flex-col items-center justify-center bg-[#0A1930] lg:pl-[50px] px-4">
        <div className="bg-[#132644] border border-red-500/50 px-8 py-8 flex flex-col items-center gap-4 shadow-2xl">
          <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span className="text-white/80 font-serif text-lg tracking-wide">{error}</span>
        </div>
      </div>
    );
  }

  const instruments: any[] = config.instruments || [];
  const allItems: any[] = config.items || [];

  // ==========================================
  // Global Shared Background for Consent & Quiz
  // ==========================================
  const SharedBackground = () => (
    <>
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
      <div className="absolute inset-0 z-0 bg-[#0A1930]/80" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#1A6BBA]/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#5DBB4D]/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
    </>
  );

  /* ---------- Consent + Candidate-info screen ---------- */
  if (stage === "consent") {
    const canStart =
      (!config.consent?.required || consentAck) &&
      candidateInfo.name.trim() &&
      candidateInfo.position.trim();

    return (
      <div className="relative min-h-screen bg-[#0A1930] lg:pl-[50px] pt-24 pb-20 px-4 flex flex-col justify-center">
        <SharedBackground />
        
        <div className="w-full max-w-2xl mx-auto bg-[#132644]/90 backdrop-blur-md border border-[#3c5685]/40 p-8 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative z-10">
          
          <h1 className="text-3xl font-bold text-white mb-2 font-serif tracking-tight">{config.name?.bn}</h1>
          <div className="flex items-center gap-3 mb-8">
            <span className="bg-[#1A6BBA]/10 border border-[#1A6BBA]/40 text-[#5DBB4D] text-xs font-bold px-3 py-1 uppercase tracking-widest">
              Form {config.assignedForm}
            </span>
            <span className="bg-[#0A1930]/80 border border-[#3c5685]/60 text-white/70 text-xs font-bold px-3 py-1 uppercase tracking-widest">
              Version {config.version}
            </span>
          </div>

          {config.consent?.text_bn && (
            <div className="text-sm text-white/80 leading-relaxed mb-8 bg-[#0A1930]/60 border-l-2 border-[#5DBB4D] p-5">
              {config.consent.text_bn}
            </div>
          )}

          {/* Form Fields (Square & Sharp) */}
          <div className="space-y-6 mb-8">
            <div>
              <label className="block text-xs font-bold tracking-widest text-white/60 mb-2 uppercase">প্রার্থীর নাম *</label>
              <input
                value={candidateInfo.name}
                onChange={(e) => setCandidateInfo((c) => ({ ...c, name: e.target.value }))}
                className="w-full bg-[#0A1930]/50 border border-[#3c5685]/60 text-white px-4 py-3 focus:outline-none focus:border-[#5DBB4D] transition-colors"
                placeholder="আপনার পূর্ণ নাম লিখুন"
              />
            </div>
            <div>
              <label className="block text-xs font-bold tracking-widest text-white/60 mb-2 uppercase">পদের নাম *</label>
              <input
                value={candidateInfo.position}
                onChange={(e) => setCandidateInfo((c) => ({ ...c, position: e.target.value }))}
                className="w-full bg-[#0A1930]/50 border border-[#3c5685]/60 text-white px-4 py-3 focus:outline-none focus:border-[#5DBB4D] transition-colors"
                placeholder="যে পদের জন্য আবেদন করছেন"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold tracking-widest text-white/60 mb-2 uppercase">Applicant ID</label>
                <input
                  value={candidateInfo.applicantId}
                  onChange={(e) => setCandidateInfo((c) => ({ ...c, applicantId: e.target.value }))}
                  className="w-full bg-[#0A1930]/50 border border-[#3c5685]/60 text-white px-4 py-3 focus:outline-none focus:border-[#5DBB4D] transition-colors"
                  placeholder="যদি থাকে"
                />
              </div>
              <div>
                <label className="block text-xs font-bold tracking-widest text-white/60 mb-2 uppercase">প্রতিষ্ঠান</label>
                <input
                  value={candidateInfo.organisation}
                  onChange={(e) => setCandidateInfo((c) => ({ ...c, organisation: e.target.value }))}
                  className="w-full bg-[#0A1930]/50 border border-[#3c5685]/60 text-white px-4 py-3 focus:outline-none focus:border-[#5DBB4D] transition-colors"
                  placeholder="প্রতিষ্ঠানের নাম"
                />
              </div>
            </div>
          </div>

          {config.consent?.required && (
            <label className="flex items-start gap-3 text-sm text-white/70 mb-8 cursor-pointer group">
              <div className="relative flex items-center justify-center shrink-0 mt-0.5">
                <input
                  type="checkbox"
                  checked={consentAck}
                  onChange={(e) => setConsentAck(e.target.checked)}
                  className="peer appearance-none w-5 h-5 border border-[#3c5685] bg-[#0A1930] checked:bg-[#5DBB4D] checked:border-[#5DBB4D] transition-colors cursor-pointer"
                />
                <svg className="absolute w-3 h-3 text-[#0A1930] opacity-0 peer-checked:opacity-100 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="group-hover:text-white transition-colors">আমি উপরের তথ্য পড়েছি, বুঝেছি এবং স্বেচ্ছায় অংশগ্রহণে সম্মত আছি।</span>
            </label>
          )}

          <button
            disabled={!canStart}
            onClick={() => setStage("quiz")}
            className="w-full relative overflow-hidden bg-gradient-to-r from-[#1A6BBA] to-[#5DBB4D] disabled:from-[#3c5685] disabled:to-[#3c5685] disabled:text-white/40 disabled:cursor-not-allowed text-white font-bold text-lg py-4 px-10 shadow-[0_10px_30px_rgba(26,107,186,0.3)] hover:shadow-[0_10px_40px_rgba(93,187,77,0.5)] transition-all duration-300 flex justify-center items-center gap-3 group uppercase tracking-widest border border-transparent"
          >
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300"></div>
            <span className="relative z-10">শুরু করুন</span>
            {canStart && (
              <svg className="w-5 h-5 relative z-10 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M20 4C20 4 14 3 9 8C4 13 4 20 4 20C4 20 11 20 16 15C21 10 20 4 20 4ZM4 20L10 14" />
              </svg>
            )}
          </button>
        </div>
      </div>
    );
  }

  /* ---------- Quiz: one instrument at a time ---------- */
  const currentInstrument = instruments[instrumentIndex];
  const currentItems = allItems.filter((it) => it.instrumentKey === currentInstrument.key);
  const isLastInstrument = instrumentIndex === instruments.length - 1;
  const allAnswered = currentItems.length > 0 && currentItems.every((it) => answers[it.id] !== undefined);

  const setAnswer = (itemId: string, value: string | number) => {
    setAnswers((a) => ({ ...a, [itemId]: value }));
  };

  const handleNext = async () => {
    if (!isLastInstrument) {
      setInstrumentIndex((i) => i + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    // Last instrument -> submit
    if (!slug) return;
    setStage("submitting");
    try {
      const res = await submitAmBatteryResponse(slug, {
        assignedForm: config.assignedForm,
        answers,
        candidateInfo,
        consentAck,
      });
      navigate(`/selection/${slug}/result/${res.responseId}`);
    } catch (err: any) {
      alert(err.message || "জমা দেওয়া যায়নি। আবার চেষ্টা করুন।");
      setStage("quiz");
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0A1930] overflow-x-hidden lg:pl-12.5 pt-24 pb-24 px-4 sm:px-6">
      <SharedBackground />
      
      <div className="max-w-3xl mx-auto relative z-10">
        
        {/* Progress Bar (Square & Gradient) */}
        <div className="mb-8 bg-[#132644]/80 p-4 border border-[#3c5685]/40 backdrop-blur-sm">
          <div className="flex justify-between text-xs font-bold tracking-widest uppercase text-white/60 mb-3">
            <span>
              পার্ট {instrumentIndex + 1} / {instruments.length}: <span className="text-[#5DBB4D]">{currentInstrument.name_bn}</span>
            </span>
            <span className="text-[#1A6BBA]">{Math.round(((instrumentIndex + 1) / instruments.length) * 100)}%</span>
          </div>
          <div className="h-1.5 bg-[#0A1930] border border-[#3c5685]/40 overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-[#1A6BBA] to-[#5DBB4D] transition-all duration-500 ease-out"
              style={{ width: `${((instrumentIndex + 1) / instruments.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Section Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 font-serif tracking-tight flex items-center gap-3">
          <svg className="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="url(#leafGrad)">
            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          {currentInstrument.name_bn}
        </h2>

        {/* Empty Items Warning */}
        {currentItems.length === 0 && (
          <div className="bg-[#ffba12]/10 border border-[#ffba12]/40 text-[#ffba12] p-5 text-sm font-medium mb-6">
            এই অংশে এখনো কোনো প্রশ্ন যোগ করা হয়নি। অ্যাডমিনকে জানান।
          </div>
        )}

        {/* Questions Area */}
        <div className="space-y-6">
          {currentItems.map((it, index) => (
            <div key={it.id} className="bg-[#132644]/90 backdrop-blur-md border border-[#3c5685]/40 p-6 sm:p-8 hover:border-[#5DBB4D]/30 transition-colors">
              <div className="flex gap-4">
                <span className="text-[#5DBB4D] font-serif font-bold text-xl">{index + 1}.</span>
                <div className="w-full">
                  <p className="text-base sm:text-lg text-white/90 mb-6 leading-relaxed lato-regular">{it.text_bn}</p>

                  {/* Likert Scale (5 Options) */}
                  {it.format === "likert_5" ? (
                    <div className="flex justify-between gap-2 sm:gap-3">
                      {[1, 2, 3, 4, 5].map((v) => {
                        const isSelected = answers[it.id] === v;
                        return (
                          <button
                            key={v}
                            onClick={() => setAnswer(it.id, v)}
                            className={`flex-1 py-3 sm:py-4 text-sm sm:text-base font-bold transition-all duration-200 border ${
                              isSelected
                                ? "bg-gradient-to-r from-[#1A6BBA] to-[#5DBB4D] text-[#0A1930] border-transparent shadow-[0_0_15px_rgba(93,187,77,0.4)]"
                                : "bg-[#0A1930] border-[#3c5685]/60 text-white/70 hover:border-[#5DBB4D]/60 hover:text-white"
                            }`}
                          >
                            {v}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    /* Multiple Choice Options */
                    <div className="flex flex-col gap-3">
                      {(it.options || []).map((opt: any) => {
                        const isSelected = answers[it.id] === opt.id;
                        return (
                          <button
                            key={opt.id}
                            onClick={() => setAnswer(it.id, opt.id)}
                            className={`text-left px-5 py-4 text-sm sm:text-base transition-all duration-200 border flex items-center gap-4 ${
                              isSelected
                                ? "bg-gradient-to-r from-[#1A6BBA]/20 to-[#5DBB4D]/20 border-[#5DBB4D] text-white font-bold"
                                : "bg-[#0A1930] border-[#3c5685]/50 text-white/70 hover:border-[#5DBB4D]/50 hover:bg-[#132644] hover:text-white"
                            }`}
                          >
                            {/* Custom Checkbox/Radio Indicator */}
                            <div className={`shrink-0 w-5 h-5 border flex items-center justify-center transition-colors ${
                              isSelected ? 'border-[#5DBB4D] bg-[#5DBB4D]' : 'border-[#3c5685]'
                            }`}>
                              {isSelected && (
                                <svg className="w-3.5 h-3.5 text-[#0A1930]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                            <span>{opt.text_bn}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-10 border-t border-[#3c5685]/40 pt-8">
          <button
            disabled={instrumentIndex === 0}
            onClick={() => setInstrumentIndex((i) => Math.max(0, i - 1))}
            className="text-white/50 hover:text-white text-sm font-bold tracking-widest uppercase disabled:opacity-30 flex items-center gap-2 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            পেছনে
          </button>
          
          <button
            disabled={!allAnswered || stage === "submitting"}
            onClick={handleNext}
            className="relative overflow-hidden bg-gradient-to-r from-[#1A6BBA] to-[#5DBB4D] disabled:from-[#3c5685] disabled:to-[#3c5685] disabled:text-white/40 disabled:cursor-not-allowed text-white font-bold px-8 py-3.5 shadow-[0_5px_20px_rgba(26,107,186,0.3)] transition-all duration-300 flex justify-center items-center gap-3 group uppercase tracking-widest border border-transparent"
          >
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300"></div>
            <span className="relative z-10">
              {stage === "submitting" ? "জমা হচ্ছে..." : isLastInstrument ? "জমা দিন" : "পরবর্তী"}
            </span>
            {(!isLastInstrument && allAnswered && stage !== "submitting") && (
              <svg className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
            {(isLastInstrument && allAnswered && stage !== "submitting") && (
              <svg className="w-5 h-5 relative z-10 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M20 4C20 4 14 3 9 8C4 13 4 20 4 20C4 20 11 20 16 15C21 10 20 4 20 4ZM4 20L10 14" />
              </svg>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}