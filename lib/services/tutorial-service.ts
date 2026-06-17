import { db } from "@/db";
import { Tutorial, tutorialComments, TutorialCommentWithRepliesAndAuthor, tutorials } from "@/db/schema";
import { and, arrayOverlaps, asc, desc, eq, inArray, isNull } from "drizzle-orm";
import {
    tutorialCommentInsertSchema,
    tutorialDeleteCommentSchema,
    tutorialInsertSchema,
} from "@/lib/validators/tutorial";
import { getAdminsService, getUserByIdService, getUsersByIdsService } from "@/lib/services/user-service";
import { getSession } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import { User } from "@/db/auth-schema";
import { cache } from "react";
import { unstable_noStore as noStore } from "next/cache";
import { NotificationInsert } from "@/lib/validators/notification";
import { createNotificationService } from "@/lib/services/notification-service";

/**
 * Retrieves all user comments from the database.
 */
export function getTutorialsService() {
    return db.select().from(tutorials).where(eq(tutorials.approved, true)).orderBy(desc(tutorials.createdAt));
}

/**
 * Retrieves a tutorial record based on the provided tutorial ID.
 *
 * @param {string} id - The unique identifier of the tutorial to retrieve.
 */
export async function getTutorialByIdService(id: string) {
    const [tutorial] = await db.select().from(tutorials).where(eq(tutorials.id, id));
    return tutorial;
}

/**
 * Retrieves recent user comments from the database.
 */
export function getRecentTutorialsService() {
    noStore();
    return db.select().from(tutorials).where(eq(tutorials.approved, true)).orderBy(desc(tutorials.createdAt)).limit(5);
}

/**
 * Retrieves tutorials by tags from the database.
 * @param tags tutorial tags
 */
export async function getTutorialsByTagsService(tags: string[]) {
    return db
        .select()
        .from(tutorials)
        .where(
            and(
                arrayOverlaps(
                    tutorials.tags,
                    tags.map((tag) => tag.toLowerCase()),
                ),
                eq(tutorials.approved, true),
            ),
        )
        .orderBy(desc(tutorials.createdAt));
}

/**
 * Retrieves a tutorial by slug from the database.
 * @param slug tutorial slug
 */
export const getTutorialBySlugService = cache(async (slug: string) => {
    const [tutorial] = await db.select().from(tutorials).where(eq(tutorials.slug, slug));
    return tutorial;
});

/**
 * Retrieves all unapproved tutorials from the database.
 */
export async function getUnapprovedTutorialsService() {
    const session = await getSession();
    if (!session || !session.user || session.user.role !== "admin") {
        throw new Error("Unauthorized");
    }
    return db.select().from(tutorials).where(eq(tutorials.approved, false)).orderBy(asc(tutorials.createdAt));
}

/**
 * Approves a tutorial by setting its `approved` status to true in the database.
 *
 * @param {string} tutorialId - The unique identifier of the tutorial to approve.
 * @return {Promise<Tutorial>} A promise that resolves to the updated tutorial record.
 */
export async function approveTutorialService(tutorialId: string): Promise<Tutorial> {
    const session = await getSession();

    if (!session || !session.user || session.user.role !== "admin") {
        throw new Error("Unauthorized");
    }

    const [updated] = await db
        .update(tutorials)
        .set({ approved: true })
        .where(eq(tutorials.id, tutorialId))
        .returning();

    if (updated && updated.author && updated.author != session.user.id) {
        const notification: NotificationInsert = {
            senderId: session.user.id,
            receiverId: updated.author,
            link: `/resources/tutorials/${updated.slug}`,
            message: `Your tutorial, <b><u>${updated.title}</u></b>, has been approved!`,
        };
        await createNotificationService(notification);
    }

    return updated;
}

/**
 * Retrieves the author of a tutorial from the database.
 */
export async function getTutorialAuthorService(authorId: string): Promise<User | undefined> {
    let author;
    try {
        author = await getUserByIdService(authorId);
    } catch (error) {
        console.error("Error fetching tutorial author:", error);
        return undefined;
    }
    return author;
}

/**
 * Creates a new tutorial entry in the database.
 *
 * @param {unknown} data - The input data for creating the tutorial, expected to be validated against a predefined schema.
 */
