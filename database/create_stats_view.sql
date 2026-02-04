-- Create View for Seller Statistics & Levels
-- Aggregates data from orders and reviews to determine Gamification Level

CREATE OR REPLACE VIEW seller_stats AS
WITH order_metrics AS (
    SELECT 
        seller_id,
        COUNT(*) FILTER (WHERE status = 'completed') as total_completed_orders,
        -- Calculate on-time rate if delivery_deadline exists, otherwise placeholder (assuming 100% for MVP)
        -- specific logic involves checking completed_at <= delivery_deadline
        -- For MVP without confirmed delivery_deadline column, we will stub this or use simple logic
        100 as on_time_delivery_rate 
    FROM orders
    GROUP BY seller_id
),
review_metrics AS (
    SELECT 
        c.owner_id as seller_id,
        AVG(r.rating)::numeric(10,2) as average_rating,
        COUNT(r.id) as total_reviews
    FROM reviews r
    JOIN companies c ON r.company_id = c.id
    GROUP BY c.owner_id
)
SELECT 
    p.id as seller_id,
    COALESCE(om.total_completed_orders, 0) as total_completed_orders,
    COALESCE(rm.average_rating, 0) as average_rating,
    COALESCE(om.on_time_delivery_rate, 0) as on_time_delivery_rate,
    
    -- Level Logic
    CASE 
        WHEN p.is_verified THEN 'Pro'
        WHEN COALESCE(om.total_completed_orders, 0) > 20 AND COALESCE(rm.average_rating, 0) > 4.8 THEN 'Level 2'
        WHEN COALESCE(om.total_completed_orders, 0) > 5 AND COALESCE(rm.average_rating, 0) > 4.5 THEN 'Level 1'
        ELSE 'Beginner'
    END as current_level,

    -- Progress Logic (Next Level)
    CASE 
        WHEN p.is_verified THEN NULL -- Max level
        WHEN COALESCE(om.total_completed_orders, 0) > 20 AND COALESCE(rm.average_rating, 0) > 4.8 THEN NULL -- Level 2 is max non-pro
        WHEN COALESCE(om.total_completed_orders, 0) > 5 AND COALESCE(rm.average_rating, 0) > 4.5 THEN 'Level 2'
        ELSE 'Level 1'
    END as next_level,

    -- Orders needed for next level
    CASE 
        WHEN p.is_verified OR (COALESCE(om.total_completed_orders, 0) > 20 AND COALESCE(rm.average_rating, 0) > 4.8) THEN 0
        WHEN COALESCE(om.total_completed_orders, 0) > 5 AND COALESCE(rm.average_rating, 0) > 4.5 THEN GREATEST(0, 21 - COALESCE(om.total_completed_orders, 0)) -- For Level 2
        ELSE GREATEST(0, 6 - COALESCE(om.total_completed_orders, 0)) -- For Level 1
    END as orders_to_next_level

FROM profiles p
LEFT JOIN order_metrics om ON p.id = om.seller_id
LEFT JOIN review_metrics rm ON p.id = rm.seller_id;
