import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Send, Loader2 } from "lucide-react";
import { adminListTickets, adminGetTicket, adminReplyTicket, adminUpdateTicket } from "@/lib/admin.functions";
import { useAdmin } from "@/components/admin/AdminContext";

export const Route = createFileRoute("/admin/support")({
  component: SupportPage,
});

type Ticket = {
  id: string; ticket_number: string; customer_name: string; customer_email: string;
  subject: string; status: string; priority: string; created_at: string;
};
type Message = {
  id: string; ticket_id: string; sender_type: "customer" | "admin";
  sender_name: string | null; body: string; created_at: string;
};

const STATUSES = ["open", "answered", "resolved", "closed"];
const PRIORITIES = ["low", "normal", "high", "urgent"];

function SupportPage() {
  const { pin } = useAdmin();
  const listFn = useServerFn(adminListTickets);
  const getFn = useServerFn(adminGetTicket);
  const replyFn = useServerFn(adminReplyTicket);
  const updateFn = useServerFn(adminUpdateTicket);

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState<{ ticket: Ticket; messages: Message[] } | null>(null);
  const [reply, setReply] = useState("");
  const [sending, setSending] = useState(false);
  const [filter, setFilter] = useState("all");

  const reload = async () => {
    const r = await listFn({ data: { pin } });
    setTickets(r.tickets as Ticket[]);
  };
  useEffect(() => { reload().finally(() => setLoading(false)); }, []); // eslint-disable-line

  useEffect(() => {
    if (!selectedId) { setDetail(null); return; }
    getFn({ data: { pin, id: selectedId } }).then((r) => setDetail(r as never));
  }, [selectedId, pin, getFn]);

  const send = async () => {
    if (!reply.trim() || !selectedId) return;
    setSending(true);
    try {
      await replyFn({ data: { pin, ticket_id: selectedId, body: reply.trim() } });
      setReply("");
      const r = await getFn({ data: { pin, id: selectedId } });
      setDetail(r as never);
      await reload();
    } finally { setSending(false); }
  };

  const updateField = async (patch: { status?: string; priority?: string }) => {
    if (!selectedId) return;
    await updateFn({ data: { pin, id: selectedId, patch } });
    await reload();
    const r = await getFn({ data: { pin, id: selectedId } });
    setDetail(r as never);
  };

  const filtered = tickets.filter((t) => filter === "all" || t.status === filter);

  return (
    <div className="p-5 md:p-10">
      <header className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-2">// Customer Support</div>
          <h1 className="font-serif text-3xl md:text-4xl tracking-tight">Support Tickets</h1>
          <p className="text-muted-foreground text-sm mt-2">
            Customers submit tickets at <a href="/support" className="text-primary underline">/support</a>.
          </p>
        </div>
        <div className="flex gap-1 flex-wrap">
          {["all", ...STATUSES].map((s) => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-3 py-2 font-mono text-[10px] uppercase tracking-widest border ${filter === s ? "border-primary text-primary" : "border-border text-muted-foreground hover:text-foreground"}`}>
              {s}
            </button>
          ))}
        </div>
      </header>

      {loading ? (
        <div className="py-20 flex justify-center"><Loader2 className="animate-spin text-primary" /></div>
      ) : (
        <div className="grid lg:grid-cols-[360px_1fr] gap-6">
          <div className="border border-border divide-y divide-border max-h-[70vh] overflow-y-auto">
            {filtered.length === 0 && <div className="p-10 text-center text-muted-foreground text-sm">No tickets.</div>}
            {filtered.map((t) => (
              <button key={t.id} onClick={() => setSelectedId(t.id)}
                className={`w-full text-left p-4 hover:bg-muted/30 ${selectedId === t.id ? "bg-primary/5" : ""}`}>
                <div className="flex justify-between gap-3 mb-1">
                  <span className="font-mono text-[10px] text-primary">{t.ticket_number}</span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{t.status}</span>
                </div>
                <div className="font-medium text-sm truncate">{t.subject}</div>
                <div className="text-xs text-muted-foreground truncate">{t.customer_name} · {t.customer_email}</div>
                <div className="text-[10px] font-mono text-muted-foreground mt-1">{new Date(t.created_at).toLocaleString()}</div>
              </button>
            ))}
          </div>

          <aside className="border border-border flex flex-col min-h-[400px]">
            {!detail ? (
              <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">Select a ticket.</div>
            ) : (
              <>
                <div className="p-5 border-b border-border">
                  <div className="flex flex-wrap justify-between items-start gap-3">
                    <div>
                      <div className="font-mono text-[10px] text-primary">{detail.ticket.ticket_number}</div>
                      <h2 className="font-serif text-2xl tracking-tight mt-1">{detail.ticket.subject}</h2>
                      <div className="text-sm text-muted-foreground mt-1">
                        {detail.ticket.customer_name} ·{" "}
                        <a href={`mailto:${detail.ticket.customer_email}`} className="text-primary underline">{detail.ticket.customer_email}</a>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <select value={detail.ticket.status} onChange={(e) => updateField({ status: e.target.value })}
                        className="bg-transparent border border-border px-2 py-1 text-xs font-mono uppercase">
                        {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <select value={detail.ticket.priority} onChange={(e) => updateField({ priority: e.target.value })}
                        className="bg-transparent border border-border px-2 py-1 text-xs font-mono uppercase">
                        {PRIORITIES.map((p) => <option key={p} value={p}>{p}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-5 space-y-4 max-h-[50vh]">
                  {detail.messages.map((m) => (
                    <div key={m.id} className={`flex ${m.sender_type === "admin" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[80%] p-3 border ${m.sender_type === "admin" ? "border-primary bg-primary/5" : "border-border"}`}>
                        <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
                          {m.sender_name || (m.sender_type === "admin" ? "You" : detail.ticket.customer_name)} ·{" "}
                          {new Date(m.created_at).toLocaleString()}
                        </div>
                        <p className="text-sm whitespace-pre-wrap">{m.body}</p>
                      </div>
                    </div>
                  ))}
                  {detail.messages.length === 0 && <div className="text-center text-muted-foreground text-sm py-10">No messages yet.</div>}
                </div>

                <div className="p-4 border-t border-border flex gap-2">
                  <textarea rows={2} value={reply} onChange={(e) => setReply(e.target.value)} placeholder="Type your reply…"
                    className="flex-1 bg-transparent border border-border focus:border-primary outline-none p-2 text-sm resize-none" />
                  <button onClick={send} disabled={sending || !reply.trim()}
                    className="px-4 self-stretch bg-primary text-primary-foreground font-mono text-[10px] uppercase tracking-widest font-bold disabled:opacity-50 inline-flex items-center gap-2">
                    <Send size={12} /> {sending ? "…" : "Send"}
                  </button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}
