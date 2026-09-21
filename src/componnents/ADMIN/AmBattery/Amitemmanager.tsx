import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AM_INSTRUMENTS } from "./Aminstrumentmeta";
import { addAmBatteryItem, deleteAmBatteryItem, fetchAmBatteryAdmin, updateAmBatteryItem } from "../../api/amBatteryAdmin";


type AmForm = "A" | "B" | "C";

interface AmOption {
  id: string;
  text_bn: string;
}

interface AmItem {
  id: string;
  instrumentKey: string;
  form: AmForm;
  facet: string;
  format: "likert_5" | "mcq_single_best";
  text_bn: string;
  text_en?: string;
  reverse?: boolean;
  isValidityItem?: boolean;
  validityRule?: { type: string; value: number };
  options?: AmOption[];
  correctOptionId?: string;
}

const emptyDraft = (): Partial<AmItem> => ({
  instrumentKey: AM_INSTRUMENTS[0].key,
  form: "A",
  facet: AM_INSTRUMENTS[0].facets[0].key,
  format: "likert_5",
  text_bn: "",
  text_en: "",
  reverse: false,
  isValidityItem: false,
  options: [
    { id: "a", text_bn: "" },
    { id: "b", text_bn: "" },
  ],
  correctOptionId: "a",
});

export default function AmItemManager() {
  const { slug } = useParams<{ slug: string }>();
  const [battery, setBattery] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filterInstrument, setFilterInstrument] = useState<string>("all");
  const [filterForm, setFilterForm] = useState<AmForm | "all">("all");

  const [draft, setDraft] = useState<Partial<AmItem>>(emptyDraft());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const load = () => {
    if (!slug) return;
    setLoading(true);
    fetchAmBatteryAdmin(slug)
      .then((b) => setBattery(b))
      .catch((err) => setError(err.message || "লোড করা যায়নি।"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const items: AmItem[] = battery?.config?.items || [];

  const instrumentMeta = useMemo(
    () => AM_INSTRUMENTS.find((i) => i.key === draft.instrumentKey) || AM_INSTRUMENTS[0],
    [draft.instrumentKey]
  );

  const isHybridEi = instrumentMeta.key === "ei"; // EI-তে facet অনুযায়ী format বদলায় (SA/RG=likert, SIT=mcq)

  const filteredItems = items.filter((it) => {
    if (filterInstrument !== "all" && it.instrumentKey !== filterInstrument) return false;
    if (filterForm !== "all" && it.form !== filterForm) return false;
    return true;
  });

  const resetForm = () => {
    setDraft(emptyDraft());
    setEditingId(null);
    setFormError("");
  };

  const handleInstrumentChange = (key: string) => {
    const meta = AM_INSTRUMENTS.find((i) => i.key === key)!;
    const facet = meta.facets[0].key;
    const isValFacet = meta.hasValidity && meta.validityFacetKey === facet;
    setDraft((d) => ({
      ...d,
      instrumentKey: key,
      facet,
      format: meta.format === "hybrid" ? "likert_5" : (meta.format as any),
      isValidityItem: isValFacet,
    }));
  };

  const handleFacetChange = (facetKey: string) => {
    const isValFacet = instrumentMeta.hasValidity && instrumentMeta.validityFacetKey === facetKey;
    let format: "likert_5" | "mcq_single_best" = draft.format as any;
    if (isHybridEi) {
      format = facetKey === "SIT" ? "mcq_single_best" : "likert_5";
    }
    setDraft((d) => ({ ...d, facet: facetKey, format, isValidityItem: isValFacet }));
  };

  const nextSuggestedId = () => {
    const existing = items.filter(
      (it) => it.instrumentKey === draft.instrumentKey && it.form === draft.form && it.facet === draft.facet
    ).length;
    return `${(draft.instrumentKey || "").toUpperCase()}-${draft.form}-${draft.facet}-${existing + 1}`;
  };

  const addOption = () => {
    setDraft((d) => {
      const opts = d.options ? [...d.options] : [];
      const nextChar = String.fromCharCode(97 + opts.length); // a,b,c,d...
      opts.push({ id: nextChar, text_bn: "" });
      return { ...d, options: opts };
    });
  };

  const removeOption = (id: string) => {
    setDraft((d) => ({
      ...d,
      options: (d.options || []).filter((o) => o.id !== id),
      correctOptionId: d.correctOptionId === id ? undefined : d.correctOptionId,
    }));
  };

  const startEdit = (it: AmItem) => {
    setDraft({ ...it });
    setEditingId(it.id);
    setFormError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (itemId: string) => {
    if (!slug) return;
    if (!confirm(`প্রশ্ন "${itemId}" ডিলিট করবেন?`)) return;
    try {
      await deleteAmBatteryItem(slug, itemId);
      load();
    } catch (err: any) {
      alert(err.message || "ডিলিট করা যায়নি।");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!slug) return;
    setFormError("");

    if (!draft.text_bn?.trim()) {
      setFormError("প্রশ্নের টেক্সট (বাংলা) আবশ্যক।");
      return;
    }
    if (draft.format === "mcq_single_best") {
      const opts = draft.options || [];
      if (opts.length < 2 || opts.some((o) => !o.text_bn.trim())) {
        setFormError("কমপক্ষে ২টা অপশন দিন, প্রতিটার টেক্সট থাকতে হবে।");
        return;
      }
      if (!draft.correctOptionId) {
        setFormError("সঠিক উত্তর (correct option) বেছে নিন।");
        return;
      }
    }

    const id = editingId || nextSuggestedId();

    const payload: AmItem = {
      id,
      instrumentKey: draft.instrumentKey!,
      form: draft.form as AmForm,
      facet: draft.facet!,
      format: draft.format as any,
      text_bn: draft.text_bn!.trim(),
      text_en: draft.text_en?.trim() || undefined,
      ...(draft.format === "likert_5"
        ? { reverse: !!draft.reverse }
        : { options: draft.options, correctOptionId: draft.correctOptionId }),
      ...(draft.isValidityItem
        ? { isValidityItem: true, validityRule: draft.validityRule || { type: "fails_if_gte", value: 4 } }
        : {}),
    };

    setSaving(true);
    try {
      if (editingId) {
        await updateAmBatteryItem(slug, editingId, payload);
      } else {
        await addAmBatteryItem(slug, payload);
      }
      resetForm();
      load();
    } catch (err: any) {
      setFormError(err.message || "সেভ করা যায়নি।");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-slate-500">লোড হচ্ছে...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;
  if (!battery) return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <Link to="/dashboard/admin/why-not-you/am-battery" className="text-xs text-blue-600">
            ← সব Battery
          </Link>
          <h1 className="text-2xl font-bold text-slate-800 mt-1">
            {battery.name?.bn} — প্রশ্ন পরিচালনা
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            মোট {items.length}টা প্রশ্ন যোগ হয়েছে · স্ট্যাটাস: {battery.status}
          </p>
        </div>
      </div>

      {/* ---------- Add / Edit Form ---------- */}
      <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 mb-8 space-y-4">
        <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wide">
          {editingId ? `প্রশ্ন এডিট করছেন: ${editingId}` : "নতুন প্রশ্ন যোগ করুন"}
        </h2>

        {formError && (
          <div className="bg-red-50 text-red-700 border border-red-100 rounded-lg px-4 py-2 text-sm">
            {formError}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Instrument</label>
            <select
              value={draft.instrumentKey}
              onChange={(e) => handleInstrumentChange(e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
            >
              {AM_INSTRUMENTS.map((i) => (
                <option key={i.key} value={i.key}>
                  {i.name_bn}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Facet</label>
            <select
              value={draft.facet}
              onChange={(e) => handleFacetChange(e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
            >
              {instrumentMeta.facets.map((f) => (
                <option key={f.key} value={f.key}>
                  {f.name_bn} ({f.key})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Form</label>
            <select
              value={draft.form}
              onChange={(e) => setDraft((d) => ({ ...d, form: e.target.value as AmForm }))}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
            >
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>
        </div>

        <div className="text-xs text-slate-500">
          Format: <b>{draft.format === "likert_5" ? "Likert (১-৫)" : "MCQ"}</b>
          {draft.isValidityItem && (
            <span className="ml-2 text-amber-600 font-semibold">⚠ এটা ভ্যালিডিটি আইটেম</span>
          )}
          {" · "}আইডি হবে: <span className="font-mono">{editingId || nextSuggestedId()}</span>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">প্রশ্নের টেক্সট (বাংলা)</label>
          <textarea
            value={draft.text_bn}
            onChange={(e) => setDraft((d) => ({ ...d, text_bn: e.target.value }))}
            rows={2}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">English gloss (ঐচ্ছিক)</label>
          <textarea
            value={draft.text_en}
            onChange={(e) => setDraft((d) => ({ ...d, text_en: e.target.value }))}
            rows={2}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
          />
        </div>

        {draft.format === "likert_5" && (
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={!!draft.reverse}
                onChange={(e) => setDraft((d) => ({ ...d, reverse: e.target.checked }))}
              />
              Reverse-keyed আইটেম
            </label>

            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={!!draft.isValidityItem}
                onChange={(e) => setDraft((d) => ({ ...d, isValidityItem: e.target.checked }))}
              />
              ভ্যালিডিটি আইটেম
            </label>
          </div>
        )}

        {draft.format === "likert_5" && draft.isValidityItem && (
          <div className="flex items-center gap-3 bg-amber-50 border border-amber-100 rounded-lg p-3">
            <label className="text-xs font-semibold text-amber-800">Fail হবে যদি রেসপন্স</label>
            <select
              value={draft.validityRule?.type || "fails_if_gte"}
              onChange={(e) =>
                setDraft((d) => ({
                  ...d,
                  validityRule: { type: e.target.value, value: d.validityRule?.value ?? 4 },
                }))
              }
              className="border border-amber-200 rounded px-2 py-1 text-xs"
            >
              <option value="fails_if_gte">≥ এই মানের</option>
              <option value="fails_if_lte">≤ এই মানের</option>
              <option value="fails_if_eq">= এই মানের</option>
              <option value="fails_if_neq">≠ এই মানের</option>
            </select>
            <input
              type="number"
              min={1}
              max={5}
              value={draft.validityRule?.value ?? 4}
              onChange={(e) =>
                setDraft((d) => ({
                  ...d,
                  validityRule: { type: d.validityRule?.type || "fails_if_gte", value: Number(e.target.value) },
                }))
              }
              className="w-16 border border-amber-200 rounded px-2 py-1 text-xs"
            />
          </div>
        )}

        {draft.format === "mcq_single_best" && (
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-600">অপশনসমূহ (সঠিক উত্তর বেছে নিন)</label>
            {(draft.options || []).map((opt) => (
              <div key={opt.id} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="correctOption"
                  checked={draft.correctOptionId === opt.id}
                  onChange={() => setDraft((d) => ({ ...d, correctOptionId: opt.id }))}
                />
                <span className="text-xs text-slate-400 w-6">{opt.id})</span>
                <input
                  value={opt.text_bn}
                  onChange={(e) =>
                    setDraft((d) => ({
                      ...d,
                      options: (d.options || []).map((o) =>
                        o.id === opt.id ? { ...o, text_bn: e.target.value } : o
                      ),
                    }))
                  }
                  className="flex-1 border border-slate-200 rounded-lg px-3 py-1.5 text-sm"
                  placeholder="অপশনের টেক্সট"
                />
                <button
                  type="button"
                  onClick={() => removeOption(opt.id)}
                  className="text-red-500 text-xs"
                >
                  মুছুন
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addOption}
              className="text-emerald-700 text-xs font-semibold"
            >
              + অপশন যোগ করুন
            </button>
          </div>
        )}

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold px-6 py-2 rounded-lg text-sm"
          >
            {saving ? "সেভ হচ্ছে..." : editingId ? "আপডেট করুন" : "প্রশ্ন যোগ করুন"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="text-slate-500 text-sm font-semibold"
            >
              বাতিল
            </button>
          )}
        </div>
      </form>

      {/* ---------- Filter ---------- */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <select
          value={filterInstrument}
          onChange={(e) => setFilterInstrument(e.target.value)}
          className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm"
        >
          <option value="all">সব Instrument</option>
          {AM_INSTRUMENTS.map((i) => (
            <option key={i.key} value={i.key}>
              {i.name_bn}
            </option>
          ))}
        </select>
        <select
          value={filterForm}
          onChange={(e) => setFilterForm(e.target.value as any)}
          className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm"
        >
          <option value="all">সব Form</option>
          <option value="A">Form A</option>
          <option value="B">Form B</option>
          <option value="C">Form C</option>
        </select>
        <span className="text-xs text-slate-400">{filteredItems.length}টা প্রশ্ন দেখানো হচ্ছে</span>
      </div>

      {/* ---------- Item list ---------- */}
      <div className="space-y-2">
        {filteredItems.map((it) => (
          <div
            key={it.id}
            className="bg-white border border-slate-200 rounded-xl px-4 py-3 flex items-start justify-between gap-4"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 text-[10px] text-slate-400 mb-1">
                <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded">{it.id}</span>
                <span>{it.form}</span>
                <span>{it.facet}</span>
                <span>{it.format === "likert_5" ? "Likert" : "MCQ"}</span>
                {it.isValidityItem && <span className="text-amber-600 font-semibold">Validity</span>}
                {it.reverse && <span className="text-blue-600">Reverse</span>}
              </div>
              <p className="text-sm text-slate-800">{it.text_bn}</p>
              {it.format === "mcq_single_best" && (
                <ul className="mt-1 text-xs text-slate-500 space-y-0.5">
                  {(it.options || []).map((o) => (
                    <li key={o.id} className={o.id === it.correctOptionId ? "text-emerald-700 font-semibold" : ""}>
                      {o.id}) {o.text_bn} {o.id === it.correctOptionId ? "✓" : ""}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex flex-col gap-2 shrink-0">
              <button onClick={() => startEdit(it)} className="text-blue-600 text-xs font-semibold">
                এডিট
              </button>
              <button onClick={() => handleDelete(it.id)} className="text-red-600 text-xs font-semibold">
                ডিলিট
              </button>
            </div>
          </div>
        ))}
        {filteredItems.length === 0 && (
          <div className="text-center text-slate-400 text-sm py-8">এই ফিল্টারে কোনো প্রশ্ন নেই।</div>
        )}
      </div>
    </div>
  );
}