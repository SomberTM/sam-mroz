import db from "@/db";

export async function getAllReviews() {
  return await db.query.reviews.findMany({
    with: {
      reviewsToGenres: {
        with: {
          genre: true,
        },
        columns: {
          reviewId: false,
          genreId: false,
        },
      },
    },
    orderBy: (reviews, { desc }) => [desc(reviews.createdAt)],
  });
}
