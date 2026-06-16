"use client";

import Button from "@/components/ui/button";
import { Tutorial } from "@/db/schema";
import { approveTutorial, deleteTutorial } from "@/actions/tutorial-actions";
import { useRouter } from "next/navigation";
import { JSX } from "react";

/**
 * Renders approval and rejection buttons for a given tutorial, allowing an admin
 * user to approve or reject tutorials with corresponding actions and feedback.
 *
 * @param {Object} props - The properties object.
 * @param {Tutorial} props.tutorial - The tutorial object containing details such as its ID.
 * @return {JSX.Element} A JSX element containing "Approve" and "Reject" buttons with corresponding functionality.
 */
function TutorialApprovalButtons({ tutorial }: { tutorial: Tutorial }): JSX.Element {
    const router = useRouter();

    const handleApprove = async () => {
        try {
            const result = await approveTutorial(tutorial.id);
            if (result.approved) {
                alert("Tutorial approved successfully!");
                router.refresh();
            } else {
                alert("Failed to approve tutorial. Please try again.");
            }
        } catch (error) {
            console.error("Error approving tutorial:", error);
            if (error instanceof Error) alert("Failed to approve tutorial: " + error.message);
        }
    };

    const handleReject = async () => {
        try {
            const deleted = await deleteTutorial(tutorial.id);
            if (deleted) {
                alert("Tutorial rejected successfully!");
                router.push("/admin/tutorials/approve");
            } else {
                alert("Failed to reject tutorial. Please try again.");
            }
        } catch (error) {
            console.error("Error rejecting tutorial:", error);
            if (error instanceof Error) alert("Failed to reject tutorial: " + error.message);
        }
    };

    return (
        <div className="flex justify-end gap-4">
            <Button className="bg-red-700 shadow shadow-gray-600 hover:bg-red-800" onClick={handleReject}>
                Reject
            </Button>
            <Button className="bg-green-700! shadow shadow-gray-600 hover:bg-green-800" onClick={handleApprove}>
                Approve
            </Button>
        </div>
    );
}

export default TutorialApprovalButtons;
