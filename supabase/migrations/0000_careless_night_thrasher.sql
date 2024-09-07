CREATE TABLE IF NOT EXISTS "checkin_Table" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	"user_id" integer NOT NULL,
	"contentFilePath" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"age" integer,
	"mobilePhoneNumber" integer,
	CONSTRAINT "users_table_email_unique" UNIQUE("email"),
	CONSTRAINT "users_table_mobilePhoneNumber_unique" UNIQUE("mobilePhoneNumber")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "checkin_Table" ADD CONSTRAINT "checkin_Table_user_id_users_table_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users_table"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
