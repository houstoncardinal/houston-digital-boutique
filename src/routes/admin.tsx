import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import {
  KeyRound, LogOut, LayoutDashboard, Inbox, Users, Briefcase,
  CreditCard, LifeBuoy, Menu, X,
} from "lucide-react";
import { adminVerifyPin } from "@/lib/admin.functions";
import { AdminContext } from "@/components/admin/AdminContext";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
  head: () => ({
    meta: [
      { title: "Admin Hub — Atlas Houston" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
});

const PIN_KEY = "atlas_admin_pin";

const NAV: { to: string; label: string; icon: typeof LayoutDashboard; exact?: boolean }[] = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/admin/leads", label: "Leads", icon: Inbox },
  { to: "/admin/clients", label: "Clients", icon: Users },
  { to: "/admin/projects", label: "Projects", icon: Briefcase },
  { to: "/admin/payments", label: "Payments", icon: CreditCard },
  { to: "/admin/support", label: "Support", icon: LifeBuoy },
];

function AdminLayout() {
  const verifyPin = useServerFn(adminVerifyPin);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const [pin, setPin] = useState<string | null>(null);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? sessionStorage.getItem(PIN_KEY) : null;
    if (stored) {
      void (async () => {
        try {
          await verifyPin({ data: { pin: stored } });
          setPin(stored);
        } catch {
          sessionStorage.removeItem(PIN_KEY);
        }
      })();
    }
  }, [verifyPin]);

  const submitPin = async (e: React.FormEvent) => {
    e.preventDefault();
    setVerifying(true);
    setPinError(null);
    try {
      await verifyPin({ data: { pin: pinInput } });
      sessionStorage.setItem(PIN_KEY, pinInput);
      setPin(pinInput);
    } catch {
      setPinError("Incorrect PIN. Try again.");
      setPinInput("");
    } finally {
      setVerifying(false);
    }
  };

  const signOut = () => {
    sessionStorage.removeItem(PIN_KEY);
    setPin(null);
    setPinInput("");
  };

  if (!pin) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-5 py-10">
        <div className="w-full max-w-sm">
          <Link to="/" className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-primary">
            ← Back to site
          </Link>
          <div className="mt-8 flex items-center gap-3">
            <KeyRound className="text-primary" size={20} />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">// Atlas Admin Hub</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl mt-4 mb-2 tracking-tight leading-tight">Enter access PIN</h1>
          <p className="text-muted-foreground text-sm mb-8">
            Secure hub for leads, clients, projects, payments and support.
          </p>
          <form onSubmit={submitPin} className="space-y-5">
            <input
              type="password" inputMode="numeric" autoComplete="one-time-code" autoFocus required
              value={pinInput} onChange={(e) => setPinInput(e.target.value)} placeholder="••••••"
              className="w-full bg-transparent border border-border focus:border-primary outline-none px-4 py-4 text-center text-2xl tracking-[0.5em] font-mono"
            />
            {pinError && (
              <p className="text-sm text-destructive font-mono uppercase tracking-widest text-center">{pinError}</p>
            )}
            <button
              type="submit" disabled={verifying || pinInput.length < 4}
              className="w-full px-6 py-4 bg-primary text-primary-foreground font-mono text-[11px] uppercase tracking-widest font-bold hover:bg-foreground hover:text-background transition-colors disabled:opacity-50"
            >
              {verifying ? "Verifying…" : "Unlock Hub"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const isActive = (to: string, exact?: boolean) =>
    exact ? pathname === to : pathname === to || pathname.startsWith(to + "/");

  return (
    <AdminContext.Provider value={{ pin, signOut }}>
      <div className="min-h-screen bg-background text-foreground flex">
        {/* Sidebar */}
        <aside
          className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-64 shrink-0 border-r border-border bg-background/95 backdrop-blur flex flex-col transition-transform duration-300 ${
            navOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="px-5 py-5 border-b border-border flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <span className="font-mono text-primary text-xs">[ ✦ ]</span>
              <span className="font-bold tracking-tight text-sm">ATLAS / HUB</span>
            </Link>
            <button onClick={() => setNavOpen(false)} className="lg:hidden text-muted-foreground hover:text-primary">
              <X size={18} />
            </button>
          </div>
          <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
            {NAV.map((item) => {
              const active = isActive(item.to, item.exact);
              const Icon = item.icon;
              return (
                <Link
                  key={item.to} to={item.to} onClick={() => setNavOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors border-l-2 ${
                    active
                      ? "border-primary text-foreground bg-primary/5"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/30"
                  }`}
                >
                  <Icon size={14} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="p-3 border-t border-border">
            <button
              onClick={signOut}
              className="w-full inline-flex items-center justify-center gap-2 px-3 py-2.5 border border-border font-mono text-[10px] uppercase tracking-widest hover:border-primary hover:text-primary"
            >
              <LogOut size={12} /> Sign out
            </button>
          </div>
        </aside>

        {navOpen && (
          <div onClick={() => setNavOpen(false)} className="fixed inset-0 z-30 bg-black/40 lg:hidden" />
        )}

        {/* Main */}
        <div className="flex-1 min-w-0 flex flex-col">
          <header className="lg:hidden sticky top-0 z-20 bg-background/90 backdrop-blur border-b border-border px-5 py-4 flex items-center justify-between">
            <button onClick={() => setNavOpen(true)} className="text-muted-foreground hover:text-primary">
              <Menu size={20} />
            </button>
            <span className="font-mono text-[10px] uppercase tracking-widest text-primary">// Atlas Hub</span>
            <div className="w-5" />
          </header>
          <main className="flex-1 min-w-0">
            <Outlet />
          </main>
        </div>
      </div>
    </AdminContext.Provider>
  );
}
