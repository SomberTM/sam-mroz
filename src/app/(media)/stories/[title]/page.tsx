import db from "@/db";
import { authorProfiles, stories, Story, users } from "@/db/schema";
import { images } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import Image from "next/image";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import relativeTime from "dayjs/plugin/relativeTime";
import { redirect } from "next/navigation";

dayjs.extend(relativeTime);
dayjs.extend(utc);

export default async function Story({ params }: { params: { title: string }}) {
  
  const {
    rows: [temp],
  } = await db.execute(
    sql`select * from story where normalized_title = ${params.title}`,
  );

  if (!temp) return redirect("/stories");
  const page = temp as Story;
  const [{story, user, image, profile}] = await db
    .select()
    .from(stories)
    .where(eq(stories.id, page.id))
    .leftJoin(users, eq(stories.authorId, users.id))
    .leftJoin(images, eq(stories.imageId, images.id))
    .leftJoin(authorProfiles, eq(users.id, authorProfiles.userId));

    const time = dayjs.utc(story.modifiedAt.toUTCString().substring(0, 23)).local();

  return (
    <div className="flex justify-center items-center grid-rows-4 flex-col grid-cols-1 gap-5 py-8 px-80">
      <h1 className="text-4xl font-bold text-center">{story.title}</h1>
      <p className="text-xl italic flex items-center"> {profile?.name} <span className="not-italic text-4xl">・</span> {time.format("dddd, MMMM D YYYY")} </p>
      <div className="w-96 center justify-center flex gap-5">
      {story.imageUrl && (
        <Image width={1200} height={1000} src={story.imageUrl} alt="" />
      )}
      {image && (
        <Image width={1200} height={1000} alt={image.alt} src={image.url} />
      )}
      </div>
      <div className="text-xl"> 
      
      {story.body.split("\n").filter((line) => {
        return line.length > 1
          }).map((line) => {
        return <p className="py-2">{ line }</p>
      })} 
      
      </div>
    </div>
  );
}
