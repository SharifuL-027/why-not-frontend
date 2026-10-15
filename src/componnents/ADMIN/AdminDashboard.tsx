import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  fetchAdminStats,
  fetchAdminResponses,
  updateResponsePayment,
  fetchAdminInstruments,
  updateInstrumentAdmin,
} from "../api/instruments";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"submissions" | "instruments" | "analytics">("submissions");
  const [statsData, setStatsData] = useState<any>(null);
  const [responses, setResponses] = useState<any[]>([]);
  const [instruments, setInstruments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSlug, setSelectedSlug] = useState("all");
  const [selectedPayment, setSelectedPayment] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Detail Modal
  const [selectedResponse, setSelectedResponse] = useState<any | null>(null);

  // Editing Instrument Price
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [newPrice, setNewPrice] = useState<number>(0);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [statsRes, respRes, instRes] = await Promise.all([
        fetchAdminStats(),
        fetchAdminResponses({
          slug: selectedSlug,
          paymentStatus: selectedPayment,
          search: searchTerm,
          page,
          limit: 15,
        }),
        fetchAdminInstruments(),
      ]);

      setStatsData(statsRes);
      setResponses(respRes.responses || []);
      setTotalPages(respRes.pagination?.totalPages || 1);
      setInstruments(instRes.instruments || []);
    } catch (err) {
      console.error("Failed to load admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, [selectedSlug, selectedPayment, page]);

  // Handle live search
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    loadAllData();
  };

  // Toggle payment status
  const handleTogglePayment = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === "paid" ? "pending" : "paid";
    try {
      await updateResponsePayment(id, nextStatus);
      // update locally
      setResponses((prev) =>
        prev.map((r) => (r._id === id ? { ...r, paymentStatus: nextStatus } : r))
      );
      if (statsData) {
        setStatsData((prev: any) => ({
          ...prev,
          stats: {
            ...prev.stats,
            paidCount:
              nextStatus === "paid" ? prev.stats.paidCount + 1 : prev.stats.paidCount - 1,
            pendingCount:
              nextStatus === "pending" ? prev.stats.pendingCount + 1 : prev.stats.pendingCount - 1,
          },
        }));
      }
    } catch (err) {
      alert("Failed to update payment status");
    }
  };

  // Save Instrument Price
  const handleSavePrice = async (slug: string) => {
    try {
      await updateInstrumentAdmin(slug, { price: newPrice });
      setInstruments((prev) =>
        prev.map((inst) => (inst.instrumentSlug === slug ? { ...inst, price: newPrice } : inst))
      );
      setEditingSlug(null);
      alert("Fee updated successfully!");
    } catch (err) {
      alert("Failed to update fee");
    }
  };

  const stats = statsData?.stats || {
    totalResponses: 0,
    paidCount: 0,
    pendingCount: 0,
    freeCount: 0,
    totalInstruments: 5,
    totalRevenue: 0,
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 pb-16">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 sm:p-8 border border-[#EAEFF0] rounded-sm shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#5DBB4D]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#A38771]">
              Management & Verification Center
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#2C3338]">
            Assessment Submissions & Admin Hub
          </h1>
          <p className="text-xs text-[#7A8691] mt-1">
            Real-time participant intakes, verified reports, payments, and psychometric configurations
          </p>
        </div>

        <button
          onClick={loadAllData}
          className="px-4 py-2.5 bg-[#FAF7F2] hover:bg-[#EAEFF0] border border-[#EAEFF0] text-[#2C3338] text-xs font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4 text-[#A38771]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>Refresh Data</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Submissions */}
        <div className="bg-white p-6 border border-[#EAEFF0] rounded-sm shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A8691] block mb-1">
              Total Submissions
            </span>
            <div className="text-3xl font-mono font-bold text-[#2C3338]">{stats.totalResponses}</div>
            <span className="text-[11px] text-[#5DBB4D] font-medium mt-1 block">All instruments</span>
          </div>
          <div className="w-12 h-12 bg-[#FAF7F2] border border-[#EAEFF0] rounded-sm flex items-center justify-center text-[#A38771]">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        </div>

        {/* Paid Submissions */}
        <div className="bg-white p-6 border border-[#EAEFF0] rounded-sm shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A8691] block mb-1">
              Paid / Verified
            </span>
            <div className="text-3xl font-mono font-bold text-emerald-700">{stats.paidCount}</div>
            <span className="text-[11px] text-[#7A8691] font-medium mt-1 block">Completed payments</span>
          </div>
          <div className="w-12 h-12 bg-emerald-50 border border-emerald-100 rounded-sm flex items-center justify-center text-emerald-600">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        {/* Pending Submissions */}
        <div className="bg-white p-6 border border-[#EAEFF0] rounded-sm shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A8691] block mb-1">
              Pending Verification
            </span>
            <div className="text-3xl font-mono font-bold text-amber-600">{stats.pendingCount}</div>
            <span className="text-[11px] text-amber-700 font-medium mt-1 block">Awaiting fee approval</span>
          </div>
          <div className="w-12 h-12 bg-amber-50 border border-amber-100 rounded-sm flex items-center justify-center text-amber-600">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        {/* Active Instruments */}
        <div className="bg-white p-6 border border-[#EAEFF0] rounded-sm shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A8691] block mb-1">
              Active Tests
            </span>
            <div className="text-3xl font-mono font-bold text-[#2C3338]">{stats.totalInstruments}</div>
            <span className="text-[11px] text-[#5DBB4D] font-medium mt-1 block">{stats.totalInstruments} Standardized Batteries</span>
          </div>
          <div className="w-12 h-12 bg-[#FAF7F2] border border-[#EAEFF0] rounded-sm flex items-center justify-center text-[#A38771]">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-[#EAEFF0] bg-white px-6 pt-2 rounded-sm shadow-sm">
        {[
          { key: "submissions", label: "Participant Submissions" },
          { key: "instruments", label: "Test Instruments & Fees" },
          { key: "analytics", label: "Performance Overview" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`py-3.5 px-6 font-bold text-xs uppercase tracking-wider transition-all border-b-2 -mb-[2px] ${
              activeTab === tab.key
                ? "border-[#2C3338] text-[#2C3338]"
                : "border-transparent text-[#7A8691] hover:text-[#2C3338]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* =========================================================================
          TAB 1: PARTICIPANT SUBMISSIONS TABLE
          ========================================================================= */}
      {activeTab === "submissions" && (
        <div className="bg-white border border-[#EAEFF0] rounded-sm shadow-sm overflow-hidden">
          {/* Filter Bar */}
          <div className="p-6 border-b border-[#EAEFF0] bg-[#FAF7F2]/50 flex flex-col md:flex-row gap-4 justify-between items-center">
            {/* Search Input */}
            <form onSubmit={handleSearchSubmit} className="flex-1 w-full max-w-md flex items-center gap-2">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by participant name, email, or test..."
                className="w-full bg-white border border-[#EAEFF0] text-sm text-[#2C3338] px-4 py-2.5 outline-none focus:border-[#A38771] rounded-sm"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-[#2C3338] text-white text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-black transition-colors"
              >
                Search
              </button>
            </form>

            {/* Select Dropdowns */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <select
                value={selectedSlug}
                onChange={(e) => {
                  setSelectedSlug(e.target.value);
                  setPage(1);
                }}
                className="bg-white border border-[#EAEFF0] text-xs font-medium text-[#2C3338] px-3.5 py-2.5 outline-none focus:border-[#A38771] rounded-sm cursor-pointer"
              >
                <option value="all">All Instruments</option>
                <option value="fadss">FADSS (Stress & Depression)</option>
                <option value="cfi-bd">CFI-BD (Career Fit)</option>
                <option value="pcs-bd">PCS-BD (Parenting Capability)</option>
                <option value="rrs-24">RRS-24 (Reliability Scale)</option>
                <option value="mcrrs-bd">MCRRS-BD (Marriage Compatibility)</option>
              </select>

              <select
                value={selectedPayment}
                onChange={(e) => {
                  setSelectedPayment(e.target.value);
                  setPage(1);
                }}
                className="bg-white border border-[#EAEFF0] text-xs font-medium text-[#2C3338] px-3.5 py-2.5 outline-none focus:border-[#A38771] rounded-sm cursor-pointer"
              >
                <option value="all">All Payment Statuses</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="free">Free</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#FAF7F2] text-[#7A8691] uppercase tracking-wider text-[11px] border-b border-[#EAEFF0]">
                  <th className="py-3.5 px-6 font-bold">Participant</th>
                  <th className="py-3.5 px-6 font-bold">Assessment Test</th>
                  <th className="py-3.5 px-6 font-bold">Date Taken</th>
                  <th className="py-3.5 px-6 font-bold">Result Summary</th>
                  <th className="py-3.5 px-6 font-bold">Payment Status</th>
                  <th className="py-3.5 px-6 text-right font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAEFF0]">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-[#7A8691]">
                      Loading submissions...
                    </td>
                  </tr>
                ) : responses.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-[#7A8691]">
                      No matching participant submissions found.
                    </td>
                  </tr>
                ) : (
                  responses.map((r) => {
                    const info = r.personalInfo || {};
                    const dateFormatted = r.createdAt
                      ? new Date(r.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "—";

                    // Result summary logic
                    let summaryText = "Completed";
                    if (r.computedResult?.overallState?.label_en) {
                      summaryText = r.computedResult.overallState.label_en;
                    } else if (r.computedResult?.hollandCode) {
                      summaryText = `Holland: ${r.computedResult.hollandCode.join("")}`;
                    } else if (r.computedResult?.composite) {
                      summaryText = `Index: ${r.computedResult.composite}%`;
                    } else if (r.computedResult?.total?.scoreDisplay) {
                      summaryText = `Score: ${r.computedResult.total.scoreDisplay}/5`;
                    } else if (r.computedResult?.total?.index) {
                      summaryText = `Index: ${r.computedResult.total.index}%`;
                    }

                    return (
                      <tr key={r._id} className="hover:bg-[#FAF7F2]/50 transition-colors">
                        <td className="py-4 px-6">
                          <div className="font-bold text-[#2C3338]">{info.name || "Anonymous Participant"}</div>
                          <div className="text-xs text-[#7A8691] font-mono">{info.email || "No email"}</div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="font-semibold text-[#2C3338] uppercase tracking-wider text-xs block">
                            {r.instrumentSlug}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-[#596573] whitespace-nowrap">
                          {dateFormatted}
                        </td>
                        <td className="py-4 px-6">
                          <span className="px-2.5 py-1 bg-[#FAF7F2] border border-[#EAEFF0] rounded-sm text-xs font-medium text-[#2C3338]">
                            {summaryText}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-sm text-[11px] font-bold uppercase tracking-wider border ${
                              r.paymentStatus === "paid"
                                ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                                : r.paymentStatus === "pending"
                                ? "bg-amber-50 text-amber-800 border-amber-200"
                                : "bg-blue-50 text-blue-800 border-blue-200"
                            }`}
                          >
                            {r.paymentStatus}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right whitespace-nowrap space-x-2">
                          {/* Toggle Payment button */}
                          <button
                            onClick={() => handleTogglePayment(r._id, r.paymentStatus)}
                            className="px-2.5 py-1 text-[11px] font-bold border border-[#EAEFF0] rounded-sm hover:border-[#2C3338] text-[#596573] hover:text-[#2C3338] transition-colors"
                          >
                            {r.paymentStatus === "paid" ? "Set Pending" : "Mark Paid"}
                          </button>

                          {/* Inspect Modal */}
                          <button
                            onClick={() => setSelectedResponse(r)}
                            className="px-2.5 py-1 text-[11px] font-bold bg-[#FAF7F2] border border-[#EAEFF0] rounded-sm text-[#2C3338] hover:bg-[#EAEFF0] transition-colors"
                          >
                            Inspect
                          </button>

                          {/* View Clinical Report in new tab */}
                          <Link
                            to={`/tests/${r.instrumentSlug}/result/${r._id}`}
                            target="_blank"
                            className="px-2.5 py-1 text-[11px] font-bold bg-[#2C3338] text-white rounded-sm hover:bg-black transition-colors"
                          >
                            Report ↗
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-4 border-t border-[#EAEFF0] flex justify-between items-center text-xs text-[#7A8691]">
            <span>
              Page {page} of {totalPages}
            </span>
            <div className="flex gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1.5 border border-[#EAEFF0] rounded-sm disabled:opacity-30 text-[#2C3338] font-bold"
              >
                Previous
              </button>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="px-3 py-1.5 border border-[#EAEFF0] rounded-sm disabled:opacity-30 text-[#2C3338] font-bold"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: TEST INSTRUMENTS & FEE CONTROL
          ========================================================================= */}
      {activeTab === "instruments" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {instruments.map((inst) => {
            const isEditing = editingSlug === inst.instrumentSlug;

            return (
              <div key={inst.instrumentSlug} className="bg-white border border-[#EAEFF0] p-6 rounded-sm shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="px-2 py-0.5 bg-[#FAF7F2] border border-[#EAEFF0] text-[10px] font-mono font-bold uppercase tracking-wider text-[#A38771]">
                      {inst.instrumentSlug}
                    </span>
                    <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-sm border ${inst.isActive ? "bg-emerald-50 text-emerald-800 border-emerald-200" : "bg-gray-50 text-gray-700 border-gray-200"}`}>
                      {inst.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-lg text-[#2C3338] mb-1">
                    {inst.instrumentName?.en || inst.instrumentName?.bn}
                  </h3>
                  <p className="text-xs text-[#7A8691] mb-4">
                    {inst.itemCount ?? 24} standardized items · {inst.estimatedMinutes?.[0] ?? 10}–{inst.estimatedMinutes?.[1] ?? 15} minutes
                  </p>

                  <div className="border-t border-[#EAEFF0] pt-4 mb-4 space-y-2 text-xs text-[#596573]">
                    <div className="flex justify-between">
                      <span>Total Submissions:</span>
                      <strong className="text-[#2C3338] font-mono">{inst.submissionCount ?? 0}</strong>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Assessment Fee:</span>
                      {isEditing ? (
                        <div className="flex items-center gap-1.5">
                          <input
                            type="number"
                            value={newPrice}
                            onChange={(e) => setNewPrice(Number(e.target.value))}
                            className="w-20 px-2 py-1 border border-[#A38771] text-xs font-mono rounded-sm outline-none"
                          />
                          <button
                            onClick={() => handleSavePrice(inst.instrumentSlug)}
                            className="px-2 py-1 bg-[#2C3338] text-white text-[10px] font-bold uppercase rounded-sm"
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <strong className="text-[#2C3338] font-serif text-sm">
                          {inst.price > 0 ? `৳ ${inst.price}` : "Free"}
                        </strong>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-2 border-t border-[#EAEFF0]">
                  <button
                    onClick={() => {
                      setEditingSlug(inst.instrumentSlug);
                      setNewPrice(inst.price || 0);
                    }}
                    className="flex-1 py-2 bg-[#FAF7F2] hover:bg-[#EAEFF0] border border-[#EAEFF0] text-[#2C3338] text-xs font-bold uppercase tracking-wider rounded-sm transition-colors"
                  >
                    Edit Fee
                  </button>
                  <Link
                    to={`/tests/${inst.instrumentSlug}`}
                    target="_blank"
                    className="py-2 px-3 border border-[#EAEFF0] hover:border-[#2C3338] text-[#596573] hover:text-[#2C3338] text-xs font-bold rounded-sm transition-colors"
                  >
                    View Page ↗
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* =========================================================================
          TAB 3: ANALYTICS & BREAKDOWN
          ========================================================================= */}
      {activeTab === "analytics" && (
        <div className="space-y-6">
          <div className="bg-white p-6 sm:p-8 border border-[#EAEFF0] rounded-sm shadow-sm">
            <h3 className="font-serif font-bold text-lg text-[#2C3338] mb-6">
              Submission Distribution Across Assessment Batteries
            </h3>

            <div className="space-y-4">
              {statsData?.instrumentBreakdown?.map((item: any) => {
                const total = stats.totalResponses || 1;
                const pct = Math.round((item.count / total) * 100);

                return (
                  <div key={item.slug} className="p-4 bg-[#FAF7F2] border border-[#EAEFF0] rounded-sm">
                    <div className="flex justify-between items-center text-xs sm:text-sm font-semibold mb-2">
                      <span className="text-[#2C3338]">{item.name} ({item.slug.toUpperCase()})</span>
                      <span className="font-mono text-[#A38771]">{item.count} submissions ({pct}%)</span>
                    </div>
                    <div className="w-full h-2 bg-[#EAEFF0] rounded-full overflow-hidden">
                      <div className="h-full bg-[#A38771]" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          INSPECT PARTICIPANT RESPONSE MODAL
          ========================================================================= */}
      {selectedResponse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white border border-[#EAEFF0] max-w-2xl w-full max-h-[85vh] overflow-y-auto rounded-sm shadow-2xl p-6 sm:p-8">
            <div className="flex justify-between items-start border-b border-[#EAEFF0] pb-4 mb-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#A38771] font-bold">
                  Submission ID: {selectedResponse._id}
                </span>
                <h3 className="text-xl font-serif font-bold text-[#2C3338] mt-1">
                  {selectedResponse.personalInfo?.name || "Anonymous Participant"}
                </h3>
              </div>
              <button
                onClick={() => setSelectedResponse(null)}
                className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#EAEFF0] flex items-center justify-center text-[#596573] hover:text-[#2C3338]"
              >
                ✕
              </button>
            </div>

            {/* Participant Demographics */}
            <div className="bg-[#FAF7F2] p-4 rounded-sm border border-[#EAEFF0] mb-6 grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[#7A8691] block uppercase text-[10px] font-bold">Email:</span>
                <strong className="text-[#2C3338] font-mono">{selectedResponse.personalInfo?.email || "N/A"}</strong>
              </div>
              <div>
                <span className="text-[#7A8691] block uppercase text-[10px] font-bold">Test Slug:</span>
                <strong className="text-[#2C3338] uppercase font-mono">{selectedResponse.instrumentSlug}</strong>
              </div>
              <div>
                <span className="text-[#7A8691] block uppercase text-[10px] font-bold">Age Range:</span>
                <strong className="text-[#2C3338]">{selectedResponse.personalInfo?.age || "18+"}</strong>
              </div>
              <div>
                <span className="text-[#7A8691] block uppercase text-[10px] font-bold">Payment Status:</span>
                <strong className="text-[#2C3338] uppercase font-mono">{selectedResponse.paymentStatus}</strong>
              </div>
            </div>

            {/* Computed Result JSON Summary */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#A38771] mb-2">
                Computed Diagnostic Result
              </h4>
              <div className="bg-[#FAF7F2] p-4 rounded-sm border border-[#EAEFF0] text-xs font-mono max-h-48 overflow-y-auto">
                <pre>{JSON.stringify(selectedResponse.computedResult, null, 2)}</pre>
              </div>
            </div>

            {/* Raw Answers */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#A38771] mb-2">
                Raw Item Responses ({Object.keys(selectedResponse.answers || {}).length} items)
              </h4>
              <div className="bg-[#FAF7F2] p-4 rounded-sm border border-[#EAEFF0] text-xs font-mono max-h-36 overflow-y-auto">
                <pre>{JSON.stringify(selectedResponse.answers, null, 2)}</pre>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-[#EAEFF0]">
              <button
                onClick={() => setSelectedResponse(null)}
                className="px-5 py-2.5 border border-[#EAEFF0] text-xs font-bold uppercase tracking-wider rounded-sm text-[#596573]"
              >
                Close
              </button>
              <Link
                to={`/tests/${selectedResponse.instrumentSlug}/result/${selectedResponse._id}`}
                target="_blank"
                className="px-6 py-2.5 bg-[#2C3338] text-white text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-black transition-colors"
              >
                Open Full Clinical Report ↗
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}