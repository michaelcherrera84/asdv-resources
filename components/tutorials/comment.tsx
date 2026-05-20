import { TutorialCommentWithAuthor, TutorialCommentWithRepliesAndAuthor } from "@/db/schema";

/**
 * Comment component.
 * Displays a comment with replies and author information.
 * @param comment - The comment to display.
 */
async function Comment({ comment }: { comment: TutorialCommentWithRepliesAndAuthor }) {
    return (
        <div>
            {/*<img src={comment.author.image ?? ""} />*/}
            <p>{comment.author.name}</p>
            <p>{comment.content}</p>

            {comment.replies.map((reply: TutorialCommentWithAuthor) => (
                <div key={reply.id} className="pl-8">
                    {/*<img src={reply.author.image ?? ""} />*/}
                    <p>{reply.author.name}</p>
                    <p>{reply.content}</p>
                </div>
            ))}
        </div>
    );
}

export default Comment;
