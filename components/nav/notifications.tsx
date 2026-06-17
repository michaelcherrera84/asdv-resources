import { IoNotifications } from "react-icons/io5";
import { getNotificationsForUserService } from "@/lib/services/notification-service";
import { getSession } from "@/lib/auth/auth";
import { Menu, MenuButton, MenuHeading, MenuItem, MenuItems, MenuSection } from "@headlessui/react";
import { getUserByIdService } from "@/lib/services/user-service";
import NotificationLink from "@/components/nav/notification-link";
import { JSX } from "react";
import ManageNotificationsButtons from "@/components/nav/manage-notifications-buttons";

/**
 * Renders a notifications menu for the current logged-in user, displaying a list of user notifications
 * and showing an unread count indicator.
 *
 * @param {Object} params - The input parameters for the Notifications function.
 * @param {string} [params.className=""] - Additional CSS class names to customize the notification icon's appearance.
 * @return {Promise<JSX.Element | null>} The rendered notifications menu component for the authenticated user, or null if the user is not logged in.
 */
async function Notifications({ className = "" }: { className?: string }): Promise<JSX.Element | null> {
    const session = await getSession();
    if (!session?.user) return null;
    const notifications = await getNotificationsForUserService(session.user.id);
    const unreadCount = notifications.filter((n) => !n.read).length;

    return (
        <Menu>
            <MenuButton className="outline-none">
                <div className={`relative text-white ${className}`}>
                    {unreadCount > 0 && <div className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />}
                    <IoNotifications className="h-5 w-5" />
                </div>
            </MenuButton>
            <MenuSection>
                <MenuItems
                    anchor="bottom"
                    className="z-50 flex w-80 flex-col gap-4 rounded-md bg-white py-4 shadow shadow-gray-600 outline-none [--anchor-gap:24px] [--anchor-padding:10px]"
                >
                    <MenuHeading className="flex items-center justify-between px-4">
                        <span className="text-primary text-xl font-black">Notifications</span>
                        {notifications.length > 0 && <ManageNotificationsButtons userId={session.user.id} />}
                    </MenuHeading>
                    {!notifications.length && (
                        <MenuItem as="p" className="px-4 text-sm text-gray-500 italic">
                            There are no recent notifications.
                        </MenuItem>
                    )}
                    {notifications.map(async (notification) => {
                        if (!notification.senderId) return null;
                        const author = await getUserByIdService(notification.senderId);
                        const message = <p dangerouslySetInnerHTML={{ __html: notification.message }} />;

                        return (
                            <NotificationLink
                                notification={notification}
                                message={message}
                                author={author}
                                key={notification.id}
                            />
                        );
                    })}
                </MenuItems>
            </MenuSection>
        </Menu>
    );
}

export default Notifications;
