import { getTutorialsService, getTutorialsByTagsService } from "@/lib/services/tutorial-service";
import { Metadata } from "next";
import TutorialCard from "@/components/tutorials/tutorial-card";
import { Tutorial } from "@/db/schema";
import Link from "next/link";
import TutorialSearch from "@/components/tutorials/tutorial-search";
import BottomDrawer from "@/components/ui/bottom-drawer";

/**
 * Metadata for the Tutorials page.
 */
export const metadata: Metadata = {
    title: "ASDV Resources - Tutorials",
    description: "Tutorials focused on course-specific topics and general software development concepts",
};

type SearchParams = { [key: string]: string | string[] | undefined };

interface TutorialProps {
    searchParams: Promise<SearchParams>;
}

/**
 * Tutorials page component.
 * Displays a list of user-comments.
 * Each tutorial card is a link to its detailed page.
 */
async function TutorialsPage({ searchParams }: TutorialProps) {
    const params = await searchParams;
    const tags = params.tags;

    let tagsArray: string[] = [];
    if (Array.isArray(tags)) {
        tagsArray = tags;
    } else if (typeof tags === "string") {
        tagsArray = tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean);
    }

    let tutorials: Tutorial[];

    if (tags) {
        tutorials = await getTutorialsByTagsService(tagsArray);
    } else {
        tutorials = await getTutorialsService();
    }

    return (
        <main className="flex flex-col gap-4 px-2 pt-2 pb-12 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
            <TutorialSearch />
            <div className="py-10">
                <h1 className="text-primary text-center text-2xl font-bold">Tutorials</h1>
                <p className="text-center leading-snug text-gray-500">
                    Tutorials focused on course-specific topics and general software development concepts
                </p>
            </div>
            <div>
                {tags && (
                    <div className="flex justify-between px-2 py-1 text-sm text-gray-500">
                        <p>Showing tutorials for: {tagsArray.join(", ")}</p>
                        <Link href="/resources/tutorials" className="text-sm text-blue-600 hover:underline">
                            Clear Filters
                        </Link>
                    </div>
                )}
                {tutorials.map((tutorial) => {
                    return (
                        <TutorialCard
                            key={tutorial.id}
                            tutorial={tutorial}
                            viewLink={`/resources/tutorials/${tutorial.slug}`}
                        />
                    );
                })}
            </div>
            <BottomDrawer>
                <h4 className="text-primary font-bold">Content Disclaimer</h4>
                <p>
                    The content published on ASDV Resources is created and submitted by individual contributors. The
                    views, opinions, recommendations, and conclusions expressed are those of the author and do not
                    necessarily reflect the views or official position of ASDV Resources.
                </p>
                <p>
                    While ASDV Resources reviews submissions and strives to publish high-quality, accurate, and useful
                    content, we make no representations or warranties regarding the completeness, accuracy, reliability,
                    or suitability of any information published on this site. Content may become outdated, contain
                    errors, or reflect differing professional opinions.
                </p>
                <p>
                    Readers are encouraged to independently verify information and use their own judgment before relying
                    on any content. ASDV Resources shall not be held responsible for any loss, damage, or consequences
                    resulting from the use of information provided by contributors.
                </p>
            </BottomDrawer>
        </main>
    );
}

export default TutorialsPage;
