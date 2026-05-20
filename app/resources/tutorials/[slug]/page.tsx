import { getTutorialAuthor, getTutorialBySlug } from "@/lib/services/tutorial-service";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import Comments from "@/components/tutorials/comments";

/**
 * Tutorial page component.
 * Displays a single tutorial with its content and comments.
 */
async function TutorialPage({ params }: { params: Promise<{ slug: string }> }) {
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

    let author = "Unknown Author";
    if (tutorial.author) {
        author = await getTutorialAuthor(tutorial.author);
    }

    const formattedDate = new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    }).format(new Date(tutorial.createdAt));

    return (
        <main className="px-4 py-12 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
            <article className="prose prose-neutral max-w-none">
                <h1 className="mb-0">{tutorial.title}</h1>
                <p className="text-gray-500 italic">
                    {formattedDate} &nbsp;by&nbsp; <b>{author}</b>
                </p>
                <p>{tutorial.description}</p>
                <hr className="my-10!" />
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight, rehypeRaw]}
                    components={{
                        code({ className, children, ...props }) {
                            const isInline = !className;
                            if (isInline) {
                                return (
                                    <code className="rounded bg-gray-200 p-0.5" {...props}>
                                        {children}
                                    </code>
                                );
                            }
                            return (
                                <code className={className} {...props}>
                                    {children}
                                </code>
                            );
                        },
                    }}
                >
                    {tutorial.content}
                </ReactMarkdown>
            </article>
            <hr className="my-10" />
            <Comments slug={slug} />
        </main>
    );
}

export default TutorialPage;
