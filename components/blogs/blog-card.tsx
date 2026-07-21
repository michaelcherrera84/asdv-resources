import { Blog } from "@/db/schema";
import { User } from "@/db/auth-schema";
import { getBlogAuthorService } from "@/lib/services/blog-service";
import { Card, CardBody, CardFooter, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { JSX } from "react";

interface BlogCardProps {
    blog: Blog;
    viewLink: string;
}

/**
 * Renders a blog card displaying the blog's title, description, tags, author, and creation date.'
 * @param {Object} props - The properties object.
 * @param {Blog} props.blog - The blog object containing details such as title, description, tags, author, and
 * creation date.
 * @return {Promise<JSX.Element>} A card component representing the blog with its details.
 */
async function BlogCard({ blog, viewLink }: BlogCardProps): Promise<JSX.Element> {
    let blogAuthor: User | undefined;
    if (blog.author) {
        blogAuthor = await getBlogAuthorService(blog.author);
    }

    return (
        <Card key={blog.slug} className="mb-6 min-h-56">
            <CardHeader className="items-start px-4 py-3">
                <Link href={viewLink} key={blog.id} className="text-primary text-2xl">
                    <h1>{blog.title}</h1>
                </Link>
            </CardHeader>
            <CardBody className="px-4 py-3">
                <p>{blog.description}</p>
                {blog.tags && (
                    <div className="flex flex-wrap gap-1 pt-6">
                        {blog.tags.map((tag) => (
                            <Link
                                key={tag}
                                href={`/resources/blogs?tags=${encodeURIComponent(tag)}`}
                                className="bg-primary rounded-full px-2 py-1 text-xs font-semibold text-white"
                            >
                                {tag}
                            </Link>
                        ))}
                    </div>
                )}
            </CardBody>
            <CardFooter className="flex-row justify-between px-4 pt-1 pb-3">
                {blog.author && <p className="text-gray-500">by {blogAuthor?.name ?? "Unknown Author"}</p>}
                <p className="text-gray-500">
                    {blog.createdAt.toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                    })}
                </p>
            </CardFooter>
        </Card>
    );
}

export default BlogCard;
