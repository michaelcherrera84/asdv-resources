"use server";

import { createTutorialComment } from "@/lib/services/tutorial-service";
import { TutorialCommentInsert } from "@/lib/validators/tutorial";
import { revalidatePath } from "next/cache";

export async function postComment(data: TutorialCommentInsert) {
    await createTutorialComment(data);
    revalidatePath(`/resources/tutorials/${data.tutorialSlug}`);
}
