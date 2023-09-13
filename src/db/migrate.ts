import { migrate } from "drizzle-orm/vercel-postgres/migrator";
import db from ".";

migrate(db, { migrationsFolder: "drizzle" });
