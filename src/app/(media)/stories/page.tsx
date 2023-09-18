import { Cinzel } from "@/components/cinzel";
import db from "@/db";
import { Story, User, stories, users } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";

function Story({ story, author }: { story: Story; author: User }) {
  return (
    <div className="w-96 flex gap-16 my-16 md:w-5/6 mx-auto">
      {story.imageUrl && (
        <Image width={900} height={700} src={story.imageUrl} alt="" />
      )}
      <div className="flex flex-col justify-center gap-4">
        {story.source && story.sourceTitle && (
          <Cinzel>
            <Link
              className="text-primary text-xl font-bold underline"
              href={story.source}
              target="_blank"
            >
              {story.sourceTitle}
            </Link>
          </Cinzel>
        )}
        <h1 className="text-3xl font-bold">{story.title}</h1>
        <p className="text-xl">{story.synopsis}</p>
      </div>
    </div>
  );
}

export default async function Stories() {
  const items = await db
    .select()
    .from(stories)
    .leftJoin(users, eq(stories.authorId, users.id))
    .orderBy(desc(stories.createdAt));

  return (
    <div className="flex flex-col grow gap-16">
      {items.map(({ stories: story, user: author }) => (
        <Story key={story.id} story={story} author={author!} />
      ))}
    </div>
  );
}
