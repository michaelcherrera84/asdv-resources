import { getSession } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Button from "@/components/ui/button";
import { JSX } from "react";

/**
 * Renders the Tutorial Submission Guidelines page, which outlines the steps and information required for users to submit
 * a tutorial to the ASDV Resources platform. Includes detailed instructions on submission requirements, content
 * formatting, and the review process.
 *
 * @return {Promise<JSX.Element>} The rendered JSX for the Tutorial Submission Guidelines page, including sections for required
 * information, tutorial writing tips, image and video inclusion, the submission review process, and suggestions for
 * faster approval.
 */
async function TutorialSubmissionGuidelinesPage(): Promise<JSX.Element> {
    const session = await getSession();

    if (!session || !session.user) {
        redirect("/sign-in?redirect=/resources/tutorials/submit");
    }

    return (
        <main className="px-2 py-12 sm:px-6 md:px-10 lg:px-14 xl:px-20">
            <article className="flex flex-col gap-8">
                <h1 className="text-primary text-center text-2xl font-bold">Tutorial Submission Guidelines</h1>
                <p>
                    Thank you for contributing to ASDV Resources! Before submitting your tutorial, please review the
                    following guidelines to help ensure your content can be reviewed and approved quickly.
                </p>
                <section className="flex flex-col gap-4">
                    <h2 className="text-primary text-lg font-bold">Required Information</h2>
                    <div className="flex flex-col gap-1">
                        <p>Every tutorial submission must include:</p>
                        <ul className="list-disc pl-6">
                            <li>
                                <strong>Title</strong> — A clear and descriptive title.
                            </li>
                            <li>
                                <strong>Description</strong> — A brief summary of what readers will learn.
                            </li>
                            <li>
                                <strong>Tags</strong> — Relevant tags that help users discover your content.
                            </li>
                        </ul>
                    </div>
                    <p>
                        Choose tags that accurately reflect the technologies, concepts, or tools covered in your
                        tutorial.
                    </p>
                </section>
                <hr />
                <section className="flex flex-col gap-4">
                    <h2 className="text-primary text-lg font-bold">Writing Your Tutorial</h2>
                    <p>
                        Tutorial content is entered as plain text with <strong>Markdown</strong> support.
                    </p>
                    <div className="flex flex-col gap-1">
                        <p>Markdown allows you to create:</p>
                        <ul className="list-disc pl-6">
                            <li>Headings</li>
                            <li>Lists</li>
                            <li>Links</li>
                            <li>Images</li>
                            <li>Code blocks</li>
                            <li>Blockquotes</li>
                            <li>Tables</li>
                            <li>and more!</li>
                        </ul>
                    </div>
                    <p>
                        If you&#39;re new to Markdown, the Markdown Guide provides an excellent introduction:
                        <br />
                        <Link
                            href="https://www.markdownguide.org/getting-started/?utm_source=chatgpt.com"
                            target="_blank"
                            className="text-blue-600 underline"
                        >
                            Markdown Guide - Getting Started
                        </Link>
                    </p>
                </section>
                <hr />
                <section className="flex flex-col gap-4">
                    <h2 className="text-primary text-lg font-bold">Including Images</h2>
                    <p>ASDV Resources does not currently provide image hosting.</p>
                    <p>
                        If you would like to include images in your tutorial, you will need to host them yourself and
                        reference them using Markdown image syntax.
                    </p>
                    <p>
                        A popular option is Cloudinary, which offers a free plan with generous usage limits for most
                        educational and personal projects. Cloudinary’s free tier can be used indefinitely as long as
                        usage remains within the plan limits.
                    </p>
                    <p>
                        You can create a free account here:
                        <br />
                        <Link href="https://cloudinary.com" target="_blank" className="text-blue-600 underline">
                            Cloudinary
                        </Link>
                    </p>
                </section>
                <hr />
                <section className="flex flex-col gap-4">
                    <h2 className="text-primary text-lg font-bold">Including Videos</h2>
                    <p>
                        You may embed YouTube videos in your tutorial using an iframe when appropriate. Embedded videos
                        should be relevant to the content and provide additional educational value.
                    </p>
                </section>
                <hr />
                <section className="flex flex-col gap-4">
                    <h2 className="text-primary text-lg font-bold">Review and Approval Process</h2>
                    <p>All tutorial submissions are reviewed before being published.</p>
                    <p>
                        Please allow up to <strong>48 hours</strong> for review and approval.
                    </p>
                    <p>
                        If there are any questions, concerns, or requested revisions related to your submission, we will
                        contact you using the email address associated with your account.
                    </p>
                    <p>
                        Submitting a tutorial does not guarantee publication. Content may be rejected if it does not
                        meet site guidelines, contains inaccurate information, violates copyright, or is otherwise
                        deemed unsuitable for publication.
                    </p>
                </section>
                <hr />
                <section className="flex flex-col gap-4">
                    <h2 className="text-primary text-lg font-bold">Tips for Faster Approval</h2>
                    <ul className="list-disc pl-6">
                        <li>Use a clear, descriptive title.</li>
                        <li>Include a concise summary of the tutorial.</li>
                        <li>Add accurate and relevant tags.</li>
                        <li>Format content using Markdown for readability.</li>
                        <li>Verify that links, images, and embedded videos work correctly.</li>
                        <li>Proofread for spelling, grammar, and technical accuracy.</li>
                    </ul>
                    <p>
                        We appreciate your contribution to the ASDV Resources community and look forward to reviewing
                        your tutorial!
                    </p>
                </section>
            </article>
            <div className="flex justify-center pt-8">
                <Link href="/resources/tutorials/submit/form">
                    <Button className="shadow shadow-gray-600">Acknowledge and Continue</Button>
                </Link>
            </div>
        </main>
    );
}

export default TutorialSubmissionGuidelinesPage;
