"use client";

import { Textarea } from "@headlessui/react";
import { authClient } from "@/lib/auth/auth-client";
import Button from "@/components/ui/button";
import { useState } from "react";
import { TutorialCommentInsert } from "@/lib/validators/tutorial";

/**
 * Props for the CommentForm component.
 */
interface CommentProps {
    slug: string;
    replyToId?: string;
    autoFocus?: boolean;
    // Callback method to handle successful comment submission (e.g. hide the reply form)
    onSubmitSuccess?: () => void;
    // Callback method to handle postComment action
    postComment: (data: TutorialCommentInsert) => void;
}

/**
 * Comment form component.
 * Allows users to post comments or reply to existing comments.
 */
function CommentForm({ slug, replyToId, autoFocus = false, onSubmitSuccess, postComment }: CommentProps) {
    const [commentContent, setCommentContent] = useState("");
    const { data: session } = authClient.useSession();

    if (!session?.user) return null;

    const handleCommentSubmit = async () => {
        if (!commentContent.trim()) return;

        const comment = {
            slug,
            authorId: session.user.id,
            replyToId,
            content: commentContent,
        };

        try {
            postComment(comment);
        } catch (error) {
            alert("Failed to post comment. Please try again.");
            console.error("Error posting comment:", error);
        }

        setCommentContent("");
        onSubmitSuccess?.();
    };

    return (
        <div className="flex flex-col gap-2">
            <Textarea
                value={commentContent}
                rows={3}
                className="w-full rounded-lg border-none bg-gray-100 p-4 text-gray-800 placeholder-gray-500 shadow-inner"
                onChange={(e) => setCommentContent(e.target.value)}
                autoFocus={autoFocus}
            />
            <Button className="my-2 w-fit shadow shadow-gray-600" onClick={handleCommentSubmit}>
                {replyToId ? "Reply" : "Post Comment"}
            </Button>
        </div>
    );
}

export default CommentForm;
