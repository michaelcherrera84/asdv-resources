import { z } from "zod";

/**
 * Zod schema for validating blog data.
 */
export const blogSchema = z.object({
    id: z.string(),
    slug: z.string().min(1),
    title: z.string().min(1),
    author: z.string().optional().nullable(),
    description: z.string().optional().nullable(),
    content: z.string().min(1),
    tags: z.array(z.string()).optional().nullable(),
    createdAt: z.date(),
    approved: z.boolean().default(false),
});

export type Blog = z.infer<typeof blogSchema>;

export const blogInsertSchema = blogSchema.omit({ id: true, createdAt: true, approved: true });
export type BlogInsert = z.infer<typeof blogInsertSchema>;

/**
 * Zod schema for validating tutorial preview data.
 */
export const blogPreviewSchema = blogSchema.pick({
    title: true,
    author: true,
    description: true,
    content: true,
    tags: true,
    createdAt: true,
});

export type BlogPreview = z.infer<typeof blogPreviewSchema>;
