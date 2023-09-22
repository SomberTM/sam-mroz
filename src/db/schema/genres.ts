import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { reviewsToGenres } from ".";

export const genres = pgTable("genre", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").unique().notNull(),
});

export const genresRelations = relations(genres, ({ many }) => ({
  reviewsToGenres: many(reviewsToGenres),
}));

export type Genre = typeof genres.$inferSelect;
