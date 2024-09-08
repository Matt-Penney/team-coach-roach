CREATE TABLE IF NOT EXISTS "account" (
	"id" uuid PRIMARY KEY NOT NULL,
	"updated_at" timestamp,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"age" integer,
	"mobilePhoneNumber" text,
	CONSTRAINT "account_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "auth"."users" (
	"id" uuid PRIMARY KEY NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_id_users_id_fk" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
