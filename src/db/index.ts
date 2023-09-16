import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import * as schema from "./schema";

const client = new Client({
  connectionString: process.env.POSTGRES_URL,
});

client.connect();
export default drizzle(client, { schema });
