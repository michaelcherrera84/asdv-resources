import Link from "next/link";
import MobileNav from "@/app/components/mobile-nav";
import AuthNav from "@/app/components/auth-nav";

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
        <header className="bg-primary z-20 flex h-16 items-center justify-center sm:justify-between sm:px-4 md:px-8">
            <div className="bg-primary text-white">
                {/* Mobile navigation menu displayed on small screens */}
                <MobileNav />

                {/* Logo */}
                <Link href="/" className="text-lg font-black md:text-2xl">
                    ASDV Resources
                </Link>
            </div>

            {/* Navigation links displayed on larger screens */}
            <nav className="hidden items-center gap-6 bg-transparent font-normal text-white sm:flex md:gap-14">
                <div className="flex items-center gap-8">
                    <Link href="#" className="underline-offset-2 hover:underline">
                        About
                    </Link>
                    <Link href="/resources" className="underline-offset-2 hover:underline">
                        Resources
                    </Link>
                    <Link href="#" className="underline-offset-2 hover:underline">
                        Contact
                    </Link>
                </div>

                {/* Authentication links or account controls */}
                <AuthNav />
            </nav>
        </header>
    );
}

export default Navbar;
