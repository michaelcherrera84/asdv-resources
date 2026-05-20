import { getBookSemesters } from "@/lib/services/book-service";
import ResourceCard from "@/components/resources/resource-card";
import Link from "next/link";

/**
 * Books card component.
 *
 * Displays a list of semesters and links to their respective books.
 */
async function BooksCard() {
    let semesters;
    try {
        semesters = await getBookSemesters();
    } catch (error) {
        console.error("Error fetching books:", error);
        return (
            <ResourceCard title="Books" link="/resources/books">
                <p>Error loading books. Please try again later.</p>
            </ResourceCard>
        );
    }

    return (
        <ResourceCard title="Books" link="/resources/books">
            {semesters.map((semester) => (
                <Link href={`/resources/books?semester=${encodeURIComponent(semester)}`} key={semester}>
                    {semester}
                </Link>
            ))}
        </ResourceCard>
    );
}

export default BooksCard;
