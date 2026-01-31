-- PORTFOLIO ITEMS TABLE
create table public.portfolio_items (
  id uuid default uuid_generate_v4() primary key,
  company_id uuid references public.companies(id) on delete cascade not null,
  image_url text not null,
  title text,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS POLICIES FOR PORTFOLIO ITEMS
alter table public.portfolio_items enable row level security;

-- Everyone can view portfolio items
create policy "Portfolio items are public" 
  on public.portfolio_items for select 
  using (true);

-- Companies can insert their own items
create policy "Companies can add portfolio items" 
  on public.portfolio_items for insert 
  with check (
    exists (
      select 1 from public.companies 
      where id = company_id 
      and profile_id = auth.uid()
    )
  );

-- Companies can delete their own items
create policy "Companies can delete portfolio items" 
  on public.portfolio_items for delete 
  using (
    exists (
      select 1 from public.companies 
      where id = company_id 
      and profile_id = auth.uid()
    )
  );

-- STORAGE BUCKET POLICIES (Reference)
-- Bucket: 'portfolio'
-- Policy: Public Read
-- Policy: Authenticated Upload (INSERT)
