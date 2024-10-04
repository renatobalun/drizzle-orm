import { db } from "@/db";
import { users, testTable } from "@/db/schema";

export default async function Home() {
  const result = await db.select().from(testTable)
  return <div>{JSON.stringify(result)}</div>;
}
