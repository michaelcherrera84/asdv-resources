"use client";

import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import AccountDropdown from "@/components/nav/account-dropdown";
import { authClient } from "@/lib/auth/client";

/**
 * Mobile navigation component.
 *
 * Responsibilities:
 * - Display a collapsible mobile navigation menu
 * - Close the menu when clicking outside the navigation area
 * - Show authentication-aware navigation options
 * - Display account controls for authenticated users
 *
 * This component is only visible on small screens
 * using Tailwind responsive utilities.
 */
function MobileNav() {
    // Tracks whether the mobile menu is open.
    const [isOpen, setIsOpen] = useState(false);
    // Reference to the navigation element. Used to detect clicks outside the menu.
    const navRef = useRef<HTMLDivElement | null>(null);
    // Retrieve current authentication session data.
    const { data: session } = authClient.useSession();

    /**
     * Close the mobile navigation menu when clicking outside the navigation area.
     */
    useEffect(() => {
        /**
         * Detect clicks occurring outside navRef.
         */
        function handleClickOutside(event: MouseEvent) {
            if (navRef.current && !navRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        // Register global mouse listener.
        document.addEventListener("mousedown", handleClickOutside);

        /**
         * Clean up listener when component unmounts.
         * Prevents memory leaks and duplicate listeners.
         */
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={navRef} className="absolute top-0 left-0 w-full sm:hidden">
            {/* Mobile navigation menu icon and toggle button */}
            <MenuIcon
                className="relative top-5 left-2 cursor-pointer"
                onClick={() => {
                    setIsOpen(!isOpen);
                }}
            />

            {/* Authenticated account controls */}
            <div className="absolute top-3 right-2">{<AccountDropdown />}</div>

            {/* Mobile navigation menu
                Navigation links are hidden by default and displayed when the mobile menu is open.
            */}
            <nav
                className={`${!isOpen ? "hidden" : "flex"} bg-secondary text-primary absolute top-16 w-full justify-center gap-6 py-1 font-bold`}
            >
                {/* Close menu after navigation selection */}
                <Link href="#" onClick={() => setIsOpen(false)}>
                    About
                </Link>
                <Link href="/resources" onClick={() => setIsOpen(false)}>
                    Resources
                </Link>
                <Link href="#" onClick={() => setIsOpen(false)}>
                    Contact
                </Link>

                {/* Show sign-in link only for unauthenticated users. */}
                {!session?.user && (
                    <Link href="/auth/sign-in" onClick={() => setIsOpen(false)}>
                        Sign In
                    </Link>
                )}
            </nav>
        </div>
    );
}

export default MobileNav;
