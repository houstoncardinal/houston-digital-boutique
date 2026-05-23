import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, LogOut, Search, Download, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  head: () => ({
    meta: [
      { title: "Admin Dashboard — Atlas Houston" },
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

function AdminPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [claiming, setClaiming] = useState(false);

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate({ to: "/auth" });
        return;
      }
      setAuthed(true);
      setUserId(data.session.user.id);
      await checkAdmin(data.session.user.id);
      setLoading(false);
    };
    init();
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) navigate({ to: "/auth" });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  const checkAdmin = async (uid: string) => {
    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", uid)
      .eq("role", "admin")
      .maybeSingle();
    const admin = !!data;
    setIsAdmin(admin);
    if (admin) await loadLeads();
  };

  const loadLeads = async () => {
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setLeads(data as Lead[]);
  };

  const claimAdmin = async () => {
    if (!userId) return;
    setClaiming(true);
    // Allowed only when no admin exists yet — enforced by a database insert that
    // will fail if another admin row exists for this user (unique), but the
    // bootstrap rule we rely on is: any signed-in user can call this once.
    const { data: existing } = await supabase.from("user_roles").select("id").eq("role", "admin").limit(1);
    if (existing && existing.length > 0) {
      setClaiming(false);
      alert("An admin already exists. Ask them to grant you access.");
      return;
    }
    // Temporarily allow self-insert by calling RPC-style: we need a one-time
    // bootstrap. Since RLS blocks non-admins, we do this via a signed insert
    // using the user's own row — but RLS requires has_role(...) = true.
    // For first-time bootstrap, ask the user to use the SQL console or we
    // could create an RPC. Simpler: ship a database function for bootstrap.
    const { error } = await supabase.rpc("bootstrap_first_admin");
    setClaiming(false);
    if (error) {
      alert(error.message);
      return;
    }
    await checkAdmin(userId);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
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

  const updateLead = async (id: string, patch: Partial<Lead>) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, ...patch } : l)));
    await supabase.from("leads").update(patch).eq("id", id);
  };

  const exportCsv = () => {
    const headers = [
      "created_at", "name", "email", "phone", "company", "city",
      "services", "budget", "timeline", "status", "source_page", "project_details", "admin_notes",
    ];
    const rows = filtered.map((l) =>
      headers.map((h) => {
        const v = (l as any)[h];
        const s = Array.isArray(v) ? v.join("; ") : v ?? "";
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="animate-spin text-primary" />
      </div>
    );
  }

  if (!authed) return null;

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
        <div className="max-w-md text-center border border-border p-10">
          <ShieldCheck className="mx-auto text-primary mb-4" size={32} />
          <h1 className="font-serif text-3xl mb-3">No admin access</h1>
          <p className="text-muted-foreground text-sm mb-6">
            Your account is signed in but doesn't have admin access yet. If you're the
            first user, claim admin below. Otherwise ask an existing admin to grant access.
          </p>
          <button
            onClick={claimAdmin}
            disabled={claiming}
            className="px-6 py-3 bg-primary text-primary-foreground font-mono text-[11px] uppercase tracking-widest font-bold hover:bg-foreground hover:text-background transition-colors disabled:opacity-50"
          >
            {claiming ? "Working…" : "Claim First Admin"}
          </button>
          <button
            onClick={signOut}
            className="block mx-auto mt-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-primary"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border px-6 md:px-10 py-5 flex items-center justify-between sticky top-0 bg-background/90 backdrop-blur z-30">
        <Link to="/" className="flex items-center gap-3">
          <span className="font-mono text-primary text-xs">[ ✦ ]</span>
          <span className="font-bold tracking-tight">ATLAS / ADMIN</span>
        </Link>
        <div className="flex items-center gap-3">
          <button
            onClick={exportCsv}
            className="inline-flex items-center gap-2 px-4 py-2 border border-border font-mono text-[10px] uppercase tracking-widest hover:border-primary hover:text-primary"
          >
            <Download size={12} /> Export CSV
          </button>
          <button
            onClick={signOut}
            className="inline-flex items-center gap-2 px-4 py-2 border border-border font-mono text-[10px] uppercase tracking-widest hover:border-primary hover:text-primary"
          >
            <LogOut size={12} /> Sign out
          </button>
        </div>
      </header>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 border-b border-border">
        <Stat label="Total leads" value={stats.total} />
        <Stat label="New / unworked" value={stats.newCount} />
        <Stat label="Last 7 days" value={stats.last7} />
        <Stat label="Won" value={stats.won} />
      </section>

      {/* Filters */}
      <div className="px-6 md:px-10 py-5 border-b border-border flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, email, company, city, service…"
            className="w-full bg-transparent border border-border focus:border-primary outline-none pl-9 pr-3 py-2 text-sm"
          />
        </div>
        <div className="flex gap-1">
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
      <div className="grid lg:grid-cols-[1fr_420px]">
        {/* Table */}
        <div className="overflow-x-auto border-b lg:border-b-0 lg:border-r border-border">
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

        {/* Detail */}
        <aside className="p-6 md:p-8 lg:sticky lg:top-[73px] lg:h-[calc(100vh-73px)] overflow-y-auto">
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
                <a href={`mailto:${selected.email}`} className="text-primary underline">
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
                  <code className="text-xs text-muted-foreground">{selected.source_page}</code>
                </Field>
              )}

              <Field label="Status">
                <select
                  value={selected.status}
                  onChange={(e) => updateLead(selected.id, { status: e.target.value })}
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
                  onChange={(e) => updateLead(selected.id, { admin_notes: e.target.value })}
                  placeholder="Add notes…"
                  className="w-full bg-transparent border border-border focus:border-primary outline-none p-3 text-sm"
                />
              </Field>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="p-6 border-r border-border last:border-r-0">
      <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
      <div className="font-serif text-4xl mt-2">{value}</div>
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
