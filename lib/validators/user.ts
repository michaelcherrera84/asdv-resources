import { z } from "zod";

export const userSchema = z.object({
    id: z.string(),
    name: z.string().min(1),
    email: z.email(),
    emailVerified: z.boolean(),
    image: z.string().optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
    role: z.string(),
    username: z.string().min(1),
    bio: z.string().optional(),
    highSchool: z.string().optional(),
    college: z.string().optional(),
    expectedGraduation: z.string().optional(),
});

export type User = z.infer<typeof userSchema>;
