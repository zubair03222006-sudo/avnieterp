// Branch-wise subject codes for I/IV I SEM (February 2026)
// These are assigned based on the standard AVN Institute curriculum.

export const SUBJECT_CODES: Record<string, Record<string, string>> = {
  "AI & DS": {
    "Data Structures": "DS101",
    "Mathematics": "MA101",
    "Basic Electrical Engineering": "EE101",
    "Engineering Drawing and Computer-Aided Drafting": "ED101",
    "Chemistry": "CH101",
    "Basic Electrical Engineering Lab": "EEL101",
    "Data Structures Lab": "DSL101",
    "Chemistry Lab": "CHL101",
    "Python Programming Lab": "PPL101",
  },
  "CSE": {
    "Engineering Drawing and Computer-Aided Drafting": "ED101",
    "Ordinary Differential Equations and Vector Calculus": "MA201",
    "Advanced Engineering Physics": "PH201",
    "Electronic Devices and Circuits": "EC201",
    "Data Structures Lab": "DSL101",
    "Python Programming Lab": "PPL101",
    "Advanced Engineering Physics Lab": "PHL201",
    "Information Technology Workshop Lab": "ITW201",
    "Engineering Workshop Lab": "EWL201",
  },
  "CSE(AI&ML)": {
    "Data Structures": "DS101",
    "Basic Electrical Engineering": "EE101",
    "English": "EN101",
    "Ordinary Differential Equations and Vector Calculus": "MA201",
    "Advanced Engineering Physics": "PH201",
    "Basic Electrical Engineering Lab": "EEL101",
    "Data Structures Lab": "DSL101",
    "Python Programming Lab": "PPL101",
    "English Language and Communication Skills Lab": "ENL101",
    "Advanced Engineering Physics Lab": "PHL201",
  },
  "CSE(DS)": {
    "Data Structures": "DS101",
    "Mathematics": "MA101",
    "Basic Electrical Engineering": "EE101",
    "Engineering Drawing and Computer-Aided Drafting": "ED101",
    "Chemistry": "CH101",
    "Basic Electrical Engineering Lab": "EEL101",
    "Data Structures Lab": "DSL101",
    "Chemistry Lab": "CHL101",
    "Python Programming Lab": "PPL101",
  },
  "CS(CS)": {
    "Data Structures": "DS101",
    "Basic Electrical Engineering": "EE101",
    "Chemistry": "CH101",
    "Matrices and Calculus": "MA102",
    "English": "EN101",
    "English Language and Communication Skills": "EN102",
    "Basic Electrical Engineering Lab": "EEL101",
    "Data Structures Lab": "DSL101",
    "Python Programming Lab": "PPL101",
    "English Language and Communication Skills Lab": "ENL101",
  },
  "ECE": {
    "Data Structures": "DS101",
    "Mathematics": "MA101",
    "Chemistry": "CH101",
    "Python Programming": "PP101",
    "Network Analysis and Synthesis": "EC101",
    "Basic Electrical Engineering Lab": "EEL101",
    "Data Structures Lab": "DSL101",
    "Chemistry Lab": "CHL101",
    "Python Programming Lab": "PPL101",
    "Engineering Workshop Lab": "EWL201",
  },
  "CE": {
    "Engineering Drawing and Computer-Aided Drafting": "ED101",
    "Applied Chemistry": "CH102",
    "Thermodynamics": "ME101",
    "Python Programming": "PP101",
    "Chemistry Lab": "CHL101",
    "Python Programming Lab": "PPL101",
  },
  "ME": {
    "Engineering Drawing and Computer-Aided Drafting": "ED101",
    "Applied Chemistry": "CH102",
    "Thermodynamics": "ME101",
    "Python Programming": "PP101",
    "Chemistry Lab": "CHL101",
    "Python Programming Lab": "PPL101",
  },
};

export const GRADE_POINTS: Record<string, number> = {
  "O": 10,
  "A+": 9,
  "A": 8,
  "B+": 7,
  "B": 6,
  "C": 5,
  "D": 4,
  "F": 0,
};

export const GRADE_LABEL: Record<string, string> = {
  "O": "Outstanding",
  "A+": "Excellent",
  "A": "Very Good",
  "B+": "Good",
  "B": "Above Average",
  "C": "Average",
  "D": "Pass",
  "F": "Fail",
};

export function calculateGPA(grades: { grade: string; result: string }[]): number {
  const validGrades = grades.filter(g => g.grade && g.grade !== "");
  if (validGrades.length === 0) return 0;
  const totalPoints = validGrades.reduce((sum, g) => sum + (GRADE_POINTS[g.grade] ?? 0), 0);
  return Math.round((totalPoints / validGrades.length) * 100) / 100;
}
