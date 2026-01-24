-- FIX COMPANIES RLS
-- Enable RLS (if not already)
alter table public.companies enable row level security;

-- Drop (if exists) to avoid conflicts and recreate
drop policy if exists "Companies insert policy" on public.companies;
drop policy if exists "Users can insert own company" on public.companies;

-- Allow authenticated users to insert a company profile if the profile_id matches their auth.uid()
create policy "Users can insert own company"
  on public.companies for insert
  with check (auth.uid() = profile_id);

-- Verify Service Insertion Policy
drop policy if exists "Companies manage services" on public.services;
create policy "Companies manage services"
  on public.services for all
  using (
    exists (
      select 1 from public.companies
      where id = company_id
      and profile_id = auth.uid()
    )
  );
