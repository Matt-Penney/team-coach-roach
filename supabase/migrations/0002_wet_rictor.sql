/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'account'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "account" DROP CONSTRAINT "<constraint_name>";--> statement-breakpoint
ALTER TABLE "account" ADD COLUMN "account_id" serial PRIMARY KEY NOT NULL;


CREATE POLICY "Authenticated users can update their avatars." ON STORAGE.objects
FOR UPDATE
  USING (
    auth.uid () IS NOT NULL
    AND bucket_id = 'avatars'
  );