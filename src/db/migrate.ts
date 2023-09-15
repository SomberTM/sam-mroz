import { migrate } from "drizzle-orm/node-postgres/migrator";
import db from "./index";

console.log("Starting migrations...");
console.time("Duration");
await migrate(db, { migrationsFolder: "./drizzle" });
console.log("Migrations finished!");
console.timeEnd("Duration");
