import ResourceCard from "@/components/resources/resource-card";
import Link from "next/link";
import { Tutorial } from "@/db/schema";
import { getRecentTutorials } from "@/lib/services/tutorial-service";

/**
 * Tutorials card component.
 *
 * Displays a list of recent tutorials.
 */
async function TutorialsCard() {
    let recentTutorials: Tutorial[] = [];
    try {
        recentTutorials = await getRecentTutorials();
    } catch (error) {
        console.error("Error fetching tutorials:", error);
        return (
            <ResourceCard title="Tutorials" link="/resources/tutorials">
                <p>Error loading tutorials. Please try again later.</p>
            </ResourceCard>
        );
    }

    return (
        <ResourceCard title="Tutorials" link="/resources/tutorials">
            {recentTutorials.map((tutorial) => (
                <Link href={`/resources/tutorials/${tutorial.slug}`} key={tutorial.id}>
                    - {tutorial.title}
                </Link>
            ))}
        </ResourceCard>
    );
}

export default TutorialsCard;
