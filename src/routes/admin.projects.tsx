import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Plus, Trash2, Loader2, CheckCircle2, Circle } from "lucide-react";
import {
  adminListProjects, adminUpsertProject, adminDeleteProject,
  adminUpsertMilestone, adminToggleMilestone, adminDeleteMilestone,
} from "@/lib/admin.functions";
import { useAdmin } from "@/components/admin/AdminContext";

export const Route = createFileRoute("/admin/projects")({
  component: ProjectsPage,
});

type Project = {
  id: string; client_id: string | null; name: string; description: string | null;
  status: string; budget: number | null; start_date: string | null; due_date: string | null;
};
type ClientLite = { id: string; name: string; company: string | null };
type Milestone = {
  id: string; project_id: string; title: string; description: string | null;
  status: string; amount: number | null; due_date: string | null; position: number;
};

const PROJECT_STATUSES = ["planning", "in_progress", "review", "completed", "archived"];
const MS_STATUSES = ["todo", "in_progress", "done"];

function ProjectsPage() {
  const { pin } = useAdmin();
  const list = useServerFn(adminListProjects);
  const upsertProject = useServerFn(adminUpsertProject);
  const deleteProject = useServerFn(adminDeleteProject);
  const upsertMs = useServerFn(adminUpsertMilestone);
  const toggleMs = useServerFn(adminToggleMilestone);
  const delMs = useServerFn(adminDeleteMilestone);

  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<ClientLite[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editing, setEditing] = useState<Partial<Project> & { id: string | null } | null>(null);
  const [newMs, setNewMs] = useState("");

  const reload = async () => {
    const r = await list({ data: { pin } });
    setProjects(r.projects as Project[]);
    setClients(r.clients as ClientLite[]);
    setMilestones(r.milestones as Milestone[]);
  };
  useEffect(() => { reload().finally(() => setLoading(false)); }, []); // eslint-disable-line

  const selected = projects.find((p) => p.id === selectedId);
  const selectedMs = milestones.filter((m) => m.project_id === selectedId);
  const clientName = (id: string | null) => {
    const c = clients.find((x) => x.id === id);
    return c ? (c.company || c.name) : "—";
  };

  const saveProject = async () => {
    if (!editing) return;
    await upsertProject({
      data: {
        pin, id: editing.id,
        patch: {
          name: editing.name || "",
          description: editing.description || null,
          status: editing.status || "planning",
          client_id: editing.client_id || null,
          budget: editing.budget ? Number(editing.budget) : null,
          start_date: editing.start_date || null,
          due_date: editing.due_date || null,
        },
      },
    });
    setEditing(null);
    await reload();
  };

  const addMilestone = async () => {
    if (!newMs.trim() || !selectedId) return;
    await upsertMs({
      data: {
        pin, id: null,
        patch: { project_id: selectedId, title: newMs.trim(), status: "todo", position: selectedMs.length },
      },
    });
    setNewMs("");
    await reload();
  };

  const toggle = async (m: Milestone) => {
    const next = m.status === "done" ? "todo" : "done";
    await toggleMs({ data: { pin, id: m.id, status: next } });
    await reload();
  };

  return (
    <div className="p-5 md:p-10">
      <header className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-2">// Pipeline</div>
          <h1 className="font-serif text-3xl md:text-4xl tracking-tight">Projects</h1>
        </div>
        <button onClick={() => setEditing({ id: null, name: "", status: "planning" })} className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-mono text-[10px] uppercase tracking-widest font-bold hover:bg-foreground hover:text-background">
          <Plus size={12} /> New Project
        </button>
      </header>

      {loading ? (
        <div className="py-20 flex justify-center"><Loader2 className="animate-spin text-primary" /></div>
      ) : (
        <div className="grid lg:grid-cols-[1fr_440px] gap-6">
          <div className="border border-border divide-y divide-border">
            {projects.length === 0 && <div className="p-10 text-center text-muted-foreground text-sm">No projects yet.</div>}
            {projects.map((p) => {
              const ms = milestones.filter((m) => m.project_id === p.id);
              const done = ms.filter((m) => m.status === "done").length;
              return (
                <button key={p.id} onClick={() => setSelectedId(p.id)}
                  className={`w-full text-left p-4 hover:bg-muted/30 ${selectedId === p.id ? "bg-primary/5" : ""}`}>
                  <div className="flex justify-between items-start gap-3 mb-1">
                    <div className="font-medium">{p.name}</div>
                    <span className="px-2 py-1 text-[10px] font-mono uppercase tracking-widest border border-border shrink-0">{p.status}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">{clientName(p.client_id)}</div>
                  <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{done}/{ms.length} milestones</span>
                    {p.budget && <span>· ${Number(p.budget).toLocaleString()}</span>}
                    {p.due_date && <span>· due {new Date(p.due_date).toLocaleDateString()}</span>}
                  </div>
                </button>
              );
            })}
          </div>

          <aside className="border border-border p-5 md:sticky md:top-4 self-start max-h-[calc(100vh-2rem)] overflow-y-auto">
            {!selected ? (
              <div className="text-center text-muted-foreground py-10 text-sm">Select a project.</div>
            ) : (
              <div className="space-y-5">
                <div className="flex justify-between items-start gap-3">
                  <div>
                    <h2 className="font-serif text-2xl tracking-tight">{selected.name}</h2>
                    <div className="text-xs text-muted-foreground mt-1">{clientName(selected.client_id)}</div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setEditing(selected)} className="text-xs font-mono uppercase tracking-widest border border-border px-2 py-1 hover:border-primary">Edit</button>
                    <button onClick={async () => { if (confirm("Delete project?")) { await deleteProject({ data: { pin, id: selected.id } }); setSelectedId(null); await reload(); } }} className="text-muted-foreground hover:text-destructive p-1"><Trash2 size={14} /></button>
                  </div>
                </div>
                {selected.description && <p className="text-sm text-muted-foreground">{selected.description}</p>}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  {selected.budget && <div><div className="font-mono uppercase tracking-widest text-muted-foreground">Budget</div><div className="mt-1">${Number(selected.budget).toLocaleString()}</div></div>}
                  {selected.due_date && <div><div className="font-mono uppercase tracking-widest text-muted-foreground">Due</div><div className="mt-1">{new Date(selected.due_date).toLocaleDateString()}</div></div>}
                </div>

                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">Milestones</div>
                  <div className="space-y-2">
                    {selectedMs.map((m) => (
                      <div key={m.id} className="flex items-center gap-2 p-2 border border-border">
                        <button onClick={() => toggle(m)}>
                          {m.status === "done" ? <CheckCircle2 size={16} className="text-primary" /> : <Circle size={16} className="text-muted-foreground" />}
                        </button>
                        <span className={`flex-1 text-sm ${m.status === "done" ? "line-through text-muted-foreground" : ""}`}>{m.title}</span>
                        {m.amount && <span className="text-xs text-muted-foreground">${Number(m.amount).toLocaleString()}</span>}
                        <button onClick={async () => { await delMs({ data: { pin, id: m.id } }); await reload(); }} className="text-muted-foreground hover:text-destructive"><Trash2 size={12} /></button>
                      </div>
                    ))}
                    {selectedMs.length === 0 && <div className="text-xs text-muted-foreground">No milestones yet.</div>}
                  </div>
                  <div className="mt-3 flex gap-2">
                    <input value={newMs} onChange={(e) => setNewMs(e.target.value)} placeholder="Add milestone…"
                      onKeyDown={(e) => e.key === "Enter" && addMilestone()}
                      className="flex-1 bg-transparent border border-border focus:border-primary outline-none px-3 py-2 text-sm" />
                    <button onClick={addMilestone} className="px-3 py-2 bg-primary text-primary-foreground font-mono text-[10px] uppercase tracking-widest font-bold">Add</button>
                  </div>
                </div>
              </div>
            )}
          </aside>
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-end md:items-center justify-center p-0 md:p-6" onClick={() => setEditing(null)}>
          <div className="bg-background border border-border w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h2 className="font-serif text-2xl mb-5">{editing.id ? "Edit Project" : "New Project"}</h2>
            <div className="space-y-4">
              <F label="Name *"><input value={editing.name || ""} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="inp" /></F>
              <F label="Client">
                <select value={editing.client_id || ""} onChange={(e) => setEditing({ ...editing, client_id: e.target.value || null })} className="inp">
                  <option value="">— None —</option>
                  {clients.map((c) => <option key={c.id} value={c.id}>{c.company || c.name}</option>)}
                </select>
              </F>
              <F label="Description"><textarea rows={3} value={editing.description || ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className="inp" /></F>
              <div className="grid grid-cols-2 gap-4">
                <F label="Status">
                  <select value={editing.status || "planning"} onChange={(e) => setEditing({ ...editing, status: e.target.value })} className="inp">
                    {PROJECT_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </F>
                <F label="Budget ($)"><input type="number" value={editing.budget ?? ""} onChange={(e) => setEditing({ ...editing, budget: e.target.value ? Number(e.target.value) : null })} className="inp" /></F>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <F label="Start date"><input type="date" value={editing.start_date || ""} onChange={(e) => setEditing({ ...editing, start_date: e.target.value })} className="inp" /></F>
                <F label="Due date"><input type="date" value={editing.due_date || ""} onChange={(e) => setEditing({ ...editing, due_date: e.target.value })} className="inp" /></F>
              </div>
            </div>
            <div className="mt-6 flex gap-3 justify-end">
              <button onClick={() => setEditing(null)} className="px-4 py-2 border border-border font-mono text-[10px] uppercase tracking-widest">Cancel</button>
              <button onClick={saveProject} disabled={!editing.name} className="px-4 py-2 bg-primary text-primary-foreground font-mono text-[10px] uppercase tracking-widest font-bold disabled:opacity-50">Save</button>
            </div>
          </div>
        </div>
      )}

      <style>{`.inp{width:100%;background:transparent;border:1px solid hsl(var(--border));padding:.55rem .75rem;font-size:.875rem;outline:none}.inp:focus{border-color:hsl(var(--primary))}`}</style>
    </div>
  );

  function F({ label, children }: { label: string; children: React.ReactNode }) {
    return <div><div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">{label}</div>{children}</div>;
  }
}
