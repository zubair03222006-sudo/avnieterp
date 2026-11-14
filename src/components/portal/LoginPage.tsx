import { useState } from "react";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { validateLogin } from "@/data/studentStore";
import type { StudentRecord } from "@/data/studentStore";
import { logResultCheck } from "@/data/resultsLogger";

interface LoginPageProps {
  onLogin: (student: StudentRecord) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [hallTicket, setHallTicket] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!hallTicket.trim()) {
      setError("Please enter your Hall Ticket Number.");
      return;
    }
    if (!password.trim()) {
      setError("Please enter your password.");
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    const student = validateLogin(hallTicket, password);
    setLoading(false);

    if (!student) {
      setError("Invalid Hall Ticket Number or Password. Only registered students can access.");
      return;
    }
    // Asynchronously log the checked result to Supabase & local admin registry
    logResultCheck(student).catch(() => {});
    onLogin(student);
  };

  return (
    <div className="min-h-screen bg-[#edf2f9] flex flex-col font-sans">
      {/* Top Banner */}
      <header className="w-full bg-[#201c4b] shadow-sm">
        <div className="w-full max-w-6xl mx-auto flex items-center justify-center">
          <img
            src="/avn-banner.png"
            alt="AVN Institute of Engineering & Technology"
            className="w-full max-h-[110px] md:max-h-[130px] object-contain object-center"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/avn-banner.jpg";
            }}
          />
        </div>
        {/* Dark Navy Subheader Strip */}
        <div className="bg-[#0e214d] text-white text-center py-2 text-xs md:text-sm font-medium tracking-wide">
          B.Tech I Year I Semester Examination Results
        </div>
      </header>

      {/* Main Content with ERP-Style Login Card */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-10">
        <div className="w-full max-w-[420px]">
          <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-200/80 p-8 sm:p-9">
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">Student Login</h1>
            <p className="text-xs text-gray-500 mt-1 mb-6 leading-relaxed">
              Use your hall ticket number as username and password.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Error Message */}
              {error && (
                <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg p-3 text-xs text-red-700">
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Username Input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-gray-700" htmlFor="hallticket">
                  Username
                </label>
                <div className="relative">
                  <input
                    id="hallticket"
                    type="text"
                    value={hallTicket}
                    onChange={(e) => setHallTicket(e.target.value.toUpperCase())}
                    placeholder="Enter Hall Ticket Number"
                    autoComplete="username"
                    className="w-full px-3.5 py-2.5 bg-[#eef3fb] border border-[#d6e2f3] rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0e214d] focus:bg-white transition-all font-mono uppercase placeholder:font-sans placeholder:normal-case placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-gray-700" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password"
                    autoComplete="current-password"
                    className="w-full px-3.5 pr-10 py-2.5 bg-[#eef3fb] border border-[#d6e2f3] rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0e214d] focus:bg-white transition-all placeholder:text-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-2.5 bg-[#0e214d] hover:bg-[#091636] active:bg-[#050e24] text-white font-semibold text-sm rounded-lg transition-colors shadow-sm disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Signing In…
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-3 text-center text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-center gap-2">
        <span>© AVN Institute of Engineering & Technology · Autonomous Institution Affiliated to JNTUH</span>
        <span className="hidden sm:inline text-gray-300">|</span>
        <a href="/admin" className="text-gray-400 hover:text-gray-600 transition-colors underline">
          Admin Portal
        </a>
      </footer>
    </div>
  );
}
