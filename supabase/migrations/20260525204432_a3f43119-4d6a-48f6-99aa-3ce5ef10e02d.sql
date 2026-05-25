
-- CLIENTS
create table public.clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  company text,
  city text,
  status text not null default 'active',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.clients enable row level security;

-- PROJECTS
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.clients(id) on delete cascade,
  name text not null,
  description text,
  status text not null default 'planning',
  budget numeric(12,2),
  start_date date,
  due_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.projects enable row level security;

-- MILESTONES
create table public.milestones (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  title text not null,
  description text,
  status text not null default 'todo',
  amount numeric(12,2),
  due_date date,
  completed_at timestamptz,
  position int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.milestones enable row level security;

-- PAYMENTS
create table public.payments (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.clients(id) on delete set null,
  project_id uuid references public.projects(id) on delete set null,
  invoice_number text,
  amount numeric(12,2) not null,
  status text not null default 'pending',
  due_date date,
  paid_date date,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.payments enable row level security;

-- SUPPORT TICKETS
create table public.support_tickets (
  id uuid primary key default gen_random_uuid(),
  ticket_number text unique not null default ('AT-' || upper(substr(replace(gen_random_uuid()::text,'-',''),1,8))),
  customer_name text not null,
  customer_email text not null,
  subject text not null,
  status text not null default 'open',
  priority text not null default 'normal',
  category text,
  client_id uuid references public.clients(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.support_tickets enable row level security;

-- SUPPORT MESSAGES
create table public.support_messages (
  id uuid primary key default gen_random_uuid(),
  ticket_id uuid not null references public.support_tickets(id) on delete cascade,
  sender_type text not null check (sender_type in ('customer','admin')),
  sender_name text,
  body text not null,
  created_at timestamptz not null default now()
);
alter table public.support_messages enable row level security;

-- RLS: public support flow
create policy "Anyone can submit a ticket"
  on public.support_tickets for insert to anon, authenticated with check (true);

create policy "Anyone can look up tickets"
  on public.support_tickets for select to anon, authenticated using (true);

create policy "Anyone can post a message"
  on public.support_messages for insert to anon, authenticated with check (true);

create policy "Anyone can read messages"
  on public.support_messages for select to anon, authenticated using (true);

-- Admin tables (clients, projects, milestones, payments) — no policies.
-- They are only accessed server-side via supabaseAdmin (PIN-gated server fns).

-- updated_at triggers
create trigger trg_clients_updated before update on public.clients
  for each row execute function public.update_updated_at();
create trigger trg_projects_updated before update on public.projects
  for each row execute function public.update_updated_at();
create trigger trg_milestones_updated before update on public.milestones
  for each row execute function public.update_updated_at();
create trigger trg_payments_updated before update on public.payments
  for each row execute function public.update_updated_at();
create trigger trg_support_tickets_updated before update on public.support_tickets
  for each row execute function public.update_updated_at();

-- Indexes
create index idx_projects_client on public.projects(client_id);
create index idx_milestones_project on public.milestones(project_id);
create index idx_payments_client on public.payments(client_id);
create index idx_payments_project on public.payments(project_id);
create index idx_support_messages_ticket on public.support_messages(ticket_id);
create index idx_support_tickets_email on public.support_tickets(customer_email);
create index idx_support_tickets_status on public.support_tickets(status);
