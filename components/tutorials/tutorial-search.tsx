"use client";

import { CiSearch } from "react-icons/ci";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function TutorialSearch() {
    const [search, setSearch] = useState<string>("");
    const router = useRouter();

    useEffect(() => {
        const tagsArray = search.split(",").map((tag) => tag.trim());
        const params = new URLSearchParams();
        tagsArray.forEach((tag) => params.append("tags", tag));
        router.push(`/resources/tutorials?${params.toString()}`);
    }, [search, router]);

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
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
        </div>
    );
}

export default TutorialSearch;
