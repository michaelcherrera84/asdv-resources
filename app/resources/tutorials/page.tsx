import { getTutorialAuthor, getTutorials } from "@/lib/services/tutorial-service";
import { Card, CardBody, CardFooter, CardHeader } from "@/components/ui/card";
import Link from "next/link";

/**
 * Tutorials page component.
 * Displays a list of tutorials.
 * Each tutorial is a link to its detailed page.
 */
async function TutorialsPage() {
    const tutorials = await getTutorials();

    return (
        <main className="flex flex-col gap-4 px-2 pt-2 pb-12 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
            <div className="py-10">
                <h1 className="text-primary text-center text-2xl font-bold">Tutorials</h1>
                <p className="text-center leading-snug text-gray-500">
                    Tutorials focused on course-specific topics and general software development concepts
                </p>
            </div>
            {tutorials.map((tutorial) => (
                <Card key={tutorial.slug} className="min-h-56">
                    <CardHeader className="items-start px-4 py-3">
                        <Link
                            href={`/resources/tutorials/${tutorial.slug}`}
                            key={tutorial.id}
                            className="text-primary text-2xl"
                        >
                            <h1>{tutorial.title}</h1>
                        </Link>
                    </CardHeader>
                    <CardBody className="px-4 py-3">
                        <p>{tutorial.description}</p>
                    </CardBody>
                    <CardFooter className="flex-row justify-between px-4 py-3">
                        {tutorial.author && <p className="text-gray-500">by {getTutorialAuthor(tutorial.author)}</p>}
                        <p className="text-gray-500">
                            {tutorial.createdAt.toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                            })}
                        </p>
                    </CardFooter>
                </Card>
            ))}
        </main>
    );
}

export default TutorialsPage;
