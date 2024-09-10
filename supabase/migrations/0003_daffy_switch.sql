DO $$ BEGIN
 CREATE TYPE "public"."memberType" AS ENUM('client', 'coach', 'admin');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."userStatus" AS ENUM('subscribed', 'unsubscribed', 'bounced');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "account" ADD COLUMN "memberType" "memberType";--> statement-breakpoint
ALTER TABLE "account" ADD COLUMN "userStatus" "userStatus" DEFAULT 'unsubscribed' NOT NULL;--> statement-breakpoint
ALTER TABLE "account" DROP COLUMN IF EXISTS "role";