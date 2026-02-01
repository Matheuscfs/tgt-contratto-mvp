-- Create Portfolio Items Table
-- This table was missing from the database

create table if not exists public.portfolio_items (
  id uuid default uuid_generate_v4() primary key,
  company_id uuid references public.companies(id) on delete cascade not null,
  image_url text not null,
  title text,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.portfolio_items enable row level security;

-- Policies
-- 1. Everyone can view
create policy "Portfolio items are public" 
  on public.portfolio_items for select 
  using (true);

-- 2. Companies can manage their own portfolio
create policy "Companies manage portfolio" 
  on public.portfolio_items for all 
  using (
    exists (
      select 1 from public.companies 
      where id = company_id 
      and profile_id = auth.uid()
    )
  );

-- Indexes
create index if not exists idx_portfolio_items_company_id on public.portfolio_items(company_id);
