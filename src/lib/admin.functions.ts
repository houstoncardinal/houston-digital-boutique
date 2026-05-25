import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const ADMIN_PIN = "011491";

const PinInput = z.object({ pin: z.string().min(4).max(16) });

export const adminListLeads = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => PinInput.parse(d))
  .handler(async ({ data }) => {
    if (data.pin !== ADMIN_PIN) throw new Error("Invalid PIN");
    const { data: leads, error } = await supabaseAdmin
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return { leads: leads ?? [] };
  });

export const adminUpdateLead = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) =>
    PinInput.extend({
      id: z.string().uuid(),
      patch: z.object({
        status: z.string().max(32).optional(),
        admin_notes: z.string().max(5000).nullable().optional(),
      }),
    }).parse(d),
  )
  .handler(async ({ data }) => {
    if (data.pin !== ADMIN_PIN) throw new Error("Invalid PIN");
    const { error } = await supabaseAdmin
      .from("leads")
      .update(data.patch)
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminVerifyPin = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => PinInput.parse(d))
  .handler(async ({ data }) => {
    if (data.pin !== ADMIN_PIN) throw new Error("Invalid PIN");
    return { ok: true };
  });
