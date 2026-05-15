import { boolean, pgSchema, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
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

/**
 * Links table.
 */
export const links = pgTable("links", {
    id: serial("id").primaryKey(),
    displayName: text("display_name").notNull(),
    href: text("href").notNull(),
    category: text("category").notNull(),
    subcategory: text("subcategory"),
    featured: boolean("featured").notNull().default(false),
});

export type Link = InferSelectModel<typeof links>;

/**
 * Books table.
 */
export const books = pgTable("books", {
    isbn: text("isbn").primaryKey(),
    title: text("title").notNull(),
    subtitle: text("subtitle"),
    edition: text("edition"),
    author: text("author").notNull(),
    published: text("published"),
    publisher: text("publisher"),
    description: text("description"),
    obtain: text("obtain"),
    link: text("link"),
    cover: text("cover"),
    slug: text("slug").notNull(),
    semesters: text("semesters").array().default([]),
    courses: text("courses").array().default([]),
});

export type Book = InferSelectModel<typeof books>;

/**
 * Tutorials table.
 */
export const tutorials = pgTable("tutorials", {
    id: uuid("id").primaryKey().defaultRandom(),
    slug: text("slug").notNull().unique(),
    title: text("title").notNull(),
    author: uuid("author"),
    description: text("description"),
    content: text("content").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Tutorial = InferSelectModel<typeof tutorials>;
