import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
  head: () => ({
    meta: [
      { title: "Admin Sign In — Atlas Houston" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    });
  }, [navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/admin` },
      });
      setLoading(false);
      if (error) return setMsg(error.message);
      setMsg("Account created. Check your email to confirm, then sign in.");
      setMode("signin");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (error) return setMsg(error.message);
      navigate({ to: "/admin" });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <Link to="/" className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-primary">
          ← Back to site
        </Link>
        <h1 className="font-serif text-4xl md:text-5xl mt-6 mb-2 tracking-tight">
          {mode === "signin" ? "Admin Sign In" : "Create Admin Account"}
        </h1>
        <p className="text-muted-foreground text-sm mb-8">
          Atlas Houston internal dashboard.
        </p>

        <form onSubmit={submit} className="space-y-5">
          <div>
            <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground block mb-2">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border border-border focus:border-primary outline-none px-3 py-3"
            />
          </div>
          <div>
            <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground block mb-2">
              Password
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border border-border focus:border-primary outline-none px-3 py-3"
            />
          </div>
          {msg && (
            <p className="text-sm text-primary font-mono uppercase tracking-widest">{msg}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-4 bg-primary text-primary-foreground font-mono text-[11px] uppercase tracking-widest font-bold hover:bg-foreground hover:text-background transition-colors disabled:opacity-50"
          >
            {loading ? "Please wait…" : mode === "signin" ? "Sign In" : "Create Account"}
          </button>
        </form>

        <button
          onClick={() => {
            setMode(mode === "signin" ? "signup" : "signin");
            setMsg(null);
          }}
          className="mt-6 font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-primary"
        >
          {mode === "signin"
            ? "Need an account? Create one →"
            : "Already have an account? Sign in →"}
        </button>
      </div>
    </div>
  );
}
