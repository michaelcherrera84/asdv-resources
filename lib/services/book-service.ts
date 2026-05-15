import { bookSchema } from "@/lib/validators/book";
import { db } from "@/db";
import { books } from "@/db/schema";

/**
 * Retrieves all books from the database.
 */
export function getBooks() {
    return db.select().from(books).orderBy(books.semesters, books.courses, books.title);
}

/**
 * Creates a new book record in the database.
 *
 * Responsibilities:
 * - Validate incoming data using the book Zod schema
 * - Insert validated data into the books table
 * - Return the newly created database record
 *
 * Validation:
 * - Throws a ZodError if validation fails
 *
 * Database behavior:
 * - Uses `.returning()` to retrieve the inserted row
 * - Returns the first inserted record
 */
export async function createBook(data: unknown) {
    // Validate and sanitize incoming data. parse() throws if validation fails.
    const validated = bookSchema.parse(data);
    // Insert validated book data into the database. returning() returns inserted rows from the database.
    const inserted = await db.insert(books).values(validated).returning();

    return inserted[0];
}
