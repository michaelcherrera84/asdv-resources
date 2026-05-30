import { getTutorials, getTutorialsByTags } from "@/lib/services/tutorial-service";
import { Metadata } from "next";
import TutorialCard from "@/components/tutorials/tutorial-card";
import { Tutorial } from "@/db/schema";
import Link from "next/link";
import TutorialSearch from "@/components/tutorials/tutorial-search";

/**
 * Metadata for the tutorials page.
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
 * Each tutorial is a link to its detailed page.
 */
async function TutorialsPage({ searchParams }: TutorialProps) {
    const params = await searchParams;
    const tags = params.tags;
    const tagsArray = Array.isArray(tags) ? tags : tags ? [tags] : [];

    let tutorials: Tutorial[];

    if (tags) {
        tutorials = await getTutorialsByTags(tagsArray);
    } else {
        tutorials = await getTutorials();
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
                {tutorials.map(async (tutorial) => {
                    return <TutorialCard key={tutorial.id} tutorial={tutorial} />;
                })}
            </div>
        </main>
    );
}

export default TutorialsPage;
