import { db } from "@/db";
import { posts, profiles, users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST() {
  const newUsers = await db
    .insert(users)
    .values({
      adress: "Ulica 15",
      fullName: "Korisnik 3",
      phone: "1231353112",
      score: 97,
    })
    .returning({ userId: users.id });

  const userId = newUsers[0].userId;

  ["post1", "post2"].forEach(
    async (post) =>
      await db
        .insert(posts)
        .values({
          authorId: userId,
          text: post,
        })
        .execute()
  );

  const result = await db.query.users.findFirst({
    where: eq(users.id, userId),
    with: {
      posts: true,
    },
  });

  return new Response(JSON.stringify(result));
}
