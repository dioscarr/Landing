-- Messages table and RLS for public inserts via anon key
-- Run this in Supabase SQL editor in your project

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

-- Enable Row Level Security
alter table public.messages enable row level security;

-- Allow anyone (anon) to insert messages (no reads by default)
create policy if not exists "Allow inserts from anon" on public.messages
  for insert
  to anon
  with check (true);

-- Optional: allow authenticated users to read their own or all messages
-- create policy "Allow select to authenticated" on public.messages for select to authenticated using (true);
