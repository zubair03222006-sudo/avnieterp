// SUPABASE TEMPORARILY DISABLED — re-enable by uncommenting the import below
// import { supabase } from "@/integrations/supabase/client";
const supabase = null as any; // no-op stub

export interface ResultCheckLog {
  id: string;
  roll: string;
  name: string;
  branch: string;
  semester: string;
  overall: string;
  gpa: number | null;
  checked_at: string;
}

const STORAGE_KEY = "avn_checked_results_logs";

// Retrieve locally saved logs
export function getLocalLogs(): ResultCheckLog[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// Save log to both Supabase and localStorage
export async function logResultCheck(student: {
  roll: string;
  name: string;
  branch: string;
  semester: string;
  overall: string;
  gpa: number | null;
}): Promise<void> {
  const newEntry: ResultCheckLog = {
    id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    roll: student.roll,
    name: student.name,
    branch: student.branch,
    semester: student.semester,
    overall: student.overall,
    gpa: student.gpa,
    checked_at: new Date().toISOString(),
  };

  // 1. Store in localStorage so /admin immediately has the data
  try {
    const existing = getLocalLogs();
    const updated = [newEntry, ...existing.filter((e) => e.roll !== newEntry.roll || e.checked_at !== newEntry.checked_at)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated.slice(0, 500)));
  } catch (err) {
    console.warn("Failed saving log locally:", err);
  }

  // 2. Also send to Supabase 'checked_results' table
  if (!supabase) return; // disabled — reconnect Supabase and redeploy to enable
  try {
    const client = supabase as any;
    const { error } = await client.from("checked_results").insert([
      {
        roll: student.roll,
        name: student.name,
        branch: student.branch,
        semester: student.semester,
        overall: student.overall,
        gpa: student.gpa,
        checked_at: newEntry.checked_at,
      },
    ]);
    if (error) {
      console.info("Supabase table insert notice:", error.message);
    }
  } catch (e) {
    console.info("Supabase sync notice:", e);
  }
}

// Fetch all logs: attempts Supabase first, merges with local logs
export async function fetchAllLogs(): Promise<ResultCheckLog[]> {
  const local = getLocalLogs();

  if (!supabase) return local; // disabled — reconnect Supabase to enable cross-device sync
  try {
    const client = supabase as any;
    const { data, error } = await client
      .from("checked_results")
      .select("*")
      .order("checked_at", { ascending: false });

    if (!error && data && Array.isArray(data) && data.length > 0) {
      const idSet = new Set(data.map((d: any) => `${d.roll}_${d.checked_at}`));
      const uniqueLocal = local.filter((l) => !idSet.has(`${l.roll}_${l.checked_at}`));
      return [...data, ...uniqueLocal];
    }
  } catch (e) {
    console.info("Supabase fetch notice:", e);
  }

  return local;
}

export function clearLocalLogs(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY);
  }
}
