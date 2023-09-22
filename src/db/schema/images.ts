import { relations } from "drizzle-orm";
import { integer, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { stories } from ".";

export const images = pgTable("image", {
  id: uuid("id").primaryKey().defaultRandom(),
  bucket: text("bucket").notNull(),
  fileName: text("file_name").notNull(),
  url: text("s3_url").notNull(),
  width: integer("width").notNull(),
  height: integer("height").notNull(),
  alt: text("alt_text").notNull(),
});

export type Image = typeof images.$inferSelect;

export const imagesRelations = relations(images, ({ many }) => ({
  stories: many(stories),
}));
