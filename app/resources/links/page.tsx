import Link from "next/link";
import { db } from "@/db";
import { links } from "@/db/schema";

/**
 * Server component that displays all resource links.
 *
 * Responsibilities:
 * - Fetch link records from the database
 * - Organize links by category and subcategory
 * - Render grouped navigation sections
 *
 * Grouping structure:
 * ```
 * Category
 * ├── Uncategorized links
 * └── Subcategories
 *      └── Links
 * ```
 * This component is asynchronous because database queries
 * execute on the server before rendering.
 */
async function LinksPage() {
    /**
     * Retrieve all links ordered by:
     * 1. category
     * 2. subcategory
     * 3. display name
     *
     * Ordering ensures predictable grouped rendering.
     */
    const allLinks = await db.select().from(links).orderBy(links.category, links.subcategory, links.displayName);

    /**
     * Transform flat database records into a grouped structure.
     *
     * Result shape:
     * ```
     * {
     *   [category]: {
     *      uncategorized: [],
     *      subcategories: {
     *          [subcategory]: []
     *      }
     *   }
     * }
     * ```
     */
    const groupedLinks = allLinks.reduce(
        (acc, link) => {
            const category = link.category;
            const subcategory = link.subcategory;

            // Initialize category container if it does not exist.
            if (!acc[category]) {
                acc[category] = {
                    uncategorized: [],
                    subcategories: {},
                };
            }

            // Store links without a subcategory separately.
            if (!subcategory) {
                acc[category].uncategorized.push(link);
                return acc;
            }

            // Initialize subcategory array if needed.
            if (!acc[category].subcategories[subcategory]) {
                acc[category].subcategories[subcategory] = [];
            }

            acc[category].subcategories[subcategory].push(link);
            return acc;
        },
        /**
         * Type definition for grouped link structure.
         */
        {} as Record<string, { uncategorized: typeof allLinks; subcategories: Record<string, typeof allLinks> }>,
    );

    return (
        <main className="mx-auto w-300 max-w-full">
            {/* Page heading */}
            <div className="my-10 text-center">
                <h1 className="text-primary py-1 text-2xl font-bold">Helpful Links</h1>
                <p className="px-4 leading-snug text-gray-500">
                    Developer tools, official documentation, educational sites, and more...
                </p>
            </div>

            {/* Top-level category list */}
            <ul className="leading-loose">
                {Object.entries(groupedLinks).map(([title, category]) => (
                    <li key={title}>
                        {/* Category heading */}
                        <h2 className="bg-primary px-4 text-lg font-black text-nowrap text-white min-[1200px]:rounded">
                            {title}
                        </h2>
                        <ul className="py-2">
                            {/* Links without a subcategory. */}
                            {category.uncategorized.map((link) => (
                                <li key={link.id} className="hover:bg-gray-100">
                                    <Link
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 indent-4"
                                    >
                                        {link.displayName}
                                    </Link>
                                </li>
                            ))}

                            {/* Subcategory groups */}
                            <ul>
                                {Object.entries(category.subcategories).map(([subTitle, links]) => (
                                    <li key={subTitle} className="pt-4">
                                        {/* Subcategory heading */}
                                        <h3 className="px-8 -indent-4 text-sm font-bold text-gray-500">{subTitle}</h3>

                                        {/* Subcategory links */}
                                        <ul>
                                            {links.map((link) => (
                                                <li key={link.id} className="hover:bg-gray-100">
                                                    <Link
                                                        href={link.href}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="block px-8 -indent-4"
                                                    >
                                                        {link.displayName}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        </ul>
                    </li>
                ))}
            </ul>
        </main>
    );
}

export default LinksPage;
