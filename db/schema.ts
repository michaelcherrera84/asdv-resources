import { boolean, pgTable, serial, text } from "drizzle-orm/pg-core";
import { InferSelectModel } from "drizzle-orm";

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
