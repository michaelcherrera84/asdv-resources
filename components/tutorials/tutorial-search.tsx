"use client";

import { CiSearch } from "react-icons/ci";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { JSX } from "react";

/**
 * A React component that provides a search input for filtering tutorials by tags.
 * Users can enter a comma-separated list of tags to filter topics,
 * which updates the URL's query parameters after a debounce period.
 *
 * @return {JSX.Element} A JSX element containing a search input field with a debounced search functionality.
 */
function TutorialSearch(): JSX.Element {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const handleSearch = useDebouncedCallback((search: string) => {
        const params = new URLSearchParams(searchParams);

        const cleanTags = search
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag !== "")
            .join(",");

        if (cleanTags) {
            params.set("tags", cleanTags);
        } else {
            params.delete("tags");
        }

        router.replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <div className="my-2 flex justify-end">
            <div className="flex items-center gap-2 rounded-md border border-gray-300 p-2">
                <CiSearch />
                <input
                    placeholder="Search Topics (e.g. Java, NetBeans, etc.)"
                    id="search"
                    name="search"
                    className="rounded-md outline-none"
                    size={35}
                    onChange={(e) => handleSearch(e.target.value)}
                />
            </div>
        </div>
    );
}

export default TutorialSearch;
