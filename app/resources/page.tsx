import ResourceCard from "@/app/components/resource-card";
import Link from "next/link";
import { db } from "@/db";
import { links } from "@/db/schema";
import { eq } from "drizzle-orm";

/**
 * Resources landing page.
 *
 * Responsibilities:
 * - Display categorized resource sections for students
 * - Fetch and display featured resource links from the database
 * - Provide navigation to books, links, tutorials, blogs,
 *   applications, and future resource categories
 *
 * Current sections:
 * - Books
 * - Important Links
 * - Tutorials
 * - Blog
 * - Applications
 *
 * Notes:
 * - Featured links are dynamically loaded from the database
 * - Some sections are currently placeholders and will expand later
 *
 * This is a Server Component because it performs
 * database queries during server-side rendering.
 */
async function Resources() {
    const importantLinks = await db.select().from(links).where(eq(links.featured, true)).orderBy(links.displayName);

    return (
        <main className="px-4 py-12 lg:px-6 xl:px-8">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4 xl:gap-8">
                {/* Books card */}
                <ResourceCard title="Books" link="/resources/books">
                    <div className="flex flex-col gap-2 text-blue-600 underline underline-offset-2">
                        <Link href="/resources/books?semester=1">First Semester</Link>
                        <Link href="/resources/books?semester=2">Second Semester</Link>
                        <Link href="/resources/books?semester=3">Third Semester</Link>
                        <Link href="/resources/books?semester=4">Fourth Semester</Link>
                    </div>
                </ResourceCard>

                {/* Links card */}
                <ResourceCard title="Important Links" link="/resources/links">
                    <div className="flex flex-col gap-2 text-blue-600 underline underline-offset-2">
                        {importantLinks.map((link) => (
                            <Link href={link.href} key={link.id} target="_blank" rel="noopener noreferrer">
                                {link.displayName}
                            </Link>
                        ))}
                        <Link href="/resources/links">See more...</Link>
                    </div>
                </ResourceCard>

                {/* Tutorials card */}
                <ResourceCard title="Tutorials">
                    <div className="flex flex-col gap-2 text-blue-600 underline underline-offset-2">
                        <Link href="#">Tutorial 1</Link>
                    </div>
                </ResourceCard>

                {/* Blog card */}
                <ResourceCard title="Blog">
                    <div className="flex flex-col gap-2 text-blue-600 underline underline-offset-2">
                        <Link href="#">Blog 1</Link>
                    </div>
                </ResourceCard>

                {/* Applications card */}
                <ResourceCard title="Applications">
                    <div className="flex flex-col gap-2 text-blue-600 underline underline-offset-2">
                        <Link href="#">Application 1</Link>
                    </div>
                </ResourceCard>
            </div>
        </main>
    );
}

export default Resources;
