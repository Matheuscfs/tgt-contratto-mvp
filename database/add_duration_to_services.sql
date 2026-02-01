ALTER TABLE public.services
ADD COLUMN IF NOT EXISTS duration text;

-- Force schema cache reload just in case
NOTIFY pgrst, 'reload config';
