import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const ADMIN_PIN = "011491";
const Pin = z.string().min(4).max(16);
const guard = (pin: string) => {
  if (pin !== ADMIN_PIN) throw new Error("Invalid PIN");
};

export const adminVerifyPin = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => z.object({ pin: Pin }).parse(d))
  .handler(async ({ data }) => {
    guard(data.pin);
    return { ok: true };
  });

// ---------------- LEADS ----------------
export const adminListLeads = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => z.object({ pin: Pin }).parse(d))
  .handler(async ({ data }) => {
    guard(data.pin);
    const { data: rows, error } = await supabaseAdmin
      .from("leads").select("*").order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return { leads: rows ?? [] };
  });

export const adminUpdateLead = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) =>
    z.object({
      pin: Pin,
      id: z.string().uuid(),
      patch: z.object({
        status: z.string().max(32).optional(),
        admin_notes: z.string().max(5000).nullable().optional(),
      }),
    }).parse(d),
  )
  .handler(async ({ data }) => {
    guard(data.pin);
    const { error } = await supabaseAdmin.from("leads").update(data.patch).eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ---------------- CLIENTS ----------------
const ClientPatch = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(255),
  phone: z.string().max(40).nullable().optional(),
  company: z.string().max(200).nullable().optional(),
  city: z.string().max(120).nullable().optional(),
  status: z.string().max(32).optional(),
  notes: z.string().max(5000).nullable().optional(),
});

export const adminListClients = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => z.object({ pin: Pin }).parse(d))
  .handler(async ({ data }) => {
    guard(data.pin);
    const { data: rows, error } = await supabaseAdmin
      .from("clients").select("*").order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return { clients: rows ?? [] };
  });

export const adminUpsertClient = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) =>
    z.object({ pin: Pin, id: z.string().uuid().nullable(), patch: ClientPatch }).parse(d),
  )
  .handler(async ({ data }) => {
    guard(data.pin);
    if (data.id) {
      const { error } = await supabaseAdmin.from("clients").update(data.patch).eq("id", data.id);
      if (error) throw new Error(error.message);
      return { id: data.id };
    }
    const { data: row, error } = await supabaseAdmin
      .from("clients").insert(data.patch).select("id").single();
    if (error) throw new Error(error.message);
    return { id: row.id };
  });

export const adminDeleteClient = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => z.object({ pin: Pin, id: z.string().uuid() }).parse(d))
  .handler(async ({ data }) => {
    guard(data.pin);
    const { error } = await supabaseAdmin.from("clients").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ---------------- PROJECTS ----------------
const ProjectPatch = z.object({
  client_id: z.string().uuid().nullable().optional(),
  name: z.string().min(1).max(200),
  description: z.string().max(5000).nullable().optional(),
  status: z.string().max(32).optional(),
  budget: z.number().nullable().optional(),
  start_date: z.string().nullable().optional(),
  due_date: z.string().nullable().optional(),
});

export const adminListProjects = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => z.object({ pin: Pin }).parse(d))
  .handler(async ({ data }) => {
    guard(data.pin);
    const [{ data: projects, error: e1 }, { data: clients, error: e2 }, { data: milestones, error: e3 }] = await Promise.all([
      supabaseAdmin.from("projects").select("*").order("created_at", { ascending: false }),
      supabaseAdmin.from("clients").select("id,name,company"),
      supabaseAdmin.from("milestones").select("*").order("position", { ascending: true }),
    ]);
    if (e1) throw new Error(e1.message);
    if (e2) throw new Error(e2.message);
    if (e3) throw new Error(e3.message);
    return { projects: projects ?? [], clients: clients ?? [], milestones: milestones ?? [] };
  });

export const adminUpsertProject = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) =>
    z.object({ pin: Pin, id: z.string().uuid().nullable(), patch: ProjectPatch }).parse(d),
  )
  .handler(async ({ data }) => {
    guard(data.pin);
    if (data.id) {
      const { error } = await supabaseAdmin.from("projects").update(data.patch).eq("id", data.id);
      if (error) throw new Error(error.message);
      return { id: data.id };
    }
    const { data: row, error } = await supabaseAdmin
      .from("projects").insert(data.patch).select("id").single();
    if (error) throw new Error(error.message);
    return { id: row.id };
  });

export const adminDeleteProject = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => z.object({ pin: Pin, id: z.string().uuid() }).parse(d))
  .handler(async ({ data }) => {
    guard(data.pin);
    const { error } = await supabaseAdmin.from("projects").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ---------------- MILESTONES ----------------
const MilestonePatch = z.object({
  project_id: z.string().uuid(),
  title: z.string().min(1).max(200),
  description: z.string().max(2000).nullable().optional(),
  status: z.string().max(32).optional(),
  amount: z.number().nullable().optional(),
  due_date: z.string().nullable().optional(),
  position: z.number().int().optional(),
});

export const adminUpsertMilestone = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) =>
    z.object({ pin: Pin, id: z.string().uuid().nullable(), patch: MilestonePatch }).parse(d),
  )
  .handler(async ({ data }) => {
    guard(data.pin);
    if (data.id) {
      const { error } = await supabaseAdmin.from("milestones").update(data.patch).eq("id", data.id);
      if (error) throw new Error(error.message);
      return { id: data.id };
    }
    const { data: row, error } = await supabaseAdmin
      .from("milestones").insert(data.patch).select("id").single();
    if (error) throw new Error(error.message);
    return { id: row.id };
  });

