"use client";

import FloatingLabelInput from "@/components/ui/floating-label-input";
import { Textarea } from "@headlessui/react";
import { Card, CardBody, CardFooter } from "@/components/ui/card";
import Button from "@/components/ui/button";
import { JSX, useEffect, useRef, useState } from "react";
import { authClient } from "@/lib/auth/auth-client";
import { submitTutorial } from "@/actions/tutorial-actions";
import { useRouter } from "next/navigation";

/**
 * Component for displaying and managing a tutorial submission form.
 * This form allows users to input tutorial details including title, description, content, and tags.
 * Users can preview their submission and submit it for review. Upon submission, a modal dialog confirms success.
 *
 * @return {JSX.Element} A React component that renders the tutorial submission form with interactive fields,
 * a preview button, and submission confirmation dialog.
 */
function TutorialSubmissionForm(): JSX.Element {
    const router = useRouter();
    const { data: session } = authClient.useSession();
    const [loaded, setLoaded] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState("");
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const draft = localStorage.getItem("tutorial_draft");

        if (draft) {
            try {
                const parsed = JSON.parse(draft);

                // eslint-disable-next-line react-hooks/set-state-in-effect
                setTitle(parsed.title ?? "");
                setDescription(parsed.description ?? "");
                setContent(parsed.content ?? "");
                setTags(parsed.tags ?? "");
            } catch (error) {
                console.error(error);
            }
        }

        setLoaded(true);
    }, []);

    useEffect(() => {
        if (!loaded) return;

        localStorage.setItem(
            "tutorial_draft",
            JSON.stringify({
                title,
                description,
                content,
                tags,
            }),
        );
    }, [loaded, title, description, content, tags]);

    const openModal = () => {
        dialogRef.current?.showModal();
    };

    const handlePreview = () => {
        const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());
        const tutorial = {
            title,
            author: session?.user.id || undefined,
            description,
            content,
            tags: tagsArray.length > 0 ? tagsArray : undefined,
            createdAt: new Date(),
        };

        localStorage.setItem("tutorial_preview", JSON.stringify(tutorial));

        window.open("/resources/tutorials/submit/preview", "_blank");
    };

    const handleCancel = () => {
        localStorage.removeItem("tutorial_draft");
        localStorage.removeItem("tutorial_preview");
        router.push("/resources");
    };

    const handleSubmit = async () => {
        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        const tagsArray = tags
            .split(",")
            .map((tag) => tag.trim().toLowerCase())
            .filter(Boolean);

        const tutorial = {
            slug,
            title,
            author: session?.user.id || undefined,
            description,
            content,
            tags: tagsArray.length ? tagsArray : undefined,
        };

        try {
            await submitTutorial(tutorial);
            openModal();
        } catch (error) {
            console.error(error);
            alert("Failed to submit tutorial. Please try again.");
        }
    };

    const handleCloseModal = () => {
        localStorage.removeItem("tutorial_draft");
        localStorage.removeItem("tutorial_preview");
        dialogRef.current?.close();
        router.push("/resources");
    };

    return (
        <Card className="w-full gap-4 p-4 sm:p-8 md:p-12 lg:p-16 xl:p-20">
            <CardBody className="flex flex-col gap-4">
                <FloatingLabelInput
                    label="Title"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <FloatingLabelInput
                    label="Description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <label hidden htmlFor="content">
                    Content
                </label>
                <Textarea
                    name="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Enter your tutorial content here..."
                    className="w-full rounded-md border border-gray-300 p-3 placeholder-gray-400"
                    rows={20}
                />
                <div>
                    <p className="text-sm text-gray-500 italic">
                        * Tag your tutorial according to the topics discussed (comma-separated, eg. &#34;java, asdv,
                        netbeans&#34;)
                    </p>
                    <FloatingLabelInput
                        label="Tags"
                        name="tags"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                    />
                </div>
            </CardBody>
            <CardFooter className="mt-2 flex-row justify-between gap-2">
                <div className="flex gap-2" role="group" aria-label="Submission actions">
                    <Button
                        type="button"
                        onClick={handlePreview}
                        disabled={!session}
                        aria-label="Preview"
                        className="shadow shadow-gray-600"
                    >
                        Preview
                    </Button>
                    <Button
                        type="button"
                        onClick={handleCancel}
                        aria-label="Cancel"
                        className="bg-red-700 shadow shadow-gray-600 hover:bg-red-800"
                    >
                        Cancel
                    </Button>
                </div>
                <Button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!session}
                    aria-label="Submit"
                    className="bg-green-700! shadow shadow-gray-600 hover:bg-green-800"
                >
                    Submit
                </Button>
            </CardFooter>
            <dialog
                ref={dialogRef}
                className="absolute top-1/2 left-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 flex-col gap-4 rounded-lg p-6 shadow-xl backdrop:bg-black/50 backdrop:backdrop-blur-sm open:flex"
            >
                <h2 className="text-primary text-lg font-bold">Submission Successful!</h2>
                <p className="text-sm text-gray-600">
                    Your tutorial has been submitted for review. Please allow up to 48 hours for approval. If there are
                    any questions, concerns, or requested revisions related to your submission, we will contact you
                    using the email address associated with your account. Submitting a tutorial does not guarantee
                    publication. Content may be rejected if it does not meet site guidelines, contains inaccurate
                    information, violates copyright, or is otherwise deemed unsuitable for publication. Thank you for
                    your contribution!
                </p>
                <Button type="button" onClick={handleCloseModal} className="outline-none">
                    OK
                </Button>
            </dialog>
        </Card>
    );
}

export default TutorialSubmissionForm;
