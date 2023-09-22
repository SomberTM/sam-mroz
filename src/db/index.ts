import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import * as schema from "./schema";
import { isDevelopment } from "@/lib/utils";

const client = new Client({
  connectionString: isDevelopment()
    ? process.env.POSTGRES_URL
    : `${process.env.POSTGRES_URL}?sslmode=require`,
});

client.connect();
export default drizzle(client, { schema, logger: true });
