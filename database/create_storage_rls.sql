-- Create Storage Bucket for Order Deliverables
-- Bucket is PRIVATE (public = false)

INSERT INTO storage.buckets (id, name, public)
VALUES ('order-deliverables', 'order-deliverables', false)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS on objects if not already enabled
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- 1. UPLOAD POLICY (INSERT)
-- Only the Seller of the order can upload to the specific order folder.
-- Path Structure: order-deliverables/{order_id}/{filename}
-- We check if the user is the Seller of the order matching the folder name.

CREATE POLICY "Sellers can upload deliverables"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'order-deliverables' AND
  EXISTS (
    SELECT 1 FROM public.orders
    WHERE 
      id::text = (storage.foldername(name))[1] -- Extract first folder as order_id
      AND seller_id = auth.uid()
  )
);

-- 2. DOWNLOAD/READ POLICY (SELECT)
-- Buyer and Seller can read files in their order folder.
CREATE POLICY "Participants can view deliverables"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'order-deliverables' AND
  EXISTS (
    SELECT 1 FROM public.orders
    WHERE 
      id::text = (storage.foldername(name))[1]
      AND (buyer_id = auth.uid() OR seller_id = auth.uid())
  )
);

-- 3. DELETE/UPDATE POLICY
-- Only Seller can delete/update their own files? Or maybe nobody to preserve history?
-- For MVP, let Seller delete/overwrite if needed to fix mistakes.
CREATE POLICY "Sellers can update/delete deliverables"
ON storage.objects FOR UPDATE -- and DELETE logic similar if separate policy needed
TO authenticated
USING (
  bucket_id = 'order-deliverables' AND
  EXISTS (
    SELECT 1 FROM public.orders
    WHERE 
      id::text = (storage.foldername(name))[1]
      AND seller_id = auth.uid()
  )
);

CREATE POLICY "Sellers can delete deliverables"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'order-deliverables' AND
  EXISTS (
    SELECT 1 FROM public.orders
    WHERE 
      id::text = (storage.foldername(name))[1]
      AND seller_id = auth.uid()
  )
);
