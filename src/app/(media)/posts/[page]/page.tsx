import { Centered } from "@/components/centered";
import { Post } from "@/components/post";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getPagedPosts } from "@/db/actions/posts";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Posts | Sam Mroz",
  description: "Shorter form content and updates",
};

export default async function Posts({ params }: { params: { page: string } }) {
  const page = Number(params.page);
  if (!page || Number.isNaN(page) || page <= 0) return redirect("/");

  const { results, hasNextPage } = await getPagedPosts(page);

  return (
    <Centered className="p-8">
      {results.length === 0 && (
        <h1 className="text-3xl font-bold text-primary">No posts yet!</h1>
      )}
      {results.length > 0 && (
        <Card className="w-96 md:w-1/2 p-4 flex flex-col gap-4">
          <ul className="space-y-2">
            {results.map(({ posts: post, user: author }) => (
              <li key={post.id}>
                <Post post={post} author={author!} />
              </li>
            ))}
          </ul>
          <div className="flex justify-between">
            <Button variant="link" disabled={page === 1}>
              <Link href={`/posts/${page - 1}`}>Previous</Link>
            </Button>

            <Button variant="link" disabled={!hasNextPage}>
              <Link href={`/posts/${page + 1}`}>Next</Link>
            </Button>
          </div>
        </Card>
      )}
    </Centered>
  );
}
