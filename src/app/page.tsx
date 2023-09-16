import { PostsList } from "@/components/posts-list";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Home() {
  return (
    <div className="self-center my-auto">
      <ScrollArea className="h-96 w-96">
        <PostsList />
      </ScrollArea>
    </div>
  );
}
