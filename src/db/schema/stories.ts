import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { images, users } from ".";

export const stories = pgTable("story", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").unique().notNull(),
  synopsis: text("synopsis"),
  body: text("body").notNull(),
  imageUrl: text("image_url"),
  source: text("source"),
  sourceTitle: text("source_title"),
  authorId: text("author_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  modifiedAt: timestamp("modified_at").defaultNow().notNull(),
  imageId: uuid("image_id"),
});

export type Story = typeof stories.$inferSelect;

export const storiesRelations = relations(stories, ({ one }) => ({
  author: one(users, { fields: [stories.authorId], references: [users.id] }),
  image: one(images, {
    fields: [stories.imageId],
    references: [images.id],
  }),
}));
