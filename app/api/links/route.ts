import { createLink } from "@/lib/services/link-service";
import { z, ZodError } from "zod";
import { auth } from "@/lib/auth/server";
import { redirect } from "next/navigation";

/**
 * Handles `POST` requests for creating a new link record.
 *
 * Flow:
 * 1. Parse the incoming JSON request body.
 * 2. Pass the data to the service layer for validation and creation.
 * 3. Return the newly created link with a 201 status code.
 *
 * Error Handling:
 * - Zod validation errors return a 400 response with structured validation details.
 * - Any unexpected errors return a generic 500 server error response.
 *
 * @param req - The incoming HTTP request.
 */
export async function POST(req: Request) {
    const { data: session } = await auth.getSession();

    if (!session || !session.user || session.user.role !== "admin") {
        redirect("/auth/sign-in");
    }

    try {
        // Parse JSON data from the incoming request body.
        // Expected shape is validated later in the service layer using a Zod schema.
        const body = await req.json();

        // Create a new link using the service layer.
        // The service is responsible for:
        // - Input validation
        // - Database interaction
        // - Returning the created record
        const link = await createLink(body);

        // Return the created link with HTTP 201 (Created).
        return Response.json(link, { status: 201 });
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
