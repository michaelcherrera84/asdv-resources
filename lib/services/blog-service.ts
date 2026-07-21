import { blogs } from "@/db/schema";
import { and, arrayOverlaps, desc, eq } from "drizzle-orm";
import { unstable_noStore as noStore } from "next/cache";
import { db } from "@/db";
import { getUserByIdService } from "@/lib/services/user-service";
import { cache } from "react";

/**
 * Retrieves all approved blogs from the database.
 */
export function getBlogsService() {
    return db.select().from(blogs).where(eq(blogs.approved, true)).orderBy(desc(blogs.createdAt));
}

/**
 * Retrieves a blog entry by its unique identifier.
 *
 * @param {number} id - The unique identifier of the blog to retrieve.
 * @return {Promise<Object | undefined>} A promise that resolves to the blog object if found, or undefined if not found.
 */
export async function getBlogByIdService(id: string) {
    const [blog] = await db.select().from(blogs).where(eq(blogs.id, id));
    return blog;
}

/**
 * Service to retrieve a blog post by its slug.
 *
 * This function fetches a single blog post record from the database
 * based on the provided unique slug. It utilizes caching to improve
 * performance by avoiding redundant database queries for the same slug.
 *
 * @param {string} slug - The unique identifier for the blog post.
 * @returns {Promise<Object | undefined>} A promise that resolves to the blog post object
 * if found, otherwise undefined.
 */
export const getBlogBySlugService = cache(async (slug: string) => {
    const [blog] = await db.select().from(blogs).where(eq(blogs.slug, slug));
    return blog;
});

/**
 * Fetches the most recent approved blogs from the database.
 * Retrieves up to 5 blogs, ordered by their creation date in descending order.
 *
 * @return {Promise<Array<Object>>} A promise that resolves to an array of blog objects.
 */
export function getRecentBlogsService() {
    noStore();
    return db.select().from(blogs).where(eq(blogs.approved, true)).orderBy(desc(blogs.createdAt)).limit(5);
}

/**
 * Fetches the blog author information by the provided author ID.
 *
 * @param {string} authorId - The unique identifier of the author.
 * @return {Promise<object | undefined>} A Promise resolving to the author object if found, or undefined if an error occurs.
 */
export async function getBlogAuthorService(authorId: string): Promise<object | undefined> {
    let author;
    try {
        author = await getUserByIdService(authorId);
    } catch (error) {
        console.error("Error fetching blog author:", error);
        return undefined;
    }
    return author;
}

/**
 * Retrieves a list of blogs based on the provided tags. The retrieved blogs must be approved and are returned in descending order of creation date.
 *
 * @param {string[]} tags - An array of tags to filter the blogs. Tags are case-insensitively matched after being converted to lowercase.
 * @return {Promise<object[]>} A promise that resolves to an array of blog objects that match the specified tags and are approved.
 */
export async function getBlogsByTagsService(tags: string[]): Promise<object[]> {
    return db
        .select()
        .from(blogs)
        .where(
            and(
                arrayOverlaps(
                    blogs.tags,
                    tags.map((tag) => tag.toLowerCase()),
                ),
                eq(blogs.approved, true),
            ),
        )
        .orderBy(desc(blogs.createdAt));
}
