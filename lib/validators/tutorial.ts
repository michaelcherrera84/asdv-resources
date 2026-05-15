import { z } from "zod";

export const tutorialSchema = z.object({
    slug: z.string().min(1),
    title: z.string().min(1),
    author: z.uuid().optional(),
    description: z.string().optional(),
    content: z.string().min(1),
    createdAt: z.date(),
});
