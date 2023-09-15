import {
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { genres } from ".";

export const reviews = pgTable("reviews", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  body: text("body").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  modifiedAt: timestamp("modified_at").defaultNow().notNull(),
});

export const reviewsRelations = relations(reviews, ({ many }) => ({
  reviewsToGenres: many(reviewsToGenres),
}));

export const reviewsToGenres = pgTable(
  "reviews_to_genres",
  {
    reviewId: uuid("review_id")
      .notNull()
      .references(() => reviews.id),
    genreId: uuid("genre_id")
      .notNull()
      .references(() => genres.id),
  },
  (table) => ({
    pk: primaryKey(table.reviewId, table.genreId),
  })
);

export const reviewsToGenresRelations = relations(
  reviewsToGenres,
  ({ one }) => ({
    review: one(reviews, {
      fields: [reviewsToGenres.reviewId],
      references: [reviews.id],
    }),
    genre: one(genres, {
      fields: [reviewsToGenres.genreId],
      references: [genres.id],
    }),
  })
);

export type Review = typeof reviews.$inferSelect;
