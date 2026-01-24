-- COMPLETE FIX FOR COMPANIES TABLE (Run this in Supabase SQL Editor)

-- 1. Add slug column if not exists
alter table public.companies add column if not exists slug text unique;

-- 2. Create slugify function for server-side slug generation
create or replace function public.slugify(value text)
returns text as $$
begin
  return lower(
    regexp_replace(
      regexp_replace(
        translate(value, 'áàâãäåāăąèééêëēĕėęěìíîïìĩīĭįòóôõöōŏőøùúûüũūŭůűųñç', 'aaaaaaaaaaaaaaaaeeeeeeeeeeeeiiiililililoooooooouuuuuuuuuuunc'),
        '[^a-z0-9\\-_]+', '-', 'g'
      ),
      '^-+|-+$', '', 'g'
    )
  );
end;
$$ language plpgsql;

-- 3. Update existing companies with slugs (if any exist)
update public.companies set slug = slugify(company_name) where slug is null;

-- 4. Make slug NOT NULL (only after existing rows have values)
alter table public.companies alter column slug set not null;

-- 5. Ensure all other required columns exist
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

-- 6. Enable RLS
alter table public.companies enable row level security;

-- 7. Drop old policies to avoid conflicts
drop policy if exists "Companies are viewable by everyone" on public.companies;
drop policy if exists "Companies insert policy" on public.companies;
drop policy if exists "Users can insert own company" on public.companies;
drop policy if exists "Users can update own company" on public.companies;
drop policy if exists "Companies can update own data" on public.companies;
drop policy if exists "Companies can update own record" on public.companies;

-- 8. Create fresh RLS policies
create policy "Companies are viewable by everyone"
  on public.companies for select
  using (true);

create policy "Users can insert own company"
  on public.companies for insert
  to authenticated
  with check (auth.uid() = profile_id);

create policy "Users can update own company"
  on public.companies for update
  to authenticated
  using (auth.uid() = profile_id);

-- 9. Grant permissions
grant usage on schema public to anon, authenticated;
grant all on public.companies to authenticated;
grant select on public.companies to anon;
