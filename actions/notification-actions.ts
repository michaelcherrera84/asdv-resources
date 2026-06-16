"use server";

import {
    deleteAllNotificationsService,
    deleteNotificationService,
    markAllNotificationsAsReadService,
    markNotificationsAsReadService,
} from "@/lib/services/notification-service";

/**
 * Marks a notification as read
 *
 * @param id notification id
 */
export async function markNotificationsAsRead(id: number) {
    await markNotificationsAsReadService(id);
}

/**
 * Marks all notifications as read for a user
 *
 * @param id user id
 */
export async function markAllNotificationsAsRead(id: string) {
    await markAllNotificationsAsReadService(id);
}

/**
 * Deletes a notification
 *
 * @param id notification id
 */
export async function deleteNotification(id: number) {
    await deleteNotificationService(id);
}

/**
 * Deletes all notifications for a user
 *
 * @param id user id
 */
export async function deleteAllNotifications(id: string) {
    await deleteAllNotificationsService(id);
}
