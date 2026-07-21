"use server";

import { getBlogAuthorService } from "@/lib/services/blog-service";

/**
 * Get the author of a blog
 * @param id blog id
 */
export async function getBlogAuthor(id: string) {
    return await getBlogAuthorService(id);
}
