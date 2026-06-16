import { TutorialCommentWithAuthor, TutorialCommentWithRepliesAndAuthor } from "@/db/schema";
import CommentBlock from "@/components/user-comments/comment-block";
import { TutorialCommentInsert, TutorialDeleteComment } from "@/lib/validators/tutorial";
import { deleteTutorialComment } from "@/actions/tutorial-actions";
import { Session } from "@/lib/auth/auth";

/**
 * Props for the Comment component.
 */
interface CommentProps {
    session?: Session;
    comment: TutorialCommentWithRepliesAndAuthor;
    // Callback method to handle postComment action
    postComment: (data: TutorialCommentInsert) => void;
    // Callback method to handle deleteComment action
    deleteComment: (data: TutorialDeleteComment) => void;
}

/**
 * Comment component.
 * Displays a comment with replies and author information.
 *
 * @param session - The current user's session.'
 * @param comment - The comment to display.
 * @param postComment - Callback function to post a new comment.
 */
function Comment({ session, comment, postComment }: CommentProps) {
    return (
        <div>
            <div className="py-4">
                {comment.deletedAt ? (
                    <p className="my-2 w-fit rounded bg-gray-300 px-2 italic">[deleted comment]</p>
                ) : (
                    <div>
                        <CommentBlock
                            session={session}
                            commentId={comment.id}
                            authorId={comment.authorId}
                            slug={comment.slug}
                            userName={comment.author.name ?? "[deleted user]"}
                            username={comment.author.username ?? "#"}
                            content={comment.content}
                            createdAt={comment.createdAt}
                            imageUrl={comment.author.image ?? undefined}
                            postComment={postComment}
                            deleteComment={deleteTutorialComment}
                        />
                    </div>
                )}
            </div>

            {comment.replies.map((reply: TutorialCommentWithAuthor) => (
                <div key={reply.id}>
                    {reply.deletedAt ? (
                        <p className="my-2 ml-8 w-fit rounded bg-gray-300 px-2 italic">[deleted reply]</p>
                    ) : (
                        <div className="ml-12">
                            <CommentBlock
                                session={session}
                                commentId={reply.id}
                                authorId={reply.authorId}
                                slug={reply.slug}
                                userName={reply.author.name ?? "[deleted user]"}
                                username={reply.author.username ?? "#"}
                                content={reply.content}
                                createdAt={reply.createdAt}
                                imageUrl={reply.author.image ?? undefined}
                                isReply
                                postComment={postComment}
                                deleteComment={deleteTutorialComment}
                            />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default Comment;
