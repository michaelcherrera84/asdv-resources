import ResourceCard from "../../components/resource-card";
import Link from "next/link";
import { getFeaturedLinks } from "@/lib/services/link-service";
import { getRecentTutorials } from "@/lib/services/tutorial-service";

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
    const importantLinks = await getFeaturedLinks();
    const recentTutorials = await getRecentTutorials();

    return (
        <main className="flex justify-center px-4 py-12 lg:px-6 xl:px-8">
            <div className="flex max-w-84 flex-wrap gap-4 min-[592px]:max-w-148 min-[896px]:max-w-4xl min-[1200px]:max-w-300 min-[1600px]:max-w-400">
                {/* Books card */}
                <ResourceCard title="Books" link="/resources/books">
                    <Link href="/resources/books?semester=1st%20Semester">First Semester</Link>
                    <Link href="/resources/books?semester=2nd%20Semester">Second Semester</Link>
                    <Link href="/resources/books?semester=3rd%20Semester">Third Semester</Link>
                    <Link href="/resources/books?semester=4th%20Semester">Fourth Semester</Link>
                </ResourceCard>

                {/* Links card */}
                <ResourceCard title="Helpful Links" link="/resources/links">
                    {importantLinks.map((link) => (
                        <Link href={link.href} key={link.id} target="_blank" rel="noopener noreferrer">
                            {link.displayName}
                        </Link>
                    ))}
                    <Link href="/resources/links">See more...</Link>
                </ResourceCard>

                {/* Tutorials card */}
                <ResourceCard title="Tutorials" link="/resources/tutorials">
                    {recentTutorials.map((tutorial) => (
                        <Link href={`/resources/tutorials/${tutorial.slug}`} key={tutorial.id}>
                            - {tutorial.title}
                        </Link>
                    ))}
                </ResourceCard>

                {/* Blog card */}
                <ResourceCard title="Blog">
                    <Link href="#">Blog 1</Link>
                </ResourceCard>

                {/* Applications card */}
                <ResourceCard title="Applications">
                    <Link href="#">Application 1</Link>
                </ResourceCard>
            </div>
        </main>
    );
}

export default Resources;
