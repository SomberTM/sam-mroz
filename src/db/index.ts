// import { sql } from "@vercel/postgres";
// import { drizzle } from "drizzle-orm/vercel-postgres";
// import * as schema from "./schema";

// export default drizzle(sql, { schema });

import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import * as schema from "./schema";

const client = new Client({
  connectionString: process.env.POSTGRES_URL,
});

await client.connect();
export default drizzle(client, { schema });
