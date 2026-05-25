import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, LogOut, Search, Download, KeyRound } from "lucide-react";
import { adminListLeads, adminUpdateLead, adminVerifyPin } from "@/lib/admin.functions";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  head: () => ({
    meta: [
      { title: "Admin — Atlas Houston" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
});

type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  city: string | null;
  services: string[];
  budget: string | null;
  timeline: string | null;
  project_details: string | null;
  source_page: string | null;
  status: string;
  admin_notes: string | null;
  created_at: string;
};

const STATUSES = ["new", "contacted", "qualified", "won", "lost"] as const;
const PIN_KEY = "atlas_admin_pin";

function AdminPage() {
  const verifyPin = useServerFn(adminVerifyPin);
  const listLeads = useServerFn(adminListLeads);
  const updateLead = useServerFn(adminUpdateLead);

  const [pin, setPin] = useState<string | null>(null);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [loading, setLoading] = useState(false);

  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Auto-resume session
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

  // Load leads when PIN is set
  useEffect(() => {
    if (!pin) return;
    setLoading(true);
    listLeads({ data: { pin } })
      .then((res) => setLeads(res.leads as Lead[]))
      .catch(() => setLeads([]))
      .finally(() => setLoading(false));
  }, [pin, listLeads]);

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
    setLeads([]);
    setPinInput("");
  };

  const filtered = useMemo(() => {
    return leads.filter((l) => {
      if (statusFilter !== "all" && l.status !== statusFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          l.name.toLowerCase().includes(q) ||
          l.email.toLowerCase().includes(q) ||
          (l.company || "").toLowerCase().includes(q) ||
          (l.city || "").toLowerCase().includes(q) ||
          l.services.join(" ").toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [leads, search, statusFilter]);

  const selected = leads.find((l) => l.id === selectedId);

  const patchLead = async (id: string, patch: Partial<Lead>) => {
    if (!pin) return;
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, ...patch } : l)));
    try {
      await updateLead({
        data: {
          pin,
          id,
          patch: {
            status: patch.status,
            admin_notes: patch.admin_notes ?? undefined,
          },
        },
      });
    } catch (e) {
      console.error(e);
    }
  };

  const exportCsv = () => {
    const headers = [
      "created_at", "name", "email", "phone", "company", "city",
      "services", "budget", "timeline", "status", "source_page", "project_details", "admin_notes",
    ];
    const rows = filtered.map((l) =>
      headers.map((h) => {
        const v = (l as Record<string, unknown>)[h];
        const s = Array.isArray(v) ? v.join("; ") : (v ?? "");
        return `"${String(s).replace(/"/g, '""')}"`;
      }).join(","),
    );
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `atlas-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const stats = useMemo(() => {
    const total = leads.length;
    const newCount = leads.filter((l) => l.status === "new").length;
    const won = leads.filter((l) => l.status === "won").length;
    const last7 = leads.filter(
      (l) => Date.now() - new Date(l.created_at).getTime() < 7 * 86400000,
    ).length;
    return { total, newCount, won, last7 };
  }, [leads]);

  // PIN gate
  if (!pin) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-5 py-10">
        <div className="w-full max-w-sm">
          <Link
            to="/"
            className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-primary"
          >
            ← Back to site
          </Link>
          <div className="mt-8 flex items-center gap-3">
            <KeyRound className="text-primary" size={20} />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
              // Atlas Admin
            </span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl mt-4 mb-2 tracking-tight leading-tight">
            Enter access PIN
          </h1>
          <p className="text-muted-foreground text-sm mb-8">
            Internal dashboard for Atlas Houston lead management.
          </p>

          <form onSubmit={submitPin} className="space-y-5">
            <input
              type="password"
              inputMode="numeric"
              autoComplete="one-time-code"
              autoFocus
              required
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              placeholder="••••••"
              className="w-full bg-transparent border border-border focus:border-primary outline-none px-4 py-4 text-center text-2xl tracking-[0.5em] font-mono"
            />
            {pinError && (
              <p className="text-sm text-destructive font-mono uppercase tracking-widest text-center">
                {pinError}
              </p>
            )}
            <button
              type="submit"
              disabled={verifying || pinInput.length < 4}
              className="w-full px-6 py-4 bg-primary text-primary-foreground font-mono text-[11px] uppercase tracking-widest font-bold hover:bg-foreground hover:text-background transition-colors disabled:opacity-50"
            >
              {verifying ? "Verifying…" : "Unlock Dashboard"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border px-5 md:px-10 py-4 md:py-5 flex flex-wrap items-center justify-between gap-3 sticky top-0 bg-background/90 backdrop-blur z-30">
        <Link to="/" className="flex items-center gap-3">
          <span className="font-mono text-primary text-xs">[ ✦ ]</span>
          <span className="font-bold tracking-tight text-sm md:text-base">ATLAS / ADMIN</span>
        </Link>
        <div className="flex items-center gap-2 md:gap-3">
          <button
            onClick={exportCsv}
            className="inline-flex items-center gap-2 px-3 md:px-4 py-2 border border-border font-mono text-[10px] uppercase tracking-widest hover:border-primary hover:text-primary"
          >
            <Download size={12} /> <span className="hidden sm:inline">Export CSV</span>
          </button>
          <button
            onClick={signOut}
            className="inline-flex items-center gap-2 px-3 md:px-4 py-2 border border-border font-mono text-[10px] uppercase tracking-widest hover:border-primary hover:text-primary"
          >
            <LogOut size={12} /> <span className="hidden sm:inline">Sign out</span>
          </button>
        </div>
      </header>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 border-b border-border">
        <Stat label="Total leads" value={stats.total} />
        <Stat label="New" value={stats.newCount} />
        <Stat label="Last 7 days" value={stats.last7} />
        <Stat label="Won" value={stats.won} />
      </section>

      {/* Filters */}
      <div className="px-5 md:px-10 py-4 md:py-5 border-b border-border flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search leads…"
            className="w-full bg-transparent border border-border focus:border-primary outline-none pl-9 pr-3 py-2 text-sm"
          />
        </div>
        <div className="flex gap-1 flex-wrap">
          {["all", ...STATUSES].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-2 font-mono text-[10px] uppercase tracking-widest border ${
                statusFilter === s
                  ? "border-primary text-primary"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Layout */}
      {loading ? (
        <div className="py-20 flex justify-center">
          <Loader2 className="animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid lg:grid-cols-[1fr_420px]">
          {/* Table — desktop */}
          <div className="hidden md:block overflow-x-auto border-b lg:border-b-0 lg:border-r border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted/30 border-b border-border">
                <tr className="text-left font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  <th className="p-3">Date</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">City</th>
                  <th className="p-3">Services</th>
                  <th className="p-3">Budget</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-10 text-center text-muted-foreground">
                      No leads yet.
                    </td>
                  </tr>
                )}
                {filtered.map((l) => (
                  <tr
                    key={l.id}
                    onClick={() => setSelectedId(l.id)}
                    className={`border-b border-border cursor-pointer transition-colors ${
                      selectedId === l.id ? "bg-primary/5" : "hover:bg-muted/30"
                    }`}
                  >
                    <td className="p-3 text-muted-foreground font-mono text-xs whitespace-nowrap">
                      {new Date(l.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-3">
                      <div className="font-medium">{l.name}</div>
                      <div className="text-xs text-muted-foreground">{l.email}</div>
                    </td>
                    <td className="p-3 text-muted-foreground">{l.city || "—"}</td>
                    <td className="p-3 text-xs text-muted-foreground">
                      {l.services.slice(0, 2).join(", ")}
                      {l.services.length > 2 ? ` +${l.services.length - 2}` : ""}
                    </td>
                    <td className="p-3 text-muted-foreground">{l.budget || "—"}</td>
                    <td className="p-3">
                      <span className="inline-block px-2 py-1 text-[10px] font-mono uppercase tracking-widest border border-border">
                        {l.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile lead list */}
          <div className="md:hidden divide-y divide-border">
            {filtered.length === 0 && (
              <div className="p-10 text-center text-muted-foreground text-sm">No leads yet.</div>
            )}
            {filtered.map((l) => (
              <button
                key={l.id}
                onClick={() => setSelectedId(l.id)}
                className={`w-full text-left p-4 ${selectedId === l.id ? "bg-primary/5" : ""}`}
              >
                <div className="flex justify-between items-start gap-3">
                  <div className="min-w-0">
                    <div className="font-medium truncate">{l.name}</div>
                    <div className="text-xs text-muted-foreground truncate">{l.email}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {l.city || "—"} · {l.services.slice(0, 2).join(", ")}
                    </div>
                  </div>
                  <span className="shrink-0 px-2 py-1 text-[10px] font-mono uppercase tracking-widest border border-border">
                    {l.status}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Detail */}
          <aside className="p-5 md:p-8 lg:sticky lg:top-[73px] lg:h-[calc(100vh-73px)] overflow-y-auto border-t lg:border-t-0 border-border">
            {!selected ? (
              <div className="text-center text-muted-foreground py-20 text-sm">
                Select a lead to view details.
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-primary mb-2">
                    // Lead detail
                  </div>
                  <h2 className="font-serif text-3xl tracking-tight">{selected.name}</h2>
                  <div className="text-sm text-muted-foreground mt-1">
                    {new Date(selected.created_at).toLocaleString()}
                  </div>
                </div>

                <Field label="Email">
                  <a href={`mailto:${selected.email}`} className="text-primary underline break-all">
                    {selected.email}
                  </a>
                </Field>
                {selected.phone && (
                  <Field label="Phone">
                    <a href={`tel:${selected.phone}`} className="text-primary underline">
                      {selected.phone}
                    </a>
                  </Field>
                )}
                {selected.company && <Field label="Company">{selected.company}</Field>}
                {selected.city && <Field label="City">{selected.city}</Field>}
                <Field label="Services">
                  <div className="flex flex-wrap gap-1">
                    {selected.services.map((s) => (
                      <span key={s} className="text-xs border border-border px-2 py-1">{s}</span>
                    ))}
                  </div>
                </Field>
                {selected.budget && <Field label="Budget">{selected.budget}</Field>}
                {selected.timeline && <Field label="Timeline">{selected.timeline}</Field>}
                {selected.project_details && (
                  <Field label="Project details">
                    <p className="whitespace-pre-wrap text-sm leading-relaxed">
                      {selected.project_details}
                    </p>
                  </Field>
                )}
                {selected.source_page && (
                  <Field label="Source page">
                    <code className="text-xs text-muted-foreground break-all">{selected.source_page}</code>
                  </Field>
                )}

                <Field label="Status">
                  <select
                    value={selected.status}
                    onChange={(e) => patchLead(selected.id, { status: e.target.value })}
                    className="bg-transparent border border-border focus:border-primary outline-none px-3 py-2 text-sm w-full"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </Field>

                <Field label="Internal notes">
                  <textarea
                    rows={5}
                    value={selected.admin_notes || ""}
                    onChange={(e) => patchLead(selected.id, { admin_notes: e.target.value })}
                    placeholder="Add notes…"
                    className="w-full bg-transparent border border-border focus:border-primary outline-none p-3 text-sm"
                  />
                </Field>
              </div>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="p-5 md:p-6 border-r border-border last:border-r-0 border-b md:border-b-0">
      <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
      <div className="font-serif text-3xl md:text-4xl mt-2">{value}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
        {label}
      </div>
      <div className="text-sm">{children}</div>
    </div>
  );
}
