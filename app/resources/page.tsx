import ResourceCard from "@/components/resources/resource-card";
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
    const bookSemesters = [
        { displayName: "First Semester", href: "/resources/books?semester=1st%20Semester" },
        { displayName: "Second Semester", href: "/resources/books?semester=2nd%20Semester" },
        { displayName: "Third Semester", href: "/resources/books?semester=3rd%20Semester" },
        { displayName: "Fourth Semester", href: "/resources/books?semester=4th%20Semester" },
    ];
    const importantLinks = await getFeaturedLinks();
    const recentTutorials = await getRecentTutorials();
    const applications = [
        {
            displayName: "Logisim",
            href: "https://sourceforge.net/projects/circuit/files/2.7.x/2.7.1/logisim-generic-2.7.1.jar/download",
        },
        { displayName: "Apache NetBeans", href: "https://netbeans.apache.org/front/main/download/" },
        { displayName: "Visual Studio (Windows)", href: "https://visualstudio.microsoft.com/downloads/" },
        {
            displayName: "Relational (Windows)",
            href: "https://storage.googleapis.com/asdv-resources/Relational%20Setup.exe",
        },
        {
            displayName: "Relational (Mac)",
            href: "https://storage.googleapis.com/asdv-resources/Install%20Relational.dmg",
        },
        { displayName: "MAMP", href: "https://www.mamp.info/" },
    ];

    return (
        <main className="flex justify-center px-4 py-12 lg:px-6 xl:px-8">
            <div className="flex max-w-84 flex-wrap gap-4 min-[592px]:max-w-148 min-[896px]:max-w-4xl min-[1200px]:max-w-300 min-[1600px]:max-w-400">
                {/* Books card */}
                <ResourceCard title="Books" link="/resources/books">
                    {bookSemesters.map((semester) => (
                        <Link href={semester.href} key={semester.displayName}>
                            {semester.displayName}
                        </Link>
                    ))}
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
                    <Link href="#">Coming Soon...</Link>
                </ResourceCard>

                {/* Applications card */}
                <ResourceCard title="Applications" link="/resources/applications">
                    {applications.map((app) => (
                        <Link key={app.displayName} href={app.href} target="_blank" rel="noopener noreferrer">
                            {app.displayName}
                        </Link>
                    ))}
                </ResourceCard>
            </div>
        </main>
    );
}

export default Resources;
