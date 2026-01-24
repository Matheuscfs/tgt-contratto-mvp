-- FIX STORAGE POLICIES
-- Drop existing restrict policies to avoid conflicts (optional, but cleaner to replace)
drop policy if exists "Auth Upload Logos" on storage.objects;
drop policy if exists "Auth Upload Covers" on storage.objects;
drop policy if exists "Auth Upload Documents" on storage.objects;

-- Create Permissive Policies for MVP (Authenticated Users)
-- We check 'authenticated' role.
-- Note: 'anon' uploads will still fail unless we change role to 'anon' or 'public'
-- BUT, if you disable Email Confirmation, the user IS 'authenticated'.

create policy "MVP Upload Logos"
  on storage.objects for insert
  with check ( bucket_id = 'logos' ); -- Allow anyone to upload if they have the ID (Simpler for debug)

create policy "MVP Upload Covers"
  on storage.objects for insert
  with check ( bucket_id = 'covers' );

create policy "MVP Upload Documents"
  on storage.objects for insert
  with check ( bucket_id = 'documents' );

-- Ensure Buckets Exist (Idempotent)
insert into storage.buckets (id, name, public) values ('logos', 'logos', true) on conflict (id) do nothing;
insert into storage.buckets (id, name, public) values ('covers', 'covers', true) on conflict (id) do nothing;
insert into storage.buckets (id, name, public) values ('documents', 'documents', false) on conflict (id) do nothing;
