import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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
        setError(err.message || "Failed to load this assessment.");
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
  // Premium Leaf Loading Spinner (Light Theme)
  // ==========================================
  if (stage === "loading") {
    return (
      <div className="relative w-full h-screen flex flex-col items-center justify-center bg-[#FAF7F2] lg:pl-[50px]">
        <div className="w-16 h-16 relative flex items-center justify-center animate-[spin_4s_linear_infinite]">
          <svg className="w-10 h-10 text-[#5DBB4D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M20 4C20 4 14 3 9 8C4 13 4 20 4 20C4 20 11 20 16 15C21 10 20 4 20 4ZM4 20L10 14" />
          </svg>
        </div>
        <p className="mt-6 text-[#D4BCA6] font-bold tracking-[0.2em] uppercase text-sm">
          Loading assessment...
        </p>
      </div>
    );
  }

  // ==========================================
  // Premium Sharp Error State (Light Theme)
  // ==========================================
  if (stage === "error") {
    return (
      <div className="relative w-full h-screen flex flex-col items-center justify-center bg-[#FAF7F2] lg:pl-[50px] px-4">
        <div className="bg-white border border-[#C8D0C0]/80 px-8 py-8 flex flex-col items-center gap-4 shadow-sm">
          <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span className="text-[#596573] font-serif text-lg tracking-wide">{error}</span>
        </div>
      </div>
    );
  }

  const instruments: any[] = config.instruments || [];
  const allItems: any[] = config.items || [];

  // ==========================================
  // Global Shared Background for Consent & Quiz (Light Theme)
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
        className="absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage: "url('https://res.cloudinary.com/dsrs8hryx/image/upload/v1790752895/ghhfdhfghfdh_egesha.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#FAF7F2] via-[#FAF7F2]/80 to-[#FAF7F2]" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#EAEFF0]/80 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#F0EBE6]/80 rounded-full blur-[150px] pointer-events-none z-0"></div>
    </>
  );

  /* ---------- Consent + Candidate-info screen ---------- */
  if (stage === "consent") {
    const canStart =
      (!config.consent?.required || consentAck) &&
      candidateInfo.name.trim() &&
      candidateInfo.position.trim();

    return (
      <div className="relative min-h-screen bg-[#FAF7F2] lg:pl-[50px] pt-24 pb-20 px-4 flex flex-col justify-center">
        <SharedBackground />
        
        <div className="w-full max-w-2xl mx-auto bg-white/85 backdrop-blur-md border border-[#C8D0C0]/60 p-8 sm:p-12 shadow-[0_15px_40px_rgba(0,0,0,0.05)] relative z-10">
          
          <h1 className="text-3xl font-bold text-[#2C3338] mb-2 font-serif tracking-tight">{config.name?.en || config.name?.bn}</h1>
          <div className="flex items-center gap-3 mb-8">
            <span className="bg-[#C8D0C0] text-[#2C3338] text-xs font-bold px-3 py-1 uppercase tracking-widest">
              Form {config.assignedForm}
            </span>
            <span className="bg-[#FAF7F2] border border-[#C8D0C0]/60 text-[#596573] text-xs font-bold px-3 py-1 uppercase tracking-widest">
              Version {config.version}
            </span>
          </div>

          {(config.consent?.text_en || config.consent?.text_bn) && (
            <div className="text-sm text-[#596573] font-light leading-relaxed mb-8 bg-[#FAF7F2] border-l-2 border-[#D4BCA6] p-5">
              {config.consent.text_en || config.consent.text_bn}
            </div>
          )}

          {/* Form Fields (Square & Sharp) */}
          <div className="space-y-6 mb-8">
            <div>
              <label className="block text-xs font-bold tracking-widest text-[#596573] mb-2 uppercase">Candidate Name *</label>
              <input
                value={candidateInfo.name}
                onChange={(e) => setCandidateInfo((c) => ({ ...c, name: e.target.value }))}
                className="w-full bg-[#FAF7F2] border border-[#C8D0C0]/60 text-[#2C3338] px-4 py-3 focus:outline-none focus:border-[#D4BCA6] transition-colors"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block text-xs font-bold tracking-widest text-[#596573] mb-2 uppercase">Position Applied For *</label>
              <input
                value={candidateInfo.position}
                onChange={(e) => setCandidateInfo((c) => ({ ...c, position: e.target.value }))}
                className="w-full bg-[#FAF7F2] border border-[#C8D0C0]/60 text-[#2C3338] px-4 py-3 focus:outline-none focus:border-[#D4BCA6] transition-colors"
                placeholder="Target position"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold tracking-widest text-[#596573] mb-2 uppercase">Applicant ID</label>
                <input
                  value={candidateInfo.applicantId}
                  onChange={(e) => setCandidateInfo((c) => ({ ...c, applicantId: e.target.value }))}
                  className="w-full bg-[#FAF7F2] border border-[#C8D0C0]/60 text-[#2C3338] px-4 py-3 focus:outline-none focus:border-[#D4BCA6] transition-colors"
                  placeholder="If applicable"
                />
              </div>
              <div>
                <label className="block text-xs font-bold tracking-widest text-[#596573] mb-2 uppercase">Organisation</label>
                <input
                  value={candidateInfo.organisation}
                  onChange={(e) => setCandidateInfo((c) => ({ ...c, organisation: e.target.value }))}
                  className="w-full bg-[#FAF7F2] border border-[#C8D0C0]/60 text-[#2C3338] px-4 py-3 focus:outline-none focus:border-[#D4BCA6] transition-colors"
                  placeholder="Organisation name"
                />
              </div>
            </div>
          </div>

          {config.consent?.required && (
            <label className="flex items-start gap-3 text-sm text-[#596573] mb-8 cursor-pointer group">
              <div className="relative flex items-center justify-center shrink-0 mt-0.5">
                <input
                  type="checkbox"
                  checked={consentAck}
                  onChange={(e) => setConsentAck(e.target.checked)}
                  className="peer appearance-none w-5 h-5 border border-[#C8D0C0] bg-white checked:bg-[#C8D0C0] checked:border-[#C8D0C0] transition-colors cursor-pointer rounded-sm"
                />
                <svg className="absolute w-3 h-3 text-[#2C3338] opacity-0 peer-checked:opacity-100 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="group-hover:text-[#2C3338] transition-colors font-light">I have read and understood the information above, and I voluntarily consent to participate.</span>
            </label>
          )}

          <button
            disabled={!canStart}
            onClick={() => setStage("quiz")}
            className="w-full relative overflow-hidden bg-[#C8D0C0] disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-[#2C3338] font-bold text-base py-4 px-10 shadow-[0_8px_20px_rgba(200,208,192,0.3)] hover:bg-[#b5bead] transition-all duration-300 flex justify-center items-center gap-3 group uppercase tracking-widest rounded-sm border border-transparent"
          >
            <span className="relative z-10">Start Assessment</span>
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
      alert(err.message || "Failed to submit. Please try again.");
      setStage("quiz");
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FAF7F2] overflow-x-hidden lg:pl-[50px] pt-24 pb-24 px-4 sm:px-6">
      <SharedBackground />
      
      <div className="max-w-3xl mx-auto relative z-10">
        
        {/* Progress Bar */}
        <div className="mb-8 bg-white/80 p-4 border border-[#C8D0C0]/50 backdrop-blur-sm shadow-sm">
          <div className="flex justify-between text-xs font-bold tracking-widest uppercase text-[#596573] mb-3">
            <span>
              Part {instrumentIndex + 1} / {instruments.length}: <span className="text-[#D4BCA6]">{currentInstrument.name_en || currentInstrument.name_bn}</span>
            </span>
            <span className="text-[#2C3338]">{Math.round(((instrumentIndex + 1) / instruments.length) * 100)}%</span>
          </div>
          <div className="h-1.5 bg-[#FAF7F2] border border-[#C8D0C0]/40 overflow-hidden">
            <div
              className="h-full bg-[#C8D0C0] transition-all duration-500 ease-out"
              style={{ width: `${((instrumentIndex + 1) / instruments.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Section Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-[#2C3338] mb-8 font-serif tracking-tight flex items-center gap-3">
          <svg className="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="url(#leafGrad)">
            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          {currentInstrument.name_en || currentInstrument.name_bn}
        </h2>

        {/* Empty Items Warning */}
        {currentItems.length === 0 && (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-5 text-sm font-medium mb-6">
            No questions have been added to this section yet. Please notify the admin.
          </div>
        )}

        {/* Questions Area */}
        <div className="space-y-6">
          {currentItems.map((it, index) => (
            <div key={it.id} className="bg-white/85 backdrop-blur-md border border-[#C8D0C0]/60 p-6 sm:p-8 shadow-sm transition-colors">
              <div className="flex gap-4">
                <span className="text-[#D4BCA6] font-serif font-bold text-xl">{index + 1}.</span>
                <div className="w-full">
                  <p className="text-base sm:text-lg text-[#2C3338] mb-6 leading-relaxed lato-regular">{it.text_en || it.text_bn}</p>

                  {/* Likert Scale (5 Options) */}
                  {it.format === "likert_5" ? (
                    <div className="flex justify-between gap-2 sm:gap-3">
                      {[1, 2, 3, 4, 5].map((v) => {
                        const isSelected = answers[it.id] === v;
                        return (
                          <button
                            key={v}
                            onClick={() => setAnswer(it.id, v)}
                            className={`flex-1 py-3 sm:py-4 text-sm sm:text-base font-bold transition-all duration-200 border rounded-sm ${
                              isSelected
                                ? "bg-[#C8D0C0] text-[#2C3338] border-[#C8D0C0] shadow-sm"
                                : "bg-[#FAF7F2] border-[#C8D0C0]/50 text-[#596573] hover:border-[#D4BCA6] hover:text-[#2C3338]"
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
                            className={`text-left px-5 py-4 text-sm sm:text-base transition-all duration-200 border rounded-sm flex items-center gap-4 ${
                              isSelected
                                ? "bg-[#EAEFF0] border-[#C8D0C0] text-[#2C3338] font-bold"
                                : "bg-[#FAF7F2] border-[#C8D0C0]/50 text-[#596573] hover:border-[#D4BCA6] hover:bg-white hover:text-[#2C3338]"
                            }`}
                          >
                            <div className={`shrink-0 w-5 h-5 border flex items-center justify-center transition-colors rounded-sm ${
                              isSelected ? 'border-[#2C3338] bg-[#2C3338]' : 'border-[#C8D0C0]'
                            }`}>
                              {isSelected && (
                                <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                            <span>{opt.text_en || opt.text_bn}</span>
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
        <div className="flex justify-between items-center mt-10 border-t border-[#C8D0C0]/50 pt-8">
          <button
            disabled={instrumentIndex === 0}
            onClick={() => setInstrumentIndex((i) => Math.max(0, i - 1))}
            className="text-[#596573] hover:text-[#2C3338] text-sm font-bold tracking-widest uppercase disabled:opacity-30 flex items-center gap-2 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>
          
          <button
            disabled={!allAnswered || stage === "submitting"}
            onClick={handleNext}
            className="relative overflow-hidden bg-[#C8D0C0] disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-[#2C3338] font-bold px-8 py-3.5 shadow-[0_8px_20px_rgba(200,208,192,0.3)] hover:bg-[#b5bead] transition-all duration-300 flex justify-center items-center gap-3 group uppercase tracking-widest rounded-sm border border-transparent"
          >
            <span className="relative z-10">
              {stage === "submitting" ? "Submitting..." : isLastInstrument ? "Submit" : "Next"}
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