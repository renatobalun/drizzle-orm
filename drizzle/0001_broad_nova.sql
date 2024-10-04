DO $$ BEGIN
 CREATE TYPE "public"."mood" AS ENUM('sad', 'ok', 'happy');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "testTable" ALTER COLUMN "data" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "testTable" ADD COLUMN "mood" "mood" DEFAULT 'ok';