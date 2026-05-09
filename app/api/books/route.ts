import { z, ZodError } from "zod";
import { createBook } from "@/lib/services/book-service";

/**
 * Handles `POST` requests for creating a new book record.
 *
 * Flow:
 * 1. Parse the incoming JSON request body.
 * 2. Pass the data to the service layer for validation and creation.
 * 3. Return the newly created book with a 201 status code.
 *
 * Error Handling:
 * - Zod validation errors return a 400 response with structured validation details.
 * - Any unexpected errors return a generic 500 server error response.
 *
 * @param req - The incoming HTTP request.
 */
export async function POST(req: Request) {
    try {
        // Parse JSON data from the incoming request body.
        // Expected shape is validated later in the service layer using a Zod schema.
        const body = await req.json();

        // Create a new book using the service layer.
        // The service is responsible for:
        // - Input validation
        // - Database interaction
        // - Returning the created record
        const book = await createBook(body);

        // Return the created book with HTTP 201 (Created).
        return Response.json(book, { status: 201 });
    } catch (error) {
        // Handle validation errors thrown by Zod. treeifyError() converts flat validation issues into a nested
        // object structure that is easier for forms and frontend consumers to work with.
        if (error instanceof ZodError) {
            return Response.json({ error: z.treeifyError(error) }, { status: 400 });
        }

        // Log unexpected server errors for debugging.
        console.error(error);

        // Return a generic server error response. Avoid exposing internal implementation details to the client.
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}
