import Link from "next/link";
import ResourceCard from "@/components/resources/resource-card";
import { ImportantLink } from "@/db/schema";
import { getFeaturedLinks } from "@/lib/services/link-service";

/**
 * Links card component.
 *
 * Displays a list of featured links.
 */
async function LinksCard() {
    let importantLinks: ImportantLink[] = [];

    try {
        importantLinks = await getFeaturedLinks();
    } catch (error) {
        console.error("Error fetching links:", error);
        return (
            <ResourceCard title="Helpful Links" link="/resources/links">
                <p>Error loading links. Please try again later.</p>
            </ResourceCard>
        );
    }

    return (
        <ResourceCard title="Helpful Links" link="/resources/links">
            {importantLinks.map((link) => (
                <Link href={link.href} key={link.id} target="_blank" rel="noopener noreferrer">
                    {link.displayName}
                </Link>
            ))}
            <Link href="/resources/links">See more...</Link>
        </ResourceCard>
    );
}

export default LinksCard;
