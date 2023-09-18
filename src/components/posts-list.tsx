import { Post } from "./post";
import { getPagedPosts } from "@/db/actions/posts";

export async function PostsList({ page }: { page?: number }) {
  const { results } = await getPagedPosts(page ?? 1);

  return (
    <ul className="flex flex-col justify-center gap-2 w-full">
      {results.map(({ user: author, posts: post }) => (
        <Post key={post.id} post={post} author={author!} />
      ))}
    </ul>
  );
}
