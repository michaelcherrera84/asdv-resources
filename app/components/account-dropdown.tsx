"use client";

import { Menu, MenuButton, MenuHeading, MenuItem, MenuItems, MenuSection } from "@headlessui/react";
import Link from "next/link";
import { authClient } from "@/lib/auth/client";

/**
 * Account dropdown menu component.
 *
 * Responsibilities:
 * - Display authenticated user account controls
 * - Provide navigation links for account/admin areas
 * - Handle user sign out
 *
 * This component only renders when a valid authenticated
 * session exists.
 *
 * Uses Headless UI menu components for accessibility
 * and keyboard navigation support.
 */
function AccountDropdown() {
    // Retrieve current authentication session data.
    // Session includes authenticated user data and session metadata
    const { data: session } = authClient.useSession();

    /**
     * Signs the current user out.
     *
     * After signing out:
     * - session is cleared
     * - page reloads to refresh the authenticated UI state
     */
    const handleSignOut = async () => {
        await authClient.signOut();
        window.location.reload();
    };

    // Do not render dropdown when user is not authenticated.
    if (!session?.user) return null;

    return (
        <Menu>
            {/*
                Menu trigger button.
                Displays the first letter of the authenticated user's name as a simple fallback avatar.
            */}
            <MenuButton className="text-primary h-10 w-10 rounded-full bg-white outline-none">
                {session.user.name[0].toUpperCase()}
            </MenuButton>

            {/*
                Dropdown menu container.
                anchor="bottom end" positions the menu below and aligned to the right side of the button.
            */}
            <MenuItems
                anchor="bottom end"
                className="text-primary z-30 flex w-40 flex-col gap-2 rounded-md bg-white py-3 shadow-md outline-none"
            >
                {/* Account section */}
                <MenuSection className="flex flex-col">
                    <MenuHeading className="px-2 text-sm font-semibold">Account</MenuHeading>
                    <MenuItem>
                        <Link href="#" className="px-3 hover:bg-gray-100">
                            Profile
                        </Link>
                    </MenuItem>
                </MenuSection>

                {session.user.role === "admin" /* Admin section */ && (
                    <MenuSection className="flex flex-col">
                        <MenuHeading className="px-2 text-sm font-semibold">Admin</MenuHeading>
                        <MenuItem>
                            <Link href="#" className="px-3 hover:bg-gray-100">
                                Dashboard
                            </Link>
                        </MenuItem>
                    </MenuSection>
                )}

                {/* Visual divider between navigation and actions */}
                <div className="mx-1 h-px bg-gray-200" />

                {/* Sign out action */}
                <MenuItem>
                    <button onClick={handleSignOut} className="px-3 text-left hover:bg-gray-100">
                        Sign Out
                    </button>
                </MenuItem>
            </MenuItems>
        </Menu>
    );
}

export default AccountDropdown;
