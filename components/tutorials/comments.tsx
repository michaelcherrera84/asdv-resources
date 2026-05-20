import { getTutorialComments } from "@/lib/services/tutorial-service";
import TutorialCommentForm from "@/components/tutorials/tutorial-comment-form";
import Comment from "@/components/tutorials/comment";

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
        <section>
            <h2 className="py-4 text-lg font-bold">Comments</h2>
            <TutorialCommentForm tutorialSlug={slug} />
            {comments ? (
                comments?.map((comment) => <Comment key={comment.id} comment={comment} />)
            ) : (
                <p>Be the first comment on this tutorial!</p>
            )}
        </section>
    );
}

export default Comments;
