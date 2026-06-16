"use client";

import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeHighlight from "rehype-highlight";
import { TutorialPreview } from "@/lib/validators/tutorial";
import { User } from "@/db/auth-schema";
import { getTutorialAuthor } from "@/actions/tutorial-actions";
import { JSX, useEffect, useState } from "react";

/**
 * Renders a tutorial component displaying details such as the title, description, author, content,
 * and associated tags. Supports formatting and sanitization for rich content display.
 *
 * @param {Object} param0 - An object containing the tutorial details.
 * @param {TutorialPreview} param0.tutorial - The tutorial object containing preview details like title, description, content, author, tags, and creation date.
 * @return {JSX.Element} React component representing the tutorial content and metadata.
 */
function Tutorial({ tutorial }: { tutorial: TutorialPreview }): JSX.Element {
    const [author, setAuthor] = useState<User | undefined>(undefined);

    useEffect(() => {
        if (tutorial.author) {
            try {
                getTutorialAuthor(tutorial.author).then(setAuthor);
            } catch (error) {
                console.error("Error fetching author:", error);
            }
        }
    }, [tutorial.author]);

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
        <div>
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
        </div>
    );
}

export default Tutorial;
