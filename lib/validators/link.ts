import { z } from "zod";

/**
 * Zod schema for validating link data.
 */
export const linkSchema = z.object({
    displayName: z.string().min(1),
    href: z.url(),
    category: z.string().min(1),
    subcategory: z.string().optional().nullable(),
    featured: z.boolean(),
});
