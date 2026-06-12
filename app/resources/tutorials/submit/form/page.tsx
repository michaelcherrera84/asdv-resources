import TutorialSubmissionForm from "@/components/tutorials/tutorial-submission-form";

/**
 * Tutorial submission page component.
 * Displays a form for users to submit a new tutorial.
 */
function TutorialSubmissionPage() {
    return (
        <main className="flex flex-col items-center gap-4 px-2 py-12 sm:px-4 md:px-8 lg:px-12">
            <h1 className="text-primary text-2xl font-bold">Submit a Tutorial</h1>
            <TutorialSubmissionForm />
        </main>
    );
}

export default TutorialSubmissionPage;
