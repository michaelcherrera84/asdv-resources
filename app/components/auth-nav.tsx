"use client";

import AccountDropdown from "@/app/components/account-dropdown";
import { authClient } from "@/lib/auth/client";
import Link from "next/link";

/**
 * Authentication-aware navigation component.
 *
 * Responsibilities:
 * - Display account controls for authenticated users
 * - Display sign in / sign up links for guests
 *
 * Rendering behavior:
 * - Authenticated users see the AccountDropdown menu
 * - Unauthenticated users see authentication links
 */
function AuthNav() {
    const { data: session } = authClient.useSession();

    if (session?.user) {
        return <AccountDropdown />;
    }

    return (
        <div className="hidden items-center gap-1 sm:flex">
            <Link
                href="/auth/sign-up"
                className="text-primary hidden rounded-md bg-white px-4 py-2 font-bold hover:bg-white/90 md:block"
            >
                Sign Up
            </Link>

            <Link href="/auth/sign-in" className="rounded-md px-4 py-2 font-bold hover:bg-white/10">
                Sign In
            </Link>
        </div>
    );
}

export default AuthNav;
