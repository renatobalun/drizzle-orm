import { db } from "@/db";
import { categories, postOnCategories, posts, users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST() {
  const newUsers = await db
    .insert(users)
    .values({
      adress: "Ulica Neka 11",
      fullName: "User New",
      phone: "2313523562",
      score: 83,
    })
    .returning({ userId: users.id });

  const userId = newUsers[0].userId;

  const newCats = await db
    .insert(categories)
    .values([
      {
        name: "cat 1",
      },
      {
        name: "cat 2",
      },
    ])
    .returning({ catId: categories.id });

  const newPosts = await db
    .insert(posts)
    .values([
      {
        authorId: userId,
        text: "post 1",
      },
      {
        authorId: userId,
        text: "post 2",
      },
    ])
    .returning({ postId: posts.id });

  await db
    .insert(postOnCategories)
    .values([
      {
        postId: newPosts[0].postId,
        categoryId: newCats[0].catId,
      },
      {
        postId: newPosts[0].postId,
        categoryId: newCats[1].catId,
      },
      {
        postId: newPosts[1].postId,
        categoryId: newCats[0].catId,
      },
    ])
    .execute();

  const result = await db.query.users.findFirst({
    where: eq(users.id, userId),
    with: {
      posts: {
        with: {
          postCategories: {
            columns: {},
            with: {
              category: {
                columns: {
                  name: true,
                },
              },
            },
          },
        },
      },
    },
  });
  return new Response(JSON.stringify(result));
}
