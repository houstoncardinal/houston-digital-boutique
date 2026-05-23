
create or replace function public.bootstrap_first_admin()
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
  existing_count int;
begin
  if uid is null then
    raise exception 'Not authenticated';
  end if;
  select count(*) into existing_count from public.user_roles where role = 'admin';
  if existing_count > 0 then
    raise exception 'An admin already exists';
  end if;
  insert into public.user_roles (user_id, role) values (uid, 'admin');
end;
$$;

revoke all on function public.bootstrap_first_admin() from public;
grant execute on function public.bootstrap_first_admin() to authenticated;
