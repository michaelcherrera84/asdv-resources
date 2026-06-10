import { getTutorialAuthor, getTutorialBySlug } from "@/lib/services/tutorial-service";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import Comments from "@/components/user-comments/comments";
import Breadcrumbs from "@/components/breadcrumbs";
import Link from "next/link";
import { User } from "@/db/auth-schema";
import { Metadata } from "next";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";

type TutorialProps = {
    params: Promise<{ slug: string }>;
};

/**
 * Generates metadata for the tutorial page.
 */
export async function generateMetadata({ params }: TutorialProps): Promise<Metadata> {
    const { slug } = await params;

    try {
        const tutorialData = await getTutorialBySlug(slug);
        const tutorial = tutorialData[0];

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

    let author: User | undefined;
    if (tutorial.author) {
        author = await getTutorialAuthor(tutorial.author);
    }

    const formattedDate = new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    }).format(new Date(tutorial.createdAt));

    const sanitizedSchema = {
        ...defaultSchema,
        tagNames: [...(defaultSchema.tagNames || []), "iframe"],
        attributes: {
            ...defaultSchema.attributes,
            iframe: ["src", "width", "height", "frameborder", "allow", "allowfullscreen", "title"],
        },
        protocols: {
            ...defaultSchema.protocols,
            src: ["https"],
        },
    };

    return (
        <main className="px-4 py-12 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
            <Breadcrumbs className="flex-wrap pb-8" />
            <article className="prose prose-neutral max-w-none">
                <h1 className="mb-0">{tutorial.title}</h1>
                <p className="text-gray-500 italic">
                    {formattedDate} &nbsp;by&nbsp;&nbsp;
                    {author ? (
                        <Link href={`/profile/${author.username}`} className="font-bold">
                            {author.name}
                        </Link>
                    ) : (
                        <span className="font-bold">Unknown Author</span>
                    )}
                </p>
                <p>{tutorial.description}</p>
                <hr className="my-10!" />
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw, [rehypeSanitize, sanitizedSchema], rehypeHighlight]}
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
                        iframe: ({ src, ...props }) => {
                            if (!src) return null;

                            try {
                                const url = new URL(src);
                                const allowedHosts = [
                                    "www.youtube.com",
                                    "youtube.com",
                                    "youtu.be",
                                    "www.youtube-nocookie.com",
                                    "youtube-nocookie.com",
                                ];

                                if (!allowedHosts.includes(url.hostname)) return null;

                                return (
                                    <div className="w-fit rounded border p-2">
                                        <iframe
                                            src={src}
                                            width={props.width}
                                            height={props.height}
                                            title={props.title}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                                            allowFullScreen
                                            className="rounded"
                                        />
                                    </div>
                                );
                            } catch (error) {
                                console.error(error);
                                return null;
                            }
                        },
                    }}
                >
                    {tutorial.content}
                </ReactMarkdown>
            </article>
            {tutorial.tags && (
                <div className="flex flex-wrap gap-1 pt-8">
                    {tutorial.tags.map((tag) => (
                        <Link
                            href={`/resources/tutorials?tags=${tag}`}
                            key={tag}
                            className="bg-primary rounded-full px-2 py-1 text-xs font-semibold text-white"
                        >
                            {tag}
                        </Link>
                    ))}
                </div>
            )}
            <hr className="mt-4 mb-10" />
            <Comments slug={slug} />
        </main>
    );
}

export default TutorialPage;
