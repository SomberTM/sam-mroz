import { getAllReviews } from "@/db/actions/reviews";
import { ReviewCard } from "./review-card";

export async function ReviewsList({
  locale = "en-US",
  ...props
}: { locale?: string } & React.ComponentPropsWithoutRef<"div">) {
  const reviews = await getAllReviews();

  return (
    <ul className="flex gap-4 flex-wrap">
      {reviews.map((review) => (
        <li key={review.title}>
          <ReviewCard review={review} />
        </li>
      ))}
      {reviews.map((review) => (
        <li key={review.title}>
          <ReviewCard review={review} />
        </li>
      ))}
      {reviews.map((review) => (
        <li key={review.title}>
          <ReviewCard review={review} />
        </li>
      ))}
      {reviews.map((review) => (
        <li key={review.title}>
          <ReviewCard review={review} />
        </li>
      ))}
      {reviews.map((review) => (
        <li key={review.title}>
          <ReviewCard review={review} />
        </li>
      ))}
      {reviews.map((review) => (
        <li key={review.title}>
          <ReviewCard review={review} />
        </li>
      ))}
      {reviews.map((review) => (
        <li key={review.title}>
          <ReviewCard review={review} />
        </li>
      ))}
    </ul>
  );
}
