import ResourceCard from "@/components/resources/resource-card";
import { Blog } from "@/db/schema";
import { getRecentBlogsService } from "@/lib/services/blog-service";
import Link from "next/link";

/**
 * Blog card component.
 *
 * Displays a list of recent blog articles.
 */
async function BlogsCard() {
    let recentBlogs: Blog[] = [];
    try {
        recentBlogs = await getRecentBlogsService();
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return (
            <ResourceCard title="Blog" link="/resources/blogs">
                <p>Error loading blogs. Please try again later.</p>
            </ResourceCard>
        );
    }

    return (
        <ResourceCard title="Blog" link="/resources/blogs">
            {recentBlogs.map((blog) => (
                <Link href={`/resources/blogs/${blog.slug}`} key={blog.id}>
                    &bull;&nbsp; {blog.title}
                </Link>
            ))}
        </ResourceCard>
    );
}

export default BlogsCard;
