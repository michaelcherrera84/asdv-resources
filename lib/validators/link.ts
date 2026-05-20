import { z } from "zod";

/**
 * Zod schema for validating link data.
 */
export const linkSchema = z.object({
    id: z.number(),
    displayName: z.string().min(1),
    href: z.url(),
    category: z.string().min(1),
    subcategory: z.string().optional().nullable(),
    featured: z.boolean(),
});

export type ImportantLink = z.infer<typeof linkSchema>;
