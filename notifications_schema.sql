-- NOTIFICATIONS TABLE
create table public.notifications (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) not null,
  type text not null check (type in (
    'booking_created',
    'booking_confirmed', 
    'booking_completed',
    'booking_cancelled',
    'message_received',
    'review_received',
    'company_approved',
    'company_rejected'
  )),
  title text not null,
  message text not null,
  link text, -- URL para redirecionar (ex: /dashboard/agendamentos/123)
  read boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS POLICIES FOR NOTIFICATIONS
alter table public.notifications enable row level security;

-- Users can view their own notifications
create policy "Users can view own notifications" 
  on public.notifications for select 
  using (auth.uid() = user_id);

-- Users can update their own notifications (mark as read)
create policy "Users can update own notifications" 
  on public.notifications for update 
  using (auth.uid() = user_id);

-- ENABLE REALTIME
-- This allows clients to subscribe to changes on this table
alter publication supabase_realtime add table public.notifications;
