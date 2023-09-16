import db from "@/db";
import { stories } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function Story({ params }: { params: { title: string } }) {
  const story = await db
    .select()
    .from(stories)
    .where(eq(stories.title, params.title));

  return (
    <pre>
      <code>{JSON.stringify(story[0], null, 4)}</code>
    </pre>
  );
}
