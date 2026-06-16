"use client";

import Button from "@/components/ui/button";
import { deleteAllNotifications, markAllNotificationsAsRead } from "@/actions/notification-actions";
import { useRouter } from "next/navigation";
import { JSX } from "react";

/**
 * Props for the MarkAllRead component.
 */
interface MarkAllReadProps {
    userId: string;
}

/**
 * Renders a component with buttons to manage notifications for a user, allowing
 * the user to clear all notifications or mark all notifications as read.
 *
 * @param {Object} props - The component props.
 * @param {string} props.userId - The ID of the user whose notifications will be managed.
 * @return {JSX.Element} A JSX element containing the notification management buttons.
 */
function ManageNotificationsButtons({ userId }: MarkAllReadProps): JSX.Element {
    const router = useRouter();

    /**
     * Marks all notifications as read for the specified user.
     */
    const handleMarkAllRead = async () => {
        try {
            await markAllNotificationsAsRead(userId);
        } catch (error) {
            console.error("Error marking all notifications as read:", error);
        }
        router.refresh();
    };

    const handleClear = async () => {
        try {
            await deleteAllNotifications(userId);
        } catch (error) {
            console.error("Error clearing notifications:", error);
        }
        router.refresh();
    };

    return (
        <div className="flex gap-4">
            <Button
                className="text-primary cursor-pointer bg-transparent p-0! text-xs underline"
                type="button"
                onClick={handleClear}
            >
                Clear
            </Button>
            <Button
                className="text-primary cursor-pointer bg-transparent p-0! text-xs underline"
                type="button"
                onClick={handleMarkAllRead}
            >
                Mark All Read
            </Button>
        </div>
    );
}

export default ManageNotificationsButtons;
