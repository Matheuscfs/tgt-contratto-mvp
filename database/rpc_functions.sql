-- RPC: Get Companies Nearby
-- Usage: supabase.rpc('get_companies_nearby', { lat: -23.55, lng: -46.63, radius_km: 10 })

create or replace function get_companies_nearby(
  lat float,
  lng float,
  radius_km int default 50
)
returns table (
  id uuid,
  company_name text,
  category text,
  address jsonb,
  logo_url text,
  distance float
)
language plpgsql
as $$
begin
  return query
  select
    c.id,
    c.company_name,
    c.category,
    c.address,
    c.logo_url,
    (
      6371 * acos(
        cos(radians(lat)) * cos(radians((c.address->>'lat')::float)) *
        cos(radians((c.address->>'lng')::float) - radians(lng)) +
        sin(radians(lat)) * sin(radians((c.address->>'lat')::float))
      )
    ) as distance
  from companies c
  where 
    c.status = 'approved'
    and
    (
      6371 * acos(
        cos(radians(lat)) * cos(radians((c.address->>'lat')::float)) *
        cos(radians((c.address->>'lng')::float) - radians(lng)) +
        sin(radians(lat)) * sin(radians((c.address->>'lat')::float))
      )
    ) < radius_km
  order by distance asc;
end;
$$;
