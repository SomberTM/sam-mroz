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
          <Link
            className="text-primary text-xl font-bold underline"
            href={story.source}
            target="_blank"
          >
            {story.sourceTitle}
          </Link>
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
      {/* <div className="w-96 flex gap-16 my-16 md:w-5/6 mx-auto">
        <Image width={900} height={700} src="/barbenheimer.jpg" alt="" />
        <div className="flex flex-col justify-center gap-4">
          <Link
            className="text-primary text-xl font-bold underline"
            href="https://depauliaonline.com/65252/artslife/barbenheimer-a-pop-culture-boom-big-enough-to-reach-the-classroom/#photo"
            target="_blank"
          >
            The DePaulia
          </Link>
          <h1 className="text-3xl font-bold">
            “Barbenheimer:” A pop culture boom big enough to reach the classroom
          </h1>
          <p className="text-xl">
            For years, movie fandom has sat in the backseat of mainstream
            culture. After facing a global pandemic and the emergence of
            streaming, being booted to the trunk looked like the natural next
            step.
          </p>
          <p className="text-xl">
            This changed on July 21, as millions flocked to the year’s main
            movie event when a pop culture bomb went off in theaters across
            America. “Barbie,” directed by rising creative Greta Gerwig, and
            “Oppenheimer,” the latest project from movie mogul Christopher
            Nolan, had arrived, and for the rest of summer, the mushroom cloud
            of “Barbenheimer” quickly dove into every media channel available.
          </p>
        </div>
      </div> */}
    </div>
  );
}
