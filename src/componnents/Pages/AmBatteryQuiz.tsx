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

  if (stage === "loading") {
    return <div className="min-h-screen flex items-center justify-center text-slate-500">লোড হচ্ছে...</div>;
  }
  if (stage === "error") {
    return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;
  }

  const instruments: any[] = config.instruments || [];
  const allItems: any[] = config.items || [];

  /* ---------- Consent + candidate-info screen ---------- */
  if (stage === "consent") {
    const canStart =
      (!config.consent?.required || consentAck) &&
      candidateInfo.name.trim() &&
      candidateInfo.position.trim();

    return (
      <div className="min-h-screen bg-slate-50 pt-16 pb-20 px-4">
        <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-200/60 p-6 sm:p-10">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">{config.name?.bn}</h1>
          <p className="text-xs text-slate-400 mb-6">Form {config.assignedForm} · Version {config.version}</p>

          {config.consent?.text_bn && (
            <p className="text-sm text-slate-600 leading-relaxed mb-6 bg-slate-50 rounded-xl p-4">
              {config.consent.text_bn}
            </p>
          )}

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">প্রার্থীর নাম *</label>
              <input
                value={candidateInfo.name}
                onChange={(e) => setCandidateInfo((c) => ({ ...c, name: e.target.value }))}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">পদের নাম *</label>
              <input
                value={candidateInfo.position}
                onChange={(e) => setCandidateInfo((c) => ({ ...c, position: e.target.value }))}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Applicant ID</label>
                <input
                  value={candidateInfo.applicantId}
                  onChange={(e) => setCandidateInfo((c) => ({ ...c, applicantId: e.target.value }))}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">প্রতিষ্ঠান</label>
                <input
                  value={candidateInfo.organisation}
                  onChange={(e) => setCandidateInfo((c) => ({ ...c, organisation: e.target.value }))}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
                />
              </div>
            </div>
          </div>

          {config.consent?.required && (
            <label className="flex items-start gap-2 text-sm text-slate-700 mb-6">
              <input
                type="checkbox"
                checked={consentAck}
                onChange={(e) => setConsentAck(e.target.checked)}
                className="mt-1"
              />
              আমি উপরের তথ্য পড়েছি, বুঝেছি এবং স্বেচ্ছায় অংশগ্রহণে সম্মত আছি।
            </label>
          )}

          <button
            disabled={!canStart}
            onClick={() => setStage("quiz")}
            className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 disabled:opacity-40 text-white font-bold py-3 rounded-xl"
          >
            শুরু করুন
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
    // শেষ instrument -> submit
    if (!slug) return;
    setStage("submitting");
    try {
      const res = await submitAmBatteryResponse(slug, {
        assignedForm: config.assignedForm,
        answers,
        candidateInfo,
        consentAck,
      });
      if (res.paymentRequired) {
        navigate(`/selection/${slug}/result/${res.responseId}`);
      } else {
        navigate(`/selection/${slug}/result/${res.responseId}`);
      }
    } catch (err: any) {
      alert(err.message || "জমা দেওয়া যায়নি। আবার চেষ্টা করুন।");
      setStage("quiz");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-10 pb-24 px-4">
      <div className="max-w-2xl mx-auto">
        {/* progress */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-slate-400 mb-1">
            <span>
              {instrumentIndex + 1} / {instruments.length}: {currentInstrument.name_bn}
            </span>
            <span>{Math.round(((instrumentIndex + 1) / instruments.length) * 100)}%</span>
          </div>
          <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all"
              style={{ width: `${((instrumentIndex + 1) / instruments.length) * 100}%` }}
            />
          </div>
        </div>

        <h2 className="text-lg font-bold text-slate-800 mb-4">{currentInstrument.name_bn}</h2>

        {currentItems.length === 0 && (
          <div className="bg-amber-50 border border-amber-100 text-amber-700 rounded-xl p-4 text-sm mb-4">
            এই অংশে এখনো কোনো প্রশ্ন যোগ করা হয়নি। অ্যাডমিনকে জানান।
          </div>
        )}

        <div className="space-y-4">
          {currentItems.map((it) => (
            <div key={it.id} className="bg-white border border-slate-200 rounded-2xl p-5">
              <p className="text-sm text-slate-800 mb-4">{it.text_bn}</p>

              {it.format === "likert_5" ? (
                <div className="flex justify-between gap-2">
                  {[1, 2, 3, 4, 5].map((v) => (
                    <button
                      key={v}
                      onClick={() => setAnswer(it.id, v)}
                      className={`flex-1 py-2 rounded-lg text-sm font-semibold border ${
                        answers[it.id] === v
                          ? "bg-emerald-600 text-white border-emerald-600"
                          : "border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {(it.options || []).map((opt: any) => (
                    <button
                      key={opt.id}
                      onClick={() => setAnswer(it.id, opt.id)}
                      className={`text-left px-4 py-2.5 rounded-lg text-sm border ${
                        answers[it.id] === opt.id
                          ? "bg-emerald-50 border-emerald-400 text-emerald-800 font-medium"
                          : "border-slate-200 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {opt.id}) {opt.text_bn}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mt-6">
          <button
            disabled={instrumentIndex === 0}
            onClick={() => setInstrumentIndex((i) => Math.max(0, i - 1))}
            className="text-slate-500 text-sm font-semibold disabled:opacity-30"
          >
            ← পেছনে
          </button>
          <button
            disabled={!allAnswered || stage === "submitting"}
            onClick={handleNext}
            className="bg-gradient-to-r from-emerald-500 to-emerald-600 disabled:opacity-40 text-white font-bold px-8 py-3 rounded-xl"
          >
            {stage === "submitting" ? "জমা হচ্ছে..." : isLastInstrument ? "জমা দিন" : "পরবর্তী →"}
          </button>
        </div>
      </div>
    </div>
  );
}