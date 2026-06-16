import { getTutorialBySlugService } from "@/lib/services/tutorial-service";
import Tutorial from "@/components/tutorials/tutorial";
import { getSession } from "@/lib/auth/auth";
import TutorialApprovalButtons from "@/components/tutorials/tutorial-approval-buttons";
import { JSX } from "react";

type TutorialProps = {
    params: Promise<{ slug: string }>;
};

/**
 * Renders a tutorial approval page with options to approve or view the tutorial.
 * This function ensures the user is authenticated as an admin before proceeding.
 *
 * @param {Object} props - The component properties.
 * @param {Promise<{ slug: string }>} props.params - The route parameters.
 * @return {Promise<JSX.Element>} The JSX element representing the tutorial approval page.
 * @throws {Error} If the user is not authenticated, not an admin, or if the tutorial cannot be fetched.
 */
async function TutorialApprovalPage({ params }: TutorialProps): Promise<JSX.Element> {
    const session = await getSession();
    if (!session?.user || session.user.role !== "admin") {
        throw new Error("Unauthorized");
    }

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
            {!tutorial.approved && <TutorialApprovalButtons tutorial={tutorial} />}
            <Tutorial tutorial={tutorial} />
            {!tutorial.approved && <TutorialApprovalButtons tutorial={tutorial} />}
        </main>
    );
}

export default TutorialApprovalPage;
