"use server";

import { createTutorialComment, deleteTutorialComment } from "@/lib/services/tutorial-service";
import { TutorialCommentInsert, TutorialDeleteComment } from "@/lib/validators/tutorial";
import { revalidatePath } from "next/cache";

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
