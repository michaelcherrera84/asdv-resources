"use server";

import {
    approveTutorialUpdate,
    createTutorial,
    createTutorialComment,
    deleteTutorial,
    deleteTutorialComment,
    getTutorialAuthor,
} from "@/lib/services/tutorial-service";
import { TutorialCommentInsert, TutorialDeleteComment, TutorialInsert } from "@/lib/validators/tutorial";
import { revalidatePath } from "next/cache";

/**
 * Get the author of a tutorial
 * @param id tutorial id
 */
export async function getAuthor(id: string) {
    return await getTutorialAuthor(id);
}

/**
 * Submit a new tutorial
 * @param data tutorial data
 */
export async function submitTutorial(data: TutorialInsert) {
    await createTutorial(data);
}

/**
 * Approve a tutorial
 * @param id tutorial id
 */
export async function approveTutorial(id: string) {
    return await approveTutorialUpdate(id);
}

/**
 * Remove a tutorial
 * @param id tutorial id
 */
export async function removeTutorial(id: string) {
    const deleted = await deleteTutorial(id);
    revalidatePath("/resources/tutorials");
    revalidatePath("/admin/tutorials/approve");
    return deleted;
}

/**
 * Post a comment on a tutorial
 * @param data comment data
 */
export async function postComment(data: TutorialCommentInsert) {
    await createTutorialComment(data);
    revalidatePath(`/resources/tutorials/${data.slug}`);
}

/**
 * Hide a comment on a tutorial
 * @param data comment data
 */
export async function deleteComment(data: TutorialDeleteComment) {
    await deleteTutorialComment(data);
    revalidatePath(`/resources/tutorials/${data.slug}`);
}
