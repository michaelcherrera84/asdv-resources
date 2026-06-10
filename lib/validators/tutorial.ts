import { z } from "zod";

/**
 * Zod schema for validating tutorial data.
 */
export const tutorialSchema = z.object({
    id: z.uuid(),
    slug: z.string().min(1),
    title: z.string().min(1),
    author: z.string().optional(),
    description: z.string().optional(),
    content: z.string().min(1),
    tags: z.array(z.string()).optional(),
    createdAt: z.date(),
    approved: z.boolean(),
});

export type Tutorial = z.infer<typeof tutorialSchema>;

/**
 * Zod schema for validating tutorial comment data.
 */
export const tutorialCommentSchema = z.object({
    id: z.uuid(),
    slug: z.string().min(1),
    authorId: z.string().min(1),
    replyToId: z.uuid().optional(),
    content: z.string().min(1),
    createdAt: z.date(),
    deletedAt: z.date().optional(),
});

export type TutorialComment = z.infer<typeof tutorialCommentSchema>;

/**
 * Zod schema for inserting tutorial comment data.
 */
export const tutorialCommentInsertSchema = tutorialCommentSchema.omit({ id: true, createdAt: true });
export type TutorialCommentInsert = z.infer<typeof tutorialCommentInsertSchema>;

/**
 * Zod schema for hiding tutorial comment.
 */
export const tutorialDeleteCommentSchema = tutorialCommentSchema.pick({
    id: true,
    slug: true,
    authorId: true,
    deletedAt: true,
});
export type TutorialDeleteComment = z.infer<typeof tutorialDeleteCommentSchema>;
