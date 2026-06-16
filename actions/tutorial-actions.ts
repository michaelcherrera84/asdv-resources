"use server";

import {
    approveTutorialService,
    createTutorialService,
    createTutorialCommentService,
    deleteTutorialService,
    deleteTutorialCommentService,
    getTutorialAuthorService,
} from "@/lib/services/tutorial-service";
import { TutorialCommentInsert, TutorialDeleteComment, TutorialInsert } from "@/lib/validators/tutorial";
import { revalidatePath } from "next/cache";

/**
 * Get the author of a tutorial
 * @param id tutorial id
 */
export async function getTutorialAuthor(id: string) {
    return await getTutorialAuthorService(id);
}

/**
 * Submit a new tutorial
 * @param data tutorial data
 */
export async function submitTutorial(data: TutorialInsert) {
    await createTutorialService(data);
}

/**
 * Approve a tutorial
 * @param id tutorial id
 */
export async function approveTutorial(id: string) {
    return await approveTutorialService(id);
}

/**
 * Remove a tutorial
 * @param id tutorial id
 */
export async function deleteTutorial(id: string) {
    const deleted = await deleteTutorialService(id);
    revalidatePath("/resources/tutorials");
    revalidatePath("/admin/tutorials/approve");
    return deleted;
}

/**
 * Post a comment on a tutorial
 * @param data comment data
 */
export async function createTutorialComment(data: TutorialCommentInsert) {
    await createTutorialCommentService(data);
    revalidatePath(`/resources/tutorials/${data.slug}`);
}

/**
 * Hide a comment on a tutorial
 * @param data comment data
 */
export async function deleteTutorialComment(data: TutorialDeleteComment) {
    await deleteTutorialCommentService(data);
    revalidatePath(`/resources/tutorials/${data.slug}`);
}
