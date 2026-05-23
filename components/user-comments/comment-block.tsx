"use client";

import Image from "next/image";
import Button from "@/components/ui/button";
import { authClient } from "@/lib/auth/auth-client";
import CommentForm from "@/components/user-comments/comment-form";
import { useState } from "react";
import { TutorialCommentInsert, TutorialDeleteComment } from "@/lib/validators/tutorial";

/**
 * Props for the CommentBlock component.
 */
interface CommentHeaderProps {
    // Prop that connects comments to a comment-enabled item (e.g. a tutorial, a blog post, etc.)
    slug: string;
    commentId: string;
    authorId: string;
    imageUrl?: string;
    username: string;
    content: string;
    createdAt: Date;
    // Optional prop to indicate if this is a reply
    isReply?: boolean;
    // Callback method to handle postComment action
    postComment: (data: TutorialCommentInsert) => void;
    // Callback method to handle deleteComment action
    deleteComment: (data: TutorialDeleteComment) => void;
}

/**
 * Comment block component.
 * Displays a comment with author information and reply options.
 */
function CommentBlock({
    slug,
    commentId,
    authorId,
    imageUrl,
    username,
    content,
    createdAt,
    isReply,
    postComment,
    deleteComment,
}: CommentHeaderProps) {
    const { data: session } = authClient.useSession();
    const [replyFormVisible, setReplyFormVisible] = useState<boolean>(false);

    const handleDeleteComment = async () => {
        if (!session?.user) return;

        const data = {
            id: commentId,
            slug,
            authorId: authorId,
            deletedAt: new Date(),
        };

        try {
            deleteComment(data);
        } catch (error) {
            console.error("Error deleting comment:", error);
            alert("Failed to delete comment. Please try again.");
        }
    };

    return (
        <div>
            <div className="flex flex-col text-sm text-gray-500">
                <div className="flex items-center gap-2">
                    {imageUrl ? (
                        <Image src={imageUrl} alt={username} width={25} height={25} className="rounded-full" />
                    ) : (
                        <div className="text-primary flex h-6.25 w-6.25 items-center justify-center rounded-full border bg-gray-200">
                            {username.charAt(0).toUpperCase()}
                        </div>
                    )}
                    <div className="flex flex-wrap gap-x-2">
                        <p>{username}</p> <p>&mdash;</p>
                        <p>
                            {createdAt.toLocaleString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "numeric",
                                minute: "2-digit",
                            })}
                        </p>
                        <div className="flex gap-4 text-xs sm:pl-2">
                            {session?.user.id === authorId && (
                                <Button
                                    className="cursor-pointer bg-transparent p-0! font-normal text-gray-500 hover:text-gray-400 hover:underline"
                                    onClick={handleDeleteComment}
                                >
                                    Delete
                                </Button>
                            )}
                            {!isReply && session?.user && (
                                <Button
                                    className="cursor-pointer bg-transparent p-0! font-normal text-gray-500 hover:text-gray-400 hover:underline"
                                    onClick={() => setReplyFormVisible(!replyFormVisible)}
                                >
                                    {replyFormVisible ? "Cancel" : "Reply"}
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <p className="ml-8 py-3">{content}</p>
            {replyFormVisible && (
                <div className="mt-4 ml-12">
                    <CommentForm
                        slug={slug}
                        replyToId={commentId}
                        onSubmitSuccess={() => setReplyFormVisible(false)}
                        postComment={postComment}
                        autoFocus={true}
                    />
                </div>
            )}
        </div>
    );
}

export default CommentBlock;
