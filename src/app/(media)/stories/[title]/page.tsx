import db from "@/db";
import { stories, users } from "@/db/schema";
import { images } from "@/db/schema";
import { eq } from "drizzle-orm";
import Image from "next/image";


export default async function Story({ params }: { params: { title: string }}) {

  const [{story, user, image}] = await db
    .select()
    .from(stories)
    .where(eq(stories.title, params.title))
    .leftJoin(users, eq(stories.authorId, users.id))
    .leftJoin(images, eq(stories.imageId, images.id));

  return (
    <div className="flex justify-center items-center grid-rows-4 flex-col grid-cols-1 gap-5">
      <h1 className="text-4xl font-bold">{story.title}</h1>
      <p className="text-xl italic">{story.synopsis}</p>
      <div className="w-96 center justify-center flex gap-5">
      {story.imageUrl && (
        <Image width={700} height={500} src={story.imageUrl} alt="" />
      )}
      {image && (
        <Image width={700} height={500} alt={image.alt} src={image.url} />
      )}
      </div>
      <div className="text-xl"> {story.body} </div>
    </div>
  );
}
