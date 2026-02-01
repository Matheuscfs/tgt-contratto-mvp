-- TGT Contratto - Unified Initial Schema
-- Generated from consolidated scripts

-- 1. SETUP & EXTENSIONS
create extension if not exists "uuid-ossp";

-- 2. TABLES

-- Profiles (Public user data)
create table public.profiles (
  id uuid references auth.users not null primary key,
  email text,
  full_name text,
  avatar_url text,
  user_type text check (user_type in ('client', 'company', 'admin')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Companies
create table public.companies (
  id uuid default uuid_generate_v4() primary key,
  profile_id uuid references public.profiles(id) not null,
  company_name text not null,
  legal_name text not null,
  cnpj text not null unique,
  category text not null,
  description text,
  phone text,
  website text,
  status text default 'pending' check (status in ('pending', 'approved', 'rejected')),
  address jsonb not null default '{}'::jsonb, -- { city, state, street, zip, lat, lng }
  admin_contact jsonb not null default '{}'::jsonb,
  logo_url text,
  cover_image_url text,
  cnpj_document_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Services
create table public.services (
  id uuid default uuid_generate_v4() primary key,
  company_id uuid references public.companies(id) on delete cascade not null,
  title text not null,
  description text,
  price numeric(10,2),
  duration text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Portfolio Items
create table public.portfolio_items (
  id uuid default uuid_generate_v4() primary key,
  company_id uuid references public.companies(id) on delete cascade not null,
  image_url text not null,
  title text,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Bookings
create table public.bookings (
  id uuid default uuid_generate_v4() primary key,
  client_id uuid references auth.users(id) not null,
  company_id uuid references public.companies(id) not null,
  service_title text not null,
  service_price numeric(10,2),
  booking_date date not null,
  booking_time text,
  notes text,
  status text default 'pending' check (status in ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Reviews
create table public.reviews (
  id uuid default uuid_generate_v4() primary key,
  company_id uuid references public.companies(id) not null,
  client_id uuid references auth.users(id) not null,
  rating integer not null check (rating >= 1 and rating <= 5),
  comment text,
  reply text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Favorites
create table public.favorites (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) not null,
  company_id uuid references public.companies(id) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, company_id)
);

-- Messages (Chat)
create table public.messages (
  id uuid default uuid_generate_v4() primary key,
  sender_id uuid references auth.users(id) not null,
  receiver_id uuid references auth.users(id) not null,
  content text not null,
  read boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Notifications
create table public.notifications (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) not null,
  type text not null check (type in ('booking_created','booking_confirmed','booking_completed','booking_cancelled','message_received','review_received','company_approved','company_rejected')),
  title text not null,
  message text not null,
  link text,
  read boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. INDEXES (Performance)

-- Companies
create index if not exists idx_companies_profile_id on public.companies(profile_id);
create index if not exists idx_companies_category on public.companies(category);
create index if not exists idx_companies_status on public.companies(status);

-- Bookings
create index if not exists idx_bookings_client_id on public.bookings(client_id);
create index if not exists idx_bookings_company_id on public.bookings(company_id);
create index if not exists idx_bookings_booking_date on public.bookings(booking_date);
create index if not exists idx_bookings_status on public.bookings(status);

-- Reviews
create index if not exists idx_reviews_company_id on public.reviews(company_id);
create index if not exists idx_reviews_company_date on public.reviews(company_id, created_at desc);
create index if not exists idx_reviews_client_id on public.reviews(client_id);

-- 4. ROW LEVEL SECURITY (RLS)

-- Profiles
alter table public.profiles enable row level security;
create policy "Public profiles are viewable by everyone" on public.profiles for select using (true);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

-- Companies
alter table public.companies enable row level security;
create policy "Companies are viewable by everyone" on public.companies for select using (true);
create policy "Users can insert own company" on public.companies for insert with check (auth.uid() = profile_id);
create policy "Companies can update own record" on public.companies for update using (auth.uid() = profile_id);

-- Services
alter table public.services enable row level security;
create policy "Services are viewable by everyone" on public.services for select using (true);
create policy "Companies manage services" on public.services for all using (exists (select 1 from public.companies where id = company_id and profile_id = auth.uid()));

-- Portfolio
alter table public.portfolio_items enable row level security;
create policy "Portfolio items are public" on public.portfolio_items for select using (true);
create policy "Companies manage portfolio" on public.portfolio_items for all using (exists (select 1 from public.companies where id = company_id and profile_id = auth.uid()));

-- Bookings
alter table public.bookings enable row level security;
create policy "Clients can view their own bookings" on public.bookings for select using (auth.uid() = client_id);
create policy "Clients can create bookings" on public.bookings for insert with check (auth.uid() = client_id);
create policy "Companies can view their bookings" on public.bookings for select using (exists (select 1 from public.companies where id = company_id and profile_id = auth.uid()));
create policy "Companies can update booking status" on public.bookings for update using (exists (select 1 from public.companies where id = company_id and profile_id = auth.uid()));

-- Reviews
alter table public.reviews enable row level security;
create policy "Reviews are public" on public.reviews for select using (true);
create policy "Clients can create reviews" on public.reviews for insert with check (auth.uid() = client_id);
create policy "Companies can reply to reviews" on public.reviews for update using (exists (select 1 from public.companies where id = company_id and profile_id = auth.uid()));

-- Favorites
alter table public.favorites enable row level security;
create policy "Users manage favorites" on public.favorites for all using (auth.uid() = user_id);

-- Messages
alter table public.messages enable row level security;
create policy "Users manage own messages" on public.messages for all using (auth.uid() = sender_id or auth.uid() = receiver_id);

-- Notifications
alter table public.notifications enable row level security;
create policy "Users manage own notifications" on public.notifications for all using (auth.uid() = user_id);

-- 5. FUNCTION TRIGGER (Auto Profile)
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, user_type, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data->>'name', new.raw_user_meta_data->>'type', new.raw_user_meta_data->>'avatar_url')
  on conflict (id) do update set
    email = excluded.email,
    full_name = coalesce(excluded.full_name, public.profiles.full_name),
    user_type = coalesce(excluded.user_type, public.profiles.user_type),
    avatar_url = coalesce(excluded.avatar_url, public.profiles.avatar_url);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 6. REALTIME
alter publication supabase_realtime add table public.messages;
alter publication supabase_realtime add table public.notifications;

-- 7. NOTIFICATIONS TRIGGERS (Simplified for initial schema)
-- See notification_triggers.sql for full body content if needing redeploy.
-- Included basics conceptually above, but complex triggers kept separate usually or appended here.
