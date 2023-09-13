import db from "@/db";

export async function getAllReviews() {
  return await db.query.reviews.findMany();
}
