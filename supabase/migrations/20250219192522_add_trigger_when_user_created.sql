set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.on_auth_users_row_created()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  INSERT INTO public.users (id, full_name, avatar_url)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'avatar_url');
  
  RETURN NEW;
END;
$function$
;

create policy "Enable read access to auth users"
on "public"."clicks"
as permissive
for select
to authenticated
using (true);



