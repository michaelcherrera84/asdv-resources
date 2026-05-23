import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { drizzle as drizzlePg } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const isProduction = process.env.NODE_ENV === "production";

export const db = isProduction
    ? drizzle({
          client: neon(process.env.DATABASE_URL!),
      })
    : drizzlePg(
          new Pool({
              connectionString: process.env.DATABASE_URL,
          }),
      );
