import { getCurrentUser } from "@/lib/auth";
import { Post } from "./post";
import { getPagedPosts } from "@/db/actions/posts";

export async function PostsList({ page }: { page?: number }) {
  const { results } = await getPagedPosts(page ?? 1);
  const user = await getCurrentUser();

  return (
    <ul className="flex flex-col justify-center gap-2 w-full">
      {results.map(
        ({ user: author, post, profile }) =>
          author && (
            <Post
              key={post.id}
              post={post}
              author={author}
              profile={profile}
              canCurrentUserEdit={
                !!user && (user.role === "ADMIN" || user.id === author.id)
              }
            />
          ),
      )}
    </ul>
  );
}
