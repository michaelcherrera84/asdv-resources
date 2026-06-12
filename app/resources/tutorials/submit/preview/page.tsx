"use client";

import Tutorial from "@/components/tutorials/tutorial";
import { TutorialPreview } from "@/lib/validators/tutorial";
import { JSX, useEffect, useState } from "react";

/**
 * Renders the tutorial preview page by loading and parsing data from localStorage. If no data is found
 * or an error occurs during parsing, an error is displayed. Otherwise, displays the tutorial preview.
 *
 * @return {JSX.Element} A JSX element that displays the tutorial preview or an appropriate error/loading message.
 */
function TutorialPreviewPage(): JSX.Element {
    const [tutorial, setTutorial] = useState<TutorialPreview | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        try {
            const rawData = localStorage.getItem("tutorial_preview");
            console.log("Raw data:", rawData);

            if (!rawData) {
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setError("No preview data found. Please return to the editor.");
                return;
            }

            const parsedData: TutorialPreview = JSON.parse(rawData);

            if (parsedData.createdAt) {
                parsedData.createdAt = new Date(parsedData.createdAt);
            }

            setTutorial(parsedData);
        } catch (error) {
            console.error("Error parsing preview data:", error);
            setError("Failed to parse preview data.");
        }
    }, []);

    if (error) {
        throw new Error(error);
    }

    if (!tutorial) {
        return <div className="p-6 text-gray-500">Loading preview...</div>;
    }

    return (
        <main className="px-4 py-12 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
            <Tutorial tutorial={tutorial} />
        </main>
    );
}

export default TutorialPreviewPage;
