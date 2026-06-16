import { Tutorial } from "@/db/schema";
import { User } from "@/db/auth-schema";
import { getTutorialAuthorService } from "@/lib/services/tutorial-service";
import { Card, CardBody, CardFooter, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { JSX } from "react";

interface TutorialCardProps {
    tutorial: Tutorial;
    viewLink: string;
}

/**
 * Renders a tutorial card displaying the tutorial's title, description, tags, author, and creation date.
 *
 * @param {Object} props - The properties object.
 * @param {Tutorial} props.tutorial - The tutorial object containing details such as title, description, tags, author, and creation date.
 * @return {Promise<JSX.Element>} A card component representing the tutorial with its details.
 */
async function TutorialCard({ tutorial, viewLink }: TutorialCardProps): Promise<JSX.Element> {
    let tutorialAuthor: User | undefined;
    if (tutorial.author) {
        tutorialAuthor = await getTutorialAuthorService(tutorial.author);
    }
    return (
        <Card key={tutorial.slug} className="mb-6 min-h-56">
            <CardHeader className="items-start px-4 py-3">
                <Link href={viewLink} key={tutorial.id} className="text-primary text-2xl">
                    <h1>{tutorial.title}</h1>
                </Link>
            </CardHeader>
            <CardBody className="px-4 py-3">
                <p>{tutorial.description}</p>
                {tutorial.tags && (
                    <div className="flex flex-wrap gap-1 pt-6">
                        {tutorial.tags.map((tag) => (
                            <Link
                                href={`/resources/tutorials?tags=${encodeURIComponent(tag)}`}
                                key={tag}
                                className="bg-primary rounded-full px-2 py-1 text-xs font-semibold text-white"
                            >
                                {tag}
                            </Link>
                        ))}
                    </div>
                )}
            </CardBody>
            <CardFooter className="flex-row justify-between px-4 pt-1 pb-3">
                {tutorial.author && <p className="text-gray-500">by {tutorialAuthor?.name ?? "Unknown Author"}</p>}
                <p className="text-gray-500">
                    {tutorial.createdAt.toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                    })}
                </p>
            </CardFooter>
        </Card>
    );
}

export default TutorialCard;
