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
                <ResourceCard title="Tutorials" link="#">
                    {recentTutorials.map((tutorial) => (
                        <Link href={`/resources/tutorials/${tutorial.slug}`} key={tutorial.id}>
                            - {tutorial.title}
                        </Link>
                    ))}
                </ResourceCard>

                {/* Blog card */}
                <ResourceCard title="Blog">
                    <Link href="#">Coming Soon...</Link>
                </ResourceCard>

                {/* Applications card */}
                <ResourceCard title="Applications" link="/resources/applications">
                    <Link
                        href="https://sourceforge.net/projects/circuit/files/2.7.x/2.7.1/logisim-generic-2.7.1.jar/download"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Logisim
                    </Link>
                    <Link
                        href="https://netbeans.apache.org/front/main/download/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Apache NetBeans
                    </Link>
                    <Link
                        href="https://visualstudio.microsoft.com/downloads/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Visual Studio (Windows)
                    </Link>
                    <Link
                        href="https://storage.googleapis.com/asdv-resources/Relational%20Setup.exe"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Relational (Windows)
                    </Link>
                    <Link
                        href="https://storage.googleapis.com/asdv-resources/Install%20Relational.dmg"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Relational (Mac)
                    </Link>
                    <Link href="https://www.mamp.info/" target="_blank" rel="noopener noreferrer">
                        MAMP
                    </Link>
                </ResourceCard>
            </div>
        </main>
    );
}

export default Resources;
