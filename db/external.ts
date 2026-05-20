import { boolean, pgSchema, text, timestamp } from "drizzle-orm/pg-core";
import { InferSelectModel } from "drizzle-orm";
import { uuid } from "drizzle-orm/pg-core";

// Neon Auth schema.
const neonAuth = pgSchema("neon_auth");

/**
 * User table.
 */
export const users = neonAuth.table("user", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    emailVerified: boolean().default(false),
    image: text("image"),
    role: text("role").notNull().default("user"),
    banned: boolean("banned").notNull().default(false),
    banReason: text("banReason"),
    banExpires: timestamp("banExpires"),
});

export type User = InferSelectModel<typeof users>;
