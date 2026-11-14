import studentsRaw from "./students.json";
import { SUBJECT_CODES, calculateGPA } from "./subjectCodes";
import { DEMO_STUDENTS } from "./demoStudents";

export interface StudentGrade {
  subject: string;
  subjectCode: string;
  grade: string;
  result: string;
  credits: number;
}

export interface StudentRecord {
  roll: string;
  name: string;
  branch: string;
  semester: string;
  examDetails: string;
  overall: "PASS" | "FAIL";
  gpa: number | null;
  grades: StudentGrade[];
  isDemo: boolean;
}

function getSubjectCode(branch: string, subject: string): string {
  return SUBJECT_CODES[branch]?.[subject] ?? "GEN000";
}

function getCredits(subject: string): number {
  if (subject.toLowerCase().includes("lab") || subject.toLowerCase().includes("workshop")) return 1;
  if (
    subject.toLowerCase().includes("mathematics") ||
    subject.toLowerCase().includes("calculus") ||
    subject.toLowerCase().includes("differential")
  )
    return 4;
  return 3;
}

// Build roster from CSV-parsed JSON (873 students)
const rosterStudents: StudentRecord[] = (studentsRaw as any[]).map((s) => {
  const grades: StudentGrade[] = s.grades.map((g: any) => ({
    subject: g.subject,
    subjectCode: getSubjectCode(s.branch, g.subject),
    grade: g.grade,
    result: g.result,
    credits: getCredits(g.subject),
  }));

  const failGrades = grades.filter((g) => g.result === "FAIL");
  const hasAnyFail = failGrades.length > 0;
  const gpa = hasAnyFail ? null : calculateGPA(grades.map((g) => ({ grade: g.grade, result: g.result })));

  return {
    roll: s.roll.toUpperCase(),
    name: s.name,
    branch: s.branch,
    semester: "I/IV I SEM",
    examDetails: "B.Tech I Year I Semester — February 2026",
    overall: s.overall as "PASS" | "FAIL",
    gpa: gpa,
    grades,
    isDemo: false,
  };
});

// All students map (including the 4 priority requested students as main full records)
const allStudentsMap = new Map<string, StudentRecord>();

// Insert regular roster students
rosterStudents.forEach((s) => allStudentsMap.set(s.roll.toUpperCase(), s));

// Insert the priority student records as full main records (isDemo: false)
DEMO_STUDENTS.forEach((d) => {
  allStudentsMap.set(d.roll.toUpperCase(), {
    ...d,
    isDemo: false,
  });
});

export function findStudent(hallTicket: string): StudentRecord | null {
  return allStudentsMap.get(hallTicket.toUpperCase().trim()) ?? null;
}

export function validateLogin(hallTicket: string, password: string): StudentRecord | null {
  // Password equals the hall ticket number (case-insensitive)
  if (hallTicket.trim().toUpperCase() !== password.trim().toUpperCase()) return null;
  return findStudent(hallTicket);
}

export { allStudentsMap, rosterStudents };
