import { PostsList } from "@/components/posts-list";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="self-center my-auto grid grid-cols-12 gap-8 grow w-full px-16 py-8">
      <Card className="col-start-1 col-end-6 p-4 flex flex-col gap-8">
        <h1 className="text-6xl font-bold underline">Latest Works</h1>
        <div className="flex flex-col gap-4">
          <Image width={700} height={200} src="/barbenheimer.jpg" alt="" />
          <div className="flex flex-col gap-2">
            <Link
              className="text-primary text-xl font-bold underline"
              href="https://depauliaonline.com/65252/artslife/barbenheimer-a-pop-culture-boom-big-enough-to-reach-the-classroom/#photo"
              target="_blank"
            >
              The DePaulia
            </Link>
            <h1 className="text-2xl font-bold">
              “Barbenheimer:” A pop culture boom big enough to reach the
              classroom
            </h1>
          </div>
        </div>
      </Card>
      <div className="col-start-6 col-end-9 grid grid-rows-3 gap-4">
        <Link href="/">
          <Card className="grid place-items-center w-full h-full">
            <h1 className="text-primary text-center text-4xl font-bold underline">
              Photography
            </h1>
          </Card>
        </Link>
        <Link href="/">
          <Card className="grid place-items-center w-full h-full">
            <h1 className="text-primary text-center text-4xl font-bold underline">
              Videos
            </h1>
          </Card>
        </Link>
        <Link href="/">
          <Card className="grid place-items-center w-full h-full">
            <h1 className="text-primary text-center text-4xl font-bold underline">
              Audio
            </h1>
          </Card>
        </Link>
      </div>
      <div className=" col-start-10 col-end-13 self-center flex flex-col gap-32">
        <h1 className="text-primary text-center text-4xl font-bold underline">
          Social Feed
        </h1>
        <ScrollArea className="flex justify-center h-[32rem]">
          <PostsList />
        </ScrollArea>
      </div>
    </div>
  );
}
