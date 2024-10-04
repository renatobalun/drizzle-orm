import {
  bigint,
  bigserial,
  decimal,
  integer,
  doublePrecision,
  pgTable,
  real,
  serial,
  smallint,
  text,
  varchar,
  boolean,
  char,
  json,
  jsonb,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  fullName: text("full_name"),
  phone: varchar("phone", { length: 256 }),
  adress: varchar("address", { length: 256 }),
  score: integer("score"),
});

export const moodEnum = pgEnum("mood", ["sad", "ok", "happy"]);
export const testTable = pgTable("testTable", {
  id: integer("id").primaryKey(),
  qty: integer("qty"),
  price: decimal("price", { precision: 7, scale: 2 }),
  score: doublePrecision("score"),
  delivered: boolean("delivered"),
  // description: text("description"),
  description: varchar("description", { length: 256 }),
  name: char("name", { length: 10 }),
  data: jsonb("data"),
  //json()
  startAt: timestamp("startAt", {
    withTimezone: true,
    precision: 6,
  }).defaultNow(),
  //time()
  //mood: moodEnum("mood").default("ok"),
});
