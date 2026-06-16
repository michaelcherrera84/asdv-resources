"use server";

import { markNotificationsAsReadService } from "@/lib/services/notification-service";

/**
 * Marks a notification as read
 *
 * @param id notification id
 */
export async function markNotificationsAsRead(id: number) {
    return await markNotificationsAsReadService(id);
}
