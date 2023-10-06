import { Cantata } from "@/components/cantata";
import db from "@/db";
import {
  Image as DbImage,
  Story,
  User,
  images,
  stories,
  users,
} from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

function Story({
  story,
  author,
  image,
}: {
  story: Story;
  author: User;
  image: DbImage | null;
}) {
  return (
    <div className="w-96 flex flex-col lg:flex-row gap-x-16 gap-y-4 md:w-5/6 mx-auto">
      {story.imageUrl && (
        <Image width={900} height={700} src={story.imageUrl} alt="" />
      )}
      {image && (
        <Image width={900} height={700} alt={image.alt} src={image.url} />
      )}
      <div className="flex flex-col justify-center gap-4">
        {story.source && story.sourceTitle && (
          <Cantata>
            <Link
              className="text-primary text-xl font-bold underline"
              href={story.source}
              target="_blank"
            >
              {story.sourceTitle}
            </Link>
          </Cantata>
        )}
        <h1 className="text-3xl font-bold">
          <Link href={`/stories/${story.normalizedTitle}`}>{story.title}</Link>
        </h1>
        <p className="text-xl">{story.synopsis}</p>
        <Button className="text-xl justify-center">
          <Link href={`/stories/${story.normalizedTitle}`}>
            Click Here For Full Story
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default async function Stories() {
  const items = await db
    .select()
    .from(stories)
    .leftJoin(users, eq(stories.authorId, users.id))
    .leftJoin(images, eq(stories.imageId, images.id))
    .orderBy(desc(stories.createdAt));

  return (
    <div className="flex flex-col grow gap-12 py-16 px-4 sm:px-16 lg:px-32 transition-all duration-300">
      <div className="flex justify-between items-center">
        <Cantata>
          <h1 className="text-6xl font-bold uppercase">Stories</h1>
        </Cantata>
        <div className="flex gap-4 items-center">
          Hello
          <Switch />
          <Select>
            <SelectTrigger className="w-64">
              <SelectValue>Test</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hello">Hello</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {items.map(({ story, user: author, image }) => (
        <Story key={story.id} story={story} author={author!} image={image} />
      ))}
    </div>
  );
}
