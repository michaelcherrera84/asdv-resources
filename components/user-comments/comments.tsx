import { getTutorialComments } from "@/lib/services/tutorial-service";
import Comment from "@/components/user-comments/comment";
import CommentForm from "@/components/user-comments/comment-form";
import { postComment, deleteComment } from "@/actions/tutorial-actions";

/**
 * Comments component.
 * Displays a list of comments and replies for a specific tutorial.
 * @param slug - The slug of the tutorial.
 */
async function Comments({ slug }: { slug: string }) {
    let comments;

    try {
        comments = await getTutorialComments(slug);
    } catch (error) {
        console.error("Error fetching data:", error);
        return (
            <section>
                <h2 className="py-4 text-lg font-bold">Comments</h2>
                <div>Error loading comments. Please try again later.</div>
            </section>
        );
    }

    return (
        <section className="lg:max-w-2/3">
            <h2 className="py-4 text-lg font-bold">Comments</h2>
            <div className="mb-4">
                <CommentForm slug={slug} postComment={postComment} />
            </div>
            {comments.length > 0 ? (
                comments?.map((comment) => (
                    <Comment
                        key={comment.id}
                        comment={comment}
                        postComment={postComment}
                        deleteComment={deleteComment}
                    />
                ))
            ) : (
                <p className="italic">Be the first to comment on this tutorial!</p>
            )}
        </section>
    );
}

export default Comments;
