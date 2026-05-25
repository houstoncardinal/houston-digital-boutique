import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Search, Download, Loader2 } from "lucide-react";
import { adminListLeads, adminUpdateLead } from "@/lib/admin.functions";
import { useAdmin } from "@/components/admin/AdminContext";

export const Route = createFileRoute("/admin/leads")({
  component: LeadsPage,
});

type Lead = {
  id: string; name: string; email: string; phone: string | null;
  company: string | null; city: string | null; services: string[];
  budget: string | null; timeline: string | null; project_details: string | null;
  source_page: string | null; status: string; admin_notes: string | null; created_at: string;
};

const STATUSES = ["new", "contacted", "qualified", "won", "lost"];

function LeadsPage() {
  const { pin } = useAdmin();
  const listLeads = useServerFn(adminListLeads);
  const updateLead = useServerFn(adminUpdateLead);

  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    listLeads({ data: { pin } })
      .then((r) => setLeads(r.leads as Lead[]))
      .finally(() => setLoading(false));
  }, [pin, listLeads]);

  const filtered = useMemo(() => leads.filter((l) => {
    if (statusFilter !== "all" && l.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return l.name.toLowerCase().includes(q) || l.email.toLowerCase().includes(q)
        || (l.company || "").toLowerCase().includes(q);
    }
    return true;
  }), [leads, search, statusFilter]);

  const selected = leads.find((l) => l.id === selectedId);

  const patch = async (id: string, p: Partial<Lead>) => {
    setLeads((prev) => prev.map((l) => l.id === id ? { ...l, ...p } : l));
    await updateLead({ data: { pin, id, patch: { status: p.status, admin_notes: p.admin_notes ?? undefined } } });
  };

  const exportCsv = () => {
    const headers = ["created_at","name","email","phone","company","city","services","budget","timeline","status"];
    const rows = filtered.map((l) => headers.map((h) => {
      const v = (l as Record<string, unknown>)[h];
      const s = Array.isArray(v) ? v.join("; ") : (v ?? "");
      return `"${String(s).replace(/"/g, '""')}"`;
    }).join(","));
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url;
    a.download = `leads-${new Date().toISOString().slice(0,10)}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-5 md:p-10">
      <header className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-2">// Inquiries</div>
          <h1 className="font-serif text-3xl md:text-4xl tracking-tight">Leads</h1>
        </div>
        <button onClick={exportCsv} className="inline-flex items-center gap-2 px-4 py-2 border border-border font-mono text-[10px] uppercase tracking-widest hover:border-primary hover:text-primary">
          <Download size={12} /> Export CSV
        </button>
      </header>

      <div className="flex flex-wrap gap-3 mb-5">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search…"
            className="w-full bg-transparent border border-border focus:border-primary outline-none pl-9 pr-3 py-2 text-sm" />
        </div>
        <div className="flex gap-1 flex-wrap">
          {["all", ...STATUSES].map((s) => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`px-3 py-2 font-mono text-[10px] uppercase tracking-widest border ${statusFilter === s ? "border-primary text-primary" : "border-border text-muted-foreground hover:text-foreground"}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center"><Loader2 className="animate-spin text-primary" /></div>
      ) : (
        <div className="grid lg:grid-cols-[1fr_400px] gap-6">
          <div className="border border-border divide-y divide-border">
            {filtered.length === 0 && <div className="p-10 text-center text-muted-foreground text-sm">No leads.</div>}
            {filtered.map((l) => (
              <button key={l.id} onClick={() => setSelectedId(l.id)}
                className={`w-full text-left p-4 hover:bg-muted/30 ${selectedId === l.id ? "bg-primary/5" : ""}`}>
                <div className="flex justify-between items-start gap-3">
                  <div className="min-w-0">
                    <div className="font-medium truncate">{l.name}</div>
                    <div className="text-xs text-muted-foreground truncate">{l.email}</div>
                    <div className="text-xs text-muted-foreground mt-1">{l.services.slice(0,2).join(", ")} {l.budget ? `· ${l.budget}` : ""}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="px-2 py-1 text-[10px] font-mono uppercase tracking-widest border border-border">{l.status}</span>
                    <div className="text-[10px] font-mono text-muted-foreground mt-1">{new Date(l.created_at).toLocaleDateString()}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <aside className="border border-border p-5 md:sticky md:top-4 self-start max-h-[calc(100vh-2rem)] overflow-y-auto">
            {!selected ? (
              <div className="text-center text-muted-foreground py-10 text-sm">Select a lead.</div>
            ) : (
              <div className="space-y-5">
                <div>
                  <h2 className="font-serif text-2xl tracking-tight">{selected.name}</h2>
                  <div className="text-xs text-muted-foreground mt-1">{new Date(selected.created_at).toLocaleString()}</div>
                </div>
                <F label="Email"><a href={`mailto:${selected.email}`} className="text-primary underline break-all">{selected.email}</a></F>
                {selected.phone && <F label="Phone"><a href={`tel:${selected.phone}`} className="text-primary underline">{selected.phone}</a></F>}
                {selected.company && <F label="Company">{selected.company}</F>}
                {selected.city && <F label="City">{selected.city}</F>}
                <F label="Services"><div className="flex flex-wrap gap-1">{selected.services.map((s) => <span key={s} className="text-xs border border-border px-2 py-1">{s}</span>)}</div></F>
                {selected.budget && <F label="Budget">{selected.budget}</F>}
                {selected.project_details && <F label="Details"><p className="whitespace-pre-wrap text-sm">{selected.project_details}</p></F>}
                <F label="Status">
                  <select value={selected.status} onChange={(e) => patch(selected.id, { status: e.target.value })}
                    className="w-full bg-transparent border border-border focus:border-primary outline-none px-3 py-2 text-sm">
                    {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </F>
                <F label="Notes">
                  <textarea rows={4} value={selected.admin_notes || ""} onChange={(e) => patch(selected.id, { admin_notes: e.target.value })}
                    className="w-full bg-transparent border border-border focus:border-primary outline-none p-3 text-sm" />
                </F>
              </div>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}

function F({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">{label}</div>
      <div className="text-sm">{children}</div>
    </div>
  );
}
