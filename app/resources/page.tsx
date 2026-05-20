import LinksCard from "@/components/resources/resourse-cards/links-card";
import TutorialsCard from "@/components/resources/resourse-cards/tutorials-card";
import BooksCard from "@/components/resources/resourse-cards/books-card";
import BlogCard from "@/components/resources/resourse-cards/blog-card";
import ApplicationsCard from "@/components/resources/resourse-cards/applications-card";

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
    return (
        <main className="flex justify-center px-4 py-12 lg:px-6 xl:px-8">
            <div className="flex max-w-84 flex-wrap gap-4 min-[592px]:max-w-148 min-[896px]:max-w-4xl min-[1200px]:max-w-300 min-[1600px]:max-w-400">
                <BooksCard />
                <LinksCard />
                <TutorialsCard />
                <BlogCard />
                <ApplicationsCard />
            </div>
        </main>
    );
}

export default Resources;
