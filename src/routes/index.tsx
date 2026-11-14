import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import LoginPage from "@/components/portal/LoginPage";
import Dashboard from "@/components/portal/Dashboard";
import type { StudentRecord } from "@/data/studentStore";

export const Route = createFileRoute("/")(({
  head: () => ({
    meta: [
      { title: "AVN Institute — Student Results Portal" },
      { name: "description", content: "AVN Institute of Engineering & Technology — B.Tech I Year I Semester Examination Results Portal" },
    ],
  }),
  component: Index,
}));

function Index() {
  const [student, setStudent] = useState<StudentRecord | null>(null);

  const handleLogout = () => setStudent(null);

  if (student) {
    return <Dashboard student={student} onLogout={handleLogout} />;
  }

  return <LoginPage onLogin={setStudent} />;
}
