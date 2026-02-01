-- Create 'portfolio' bucket if it doesn't exist
insert into storage.buckets (id, name, public)
values ('portfolio', 'portfolio', true)
on conflict (id) do nothing;

-- Allow public access to read files
create policy "Public Access Portfolio"
  on storage.objects for select
  using ( bucket_id = 'portfolio' );

-- Allow authenticated users to upload their own assets
create policy "Auth Upload Portfolio"
  on storage.objects for insert
  with check ( bucket_id = 'portfolio' and auth.role() = 'authenticated' );

-- Allow users to delete their own assets (optional, but good for cleanup)
create policy "Auth Delete Portfolio"
  on storage.objects for delete
  using ( bucket_id = 'portfolio' and auth.role() = 'authenticated' );
