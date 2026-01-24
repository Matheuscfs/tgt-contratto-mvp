-- Database Performance Optimization: Index Creation
-- Run this script in the Supabase SQL Editor.

-- 1. COMPANIES TABLE
-- Speed up lookups by user and filtering by category/status
CREATE INDEX IF NOT EXISTS idx_companies_profile_id ON public.companies(profile_id);
CREATE INDEX IF NOT EXISTS idx_companies_category ON public.companies(category);
CREATE INDEX IF NOT EXISTS idx_companies_status ON public.companies(status);

-- 2. BOOKINGS TABLE
-- Speed up queries for "My Bookings" (client) and "My Schedule" (company)
CREATE INDEX IF NOT EXISTS idx_bookings_client_id ON public.bookings(client_id);
CREATE INDEX IF NOT EXISTS idx_bookings_company_id ON public.bookings(company_id);
-- Speed up date range queries and sorting
CREATE INDEX IF NOT EXISTS idx_bookings_booking_date ON public.bookings(booking_date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);

-- 3. REVIEWS TABLE
-- Speed up "Reviews for Company X"
CREATE INDEX IF NOT EXISTS idx_reviews_company_id ON public.reviews(company_id);
-- Optimize "Latest reviews" query (Composite index)
CREATE INDEX IF NOT EXISTS idx_reviews_company_date ON public.reviews(company_id, created_at DESC);
-- Speed up "My Reviews" (client)
CREATE INDEX IF NOT EXISTS idx_reviews_client_id ON public.reviews(client_id);
