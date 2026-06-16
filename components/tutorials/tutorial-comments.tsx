import { getTutorialCommentsService } from "@/lib/services/tutorial-service";
import Comment from "@/components/user-comments/comment";
import CommentForm from "@/components/user-comments/comment-form";
import { createTutorialComment, deleteTutorialComment } from "@/actions/tutorial-actions";
import { getSession } from "@/lib/auth/auth";

/**
 * TutorialComments component.
 * Displays a list of comments and replies for a specific tutorial.
 * @param slug - The slug of the tutorial.
 */
async function TutorialComments({ slug }: { slug: string }) {
    const session = await getSession();

    let comments;

    try {
        comments = await getTutorialCommentsService(slug);
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
        <section className="lg:max-w-2/3" id="comments">
            <h2 className="py-4 text-lg font-bold">Comments</h2>
            <div className="mb-4">
                <CommentForm slug={slug} postComment={createTutorialComment} session={session ?? undefined} />
            </div>
            {comments.length > 0 ? (
                comments?.map((comment) => (
                    <Comment
                        session={session ?? undefined}
                        key={comment.id}
                        comment={comment}
                        postComment={createTutorialComment}
                        deleteComment={deleteTutorialComment}
                    />
                ))
            ) : (
                <p className="italic">Be the first to comment on this tutorial!</p>
            )}
        </section>
    );
}

export default TutorialComments;
