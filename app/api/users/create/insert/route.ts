import { db } from "@/db";
import { profiles, users } from "@/db/schema";

export async function POST() {
  const newUsers = await db
    .insert(users)
    .values({
      adress: "street 1",
      fullName: "user 1",
      phone: "91294812",
      score: 95,
    })
    .returning();

  return new Response(JSON.stringify(newUsers));
}
