import { createFileRoute, Navigate } from "@tanstack/react-router";

// Legacy auth route — admin now uses a PIN at /admin
export const Route = createFileRoute("/auth")({
  component: () => <Navigate to="/admin" replace />,
  head: () => ({
    meta: [{ name: "robots", content: "noindex,nofollow" }],
  }),
});
