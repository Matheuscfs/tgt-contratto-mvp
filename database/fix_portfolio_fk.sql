-- Fix Portfolio Items Foreign Key
-- Adds missing FK relationship to companies table

DO $$
BEGIN
    -- 1. Try to drop existing constraint if it has a wrong name or definition
    BEGIN
        ALTER TABLE public.portfolio_items DROP CONSTRAINT IF EXISTS portfolio_items_company_id_fkey;
    EXCEPTION
        WHEN undefined_object THEN NULL;
    END;

    -- 2. Add the FK constraint
    BEGIN
        ALTER TABLE public.portfolio_items
        ADD CONSTRAINT portfolio_items_company_id_fkey
        FOREIGN KEY (company_id)
        REFERENCES public.companies(id)
        ON DELETE CASCADE;
    EXCEPTION
        WHEN duplicate_object THEN NULL;
    END;
END $$;
