import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Plus, Trash2, Loader2 } from "lucide-react";
import { adminListPayments, adminUpsertPayment, adminDeletePayment } from "@/lib/admin.functions";
import { useAdmin } from "@/components/admin/AdminContext";

export const Route = createFileRoute("/admin/payments")({
  component: PaymentsPage,
});

type Payment = {
  id: string; client_id: string | null; project_id: string | null;
  invoice_number: string | null; amount: number; status: string;
  due_date: string | null; paid_date: string | null; notes: string | null; created_at: string;
};
type Opt = { id: string; name?: string; company?: string | null };

const STATUSES = ["pending", "sent", "paid", "overdue", "refunded"];

function PaymentsPage() {
  const { pin } = useAdmin();
  const list = useServerFn(adminListPayments);
  const upsert = useServerFn(adminUpsertPayment);
  const del = useServerFn(adminDeletePayment);

  const [payments, setPayments] = useState<Payment[]>([]);
  const [clients, setClients] = useState<Opt[]>([]);
  const [projects, setProjects] = useState<Opt[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Payment> & { id: string | null } | null>(null);

  const reload = async () => {
    const r = await list({ data: { pin } });
    setPayments(r.payments as Payment[]);
    setClients(r.clients as Opt[]);
    setProjects(r.projects as Opt[]);
  };
  useEffect(() => { reload().finally(() => setLoading(false)); }, []); // eslint-disable-line

  const totals = {
    paid: payments.filter((p) => p.status === "paid").reduce((s, p) => s + Number(p.amount), 0),
    pending: payments.filter((p) => p.status === "pending" || p.status === "sent").reduce((s, p) => s + Number(p.amount), 0),
    overdue: payments.filter((p) => p.status === "overdue").reduce((s, p) => s + Number(p.amount), 0),
  };

  const save = async () => {
    if (!editing) return;
    await upsert({
      data: {
        pin, id: editing.id,
        patch: {
          client_id: editing.client_id || null,
          project_id: editing.project_id || null,
          invoice_number: editing.invoice_number || null,
          amount: Number(editing.amount || 0),
          status: editing.status || "pending",
          due_date: editing.due_date || null,
          paid_date: editing.paid_date || null,
          notes: editing.notes || null,
        },
      },
    });
    setEditing(null);
    await reload();
  };

  const clientLabel = (id: string | null) => {
    const c = clients.find((x) => x.id === id);
    return c ? (c.company || c.name || "—") : "—";
  };

  return (
    <div className="p-5 md:p-10">
      <header className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-2">// Money</div>
          <h1 className="font-serif text-3xl md:text-4xl tracking-tight">Payments</h1>
        </div>
        <button onClick={() => setEditing({ id: null, amount: 0, status: "pending" })} className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-mono text-[10px] uppercase tracking-widest font-bold hover:bg-foreground hover:text-background">
          <Plus size={12} /> New Invoice
        </button>
      </header>

      <section className="grid grid-cols-3 gap-3 mb-6">
        <Tile label="Collected" value={`$${totals.paid.toLocaleString()}`} />
        <Tile label="Pending" value={`$${totals.pending.toLocaleString()}`} accent />
        <Tile label="Overdue" value={`$${totals.overdue.toLocaleString()}`} />
      </section>

      {loading ? (
        <div className="py-20 flex justify-center"><Loader2 className="animate-spin text-primary" /></div>
      ) : (
        <div className="border border-border overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/30 border-b border-border">
              <tr className="text-left font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                <th className="p-3">Invoice</th><th className="p-3">Client</th>
                <th className="p-3">Amount</th><th className="p-3">Status</th>
                <th className="p-3">Due</th><th className="p-3">Paid</th><th />
              </tr>
            </thead>
            <tbody>
              {payments.length === 0 && (
                <tr><td colSpan={7} className="p-10 text-center text-muted-foreground">No payments yet.</td></tr>
              )}
              {payments.map((p) => (
                <tr key={p.id} className="border-b border-border hover:bg-muted/20 cursor-pointer" onClick={() => setEditing(p)}>
                  <td className="p-3 font-mono text-xs">{p.invoice_number || "—"}</td>
                  <td className="p-3">{clientLabel(p.client_id)}</td>
                  <td className="p-3 font-medium">${Number(p.amount).toLocaleString()}</td>
                  <td className="p-3"><span className="px-2 py-1 text-[10px] font-mono uppercase tracking-widest border border-border">{p.status}</span></td>
                  <td className="p-3 text-muted-foreground text-xs">{p.due_date ? new Date(p.due_date).toLocaleDateString() : "—"}</td>
                  <td className="p-3 text-muted-foreground text-xs">{p.paid_date ? new Date(p.paid_date).toLocaleDateString() : "—"}</td>
                  <td className="p-3 text-right">
                    <button onClick={async (e) => { e.stopPropagation(); if (confirm("Delete?")) { await del({ data: { pin, id: p.id } }); await reload(); } }} className="text-muted-foreground hover:text-destructive"><Trash2 size={14} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-end md:items-center justify-center p-0 md:p-6" onClick={() => setEditing(null)}>
          <div className="bg-background border border-border w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h2 className="font-serif text-2xl mb-5">{editing.id ? "Edit Payment" : "New Invoice"}</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <F label="Invoice #"><input value={editing.invoice_number || ""} onChange={(e) => setEditing({ ...editing, invoice_number: e.target.value })} className="inp" /></F>
                <F label="Amount ($) *"><input type="number" step="0.01" value={editing.amount ?? ""} onChange={(e) => setEditing({ ...editing, amount: Number(e.target.value) })} className="inp" /></F>
              </div>
              <F label="Client">
                <select value={editing.client_id || ""} onChange={(e) => setEditing({ ...editing, client_id: e.target.value || null })} className="inp">
                  <option value="">— None —</option>
                  {clients.map((c) => <option key={c.id} value={c.id}>{c.company || c.name}</option>)}
                </select>
              </F>
              <F label="Project">
                <select value={editing.project_id || ""} onChange={(e) => setEditing({ ...editing, project_id: e.target.value || null })} className="inp">
                  <option value="">— None —</option>
                  {projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </F>
              <div className="grid grid-cols-3 gap-4">
                <F label="Status">
                  <select value={editing.status || "pending"} onChange={(e) => setEditing({ ...editing, status: e.target.value })} className="inp">
                    {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </F>
                <F label="Due"><input type="date" value={editing.due_date || ""} onChange={(e) => setEditing({ ...editing, due_date: e.target.value })} className="inp" /></F>
                <F label="Paid"><input type="date" value={editing.paid_date || ""} onChange={(e) => setEditing({ ...editing, paid_date: e.target.value })} className="inp" /></F>
              </div>
              <F label="Notes"><textarea rows={3} value={editing.notes || ""} onChange={(e) => setEditing({ ...editing, notes: e.target.value })} className="inp" /></F>
            </div>
            <div className="mt-6 flex gap-3 justify-end">
              <button onClick={() => setEditing(null)} className="px-4 py-2 border border-border font-mono text-[10px] uppercase tracking-widest">Cancel</button>
              <button onClick={save} className="px-4 py-2 bg-primary text-primary-foreground font-mono text-[10px] uppercase tracking-widest font-bold">Save</button>
            </div>
          </div>
        </div>
      )}

      <style>{`.inp{width:100%;background:transparent;border:1px solid hsl(var(--border));padding:.55rem .75rem;font-size:.875rem;outline:none}.inp:focus{border-color:hsl(var(--primary))}`}</style>
    </div>
  );
}

function Tile({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="border border-border p-4">
      <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className={`font-serif text-2xl md:text-3xl mt-2 ${accent ? "text-primary" : ""}`}>{value}</div>
    </div>
  );
}

function F({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">{label}</div>{children}</div>;
}
