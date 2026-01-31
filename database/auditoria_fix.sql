-- AUDITORIA DE BANCO DE DADOS: SCRIPT DE CORREÇÃO (MIGRAÇÃO)
-- Este script corrige os pontos críticos encontrados na auditoria de 24/01/2026.

BEGIN;

-- 1. CORREÇÃO DE SEGURANÇA: RLS em SERVICES
-- Garantindo que apenas o dono da empresa possa deletar serviços de forma segura.
DROP POLICY IF EXISTS "Companies can delete their own services" ON public.services;
CREATE POLICY "Companies can delete their own services" 
ON public.services FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM public.companies 
    WHERE public.companies.id = public.services.company_id 
    AND public.companies.profile_id = auth.uid()
  )
);

-- 2. INTEGRIDADE: NORMALIZAÇÃO DE CHAVES ESTRANGEIRAS
-- Alterando referências de auth.users direto para public.profiles para consistência de domínio público.

-- Em BOOKINGS
ALTER TABLE public.bookings 
DROP CONSTRAINT IF EXISTS bookings_client_id_fkey;

ALTER TABLE public.bookings
ADD CONSTRAINT bookings_client_id_fkey 
FOREIGN KEY (client_id) REFERENCES public.profiles(id);

-- Em REVIEWS
ALTER TABLE public.reviews 
DROP CONSTRAINT IF EXISTS reviews_client_id_fkey;

ALTER TABLE public.reviews
ADD CONSTRAINT reviews_client_id_fkey 
FOREIGN KEY (client_id) REFERENCES public.profiles(id);

-- Em NOTIFICATIONS
ALTER TABLE public.notifications 
DROP CONSTRAINT IF EXISTS notifications_user_id_fkey;

ALTER TABLE public.notifications
ADD CONSTRAINT notifications_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES public.profiles(id);


-- 3. AUDITORIA: ADIÇÃO DE COLUNAS UPDATED_AT E TRIGGERS
-- Adicionando rastreabilidade de modificação nas tabelas transacionais.

DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='bookings' AND column_name='updated_at') THEN
    ALTER TABLE public.bookings ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='reviews' AND column_name='updated_at') THEN
    ALTER TABLE public.reviews ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='messages' AND column_name='updated_at') THEN
    ALTER TABLE public.messages ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL;
  END IF;
END $$;

-- Aplicando trigger de update (assumindo que a função update_modified_column() existe, se não, criamos aqui)
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_bookings_modtime ON public.bookings;
CREATE TRIGGER update_bookings_modtime BEFORE UPDATE ON public.bookings FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

DROP TRIGGER IF EXISTS update_reviews_modtime ON public.reviews;
CREATE TRIGGER update_reviews_modtime BEFORE UPDATE ON public.reviews FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

DROP TRIGGER IF EXISTS update_messages_modtime ON public.messages;
CREATE TRIGGER update_messages_modtime BEFORE UPDATE ON public.messages FOR EACH ROW EXECUTE PROCEDURE update_modified_column();


-- 4. PERFORMANCE: ÍNDICES ADICIONAIS
CREATE INDEX IF NOT EXISTS idx_notifications_user_read ON public.notifications(user_id, read);
CREATE INDEX IF NOT EXISTS idx_messages_receiver_read ON public.messages(receiver_id, read);

COMMIT;
