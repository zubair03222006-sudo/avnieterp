import { LogOut, User, BookOpen, AlertTriangle, Printer } from "lucide-react";
import type { StudentRecord } from "@/data/studentStore";

interface DashboardProps {
  student: StudentRecord;
  onLogout: () => void;
}

export default function Dashboard({ student, onLogout }: DashboardProps) {
  const passedCount = student.grades.filter((g) => g.result === "PASS").length;
  const failedCount = student.grades.filter((g) => g.result === "FAIL").length;
  const totalSubjects = student.grades.length;
  const totalCredits = student.grades.reduce((sum, g) => sum + g.credits, 0).toFixed(2);
  const isPass = student.overall === "PASS";

  const branchDisplay: Record<string, string> = {
    "AI & DS": "Artificial Intelligence & Data Science",
    "CSE": "Computer Science & Engineering",
    "CSE(AI&ML)": "CSE (Artificial Intelligence & Machine Learning)",
    "CSE(DS)": "CSE (Data Science)",
    "CS(CS)": "Computer Science (Cyber Security)",
    "ECE": "Electronics & Communication Engineering",
    "CE": "Civil Engineering",
    "ME": "Mechanical Engineering",
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#f7f9fc] flex flex-col font-sans">
      {/* Top Banner Header */}
      <header className="w-full bg-[#201c4b] shadow-sm print:hidden">
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
        {/* Navy Subheader Strip with Logout */}
        <div className="bg-[#0e214d] text-white py-2 px-4 shadow">
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
            <span className="text-xs md:text-sm font-medium tracking-wide">
              B.Tech I Year I Semester Examination Results — February 2026
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-medium px-3 py-1 rounded transition-colors"
                title="Print Result"
              >
                <Printer className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Print</span>
              </button>
              <button
                onClick={onLogout}
                className="flex items-center gap-1.5 bg-red-600/80 hover:bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-3 sm:px-6 py-6 space-y-6">
        {/* Student Information Profile Card */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-300 overflow-hidden">
          <div className="bg-[#0e214d] px-4 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-white font-semibold text-xs sm:text-sm uppercase tracking-wide">
              <User className="w-4 h-4 text-blue-200" />
              <span>Student Profile Details</span>
            </div>
            <span className="text-[11px] font-mono text-blue-200 font-bold bg-white/10 px-2 py-0.5 rounded">
              Regulation: R25
            </span>
          </div>
          <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs sm:text-sm">
            <div>
              <span className="text-gray-500 text-[11px] uppercase tracking-wider block font-medium">Student Name</span>
              <span className="text-gray-900 font-bold mt-0.5 block">{student.name}</span>
            </div>
            <div>
              <span className="text-gray-500 text-[11px] uppercase tracking-wider block font-medium">Hall Ticket No.</span>
              <span className="text-gray-900 font-bold font-mono text-sm mt-0.5 block">{student.roll}</span>
            </div>
            <div>
              <span className="text-gray-500 text-[11px] uppercase tracking-wider block font-medium">Branch / Department</span>
              <span className="text-gray-900 font-semibold mt-0.5 block">
                {branchDisplay[student.branch] || student.branch}
              </span>
            </div>
            <div>
              <span className="text-gray-500 text-[11px] uppercase tracking-wider block font-medium">Semester &amp; Exam</span>
              <span className="text-gray-900 font-semibold mt-0.5 block">
                {student.semester} ({student.examDetails})
              </span>
            </div>
          </div>
        </div>

        {/* Authentic ERP Results Section (Matching avnieterp.in layout exactly) */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-300 p-4 sm:p-6 space-y-4">
          {/* Centered Heading */}
          <h2 className="text-center font-bold text-black text-lg md:text-xl tracking-tight">
            Overall Marks - Semwise
          </h2>

          {/* Three Key Metrics in Red Bold Font */}
          <div className="border-t border-b border-gray-200 py-2.5 flex flex-wrap items-center justify-around gap-4 text-center">
            <div className="text-red-600 font-bold text-sm sm:text-base md:text-lg">
              Final CGPA : <span className="underline decoration-red-400 underline-offset-4">{student.gpa !== null ? student.gpa.toFixed(2) : "N/A"}</span>
            </div>
            <div className="text-red-600 font-bold text-sm sm:text-base md:text-lg">
              Total Credits : <span>{totalCredits}</span>
            </div>
            <div className="text-red-600 font-bold text-sm sm:text-base md:text-lg">
              Due Subjects : <span>{failedCount}/{totalSubjects}</span>
            </div>
          </div>

          {/* Select the Semester Box */}
          <div className="pt-2">
            <fieldset className="border border-[#c5a32b] px-3 py-2 inline-block bg-amber-50/20 rounded">
              <legend className="text-xs text-[#a21caf] font-bold px-1.5">
                Select the Semester
              </legend>
              <button
                type="button"
                className="bg-[#6b146e] hover:bg-[#58105a] text-white font-bold text-xs sm:text-sm px-4 py-1.5 rounded shadow transition-colors"
              >
                I/IV I SEM
              </button>
            </fieldset>
          </div>

          {/* Blue Centered Indicator */}
          <div className="text-center py-1">
            <h3 className="text-[#0026e6] font-bold text-base sm:text-lg tracking-wide">
              You are Seeing - {student.semester} Results
            </h3>
          </div>

          {/* Grade Details Fieldset Table */}
          <fieldset className="border border-[#eab308] p-0 rounded overflow-hidden">
            <legend className="text-xs text-[#a21caf] font-bold px-2 ml-2">
              Grade Details
            </legend>
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm border-collapse border border-black">
                <thead>
                  <tr className="border border-black">
                    <th className="bg-[#f59e0b] border border-black px-2 py-2 text-center font-bold text-black w-12">
                      SlNo
                    </th>
                    <th className="bg-[#f59e0b] border border-black px-3 py-2 text-center font-bold text-black whitespace-nowrap">
                      Exam Code
                    </th>
                    <th className="bg-[#ea580c] border border-black px-4 py-2 text-center font-bold text-black min-w-[220px]">
                      Subject ( No of Attempts )
                    </th>
                    <th className="bg-[#f59e0b] border border-black px-3 py-2 text-center font-bold text-black whitespace-nowrap">
                      Month &amp; Year
                    </th>
                    <th className="bg-[#f59e0b] border border-black px-3 py-2 text-center font-bold text-black w-24">
                      FinalGrade
                    </th>
                    <th className="bg-[#f59e0b] border border-black px-3 py-2 text-center font-bold text-black w-20">
                      Credits
                    </th>
                    <th className="bg-[#f59e0b] border border-black px-3 py-2 text-center font-bold text-black w-20">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {student.grades.map((item, index) => {
                    const isFail = item.result === "FAIL" || item.grade === "F";
                    return (
                      <tr
                        key={index}
                        className={`border border-black transition-colors ${
                          isFail ? "bg-red-50/40" : index % 2 === 0 ? "bg-white" : "bg-slate-50/60"
                        } hover:bg-amber-50/50`}
                      >
                        <td className="border border-black px-2 py-1.5 text-center font-medium text-black">
                          {index + 1}
                        </td>
                        <td className="border border-black px-3 py-1.5 text-center font-mono font-bold text-black">
                          {item.subjectCode}
                        </td>
                        <td className="border border-black px-4 py-1.5 text-left font-medium text-black">
                          {item.subject}
                        </td>
                        <td className="border border-black px-3 py-1.5 text-center text-black">
                          February 2026
                        </td>
                        <td className="border border-black px-3 py-1.5 text-center font-bold text-black">
                          <span
                            className={`inline-block px-2 py-0.5 rounded ${
                              item.grade === "O"
                                ? "bg-emerald-100 text-emerald-900"
                                : item.grade.startsWith("A")
                                ? "bg-teal-100 text-teal-900"
                                : item.grade.startsWith("B")
                                ? "bg-blue-100 text-blue-900"
                                : isFail
                                ? "bg-red-200 text-red-900 font-extrabold"
                                : "bg-gray-100 text-gray-900"
                            }`}
                          >
                            {item.grade}
                          </span>
                        </td>
                        <td className="border border-black px-3 py-1.5 text-center font-medium text-black">
                          {item.credits.toFixed(2)}
                        </td>
                        <td
                          className={`border border-black px-3 py-1.5 text-center font-bold ${
                            isFail ? "text-red-600 bg-red-100/50" : "text-black"
                          }`}
                        >
                          {item.result}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </fieldset>

          {/* Grade Legend Scale */}
          <div className="pt-2 text-[11px] text-gray-600 bg-slate-50 border border-slate-200 rounded p-2.5 flex flex-wrap items-center justify-between gap-2">
            <span className="font-bold text-gray-800">Grading Scale (10-Point):</span>
            <span><strong>O</strong>: Outstanding (10)</span>
            <span><strong>A+</strong>: Excellent (9)</span>
            <span><strong>A</strong>: Very Good (8)</span>
            <span><strong>B+</strong>: Good (7)</span>
            <span><strong>B</strong>: Above Average (6)</span>
            <span><strong>C</strong>: Average (5)</span>
            <span><strong>D</strong>: Pass (4)</span>
            <span className="text-red-600 font-bold"><strong>F</strong>: Fail (0)</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#0e214d] text-blue-200 text-center py-2.5 text-xs mt-6 print:hidden">
        © 2026 AVN Institute of Engineering &amp; Technology · Autonomous Institution Affiliated to JNTUH · All rights reserved.
      </footer>
    </div>
  );
}
