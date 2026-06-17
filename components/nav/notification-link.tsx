"use client";

import Image from "next/image";
import { Notification } from "@/db/schema";
import { User } from "@/db/auth-schema";
import { deleteNotification, markNotificationsAsRead } from "@/actions/notification-actions";
import { useRouter } from "next/navigation";
import { MenuItem } from "@headlessui/react";
import { JSX, MouseEvent, ReactNode } from "react";
import Button from "@/components/ui/button";
import { FaXmark } from "react-icons/fa6";

interface NotificationLinkProps {
    notification: Notification;
    author: User;
    message: ReactNode;
}

/**
 * Renders a clickable notification link with relevant details.
 *
 * This component displays a notification message, a profile image or fallback initials for the author,
 * and a relative timestamp. If the notification is unread, it highlights it with an indicator.
 * Clicking on the notification marks it as read, closes the notification menu, refreshes the router,
 * and redirects to the associated link.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Notification} props.notification - The notification object containing details like id, message, link, createdAt, and
 * read status.
 * @param {User} props.author - The author details of the notification.
 * @return {JSX.Element} The rendered notification link as a menu item.
 */
function NotificationLink({ notification, author, message }: NotificationLinkProps): JSX.Element {
    const router = useRouter();

    /**
     * Calculates the relative time difference between the given date and the current date.
     *
     * This function takes a JavaScript `Date` object as input and returns a human-readable
     * string that represents the relative time difference between the given date and the
     * current date. It uses the `Intl.RelativeTimeFormat` API to format the output.
     *
     * The result will be in the format of relative time, such as:
     * - "3 days ago"
     * - "2 hours ago"
     * - "just now"
     *
     * If the given date is in the future, the function will return a relative time string
     * indicating the time until that future date.
     *
     * @param {Date} date - The input date to calculate the relative time from.
     * @returns {string} A string representing the relative time difference between the given date and now.
     */
    const getRelativeTime = (date: Date): string => {
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - new Date(date).getTime()) / 1000);

        const units: { name: Intl.RelativeTimeFormatUnit; seconds: number }[] = [
            { name: "year", seconds: 31536000 },
            { name: "month", seconds: 2592000 },
            { name: "day", seconds: 86400 },
            { name: "hour", seconds: 3600 },
            { name: "minute", seconds: 60 },
            { name: "second", seconds: 1 },
        ];

        for (const unit of units) {
            const interval = Math.floor(diffInSeconds / unit.seconds);
            if (interval >= 1 || unit.name === "second") {
                const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
                return rtf.format(-interval, unit.name);
            }
        }

        return "just now";
    };

    /**
     * Marks a notification as read and performs subsequent actions.
     *
     * This asynchronous function marks a notification as read by calling the
     * `markNotificationsAsRead` function with the notification's ID. Upon
     * successful completion, it invokes a provided `close` callback function to handle
     * any necessary UI state changes, refreshes the router, and navigates to a specific link.
     *
     * If an error occurs during the execution of the function, it logs the error
     * message to the console.
     *
     * @param {Function} close - A callback function that is executed after marking
     *                           the notification as read.
     */
    const markAsRead = async (close: () => void) => {
        try {
            await markNotificationsAsRead(notification.id);
            close();
            router.refresh();
            requestAnimationFrame(() => router.push(notification.link));
        } catch (error) {
            console.error("Error marking notification as read:", error);
        }
    };

    /**
     * Asynchronously handles the deletion of a notification when triggered by a user interaction.
     *
     * This function prevents the default action of the triggering event, attempts to delete
     * a specific notification using its identifier, and refreshes the application state
     * to reflect the changes. In case of an error during the deletion process, it logs the error
     * to the console.
     *
     * @param {MouseEvent<HTMLButtonElement>} e - The event triggered by the user's interaction with the button.
     */
    const handleDeleteNotification = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            await deleteNotification(notification.id);
        } catch (error) {
            console.error("Error deleting notification:", error);
        }
        router.refresh();
    };

    return (
        <MenuItem key={notification.id}>
            {({ close }) => (
                <div className="flex px-4">
                    <div
                        className="peer cursor-pointer leading-snug"
                        onClick={() => {
                            void markAsRead(close);
                        }}
                    >
                        <div className="flex items-center gap-2 text-sm">
                            {author.image ? (
                                <Image
                                    src={author.image}
                                    width={40}
                                    height={40}
                                    alt="profile picture"
                                    className="rounded-full"
                                />
                            ) : (
                                <div className="bg-primary flex h-10 min-w-10 items-center justify-center rounded-full text-white">
                                    {author.name[0].toUpperCase()}
                                </div>
                            )}
                            <div>
                                {message}
                                <span className="text-xs text-gray-500">{getRelativeTime(notification.createdAt)}</span>
                            </div>
                            {!notification.read && <div className="min-h-2 min-w-2 rounded-full bg-blue-500" />}
                        </div>
                    </div>
                    <Button
                        className="text-primary cursor-pointer bg-transparent p-1! opacity-0 transition duration-300 peer-hover:opacity-100 hover:opacity-100"
                        type="button"
                        onClick={handleDeleteNotification}
                    >
                        <FaXmark />
                    </Button>
                </div>
            )}
        </MenuItem>
    );
}

export default NotificationLink;
