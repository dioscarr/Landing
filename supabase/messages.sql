-- Messages table and RLS for public inserts via anon key
-- Run this in Supabase SQL editor in your project
-- If gen_random_uuid() is unavailable, enable pgcrypto:
-- create extension if not exists pgcrypto;

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
drop policy if exists "Allow inserts from anon" on public.messages;
create policy "Allow inserts from anon" on public.messages
  for insert
  to anon
  with check (true);

-- Allow authenticated users to read messages
drop policy if exists "Allow select to authenticated" on public.messages;
create policy "Allow select to authenticated" on public.messages
  for select
  to authenticated
  using (true);

-- Helpful index for ordered queries
create index if not exists messages_created_at_idx on public.messages (created_at desc);
