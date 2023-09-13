import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const reviews = pgTable("reviews", {
  id: uuid("id").primaryKey(),
  title: text("title"),
});
