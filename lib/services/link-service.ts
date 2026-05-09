import { db } from "@/db";
import { links } from "@/db/schema";
import { linkSchema } from "@/lib/validators/link";

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
    // Validate and sanitize incoming data. parse() throws if validation fails.
    const validated = linkSchema.parse(data);
    // Insert validated book data into the database. returning() returns inserted rows from the database.
    const inserted = await db.insert(links).values(validated).returning();

    return inserted[0];
}
