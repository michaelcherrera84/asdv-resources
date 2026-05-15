import { db } from "@/db";
import { tutorials } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

/**
 * Retrieves all tutorials from the database.
 */
export function getTutorials() {
    return db.select().from(tutorials);
}

/**
 * Retrieves recent tutorials from the database.
 */
export function getRecentTutorials() {
    return db.select().from(tutorials).orderBy(desc(tutorials.createdAt)).limit(5);
}

/**
 * Retrieves a tutorial by slug from the database.
 * @param slug tutorial slug
 */
export function getTutorialBySlug(slug: string) {
    return db.select().from(tutorials).where(eq(tutorials.slug, slug));
}
