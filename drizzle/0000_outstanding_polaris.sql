CREATE TABLE IF NOT EXISTS "testTable" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"qty" bigint,
	"price" numeric(7, 2),
	"score" double precision,
	"delivered" boolean,
	"description" varchar(256),
	"name" char(10),
	"data" jsonb,
	"startAt" timestamp (6) with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name" text,
	"phone" varchar(256),
	"address" varchar(256)
);
