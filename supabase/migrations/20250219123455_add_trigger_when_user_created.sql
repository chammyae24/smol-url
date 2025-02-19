set
  check_function_bodies = off;

CREATE
OR REPLACE FUNCTION public.on_auth_users_row_created() RETURNS trigger LANGUAGE plpgsql AS $ function $ BEGIN
INSERT INTO
  public.users (id, full_name, avatar_url)
VALUES
  (
    NEW.id,
    NEW.raw_user_meta_data ->> 'full_name',
    NEW.raw_user_meta_data ->> 'avatar_url'
  );

RETURN NEW;

END;

$ function $;

-- create trigger add_row_to_public_users
-- after
-- insert
--   on auth.users for each row execute function on_auth_users_row_created ();