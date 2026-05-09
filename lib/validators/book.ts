import { z } from "zod";

/**
 * Zod schema for validating book data.
 */
export const bookSchema = z.object({
    isbn: z.string().min(1),
    title: z.string().min(1),
    subtitle: z.string().optional(),
    edition: z.string().optional(),
    author: z.string().min(1),
    published: z.string().optional(),
    publisher: z.string().optional(),
    description: z.string().optional(),
    link: z.url().optional(),
    cover: z.url().optional(),
    slug: z.string().min(1),
    semesters: z.array(z.string()).optional(),
    courses: z.array(z.string()).optional(),
});
