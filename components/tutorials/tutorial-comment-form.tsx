"use client";

import { Textarea } from "@headlessui/react";
import { authClient } from "@/lib/auth/client";
import Button from "@/components/ui/button";
import { useState } from "react";
import { postComment } from "@/actions/tutorial-actions";

interface TutorialCommentProps {
    tutorialSlug: string;
    replyToId?: string;
}

function TutorialCommentForm({ tutorialSlug, replyToId }: TutorialCommentProps) {
    const [commentContent, setCommentContent] = useState("");
    const { data: session } = authClient.useSession();
    if (!session?.user) return null;

    const handleCommentSubmit = async () => {
        if (!commentContent.trim()) return;

        const comment = {
            tutorialSlug,
            authorId: session.user.id,
            replyToId,
            content: commentContent,
        };

        try {
            await postComment(comment);
        } catch (error) {
            alert("Failed to post comment. Please try again.");
            console.error("Error posting comment:", error);
        }

        setCommentContent("");
    };

    return (
        <div className="flex flex-col gap-2">
            <Textarea
                value={commentContent}
                rows={3}
                className="w-full rounded-lg border-none bg-gray-100 p-4 text-gray-800 placeholder-gray-500 shadow-inner 2xl:max-w-2/3"
                onChange={(e) => setCommentContent(e.target.value)}
            />
            <Button className="my-2 w-fit" onClick={handleCommentSubmit}>
                Post Comment
            </Button>
        </div>
    );
}

export default TutorialCommentForm;
