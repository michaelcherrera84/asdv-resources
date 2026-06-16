import { z } from "zod";

/**
 * Zod schema for validating notification data.
 */
export const notificationSchema = z.object({
    id: z.number(),
    senderId: z.string().min(1),
    receiverId: z.string().min(1),
    message: z.string().min(1),
    link: z.string(),
    read: z.boolean().default(false),
    createdAt: z.date(),
});

export type Notification = z.infer<typeof notificationSchema>;

export const notificationInsertSchema = notificationSchema.omit({ id: true, createdAt: true, read: true });
export type NotificationInsert = z.infer<typeof notificationInsertSchema>;
