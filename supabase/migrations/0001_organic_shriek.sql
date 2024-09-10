DO $$ BEGIN
 CREATE TYPE "public"."role" AS ENUM('none', 'client', 'coach', 'admin');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "account" ADD COLUMN "username" text;--> statement-breakpoint
ALTER TABLE "account" ADD COLUMN "role" "role" DEFAULT 'none' NOT NULL;--> statement-breakpoint
ALTER TABLE "account" ADD COLUMN "avatarUrl" text;--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_username_unique" UNIQUE("username");


-- Set up Storage!
insert into storage.buckets (id, name)
  values ('avatars', 'avatars');

-- Set up access controls for storage.
-- See https://supabase.com/docs/guides/storage#policy-examples for more details.
CREATE POLICY "Authenticated users can access avatar images." ON STORAGE.objects FOR
SELECT
  USING (
    auth.uid () IS NOT NULL
    AND bucket_id = 'avatars'
  );

CREATE POLICY "Authenticated users can upload avatars." ON STORAGE.objects FOR INSERT
WITH
  CHECK (
    auth.uid () IS NOT NULL
    AND bucket_id = 'avatars'
  );

ALTER TABLE account
ADD CONSTRAINT name_min_length CHECK (CHAR_LENGTH(NAME) >= 3);