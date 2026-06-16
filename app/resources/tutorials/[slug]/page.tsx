import { getTutorialBySlugService } from "@/lib/services/tutorial-service";
import TutorialComments from "@/components/tutorials/tutorial-comments";
import Breadcrumbs from "@/components/breadcrumbs";
import { Metadata } from "next";
import Tutorial from "@/components/tutorials/tutorial";

type TutorialProps = {
    params: Promise<{ slug: string }>;
};

/**
 * Generates metadata for the tutorial page.
 */
export async function generateMetadata({ params }: TutorialProps): Promise<Metadata> {
    const { slug } = await params;

    try {
        const tutorial = await getTutorialBySlugService(slug);

        if (!tutorial) return { title: "Tutorial Not Found" };

        return {
            title: tutorial.title,
            description: tutorial.description,
        };
    } catch (error) {
        console.error("Error generating metadata:", error);
        return { title: "Error Loading Metadata" };
    }
}

/**
 * Tutorial page component.
 * Displays a single tutorial with its content and comments.
 */
async function TutorialPage({ params }: TutorialProps) {
    const { slug } = await params;

    let tutorial;
    try {
        tutorial = await getTutorialBySlugService(slug);
    } catch (error) {
        console.error("Error fetching tutorial:", error);
        throw new Error("Failed to fetch tutorial");
    }

    if (!tutorial) {
        throw new Error("Tutorial not found");
    }

    return (
        <main className="px-4 py-12 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
            <Breadcrumbs className="flex-wrap pb-8" />
            <Tutorial tutorial={tutorial} />
            <hr className="mt-4 mb-4" />
            <p className="mb-10 text-sm text-gray-500 italic">
                <strong>Disclaimer:</strong> This content was created by a community contributor. The opinions expressed
                are those of the author and do not necessarily reflect the views of ASDV Resources. While submissions
                are reviewed before publication, ASDV Resources does not guarantee the accuracy, completeness, or
                reliability of any published content. Readers should independently verify information before relying on
                it.
            </p>
            <TutorialComments slug={slug} />
        </main>
    );
}

export default TutorialPage;
