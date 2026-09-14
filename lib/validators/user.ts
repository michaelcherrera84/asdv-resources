import { z } from "zod";

/**
 * Zod scheme for validating user data.
 */
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

/**
 * Zod scheme for validating user update data.
 */
export const userUpdateSchema = userSchema.pick({
    id: true,
    username: true,
    role: true,
    name: true,
    email: true,
    emailVerified: true,
});
export type UserUpdate = z.infer<typeof userUpdateSchema>;
