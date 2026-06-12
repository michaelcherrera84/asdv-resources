import { getTutorialBySlug } from "@/lib/services/tutorial-service";
import Tutorial from "@/components/tutorials/tutorial";
import { getSession } from "@/lib/auth/auth";
import TutorialApprovalButtons from "@/components/tutorials/tutorial-approval-buttons";

type TutorialProps = {
    params: Promise<{ slug: string }>;
};

async function TutorialApprovalPage({ params }: TutorialProps) {
    const session = await getSession();
    if (!session?.user || session.user.role !== "admin") {
        throw new Error("Unauthorized");
    }

    const { slug } = await params;

    let tutorialData;
    try {
        tutorialData = await getTutorialBySlug(slug);
    } catch (error) {
        console.error("Error fetching tutorial:", error);
        throw new Error("Failed to fetch tutorial");
    }

    const tutorial = tutorialData[0];

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
