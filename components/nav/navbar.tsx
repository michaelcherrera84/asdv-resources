import Link from "next/link";
import MobileNav from "./mobile-nav";
import AuthNav from "./auth-nav";
import Notifications from "@/components/nav/notifications";

/**
 * Main navigation component.
 *
 * Responsibilities:
 * - Display a responsive navigation menu
 * - Provide navigation links for authenticated users
 * - Display sign-in/sign-up links for guests
 */
async function Navbar() {
    return (
        <header className="bg-primary relative z-20 flex h-16 items-center justify-center sm:justify-between sm:px-4 md:px-8">
            <MobileNav />

            <Link href="/" className="text-lg font-black text-white md:text-2xl">
                ASDV Resources
            </Link>

            <Notifications className="absolute! top-1/2 right-17 -translate-y-1/2 sm:hidden" />

            {/* Navigation links displayed on larger screens */}
            <nav className="hidden items-center gap-6 bg-transparent font-normal text-white sm:flex md:gap-14">
                <div className="flex items-center gap-8">
                    <Link href="/about" className="underline-offset-2 hover:underline">
                        About
                    </Link>
                    <Link href="/resources" className="underline-offset-2 hover:underline">
                        Resources
                    </Link>
                    <Link href="/contact" className="underline-offset-2 hover:underline">
                        Contact
                    </Link>
                </div>

                {/* Authentication links or account controls */}
                <div className="flex items-center gap-4">
                    <Notifications />
                    <AuthNav />
                </div>
            </nav>
        </header>
    );
}

export default Navbar;
