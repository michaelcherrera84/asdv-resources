import { getBlogBySlugService } from "@/lib/services/blog-service";
import Breadcrumbs from "@/components/breadcrumbs";
import Blog from "@/components/blogs/blog";

interface BlogProps {
    params: Promise<{ slug: string }>;
}

/**
 * Generates metadata for the blog page.
 */
export async function generateMetadata({ params }: BlogProps) {
    const { slug } = await params;

    try {
        const blog = await getBlogBySlugService(slug);

        if (!blog) return { title: "Blog Not Found" };

        return {
            title: blog.title,
            description: blog.description,
        };
    } catch (error) {
        console.error("Error generating metadata:", error);
        return { title: "Error Loading Metadata" };
    }
}

/**
 * Blog page component.
 * Displays a single blog with its content.
 */
async function BlogPage({ params }: BlogProps) {
    const { slug } = await params;

    let blog;
    try {
        blog = await getBlogBySlugService(slug);
    } catch (error) {
        console.error("Error fetching blog:", error);
        throw new Error("Failed to fetch blog");
    }

    if (!blog) {
        throw new Error("Blog not found");
    }

    return (
        <main className="px-4 py-12 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
            <Breadcrumbs className="flex-wrap pb-8" />
            <Blog blog={blog} />
            <hr className="mt-4 mb-4" />
            <p className="mb-10 text-sm text-gray-500 italic">
                <strong>Disclaimer:</strong> This content was created by a community contributor. The opinions expressed
                are those of the author and do not necessarily reflect the views of ASDV Resources. While submissions
                are reviewed before publication, ASDV Resources does not guarantee the accuracy, completeness, or
                reliability of any published content. Readers should independently verify information before relying on
                it.
            </p>
        </main>
    );
}

export default BlogPage;
