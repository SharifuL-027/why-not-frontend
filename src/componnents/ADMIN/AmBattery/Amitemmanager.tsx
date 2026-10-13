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
      .catch((err) => setError(err.message || "Failed to load."))
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

  const isHybridEi = instrumentMeta.key === "ei"; 

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
    if (!confirm(`Are you sure you want to delete question "${itemId}"?`)) return;
    try {
      await deleteAmBatteryItem(slug, itemId);
      load();
    } catch (err: any) {
      alert(err.message || "Failed to delete.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!slug) return;
    setFormError("");

    if (!draft.text_bn?.trim()) {
      setFormError("Question text (Primary/Bengali) is required.");
      return;
    }
    if (draft.format === "mcq_single_best") {
      const opts = draft.options || [];
      if (opts.length < 2 || opts.some((o) => !o.text_bn.trim())) {
        setFormError("Provide at least 2 options, and ensure all options have text.");
        return;
      }
      if (!draft.correctOptionId) {
        setFormError("Please select the correct option.");
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
      setFormError(err.message || "Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-[#4A4A4A] font-medium tracking-wide">Loading...</div>;
  if (error) return <div className="p-8 text-red-500 font-medium">{error}</div>;
  if (!battery) return null;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-0 font-sans pb-16">
      
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link to="/dashboard/admin/why-not-you/am-battery" className="text-xs text-[#A38771] uppercase tracking-widest font-bold hover:text-[#222222] transition-colors">
            ← All Batteries
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#222222] tracking-wide mt-3">
            {battery.name?.en || battery.name?.bn} — Manage Questions
          </h1>
          <p className="text-xs text-[#4A4A4A] mt-2 uppercase tracking-widest font-medium">
            Total {items.length} questions added <span className="mx-2 text-[#EFECE5]">|</span> Status: {battery.status}
          </p>
        </div>
      </div>

      {/* ---------- Add / Edit Form ---------- */}
      <form onSubmit={handleSubmit} className="bg-white border border-[#EFECE5] shadow-sm rounded-sm p-6 sm:p-8 mb-10 space-y-6">
        <h2 className="text-sm font-bold text-[#A38771] uppercase tracking-widest border-b border-[#EFECE5] pb-4">
          {editingId ? `Editing Question: ${editingId}` : "Add New Question"}
        </h2>

        {formError && (
          <div className="bg-red-500/10 text-red-700 border border-red-500/30 rounded-sm px-5 py-3 text-sm flex items-start gap-3">
            <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{formError}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-bold tracking-widest text-[#4A4A4A] mb-2 uppercase">Instrument</label>
            <select
              value={draft.instrumentKey}
              onChange={(e) => handleInstrumentChange(e.target.value)}
              className="w-full bg-[#F9F6F0] border border-[#EFECE5] text-[#222222] px-4 py-3 outline-none focus:border-[#A38771] transition-colors rounded-sm"
            >
              {AM_INSTRUMENTS.map((i) => (
                <option key={i.key} value={i.key}>
                  {i.name_en || i.name_bn}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold tracking-widest text-[#4A4A4A] mb-2 uppercase">Facet</label>
            <select
              value={draft.facet}
              onChange={(e) => handleFacetChange(e.target.value)}
              className="w-full bg-[#F9F6F0] border border-[#EFECE5] text-[#222222] px-4 py-3 outline-none focus:border-[#A38771] transition-colors rounded-sm"
            >
              {instrumentMeta.facets.map((f) => (
                <option key={f.key} value={f.key}>
                  {f.name_bn} ({f.key})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold tracking-widest text-[#4A4A4A] mb-2 uppercase">Form</label>
            <select
              value={draft.form}
              onChange={(e) => setDraft((d) => ({ ...d, form: e.target.value as AmForm }))}
              className="w-full bg-[#F9F6F0] border border-[#EFECE5] text-[#222222] px-4 py-3 outline-none focus:border-[#A38771] transition-colors rounded-sm"
            >
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>
        </div>

        <div className="text-xs text-[#4A4A4A]">
          Format: <b className="text-[#222222]">{draft.format === "likert_5" ? "Likert (1-5)" : "MCQ"}</b>
          {draft.isValidityItem && (
            <span className="ml-3 text-amber-700 font-bold uppercase tracking-widest bg-amber-500/10 px-2 py-1 rounded-sm">⚠ Validity Item</span>
          )}
          <span className="mx-2 text-[#EFECE5]">|</span> Target ID: <span className="font-mono text-[#222222] font-bold">{editingId || nextSuggestedId()}</span>
        </div>

        <div>
          <label className="block text-xs font-bold tracking-widest text-[#4A4A4A] mb-2 uppercase">Question Text (Primary/Bengali)</label>
          <textarea
            value={draft.text_bn}
            onChange={(e) => setDraft((d) => ({ ...d, text_bn: e.target.value }))}
            rows={2}
            className="w-full bg-[#F9F6F0] border border-[#EFECE5] text-[#222222] px-4 py-3 outline-none focus:border-[#A38771] transition-colors rounded-sm resize-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold tracking-widest text-[#4A4A4A] mb-2 uppercase">English Gloss (Optional)</label>
          <textarea
            value={draft.text_en}
            onChange={(e) => setDraft((d) => ({ ...d, text_en: e.target.value }))}
            rows={2}
            className="w-full bg-[#F9F6F0] border border-[#EFECE5] text-[#222222] px-4 py-3 outline-none focus:border-[#A38771] transition-colors rounded-sm resize-none"
          />
        </div>

        {draft.format === "likert_5" && (
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <label className="flex items-center gap-3 text-sm text-[#222222] font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={!!draft.reverse}
                onChange={(e) => setDraft((d) => ({ ...d, reverse: e.target.checked }))}
                className="w-4 h-4 text-[#A38771] border-[#EFECE5] rounded-sm focus:ring-[#A38771]"
              />
              Reverse-keyed Item
            </label>

            <label className="flex items-center gap-3 text-sm text-[#222222] font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={!!draft.isValidityItem}
                onChange={(e) => setDraft((d) => ({ ...d, isValidityItem: e.target.checked }))}
                className="w-4 h-4 text-[#A38771] border-[#EFECE5] rounded-sm focus:ring-[#A38771]"
              />
              Validity Item
            </label>
          </div>
        )}

        {draft.format === "likert_5" && draft.isValidityItem && (
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-amber-500/10 border border-amber-500/20 rounded-sm p-4">
            <label className="text-xs font-bold uppercase tracking-widest text-amber-800">Fails if response</label>
            <div className="flex items-center gap-2">
              <select
                value={draft.validityRule?.type || "fails_if_gte"}
                onChange={(e) =>
                  setDraft((d) => ({
                    ...d,
                    validityRule: { type: e.target.value, value: d.validityRule?.value ?? 4 },
                  }))
                }
                className="bg-white border border-amber-500/30 text-amber-900 rounded-sm px-3 py-2 text-sm outline-none focus:border-amber-500"
              >
                <option value="fails_if_gte">≥ this value</option>
                <option value="fails_if_lte">≤ this value</option>
                <option value="fails_if_eq">= this value</option>
                <option value="fails_if_neq">≠ this value</option>
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
                className="w-16 bg-white border border-amber-500/30 text-amber-900 rounded-sm px-3 py-2 text-sm outline-none focus:border-amber-500 text-center"
              />
            </div>
          </div>
        )}

        {draft.format === "mcq_single_best" && (
          <div className="space-y-4">
            <label className="block text-xs font-bold tracking-widest text-[#4A4A4A] mb-2 uppercase">Options (Select Correct Answer)</label>
            {(draft.options || []).map((opt) => (
              <div key={opt.id} className="flex items-center gap-3">
                <input
                  type="radio"
                  name="correctOption"
                  checked={draft.correctOptionId === opt.id}
                  onChange={() => setDraft((d) => ({ ...d, correctOptionId: opt.id }))}
                  className="w-4 h-4 text-[#A38771] border-[#EFECE5] focus:ring-[#A38771] cursor-pointer"
                />
                <span className="text-xs text-[#A38771] font-bold uppercase tracking-widest w-6">{opt.id})</span>
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
                  className="flex-1 bg-[#F9F6F0] border border-[#EFECE5] rounded-sm px-4 py-2.5 text-sm text-[#222222] outline-none focus:border-[#A38771] transition-colors"
                  placeholder="Option text"
                />
                <button
                  type="button"
                  onClick={() => removeOption(opt.id)}
                  className="text-red-500 hover:text-red-700 text-xs font-bold uppercase tracking-widest transition-colors px-2"
                >
                  Delete
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addOption}
              className="text-[#A38771] hover:text-[#222222] text-xs font-bold uppercase tracking-widest transition-colors mt-2"
            >
              + Add Option
            </button>
          </div>
        )}

        <div className="flex items-center gap-4 pt-4 border-t border-[#EFECE5]">
          <button
            type="submit"
            disabled={saving}
            className="bg-[#222222] hover:bg-[#A38771] disabled:bg-[#EFECE5] disabled:text-[#4A4A4A] disabled:cursor-not-allowed text-[#F9F6F0] font-bold text-xs uppercase tracking-widest px-8 py-3.5 transition-colors duration-300 rounded-sm shadow-sm"
          >
            {saving ? "Saving..." : editingId ? "Update Question" : "Add Question"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="text-[#4A4A4A] hover:text-[#222222] text-xs font-bold uppercase tracking-widest transition-colors px-4 py-3.5"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* ---------- Filter ---------- */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <select
          value={filterInstrument}
          onChange={(e) => setFilterInstrument(e.target.value)}
          className="bg-white border border-[#EFECE5] rounded-sm px-4 py-2.5 text-sm text-[#222222] outline-none focus:border-[#A38771]"
        >
          <option value="all">All Instruments</option>
          {AM_INSTRUMENTS.map((i) => (
            <option key={i.key} value={i.key}>
              {i.name_en || i.name_bn}
            </option>
          ))}
        </select>
        
        <select
          value={filterForm}
          onChange={(e) => setFilterForm(e.target.value as any)}
          className="bg-white border border-[#EFECE5] rounded-sm px-4 py-2.5 text-sm text-[#222222] outline-none focus:border-[#A38771]"
        >
          <option value="all">All Forms</option>
          <option value="A">Form A</option>
          <option value="B">Form B</option>
          <option value="C">Form C</option>
        </select>
        
        <span className="text-xs text-[#4A4A4A] uppercase tracking-widest font-medium">
          Showing {filteredItems.length} questions
        </span>
      </div>

      {/* ---------- Item list ---------- */}
      <div className="space-y-4">
        {filteredItems.map((it) => (
          <div
            key={it.id}
            className="bg-white border border-[#EFECE5] rounded-sm px-5 py-5 flex flex-col sm:flex-row items-start justify-between gap-6 shadow-sm hover:border-[#A38771] transition-colors duration-300"
          >
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="font-mono bg-[#EFECE5] text-[#222222] px-2 py-1 rounded-sm text-[10px] font-bold uppercase tracking-widest">
                  {it.id}
                </span>
                <span className="text-[10px] text-[#4A4A4A] uppercase tracking-widest font-bold bg-[#F9F6F0] px-2 py-1 rounded-sm border border-[#EFECE5]">Form {it.form}</span>
                <span className="text-[10px] text-[#4A4A4A] uppercase tracking-widest font-bold bg-[#F9F6F0] px-2 py-1 rounded-sm border border-[#EFECE5]">{it.facet}</span>
                <span className="text-[10px] text-[#4A4A4A] uppercase tracking-widest font-bold bg-[#F9F6F0] px-2 py-1 rounded-sm border border-[#EFECE5]">
                  {it.format === "likert_5" ? "Likert" : "MCQ"}
                </span>
                {it.isValidityItem && <span className="text-[10px] text-amber-700 bg-amber-500/10 border border-amber-500/20 px-2 py-1 rounded-sm uppercase tracking-widest font-bold">Validity</span>}
                {it.reverse && <span className="text-[10px] text-[#A38771] bg-[#A38771]/10 border border-[#A38771]/20 px-2 py-1 rounded-sm uppercase tracking-widest font-bold">Reverse</span>}
              </div>
              
              <p className="text-sm text-[#222222] font-medium leading-relaxed">{it.text_bn}</p>
              {it.text_en && <p className="text-sm text-[#4A4A4A] mt-1 leading-relaxed italic">{it.text_en}</p>}
              
              {it.format === "mcq_single_best" && (
                <ul className="mt-3 text-sm text-[#4A4A4A] space-y-1.5 border-l-2 border-[#EFECE5] pl-3">
                  {(it.options || []).map((o) => (
                    <li key={o.id} className={o.id === it.correctOptionId ? "text-[#A38771] font-bold" : ""}>
                      <span className="uppercase">{o.id})</span> {o.text_bn} {o.id === it.correctOptionId ? "✓" : ""}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
            <div className="flex sm:flex-col gap-4 shrink-0 mt-2 sm:mt-0">
              <button onClick={() => startEdit(it)} className="text-[#A38771] hover:text-[#222222] text-xs font-bold uppercase tracking-widest transition-colors">
                Edit
              </button>
              <button onClick={() => handleDelete(it.id)} className="text-red-500 hover:text-red-700 text-xs font-bold uppercase tracking-widest transition-colors">
                Delete
              </button>
            </div>
          </div>
        ))}
        
        {filteredItems.length === 0 && (
          <div className="text-center text-[#4A4A4A] text-sm py-12 border border-dashed border-[#EFECE5] rounded-sm bg-white">
            No questions found for this filter.
          </div>
        )}
      </div>
    </div>
  );
}