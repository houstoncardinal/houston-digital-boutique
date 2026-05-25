import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Plus, Trash2, Loader2 } from "lucide-react";
import { adminListClients, adminUpsertClient, adminDeleteClient } from "@/lib/admin.functions";
import { useAdmin } from "@/components/admin/AdminContext";

export const Route = createFileRoute("/admin/clients")({
  component: ClientsPage,
});

type Client = {
  id: string; name: string; email: string; phone: string | null;
  company: string | null; city: string | null; status: string;
  notes: string | null; created_at: string;
};

const empty = { id: null as string | null, name: "", email: "", phone: "", company: "", city: "", status: "active", notes: "" };

function ClientsPage() {
  const { pin } = useAdmin();
  const list = useServerFn(adminListClients);
  const upsert = useServerFn(adminUpsertClient);
  const del = useServerFn(adminDeleteClient);

  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<typeof empty | null>(null);
  const [saving, setSaving] = useState(false);

  const reload = async () => {
    const r = await list({ data: { pin } });
    setClients(r.clients as Client[]);
  };

  useEffect(() => { reload().finally(() => setLoading(false)); }, []); // eslint-disable-line

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      await upsert({
        data: {
          pin, id: editing.id,
          patch: {
            name: editing.name, email: editing.email,
            phone: editing.phone || null, company: editing.company || null,
            city: editing.city || null, status: editing.status,
            notes: editing.notes || null,
          },
        },
      });
      setEditing(null);
      await reload();
    } finally { setSaving(false); }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this client? Projects linked to them will also be deleted.")) return;
    await del({ data: { pin, id } });
    await reload();
  };

  return (
    <div className="p-5 md:p-10">
      <header className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-2">// Roster</div>
          <h1 className="font-serif text-3xl md:text-4xl tracking-tight">Clients</h1>
        </div>
        <button onClick={() => setEditing({ ...empty })} className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-mono text-[10px] uppercase tracking-widest font-bold hover:bg-foreground hover:text-background">
          <Plus size={12} /> New Client
        </button>
      </header>

      {loading ? (
        <div className="py-20 flex justify-center"><Loader2 className="animate-spin text-primary" /></div>
      ) : (
        <div className="border border-border divide-y divide-border">
          {clients.length === 0 && <div className="p-10 text-center text-muted-foreground text-sm">No clients yet.</div>}
          {clients.map((c) => (
            <div key={c.id} className="p-4 grid md:grid-cols-[1fr_auto] gap-3 items-center">
              <button onClick={() => setEditing({
                id: c.id, name: c.name, email: c.email, phone: c.phone || "",
                company: c.company || "", city: c.city || "", status: c.status, notes: c.notes || "",
              })} className="text-left min-w-0">
                <div className="font-medium">{c.name} {c.company && <span className="text-muted-foreground font-normal">· {c.company}</span>}</div>
                <div className="text-xs text-muted-foreground truncate">{c.email} {c.phone && `· ${c.phone}`} {c.city && `· ${c.city}`}</div>
              </button>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 text-[10px] font-mono uppercase tracking-widest border border-border">{c.status}</span>
                <button onClick={() => remove(c.id)} className="text-muted-foreground hover:text-destructive p-1"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-end md:items-center justify-center p-0 md:p-6" onClick={() => setEditing(null)}>
          <div className="bg-background border border-border w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h2 className="font-serif text-2xl mb-5">{editing.id ? "Edit Client" : "New Client"}</h2>
            <div className="space-y-4">
              <Field label="Name *"><input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="inp" /></Field>
              <Field label="Email *"><input type="email" value={editing.email} onChange={(e) => setEditing({ ...editing, email: e.target.value })} className="inp" /></Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Phone"><input value={editing.phone} onChange={(e) => setEditing({ ...editing, phone: e.target.value })} className="inp" /></Field>
                <Field label="City"><input value={editing.city} onChange={(e) => setEditing({ ...editing, city: e.target.value })} className="inp" /></Field>
              </div>
              <Field label="Company"><input value={editing.company} onChange={(e) => setEditing({ ...editing, company: e.target.value })} className="inp" /></Field>
              <Field label="Status">
                <select value={editing.status} onChange={(e) => setEditing({ ...editing, status: e.target.value })} className="inp">
                  <option value="active">active</option>
                  <option value="paused">paused</option>
                  <option value="archived">archived</option>
                </select>
              </Field>
              <Field label="Notes"><textarea rows={4} value={editing.notes} onChange={(e) => setEditing({ ...editing, notes: e.target.value })} className="inp" /></Field>
            </div>
            <div className="mt-6 flex gap-3 justify-end">
              <button onClick={() => setEditing(null)} className="px-4 py-2 border border-border font-mono text-[10px] uppercase tracking-widest">Cancel</button>
              <button onClick={save} disabled={saving || !editing.name || !editing.email} className="px-4 py-2 bg-primary text-primary-foreground font-mono text-[10px] uppercase tracking-widest font-bold disabled:opacity-50">{saving ? "Saving…" : "Save"}</button>
            </div>
          </div>
        </div>
      )}

      <style>{`.inp{width:100%;background:transparent;border:1px solid hsl(var(--border));padding:.55rem .75rem;font-size:.875rem;outline:none}.inp:focus{border-color:hsl(var(--primary))}`}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">{label}</div>
      {children}
    </div>
  );
}
