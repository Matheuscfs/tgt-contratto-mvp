-- NOTIFICATION TRIGGER FUNCTIONS

-- 1. Notify company when new booking is created
create or replace function notify_new_booking()
returns trigger as $$
declare
  company_profile_id uuid;
begin
  -- Get company profile_id from companies table
  select profile_id into company_profile_id
  from public.companies
  where id = new.company_id;

  -- Create notification for company owner
  insert into public.notifications (user_id, type, title, message, link)
  values (
    company_profile_id,
    'booking_created',
    'Novo Agendamento',
    'Você recebeu um novo agendamento para ' || new.service_title,
    '/dashboard/agendamentos'
  );

  return new;
end;
$$ language plpgsql security definer;

create trigger on_booking_created
  after insert on public.bookings
  for each row execute procedure notify_new_booking();


-- 2. Notify client when booking status changes
create or replace function notify_booking_status_change()
returns trigger as $$
begin
  -- Only notify if status actually changed
  if old.status is distinct from new.status then
    insert into public.notifications (user_id, type, title, message, link)
    values (
      new.client_id,
      'booking_' || new.status,
      case 
        when new.status = 'confirmed' then 'Agendamento Confirmado'
        when new.status = 'completed' then 'Serviço Concluído'
        when new.status = 'cancelled' then 'Agendamento Cancelado'
        else 'Status Atualizado'
      end,
      'Seu agendamento para ' || new.service_title || ' foi ' || 
      case 
        when new.status = 'confirmed' then 'confirmado'
        when new.status = 'completed' then 'concluído'
        when new.status = 'cancelled' then 'cancelado'
        else 'atualizado'
      end,
      '/dashboard/agendamentos'
    );
  end if;

  return new;
end;
$$ language plpgsql security definer;

create trigger on_booking_status_updated
  after update on public.bookings
  for each row execute procedure notify_booking_status_change();


-- 3. Notify user when they receive a new message
create or replace function notify_new_message()
returns trigger as $$
begin
  insert into public.notifications (user_id, type, title, message, link)
  values (
    new.receiver_id,
    'message_received',
    'Nova Mensagem',
    'Você recebeu uma nova mensagem',
    '/dashboard/mensagens'
  );

  return new;
end;
$$ language plpgsql security definer;

create trigger on_message_created
  after insert on public.messages
  for each row execute procedure notify_new_message();


-- 4. Notify company when they receive a new review
create or replace function notify_new_review()
returns trigger as $$
declare
  company_profile_id uuid;
begin
  -- Get company profile_id
  select profile_id into company_profile_id
  from public.companies
  where id = new.company_id;

  insert into public.notifications (user_id, type, title, message, link)
  values (
    company_profile_id,
    'review_received',
    'Nova Avaliação',
    'Você recebeu uma nova avaliação de ' || new.rating || ' estrelas',
    '/dashboard/avaliacoes'
  );

  return new;
end;
$$ language plpgsql security definer;

create trigger on_review_created
  after insert on public.reviews
  for each row execute procedure notify_new_review();


-- 5. Notify company when status changes (approved/rejected)
create or replace function notify_company_status_change()
returns trigger as $$
begin
  -- Only notify if status changed to approved or rejected
  if old.status is distinct from new.status and new.status in ('approved', 'rejected') then
    insert into public.notifications (user_id, type, title, message, link)
    values (
      new.profile_id,
      'company_' || new.status,
      case 
        when new.status = 'approved' then 'Cadastro Aprovado!'
        when new.status = 'rejected' then 'Cadastro Rejeitado'
      end,
      case 
        when new.status = 'approved' then 'Parabéns! Seu cadastro foi aprovado e seu perfil está ativo.'
        when new.status = 'rejected' then 'Infelizmente seu cadastro não foi aprovado. Entre em contato para mais informações.'
      end,
      '/dashboard'
    );
  end if;

  return new;
end;
$$ language plpgsql security definer;

create trigger on_company_status_updated
  after update on public.companies
  for each row execute procedure notify_company_status_change();
