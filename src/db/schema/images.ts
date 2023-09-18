import { integer, pgTable, text, uuid } from "drizzle-orm/pg-core";

export const images = pgTable("images", {
  id: uuid("id").primaryKey().defaultRandom(),
  bucket: text("bucket").notNull(),
  fileName: text("file_name").notNull(),
  url: text("s3_url").notNull(),
  width: integer("width").notNull(),
  height: integer("height").notNull(),
  alt: text("alt_text").notNull(),
});
