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
  const result = await db
    .select()
    .from(users)
    .where(or(like(users.fullName, "%en%"), gt(users.score, 50)));
  return new Response(JSON.stringify(result));
}
