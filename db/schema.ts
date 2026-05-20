import { AnyPgColumn, boolean, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { InferSelectModel } from "drizzle-orm";
import { uuid } from "drizzle-orm/pg-core";

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

export type ImportantLink = InferSelectModel<typeof links>;

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

/**
 * Tutorial comments table.
 */
export const tutorialComments = pgTable("tutorial_comments", {
    id: uuid("id").primaryKey().defaultRandom(),
    tutorialSlug: text("tutorial_slug")
        .references(() => tutorials.slug, { onDelete: "cascade" })
        .notNull(),
    authorId: uuid("author_id").notNull(),
    replyToId: uuid("reply_to_id").references((): AnyPgColumn => tutorialComments.id, { onDelete: "no action" }),
    content: text("content").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
});

export type TutorialComment = InferSelectModel<typeof tutorialComments>;
export type TutorialCommentWithReplies = TutorialComment & { replies: TutorialComment[] };
export type TutorialCommentWithRepliesAndAuthor = TutorialCommentWithReplies & {
    author: {
        id: string;
        name: string | null;
        image: string | null;
    };

    replies: TutorialCommentWithAuthor[];
};

export type TutorialCommentWithAuthor = TutorialComment & {
    author: {
        id: string;
        name: string | null;
        image: string | null;
    };
};