export async function createTutorialService(data: unknown) {
    const session = await getSession();

    if (!session || !session.user) {
        redirect("/sign-in");
    }

    const validated = tutorialInsertSchema.parse(data);

    if (validated.author != session.user.id) {
        throw new Error("Unauthorized");
    }

    const [inserted] = await db.insert(tutorials).values(validated).returning();

    const admins = await getAdminsService();

    admins.map(async (admin) => {
        const notification: NotificationInsert = {
            senderId: validated.author!,
            receiverId: admin.id,
            message: `${session.user.name} submitted a tutorial for review.`,
            link: `/admin/tutorials/approve`,
        };

        await createNotificationService(notification);
    });

    return inserted;
}

/**
 * Deletes a tutorial by its ID if the user is authorized.
 *
 * @param {string} tutorialId - The ID of the tutorial to be deleted.
 */
export async function deleteTutorialService(tutorialId: string) {
    const session = await getSession();

    if (!session || !session.user) {
        redirect("/sign-in");
    }

    const tutorial = await getTutorialByIdService(tutorialId);

    if (!tutorial) {
        throw new Error("Tutorial not found");
    }

    if (tutorial.author != session.user.id && session.user.role !== "admin") {
        throw new Error("Unauthorized");
    }

    const [deleted] = await db.delete(tutorials).where(eq(tutorials.id, tutorialId)).returning();
    return deleted;
}

/**
 * Retrieves root-level comments for a specific tutorial.
 *
 * Root comments are defined as comments that:
 * - Belong to the given slug
 * - Are not replies (replyToId is NULL)
 *
 * Results are ordered by the most recent first.
 *
 * @param slug - The unique slug identifier of the tutorial
 */
function getRootComments(slug: string) {
    return db
        .select()
        .from(tutorialComments)
        .where(and(eq(tutorialComments.slug, slug), isNull(tutorialComments.replyToId)))
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
export async function getTutorialCommentsService(tutorialSlug: string): Promise<TutorialCommentWithRepliesAndAuthor[]> {
    const roots = await getRootComments(tutorialSlug);
    const replies = await getCommentReplies(roots.map((comment) => comment.id));

    // Collect all author IDs from roots and replies
    const authorIds = [...roots.map((comment) => comment.authorId), ...replies.map((reply) => reply.authorId)];
    // Remove duplicate IDs
    const uniqueAuthorIds = [...new Set(authorIds)];
    // Fetch all authors at once
    const authors = await getUsersByIdsService(uniqueAuthorIds);

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
 * Retrieves a comment by its ID.
 * @param id comment id
 */
export async function getTutorialCommentByIdService(id: string) {
    const [comment] = await db.select().from(tutorialComments).where(eq(tutorialComments.id, id));
    return comment;
}

/**
 * Creates a new comment for a tutorial in the database.
 * @param data comment data
 */
export async function createTutorialCommentService(data: unknown) {
    const session = await getSession();

    if (!session || !session.user) {
        redirect("/sign-in");
    }

    const validated = tutorialCommentInsertSchema.parse(data);
    const [inserted] = await db.insert(tutorialComments).values(validated).returning();

    const tutorial = await getTutorialBySlugService(validated.slug);
    let message;
    let commentAuthor;
    const sender = await getUserByIdService(validated.authorId);
    if (validated.replyToId) {
        const comment = await getTutorialCommentByIdService(validated.replyToId);
        commentAuthor = comment.authorId;
        message = `${sender.name} replied to your comment on ${tutorial.title}`;
    } else message = `${sender.name} commented on ${tutorial.title}`;

    const notification: NotificationInsert = {
        senderId: validated.authorId,
        receiverId: commentAuthor
            ? commentAuthor
            : tutorial.author && tutorial.author != validated.authorId
              ? tutorial.author
              : "",
        message: message,
        link: `/resources/tutorials/${validated.slug}#comments`,
    };

    await createNotificationService(notification);

    return inserted;
}

/**
 * Updates an existing comment in the database.
 * @param data comment data
 */
export async function deleteTutorialCommentService(data: unknown) {
    const session = await getSession();

    if (!session || !session.user) {
        redirect("/sign-in");
    }

    const validated = tutorialDeleteCommentSchema.parse(data);
    if (validated.authorId != session.user.id || session.user.role !== "admin") {
        throw new Error("Unauthorized");
    }

    const [updated] = await db
        .update(tutorialComments)
        .set(validated)
        .where(eq(tutorialComments.id, validated.id))
        .returning();
    return updated;
}
