-- FIX COMPANIES TABLE AND POLICIES (FULL SETUP)

-- 1. Ensure Columns Exist (Idempotent)
alter table public.companies 
add column if not exists email text,
add column if not exists admin_contact jsonb,
add column if not exists website text,
add column if not exists category text,
add column if not exists description text,
add column if not exists address jsonb,
add column if not exists created_at timestamp with time zone default now(),
add column if not exists status text default 'pending',
add column if not exists logo_url text,
add column if not exists cover_image_url text,
add column if not exists cnpj_document_url text;

-- 2. Enable RLS
alter table public.companies enable row level security;

-- 3. Define Policies (Drop old ones first to avoid duplicates)
drop policy if exists "Companies are viewable by everyone" on public.companies;
drop policy if exists "Companies insert policy" on public.companies;
drop policy if exists "Users can insert own company" on public.companies;
drop policy if exists "Users can update own company" on public.companies;
drop policy if exists "Allow public insert" on public.companies;

-- Policy: Anyone can view companies (Public Profile)
create policy "Companies are viewable by everyone"
  on public.companies for select
  using (true);

-- Policy: Authenticated users can INSERT their own company profile
-- IMPORTANT: This requires the user to be logged in (Session active).
-- If email verification is enabled, the user must verify email before this works,
-- OR the application must handle the "No Session" state.
create policy "Users can insert own company"
  on public.companies for insert
  to authenticated
  with check (auth.uid() = profile_id);

-- Policy: Users can UPDATE their own company
create policy "Users can update own company"
  on public.companies for update
  to authenticated
  using (auth.uid() = profile_id);

-- 4. Grant Permissions (Standard)
grant usage on schema public to anon, authenticated;
grant all on public.companies to authenticated;
grant select on public.companies to anon;
