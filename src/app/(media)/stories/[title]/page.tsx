import db from "@/db";
import { stories } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function Story({ params }: { params: { title: string } }) {
  const title = params.title.replaceAll("-", "\\-");

  const story = await db.query.stories.findFirst({
    where(fields, operators) {
      return operators.like(fields.normalizedTitle, params.title);
    },
  });

  // const [story] = await db
  //   .select()
  //   .from(stories)
  //   .where(eq(stories.normalizedTitle, title));

  console.log(story, title);

  return (
    <pre>
      <code>{JSON.stringify(story, null, 4)}</code>
    </pre>
  );
}
