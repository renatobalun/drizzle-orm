ALTER TABLE "testTable" ALTER COLUMN "data" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "testTable" DROP COLUMN IF EXISTS "mood";