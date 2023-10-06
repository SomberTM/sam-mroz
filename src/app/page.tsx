import { PostsList } from "@/components/posts-list";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import Image from "next/image";
import { Cantata } from "@/components/cantata";

export default function Home() {
  return (
    <div className="self-center my-auto flex flex-col gap-16 grow w-full px-4 sm:px-8 md:px-16 py-8">
      <div className="grid grid-cols-3 gap-4">
        <Cantata>
          <Link href="/">
            <Card className="hover:scale-[1.03] transition-all scale-100 duration-300 grid place-items-center w-full h-full aspect-[6/2] hover:shadow-md shadow-secondary shadow-none">
              <h1 className="text-primary text-center text-4xl font-bold ">
                Photography
              </h1>
            </Card>
          </Link>
        </Cantata>
        <Cantata>
          <Link href="/">
            <Card className="hover:scale-[1.03] transition-all scale-100 duration-300 grid place-items-center w-full h-full aspect-[6/2] hover:shadow-md shadow-foreground shadow-none">
              <h1 className="group-hover:underline text-primary text-center text-4xl font-bold ">
                Videos
              </h1>
            </Card>
          </Link>
        </Cantata>
        <Cantata>
          <Link href="/">
            <Card className="hover:scale-[1.03] transition-all scale-100 duration-300 grid place-items-center w-full h-full aspect-[6/2] hover:shadow-md shadow-foreground shadow-none">
              <h1 className="text-primary text-center text-4xl font-bold">
                Audio
              </h1>
            </Card>
          </Link>
        </Cantata>
      </div>
      <Card className="flex gap-8 p-8">
        <div className="flex flex-col gap-8">
          <h1 className="text-5xl font-bold underline">Latest Works</h1>
          <div className="flex flex-col gap-4">
            <Image width={700} height={200} src="/barbenheimer.jpg" alt="" />
            <div className="flex flex-col gap-2">
              <Cantata>
                <Link
                  className="text-primary text-xl font-bold underline"
                  href="https://depauliaonline.com/65252/artslife/barbenheimer-a-pop-culture-boom-big-enough-to-reach-the-classroom/#photo"
                  target="_blank"
                >
                  The DePaulia
                </Link>
              </Cantata>
              <h1 className="text-2xl font-bold">
                “Barbenheimer:” A pop culture boom big enough to reach the
                classroom
              </h1>
            </div>
          </div>
        </div>
        <div className=" flex flex-col lg:w-auto grow gap-16">
          <h1 className="text-primary text-center text-4xl font-bold underline">
            Social Feed
          </h1>
          <ScrollArea className="flex justify-center h-[32rem]">
            <PostsList page={1} />
          </ScrollArea>
        </div>
      </Card>
    </div>
  );
}
