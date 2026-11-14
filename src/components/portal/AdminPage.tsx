import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Users, Search, RefreshCw, Trash2, ArrowLeft, CheckCircle, XCircle, Database } from "lucide-react";
import { fetchAllLogs, clearLocalLogs } from "@/data/resultsLogger";
import type { ResultCheckLog } from "@/data/resultsLogger";

export default function AdminPage() {
  const [logs, setLogs] = useState<ResultCheckLog[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const loadLogs = async () => {
    setLoading(true);
    const data = await fetchAllLogs();
    setLogs(data);
    setLoading(false);
  };

  useEffect(() => {
    loadLogs();
  }, []);

  const handleClear = () => {
    if (confirm("Are you sure you want to clear saved logs?")) {
      clearLocalLogs();
      setLogs([]);
    }
  };

  const filteredLogs = logs.filter((log) => {
    const q = search.toLowerCase();
    return (
      log.roll.toLowerCase().includes(q) ||
      log.name.toLowerCase().includes(q) ||
      log.branch.toLowerCase().includes(q)
    );
  });

  const passedCount = filteredLogs.filter((l) => l.overall === "PASS").length;
  const failedCount = filteredLogs.filter((l) => l.overall === "FAIL").length;

  return (
    <div className="min-h-screen bg-[#edf2f9] flex flex-col font-sans">
      {/* Header */}
      <header className="bg-[#201c4b] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="flex items-center gap-1.5 text-xs bg-white/10 hover:bg-white/20 text-white px-2.5 py-1.5 rounded transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Portal</span>
            </Link>
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-amber-400" />
              <h1 className="text-base md:text-lg font-bold tracking-tight">
                AVN Examination Admin — Checked Results Registry
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={loadLogs}
              disabled={loading}
              className="flex items-center gap-1.5 text-xs bg-blue-600/80 hover:bg-blue-600 px-3 py-1.5 rounded transition-colors"
              title="Refresh Logs"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </button>
            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 text-xs bg-red-600/80 hover:bg-red-600 px-3 py-1.5 rounded transition-colors"
              title="Clear Local Records"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Clear</span>
            </button>
          </div>
        </div>
        <div className="bg-[#0e214d] px-4 py-1.5 text-xs text-blue-200 text-center font-medium">
          Connected to Supabase Database (Project: <span className="font-mono text-white">smirriscvsjkcsobbovo</span>)
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl w-full mx-auto px-4 py-6 flex-1 space-y-6">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-500 uppercase">Total Result Views</div>
              <div className="text-2xl font-bold text-gray-900">{filteredLogs.length}</div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-500 uppercase">Passed Students</div>
              <div className="text-2xl font-bold text-emerald-700">{passedCount}</div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center">
              <XCircle className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-500 uppercase">Failed / Backlog Students</div>
              <div className="text-2xl font-bold text-rose-700">{failedCount}</div>
            </div>
          </div>
        </div>

        {/* Table & Controls */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by Hall Ticket, Name, Branch..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0e214d]"
              />
            </div>
            <div className="text-xs text-gray-500 font-medium">
              Showing <strong>{filteredLogs.length}</strong> checked result records
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 text-gray-700 border-b border-gray-200 text-left font-semibold">
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Hall Ticket (Roll)</th>
                  <th className="px-4 py-3">Student Name</th>
                  <th className="px-4 py-3">Branch</th>
                  <th className="px-4 py-3">Semester</th>
                  <th className="px-4 py-3 text-center">Status</th>
                  <th className="px-4 py-3 text-center">CGPA</th>
                  <th className="px-4 py-3 text-right">Checked Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan={8} className="text-center py-10 text-gray-500 text-xs">
                      Loading checked results from database...
                    </td>
                  </tr>
                ) : filteredLogs.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-12 text-gray-500 text-xs">
                      <div className="flex flex-col items-center justify-center gap-1">
                        <Users className="w-8 h-8 text-gray-300" />
                        <span className="font-semibold text-gray-600 mt-2">No student result views logged yet.</span>
                        <span className="text-[11px] text-gray-400">
                          Whenever any student checks their result on the portal, it will be automatically logged here.
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredLogs.map((log, index) => {
                    const isPass = log.overall === "PASS";
                    const dateStr = new Date(log.checked_at).toLocaleString();
                    return (
                      <tr key={log.id || index} className="hover:bg-blue-50/40 transition-colors">
                        <td className="px-4 py-3 text-gray-400 font-medium">{index + 1}</td>
                        <td className="px-4 py-3 font-mono font-bold text-gray-900">{log.roll}</td>
                        <td className="px-4 py-3 font-semibold text-gray-800">{log.name}</td>
                        <td className="px-4 py-3 text-gray-600">{log.branch}</td>
                        <td className="px-4 py-3 text-gray-600">{log.semester}</td>
                        <td className="px-4 py-3 text-center">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-bold ${
                              isPass ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
                            }`}
                          >
                            {log.overall}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center font-bold text-gray-800">
                          {log.gpa !== null ? Number(log.gpa).toFixed(2) : "—"}
                        </td>
                        <td className="px-4 py-3 text-right text-gray-500 font-mono text-[11px] whitespace-nowrap">
                          {dateStr}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-3 text-center text-xs text-gray-500 border-t border-slate-200">
        AVN Institute of Engineering & Technology — Supabase Cloud Admin
      </footer>
    </div>
  );
}
