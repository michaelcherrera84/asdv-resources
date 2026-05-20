import { db } from "@/db";
import { links } from "@/db/schema";
import { linkSchema } from "@/lib/validators/link";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth/server";
import { redirect } from "next/navigation";

/**
 * Retrieves all links from the database.
 */
export function getLinks() {
    return db.select().from(links);
}

/**
 * Retrieves featured links from the database.
 */
export function getFeaturedLinks() {
    return db.select().from(links).where(eq(links.featured, true)).orderBy(links.displayName);
}

/**
 * Creates a new link record in the database.
 *
 * Responsibilities:
 * - Validate incoming data using the link Zod schema
 * - Insert validated data into the links table
 * - Return the newly created database record
 *
 * Validation:
 * - Throws a ZodError if validation fails
 *
 * Database behavior:
 * - Uses `.returning()` to retrieve the inserted row
 * - Returns the first inserted record
 */
export async function createLink(data: unknown) {
    const { data: session } = await auth.getSession();

    if (!session || !session.user || session.user.role !== "admin") {
        redirect("/auth/sign-in");
    }

    // Validate and sanitize incoming data. parse() throws if validation fails.
    const validated = linkSchema.parse(data);
    // Insert validated book data into the database. returning() returns inserted rows from the database.
    const inserted = await db.insert(links).values(validated).returning();

    return inserted[0];
}
