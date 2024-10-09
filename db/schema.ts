import { relations } from "drizzle-orm";
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
  primaryKey,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  fullName: text("full_name"),
  phone: varchar("phone", { length: 256 }),
  adress: varchar("address", { length: 256 }),
  score: integer("score"),
});

export const userRelations = relations(users, ({ one, many }) => ({
  profile: one(profiles, {
    fields: [users.id],
    references: [profiles.userId],
  }),
  posts: many(posts),
}));

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  text: varchar("text", { length: 256 }),
  authorId: integer("author_id")
    .notNull()
    .references(() => users.id),
});

export const postRelations = relations(posts, ({ one, many }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),

  postCategories: many(postOnCategories),
}));

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
});

export const categoryRelations = relations(categories, ({ many }) => ({
  posts: many(postOnCategories),
}));

export const postOnCategories = pgTable(
  "post_categories",
  {
    postId: integer("post_id")
      .notNull()
      .references(() => posts.id),
    categoryId: integer("category_id")
      .notNull()
      .references(() => categories.id),
  },
  (t) => ({
    pk: primaryKey(t.postId, t.categoryId),
  })
);

export const postOnCategoriesRelations = relations(
  postOnCategories,
  ({ one }) => ({
    post: one(posts, {
      fields: [postOnCategories.postId],
      references: [posts.id],
    }),

    category: one(categories, {
      fields: [postOnCategories.categoryId],
      references: [categories.id],
    }),
  })
);

export const profiles = pgTable("profiles", {
  id: serial("id").primaryKey(),
  bio: varchar("bio", { length: 256 }),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
});

// export const moodEnum = pgEnum("mood", ["sad", "ok", "happy"]);
// export const testTable = pgTable("testTable", {
//   id: integer("id").primaryKey(),
//   qty: integer("qty"),
//   price: decimal("price", { precision: 7, scale: 2 }),
//   score: doublePrecision("score"),
//   delivered: boolean("delivered"),
//   // description: text("description"),
//   description: varchar("description", { length: 256 }),
//   name: char("name", { length: 10 }),
//   data: jsonb("data"),
//   //json()
//   startAt: timestamp("startAt", {
//     withTimezone: true,
//     precision: 6,
//   }).defaultNow(),
//   //time()
//   //mood: moodEnum("mood").default("ok"),
// });
