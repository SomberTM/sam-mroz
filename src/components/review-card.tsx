"use client";

import { getAllReviews } from "@/db/actions/reviews";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import Link from "next/link";
import Image from "next/image";

export function ReviewCard({
  review,
}: {
  review: Awaited<ReturnType<typeof getAllReviews>>[number];
}) {
  return (
    <Link href={`/reviews/${review.title}`}>
      <Card className="flex flex-col gap-2 transition-all duration-300 px-4 py-4 pt-0 w-48 h-96 rounded-lg border-accent cursor-pointer">
        {/* <div className="w-40 h-64 border border-accent">Image</div> */}
        <Image width={192} height={288} src="/one_piece.webp" alt="" />
        <h1 className="text-xl">{review.title}</h1>
        <ul className="flex gap-2">
          {review.reviewsToGenres.map(({ genre }) => (
            <li key={genre.name}>
              <Badge>{genre.name}</Badge>
            </li>
          ))}
        </ul>
      </Card>
    </Link>
  );
}
