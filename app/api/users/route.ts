import { db } from "@/db";
import { users } from "@/db/schema";
import {
  between,
  eq,
  gt,
  ilike,
  inArray,
  isNotNull,
  like,
  lt,
  or,
  ne,
  not,
  and,
} from "drizzle-orm";

export async function GET() {
  // const result = await db
  //   .select()
  //   .from(users)
  //   .where(or(like(users.fullName, "%en%"), gt(users.score, 50)));

  // const result = await db.query.users.findFirst({
  //   with: {
  //     profile: true,
  //     posts: true,
  //   },
  // });

  const result = await db.query.posts.findFirst({
    with: {
      author: true,
      postCategories: {
        columns: {
          categoryId: false,
          postId: false,
        },
        with: {
          category: {
            columns: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });

  const result2 = await db.query.categories.findFirst({
    with: {
      posts: true,
    },
  });
  return new Response(JSON.stringify(result));
}
