import { db } from "@/db";
import { tutorialComments, TutorialCommentWithRepliesAndAuthor, tutorials } from "@/db/schema";
import { and, desc, eq, inArray, isNull } from "drizzle-orm";
import { tutorialCommentInsertSchema } from "@/lib/validators/tutorial";
import { getUserById, getUsersByIds } from "@/lib/services/user-service";

/**
 * Retrieves all tutorials from the database.
 */
export function getTutorials() {
    return db.select().from(tutorials).orderBy(desc(tutorials.createdAt));
}

/**
 * Retrieves recent tutorials from the database.
 */
export function getRecentTutorials() {
    return db.select().from(tutorials).orderBy(desc(tutorials.createdAt)).limit(5);
}

/**
 * Retrieves a tutorial by slug from the database.
 * @param slug tutorial slug
 */
export function getTutorialBySlug(slug: string) {
    return db.select().from(tutorials).where(eq(tutorials.slug, slug));
}

/**
 * Retrieves the author of a tutorial from the database.
 */
export async function getTutorialAuthor(authorId: string) {
    let author;
    try {
        author = await getUserById(authorId);
    } catch (error) {
        console.error("Error fetching tutorial author:", error);
        return "Unknown Author";
    }
    return author.name;
}

/**
 * Retrieves root-level comments for a specific tutorial.
 *
 * Root comments are defined as comments that:
 * - Belong to the given tutorialSlug
 * - Are not replies (replyToId is NULL)
 *
 * Results are ordered by most recent first.
 *
 * @param tutorialSlug - The unique slug identifier of the tutorial
 */
function getRootComments(tutorialSlug: string) {
    return db
        .select()
        .from(tutorialComments)
        .where(and(eq(tutorialComments.tutorialSlug, tutorialSlug), isNull(tutorialComments.replyToId)))
        .orderBy(desc(tutorialComments.createdAt));
}

/**
 * Retrieves direct replies for a set of comment IDs.
 *
 * This only fetches ONE level of nesting (no recursive replies).
 * Each reply is associated with a parent comment via replyToId.
 *
 * @param commentIds - Array of parent comment IDs to fetch replies for
 */
function getCommentReplies(commentIds: string[]) {
    return db
        .select()
        .from(tutorialComments)
        .where(inArray(tutorialComments.replyToId, commentIds))
        .orderBy(tutorialComments.createdAt);
}

/**
 * Retrieves and structures comments for a tutorial into a two-level hierarchy.
 *
 * Structure returned:
 * [
 *   {
 *     ...rootComment,
 *     replies: [replyComment, replyComment]
 *   }
 * ]
 *
 * This function:
 * 1. Fetches all root-level comments for the tutorial
 * 2. Fetches all direct replies to those root comments
 * 3. Groups replies under their respective parent comment
 * 4. Returns a structured comment tree (2 levels deep max)
 *
 * Note:
 * - Only supports one level of nesting (no nested replies of replies)
 * - Intended for UI consumption (not raw DB access)
 *
 * @param tutorialSlug - The unique slug identifier of the tutorial
 * @returns Array of root comments with attached replies
 */
export async function getTutorialComments(tutorialSlug: string): Promise<TutorialCommentWithRepliesAndAuthor[]> {
    const roots = await getRootComments(tutorialSlug);
    const replies = await getCommentReplies(roots.map((comment) => comment.id));

    // Collect all author IDs from roots and replies
    const authorIds = [...roots.map((comment) => comment.authorId), ...replies.map((reply) => reply.authorId)];
    // Remove duplicate IDs
    const uniqueAuthorIds = [...new Set(authorIds)];
    // Fetch all authors at once
    const authors = await getUsersByIds(uniqueAuthorIds);

    const authorMap = new Map(authors.map((author) => [author.id, author]));

    const grouped = new Map<string, typeof replies>();

    for (const reply of replies) {
        if (!reply.replyToId) continue;

        if (!grouped.has(reply.replyToId)) grouped.set(reply.replyToId, []);
        grouped.get(reply.replyToId)!.push(reply);
    }

    return roots.map((root) => ({
        ...root,
        author: authorMap.get(root.authorId)!,
        replies: (grouped.get(root.id) ?? []).map((reply) => ({
            ...reply,
            author: authorMap.get(reply.authorId)!,
        })),
    }));
}

/**
 * Creates a new comment for a tutorial in the database.
 * @param data comment data
 */
export async function createTutorialComment(data: unknown) {
    const validated = tutorialCommentInsertSchema.parse(data);
    const inserted = await db.insert(tutorialComments).values(validated).returning();
    return inserted[0];
}
