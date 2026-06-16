import { notificationInsertSchema } from "@/lib/validators/notification";
import { notifications } from "@/db/schema";
import { db } from "@/db";
import { desc, eq } from "drizzle-orm";

/**
 * Creates a new notification by validating the input data and inserting it into the notifications database.
 *
 * @param {unknown} data - The input data to be validated and used for creating the notification.
 * @return {Promise<Object>} A promise that resolves to the newly created notification record.
 */
export async function createNotificationService(data: unknown): Promise<object> {
    const validated = notificationInsertSchema.parse(data);
    const [inserted] = await db.insert(notifications).values(validated).returning();
    return inserted;
}

/**
 * Retrieves all notifications for a specific user.
 *
 * @param {string} userId - The ID of the user to retrieve notifications for.
 * @returns A promise that resolves to an array of notification records.
 */
export async function getNotificationsForUserService(userId: string) {
    return db
        .select()
        .from(notifications)
        .where(eq(notifications.receiverId, userId))
        .orderBy(desc(notifications.createdAt));
}

/**
 * Marks a notification as read by updating its read status.
 *
 * @param {number} id - The ID of the notification to mark as read.
 * @returns A promise that resolves to the updated notification record.
 */
export async function markNotificationsAsReadService(id: number) {
    const [updated] = await db.update(notifications).set({ read: true }).where(eq(notifications.id, id)).returning();
    return updated;
}
