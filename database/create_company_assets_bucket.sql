-- Create 'company-assets' bucket if it doesn't exist
insert into storage.buckets (id, name, public)
values ('company-assets', 'company-assets', true)
on conflict (id) do nothing;

-- Allow public access to read files
create policy "Public Access Company Assets"
  on storage.objects for select
  using ( bucket_id = 'company-assets' );

-- Allow authenticated users to upload their own assets (or all auth users for MVP)
create policy "Auth Upload Company Assets"
  on storage.objects for insert
  with check ( bucket_id = 'company-assets' and auth.role() = 'authenticated' );

-- Allow users to update their own assets
create policy "Auth Update Company Assets"
  on storage.objects for update
  using ( bucket_id = 'company-assets' and auth.role() = 'authenticated' );
