"use client";

import { RxHamburgerMenu } from "react-icons/rx";
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
            <RxHamburgerMenu
                className="relative top-5 left-2 cursor-pointer"
                size={26}
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
                className={`${!isOpen ? "hidden" : "grid"} bg-secondary text-primary absolute top-16 h-8 w-full grid-cols-4 font-bold`}
            >
                {/* Close menu after navigation selection */}
                <Link
                    href="/about"
                    onClick={() => setIsOpen(false)}
                    className="flex h-full items-center justify-center hover:bg-white/20"
                >
                    About
                </Link>
                <Link
                    href="/resources"
                    onClick={() => setIsOpen(false)}
                    className="flex h-full items-center justify-center hover:bg-white/20"
                >
                    Resources
                </Link>
                <Link
                    href="/contact"
                    onClick={() => setIsOpen(false)}
                    className="flex h-full items-center justify-center hover:bg-white/20"
                >
                    Contact
                </Link>

                {/* Show sign-in link only for unauthenticated users. */}
                {!session?.user && (
                    <Link
                        href="/auth/sign-in"
                        onClick={() => setIsOpen(false)}
                        className="flex h-full items-center justify-center hover:bg-white/20"
                    >
                        Sign In
                    </Link>
                )}
            </nav>
        </div>
    );
}

export default MobileNav;
