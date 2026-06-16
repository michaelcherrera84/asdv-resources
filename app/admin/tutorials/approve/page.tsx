import { getUnapprovedTutorialsService } from "@/lib/services/tutorial-service";
import TutorialCard from "@/components/tutorials/tutorial-card";
import { getSession } from "@/lib/auth/auth";
import { JSX } from "react";

/**
 * Renders the Tutorials Approval Page, enabling administrators to review and approve pending tutorials.
 * Verifies the session to ensure the user is authenticated and has admin privileges.
 * If unauthorized access is detected, an error is thrown.
 * Retrieves the list of unapproved tutorials and displays them as interactive tutorial cards.
 *
 * @return {Promise<JSX.Element>} A Promise that resolves to the JSX representation of the Tutorials Approval Page.
 * @throws {Error} If the current session is invalid or the user lacks administrative privileges.
 */
async function TutorialsApprovalPage(): Promise<JSX.Element> {
    const session = await getSession();
    if (!session?.user || session.user.role !== "admin") {
        throw new Error("Unauthorized");
    }

    const tutorials = await getUnapprovedTutorialsService();

    return (
        <main className="flex flex-col gap-6 py-12 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
            <h1 className="text-primary text-center text-2xl font-bold">Tutorial Approval</h1>
            {tutorials.length < 1 && (
                <p className="absolute top-1/2 left-1/2 w-full -translate-1/2 px-8 text-center">
                    There are no tutorials currently awaiting approval.
                </p>
            )}
            <div>
                {tutorials.map((tutorial) => {
                    return (
                        <TutorialCard
                            key={tutorial.id}
                            tutorial={tutorial}
                            viewLink={`/admin/tutorials/approve/${tutorial.slug}`}
                        />
                    );
                })}
            </div>
        </main>
    );
}

export default TutorialsApprovalPage;
