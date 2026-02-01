-- Ensure Companies are Publicly Viewable (RLS)
-- Run this if companies are still not showing up after the frontend fix

-- 1. Enable RLS ensuring it is on
alter table public.companies enable row level security;

-- 2. Drop potential restrictive policies (optional, be careful)
-- drop policy if exists "Companies are viewable by everyone" on public.companies;

-- 3. Create/Replace the public view policy
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_policies
        WHERE tablename = 'companies'
        AND policyname = 'Companies are viewable by everyone'
    ) THEN
        create policy "Companies are viewable by everyone"
        on public.companies for select
        using (true);
    END IF;
END
$$;
