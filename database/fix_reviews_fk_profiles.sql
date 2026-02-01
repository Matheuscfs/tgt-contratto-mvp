-- Fix Reviews Foreign Key to reference profiles instead of auth.users
-- This is necessary for Supabase to correctly join reviews with profiles in API queries

DO $$
BEGIN
    -- 1. Try to drop the old constraint (standard naming convention)
    BEGIN
        ALTER TABLE public.reviews DROP CONSTRAINT IF EXISTS reviews_client_id_fkey;
    EXCEPTION
        WHEN undefined_object THEN NULL;
    END;

    -- 2. Add the new constraint referencing public.profiles
    -- We use a distinct name to ensure successful creation
    ALTER TABLE public.reviews
    ADD CONSTRAINT reviews_client_id_fkey_profiles
    FOREIGN KEY (client_id)
    REFERENCES public.profiles(id)
    ON DELETE CASCADE; -- Optional: if a profile is deleted, reviews might go too, or set null. Cascade is usually safe for pure relation.
END $$;
