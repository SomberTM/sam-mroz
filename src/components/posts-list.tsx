import { getCurrentUser } from "@/lib/auth";
import { Post } from "./post";
import { getPagedPosts } from "@/db/actions/posts";
import Image from "next/image";
import { Card } from "./ui/card";

function CaptionedImage({ src, caption }: { src: string; caption: string }) {
  return (
    <div className="flex flex-col gap-1 py-2">
      <Image src={src} alt={caption} width={800} height={600} />
      <p className="text-sm text-muted-foreground">{caption}</p>
    </div>
  );
}

function TemporaryPrimaryPost() {
  return (
    <Card className="flex flex-col gap-2 p-4 relative">
      <h1 className="text-lg font-bold">
        &quot;Civilians gather in front of the Daley Plaza in Chicago&apos;s
        Loop district to protest an approved tent refugee camp by Chicago Mayor,
        Brandon Johnson&quot;
      </h1>
      <p>
        On September 30th, Chicago citizens gathered in front of the Daley Plaza
        to protest against the tent cities that Mayor Brandon Johnson approved
        for the migrants coming from Texas. Protestors disapproved of the tent
        action&apos;s approval, citing the act as putting vulnerable people in
        glorified tents, with an incoming Chicago Winter likely to harm said
        migrants.
      </p>
      <p>
        The protesters labeled the action as a human rights violation, enforcing
        thoughts that the corporation Gardaworld was a corrupt organization.
        Demands for a contract cancellation with Gardaworld, adequate safe
        housing to incoming migrants and unhoused people, and an investment in
        long-term solutions to ensure every Chicago is housed, were made by
        those in attendance.
      </p>
      <CaptionedImage
        src="/sign_making.jpg"
        caption="Chicago citizen, Elliot Turner, stood in protest against the tent action, making signs for the event, and fellow protestors. Photo by Sam Mroz"
      />
      <CaptionedImage
        src="/protest_gathering.jpg"
        caption={`Protestors gathered in front of the Daley Plaza in Chicago's Loop district, conversing in front of the public art piece, "The Chicago Picasso".  Photo by Sam Mroz`}
      />
      <CaptionedImage
        src="/no_garda_world.JPG"
        caption={`Chicago citizen, Kathy Powers, helped in leading the protest, holding up a sign that read "#No Gardaworld in Chicago". Photo by Sam Mroz`}
      />
      <CaptionedImage
        src="/housing_for_all.JPG"
        caption="As Chicago citizens continue to arrive in support of the cause, present civilians wait patiently with signs made for the protest. Photo by Sam Mroz"
      />
    </Card>
  );
}

export async function PostsList({ page }: { page?: number }) {
  const { results } = await getPagedPosts(page ?? 1);
  const user = await getCurrentUser();

  return (
    <ul className="flex flex-col justify-center gap-2 w-full">
      <li>
        <TemporaryPrimaryPost />
      </li>
      {results.map(
        ({ user: author, post, profile }) =>
          author && (
            <li key={post.id}>
              <Post
                post={post}
                author={author}
                profile={profile}
                canCurrentUserEdit={
                  !!user && (user.role === "ADMIN" || user.id === author.id)
                }
              />
            </li>
          ),
      )}
    </ul>
  );
}