export const adminToggleMilestone = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) =>
    z.object({ pin: Pin, id: z.string().uuid(), status: z.string() }).parse(d),
  )
  .handler(async ({ data }) => {
    guard(data.pin);
    const patch = {
      status: data.status,
      completed_at: data.status === "done" ? new Date().toISOString() : null,
    };
    const { error } = await supabaseAdmin.from("milestones").update(patch).eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminDeleteMilestone = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => z.object({ pin: Pin, id: z.string().uuid() }).parse(d))
  .handler(async ({ data }) => {
    guard(data.pin);
    const { error } = await supabaseAdmin.from("milestones").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ---------------- PAYMENTS ----------------
const PaymentPatch = z.object({
  client_id: z.string().uuid().nullable().optional(),
  project_id: z.string().uuid().nullable().optional(),
  invoice_number: z.string().max(64).nullable().optional(),
  amount: z.number(),
  status: z.string().max(32).optional(),
  due_date: z.string().nullable().optional(),
  paid_date: z.string().nullable().optional(),
  notes: z.string().max(2000).nullable().optional(),
});

export const adminListPayments = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => z.object({ pin: Pin }).parse(d))
  .handler(async ({ data }) => {
    guard(data.pin);
    const [{ data: payments, error: e1 }, { data: clients, error: e2 }, { data: projects, error: e3 }] = await Promise.all([
      supabaseAdmin.from("payments").select("*").order("created_at", { ascending: false }),
      supabaseAdmin.from("clients").select("id,name,company"),
      supabaseAdmin.from("projects").select("id,name"),
    ]);
    if (e1) throw new Error(e1.message);
    if (e2) throw new Error(e2.message);
    if (e3) throw new Error(e3.message);
    return { payments: payments ?? [], clients: clients ?? [], projects: projects ?? [] };
  });

export const adminUpsertPayment = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) =>
    z.object({ pin: Pin, id: z.string().uuid().nullable(), patch: PaymentPatch }).parse(d),
  )
  .handler(async ({ data }) => {
    guard(data.pin);
    if (data.id) {
      const { error } = await supabaseAdmin.from("payments").update(data.patch).eq("id", data.id);
      if (error) throw new Error(error.message);
      return { id: data.id };
    }
    const { data: row, error } = await supabaseAdmin
      .from("payments").insert(data.patch).select("id").single();
    if (error) throw new Error(error.message);
    return { id: row.id };
  });

export const adminDeletePayment = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => z.object({ pin: Pin, id: z.string().uuid() }).parse(d))
  .handler(async ({ data }) => {
    guard(data.pin);
    const { error } = await supabaseAdmin.from("payments").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ---------------- SUPPORT ----------------
export const adminListTickets = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => z.object({ pin: Pin }).parse(d))
  .handler(async ({ data }) => {
    guard(data.pin);
    const { data: rows, error } = await supabaseAdmin
      .from("support_tickets").select("*").order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return { tickets: rows ?? [] };
  });

export const adminGetTicket = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => z.object({ pin: Pin, id: z.string().uuid() }).parse(d))
  .handler(async ({ data }) => {
    guard(data.pin);
    const [{ data: ticket, error: e1 }, { data: messages, error: e2 }] = await Promise.all([
      supabaseAdmin.from("support_tickets").select("*").eq("id", data.id).single(),
      supabaseAdmin.from("support_messages").select("*").eq("ticket_id", data.id).order("created_at", { ascending: true }),
    ]);
    if (e1) throw new Error(e1.message);
    if (e2) throw new Error(e2.message);
    return { ticket, messages: messages ?? [] };
  });

export const adminReplyTicket = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) =>
    z.object({
      pin: Pin,
      ticket_id: z.string().uuid(),
      body: z.string().min(1).max(5000),
    }).parse(d),
  )
  .handler(async ({ data }) => {
    guard(data.pin);
    const { error } = await supabaseAdmin.from("support_messages").insert({
      ticket_id: data.ticket_id,
      sender_type: "admin",
      sender_name: "Atlas Houston Support",
      body: data.body,
    });
    if (error) throw new Error(error.message);
    await supabaseAdmin.from("support_tickets")
      .update({ status: "answered", updated_at: new Date().toISOString() })
      .eq("id", data.ticket_id);
    return { ok: true };
  });

export const adminUpdateTicket = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) =>
    z.object({
      pin: Pin,
      id: z.string().uuid(),
      patch: z.object({
        status: z.string().max(32).optional(),
        priority: z.string().max(32).optional(),
      }),
    }).parse(d),
  )
  .handler(async ({ data }) => {
    guard(data.pin);
    const { error } = await supabaseAdmin.from("support_tickets").update(data.patch).eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ---------------- OVERVIEW ----------------
export const adminOverview = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => z.object({ pin: Pin }).parse(d))
  .handler(async ({ data }) => {
    guard(data.pin);
    const [leads, clients, projects, payments, tickets] = await Promise.all([
      supabaseAdmin.from("leads").select("id,status,created_at"),
      supabaseAdmin.from("clients").select("id,status"),
      supabaseAdmin.from("projects").select("id,status,budget"),
      supabaseAdmin.from("payments").select("id,amount,status,due_date"),
      supabaseAdmin.from("support_tickets").select("id,status,priority"),
    ]);
    return {
      leads: leads.data ?? [],
      clients: clients.data ?? [],
      projects: projects.data ?? [],
      payments: payments.data ?? [],
      tickets: tickets.data ?? [],
    };
  });
