import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { adminOverview } from "@/lib/admin.functions";
import { useAdmin } from "@/components/admin/AdminContext";
import { Inbox, Users, Briefcase, CreditCard, LifeBuoy, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: OverviewPage,
});

function OverviewPage() {
  const { pin } = useAdmin();
  const overview = useServerFn(adminOverview);
  const [data, setData] = useState<Awaited<ReturnType<typeof adminOverview>> | null>(null);

  useEffect(() => {
    overview({ data: { pin } }).then(setData).catch(() => setData(null));
  }, [pin, overview]);

  if (!data) {
    return <div className="p-8 text-muted-foreground text-sm">Loading…</div>;
  }

  const last7Leads = data.leads.filter((l) => Date.now() - new Date(l.created_at).getTime() < 7 * 86400000).length;
  const openTickets = data.tickets.filter((t) => t.status === "open").length;
  const pendingPayments = data.payments.filter((p) => p.status === "pending");
  const outstanding = pendingPayments.reduce((sum, p) => sum + Number(p.amount || 0), 0);
  const activeProjects = data.projects.filter((p) => p.status !== "completed" && p.status !== "archived").length;
  const totalRevenue = data.payments.filter((p) => p.status === "paid").reduce((s, p) => s + Number(p.amount || 0), 0);

  const tiles = [
    { label: "New Leads (7d)", value: last7Leads, icon: Inbox, to: "/admin/leads", accent: "text-primary" },
    { label: "Open Tickets", value: openTickets, icon: LifeBuoy, to: "/admin/support", accent: "text-orange-400" },
    { label: "Active Projects", value: activeProjects, icon: Briefcase, to: "/admin/projects", accent: "text-foreground" },
    { label: "Total Clients", value: data.clients.length, icon: Users, to: "/admin/clients", accent: "text-foreground" },
  ];

  return (
    <div className="p-5 md:p-10 space-y-10">
      <header>
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-3">// Command center</div>
        <h1 className="font-serif text-4xl md:text-5xl tracking-tight">Atlas Hub</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Everything happening across leads, clients, projects, payments and support.
        </p>
      </header>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {tiles.map((t) => {
          const Icon = t.icon;
          return (
            <Link
              key={t.label} to={t.to}
              className="group border border-border p-5 hover:border-primary transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{t.label}</span>
                <Icon className={`${t.accent} group-hover:scale-110 transition-transform`} size={16} />
              </div>
              <div className="font-serif text-4xl md:text-5xl tracking-tight">{t.value}</div>
            </Link>
          );
        })}
      </section>

      <section className="grid lg:grid-cols-2 gap-5 md:gap-6">
        <div className="border border-border p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-serif text-2xl tracking-tight">Revenue</h2>
            <TrendingUp className="text-primary" size={16} />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Collected</div>
              <div className="font-serif text-3xl mt-2">${totalRevenue.toLocaleString()}</div>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Outstanding</div>
              <div className="font-serif text-3xl mt-2 text-primary">${outstanding.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground mt-1">{pendingPayments.length} invoice(s) pending</div>
            </div>
          </div>
          <Link to="/admin/payments" className="mt-6 inline-block font-mono text-[10px] uppercase tracking-widest text-primary hover:text-foreground">
            View payments →
          </Link>
        </div>

        <div className="border border-border p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-serif text-2xl tracking-tight">Quick links</h2>
            <CreditCard className="text-primary" size={16} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Link to="/admin/clients" className="border border-border p-4 text-sm hover:border-primary">+ New client</Link>
            <Link to="/admin/projects" className="border border-border p-4 text-sm hover:border-primary">+ New project</Link>
            <Link to="/admin/payments" className="border border-border p-4 text-sm hover:border-primary">+ New invoice</Link>
            <Link to="/admin/support" className="border border-border p-4 text-sm hover:border-primary">View tickets</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
