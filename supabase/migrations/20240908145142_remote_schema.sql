create schema if not exists "drizzle";

create sequence "drizzle"."__drizzle_migrations_id_seq";

create table "drizzle"."__drizzle_migrations" (
    "id" integer not null default nextval('drizzle.__drizzle_migrations_id_seq'::regclass),
    "hash" text not null,
    "created_at" bigint
);


alter sequence "drizzle"."__drizzle_migrations_id_seq" owned by "drizzle"."__drizzle_migrations"."id";

CREATE UNIQUE INDEX __drizzle_migrations_pkey ON drizzle.__drizzle_migrations USING btree (id);

alter table "drizzle"."__drizzle_migrations" add constraint "__drizzle_migrations_pkey" PRIMARY KEY using index "__drizzle_migrations_pkey";


alter table "public"."account" enable row level security;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
begin
    insert into public.account (id, name, email)
    values (new.id, new.raw_user_meta_data->>'name', new.raw_user_meta_data->>'email');
    return new;
end; $function$
;

create policy "Public account are viewable by everyone."
on "public"."account"
as permissive
for select
to public
using (true);


create policy "Users can insert their own account."
on "public"."account"
as permissive
for insert
to public
with check ((( SELECT auth.uid() AS uid) = id));


create policy "Users can update own account."
on "public"."account"
as permissive
for update
to public
using ((( SELECT auth.uid() AS uid) = id));



