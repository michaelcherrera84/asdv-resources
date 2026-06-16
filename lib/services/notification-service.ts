import { notificationInsertSchema } from "@/lib/validators/notification";
import { notifications } from "@/db/schema";
import { db } from "@/db";
import { desc, eq } from "drizzle-orm";
import { getSession } from "@/lib/auth/auth";
import { Notification } from "@/lib/validators/notification";

async function validateUser(id: number) {
    const session = await getSession();
    const [notification] = await db.select().from(notifications).where(eq(notifications.id, id)).limit(1);
    if (!notification || !session || !session.user || session.user.id !== notification.receiverId)
        throw new Error("Not Authorized");
}

/**
 * Creates a new notification by validating the input data and inserting it into the notifications database.
 *
 * @param {unknown} data - The input data to be validated and used for creating the notification.
 * @return {Promise<Notification>} A promise that resolves to the newly created notification record.
 */
export async function createNotificationService(data: unknown): Promise<Notification | null> {
    const session = await getSession();
    if (!session || !session.user) return null;

    const validated = notificationInsertSchema.parse(data);
    if (validated.senderId !== session.user.id) throw new Error("Not Authorized");

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
    await validateUser(id);
    await db.update(notifications).set({ read: true }).where(eq(notifications.id, id));
}

/**
 * Marks all notifications for a specific user as read.
 *
 * @param userId user id
 */
export async function markAllNotificationsAsReadService(userId: string) {
    const session = await getSession();
    if (!session || !session.user || session.user.id !== userId) throw new Error("Not Authorized");
    await db.update(notifications).set({ read: true }).where(eq(notifications.receiverId, userId));
}

/**
 * Deletes a specific notification by its ID.
 *
 * @param id notification id
 */
export async function deleteNotificationService(id: number) {
    await validateUser(id);
    await db.delete(notifications).where(eq(notifications.id, id));
}

/**
 * Deletes all notifications for a specific user.
 *
 * @param userId user id
 */
export async function deleteAllNotificationsService(userId: string) {
    const session = await getSession();
    if (!session || !session.user || session.user.id !== userId) throw new Error("Not Authorized");
    await db.delete(notifications).where(eq(notifications.receiverId, userId));
}
