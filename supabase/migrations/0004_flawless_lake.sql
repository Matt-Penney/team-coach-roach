CREATE TABLE IF NOT EXISTS "checkin" (
	"checkin_id" serial PRIMARY KEY NOT NULL,
	"account_id" integer NOT NULL,
	"created_at" date DEFAULT now(),
	"updated_at" timestamp,
	"weight" numeric NOT NULL,
	"hasHitCardioTargets" boolean,
	"hasHitNutritionalTargets" boolean,
	"injuriesOrDiscomfort" text,
	"sleepRating" text,
	"nutritionRating" text,
	"stressRating" text,
	"notes" text,
	"images" text[] DEFAULT '{}'::text[] NOT NULL,
	"reviewed" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "checkin" ADD CONSTRAINT "checkin_account_id_account_account_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."account"("account_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
