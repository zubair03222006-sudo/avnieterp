import { createFileRoute } from "@tanstack/react-router";
import AdminPage from "@/components/portal/AdminPage";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "AVN Examination Admin — Checked Results" },
      { name: "description", content: "AVN Institute Admin Portal for viewing checked student results." },
    ],
  }),
  component: AdminPage,
});
