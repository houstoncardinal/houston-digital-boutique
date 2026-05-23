import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Check, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

const SERVICES = [
  "Web Development",
  "App Development",
  "Social Media Management",
  "Video Production",
  "Branding",
  "SEO",
  "Hosting & Support",
  "Not sure yet",
];

const BUDGETS = ["< $5k", "$5k – $15k", "$15k – $50k", "$50k+", "Not sure"];
const TIMELINES = ["ASAP", "1–3 months", "3–6 months", "Just exploring"];
const CITIES = [
  "Houston",
  "Sugar Land",
  "The Woodlands",
  "Katy",
  "Pearland",
  "Spring",
  "Cypress",
  "Missouri City",
  "Other / Outside Houston",
];

type Step = {
  key: string;
  title: string;
  hint: string;
};

const STEPS: Step[] = [
  { key: "services", title: "What are you looking to build?", hint: "Pick all that apply." },
  { key: "city", title: "Where is your business based?", hint: "We serve all of Greater Houston." },
  { key: "budget", title: "What's your budget range?", hint: "Helps us scope the right team." },
  { key: "timeline", title: "When do you want to launch?", hint: "Rough is fine." },
  { key: "details", title: "Tell us about the project", hint: "A sentence or two is plenty." },
  { key: "contact", title: "How can we reach you?", hint: "A senior team member replies within one business day." },
];

export function GuidedLeadForm() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const [services, setServices] = useState<string[]>([]);
  const [city, setCity] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [details, setDetails] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");

  const total = STEPS.length;
  const progress = ((step + 1) / total) * 100;

  const canAdvance = () => {
    switch (STEPS[step].key) {
      case "services":
        return services.length > 0;
      case "city":
        return !!city;
      case "budget":
        return !!budget;
      case "timeline":
        return !!timeline;
      case "details":
        return details.trim().length > 5;
      case "contact":
        return name.trim().length > 1 && /^\S+@\S+\.\S+$/.test(email);
      default:
        return true;
    }
  };

  const toggleService = (s: string) =>
    setServices((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  const next = () => {
    if (!canAdvance()) return;
    if (step < total - 1) setStep(step + 1);
  };
  const back = () => step > 0 && setStep(step - 1);

  const submit = async () => {
    if (!canAdvance()) return;
    setSubmitting(true);
    setError(null);
    const { error: dbError } = await supabase.from("leads").insert({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim() || null,
      company: company.trim() || null,
      city: city || null,
      services,
      budget: budget || null,
      timeline: timeline || null,
      project_details: details.trim() || null,
      source_page: pathname,
    });
    setSubmitting(false);
    if (dbError) {
      setError("Something went wrong. Please try again or email hello@atlashouston.com.");
      return;
    }
    setDone(true);
  };

  if (done) {
    return (
      <div className="border border-primary/40 bg-primary/5 p-10 md:p-16 max-w-2xl">
        <div className="font-mono text-[10px] text-primary uppercase tracking-widest mb-4">
          // Received
        </div>
        <h2 className="font-serif text-3xl md:text-5xl tracking-tight leading-tight">
          Thanks, {name.split(" ")[0]}. A senior teammate will reach out within one business day.
        </h2>
        <p className="mt-6 text-muted-foreground">
          In the meantime, see how we work across {" "}
          <Link to="/houston" className="text-primary underline underline-offset-4">
            Greater Houston
          </Link>
          .
        </p>
      </div>
    );
  }

  const current = STEPS[step];

  return (
    <div className="w-full max-w-2xl">
      {/* Progress */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Step {step + 1} of {total}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="h-1 w-full bg-border overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Heading */}
      <div className="mb-8">
        <h2 className="font-serif text-3xl md:text-5xl tracking-tight leading-[1.05]">
          {current.title}
        </h2>
        <p className="text-muted-foreground mt-3">{current.hint}</p>
      </div>

      {/* Body */}
      <div className="min-h-[200px]">
        {current.key === "services" && (
          <div className="flex flex-wrap gap-2">
            {SERVICES.map((s) => {
              const on = services.includes(s);
              return (
                <button
                  type="button"
                  key={s}
                  onClick={() => toggleService(s)}
                  className={`group inline-flex items-center gap-2 px-4 py-3 border text-sm transition-all ${
                    on
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-primary/60 hover:text-foreground text-muted-foreground"
                  }`}
                >
                  <span
                    className={`flex items-center justify-center h-4 w-4 border ${
                      on ? "border-primary bg-primary text-primary-foreground" : "border-border"
                    }`}
                  >
                    {on && <Check size={12} />}
                  </span>
                  {s}
                </button>
              );
            })}
          </div>
        )}

        {current.key === "city" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {CITIES.map((c) => (
              <button
                type="button"
                key={c}
                onClick={() => setCity(c)}
                className={`px-4 py-3 border text-sm text-left transition-all ${
                  city === c
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-primary/60 text-muted-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        )}

        {current.key === "budget" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {BUDGETS.map((b) => (
              <button
                type="button"
                key={b}
                onClick={() => setBudget(b)}
                className={`px-4 py-3 border text-sm transition-all ${
                  budget === b
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-primary/60 text-muted-foreground"
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        )}

        {current.key === "timeline" && (
          <div className="grid grid-cols-2 gap-2">
            {TIMELINES.map((t) => (
              <button
                type="button"
                key={t}
                onClick={() => setTimeline(t)}
                className={`px-4 py-3 border text-sm transition-all ${
                  timeline === t
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-primary/60 text-muted-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        )}

        {current.key === "details" && (
          <textarea
            autoFocus
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            rows={6}
            placeholder="What are you trying to accomplish? Any existing site, app, or assets we should know about?"
            className="w-full bg-transparent border border-border focus:border-primary outline-none p-4 text-base text-foreground"
          />
        )}

        {current.key === "contact" && (
          <div className="space-y-5">
            <Input label="Your name" value={name} onChange={setName} autoFocus required />
            <Input label="Email" type="email" value={email} onChange={setEmail} required />
            <Input label="Phone (optional)" type="tel" value={phone} onChange={setPhone} />
            <Input label="Company (optional)" value={company} onChange={setCompany} />
          </div>
        )}
      </div>

      {error && (
        <p className="mt-6 text-sm text-destructive font-mono uppercase tracking-widest">
          {error}
        </p>
      )}

      {/* Nav */}
      <div className="mt-10 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={back}
          disabled={step === 0}
          className="inline-flex items-center gap-2 px-4 py-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft size={14} /> Back
        </button>

        {step < total - 1 ? (
          <button
            type="button"
            onClick={next}
            disabled={!canAdvance()}
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-mono text-[11px] font-bold uppercase tracking-widest hover:bg-foreground hover:text-background disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Continue <ChevronRight size={14} />
          </button>
        ) : (
          <button
            type="button"
            onClick={submit}
            disabled={!canAdvance() || submitting}
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-mono text-[11px] font-bold uppercase tracking-widest hover:bg-foreground hover:text-background disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {submitting ? <Loader2 className="animate-spin" size={14} /> : null}
            {submitting ? "Sending…" : "Submit Request →"}
          </button>
        )}
      </div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
  required,
  autoFocus,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  autoFocus?: boolean;
}) {
  return (
    <div>
      <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground block mb-2">
        {label}
      </label>
      <input
        autoFocus={autoFocus}
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent border-b border-border focus:border-primary outline-none py-3 text-base text-foreground"
      />
    </div>
  );
}
