"use client";

import { Select } from "@headlessui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function SemesterSelector({ selected }: { selected: string | undefined }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    function handleChange(value: string) {
        const params = new URLSearchParams(searchParams);

        if (value) params.set("semester", value);
        else params.delete("semester");

        router.push(`${pathname}?${params.toString()}`);
    }

    return (
        <div className="rounded-md border border-gray-300">
            <Select
                className="text-primary min-w-80"
                onChange={(e) => handleChange(e.target.value)}
                defaultValue={selected}
            >
                <option value="">All Semesters</option>
                <option value="1st Semester">1st Semester</option>
                <option value="2nd Semester">2nd Semester</option>
                <option value="3rd Semester">3rd Semester</option>
                <option value="4th Semester">4th Semester</option>
            </Select>
        </div>
    );
}

export function CourseSelector() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    function handleChange(value: string) {
        const params = new URLSearchParams(searchParams);

        if (value) params.set("course", value);
        else params.delete("course");

        router.push(`${pathname}?${params.toString()}`);
    }

    return (
        <div className="rounded-md border border-gray-300">
            <Select className="text-primary min-w-80" onChange={(e) => handleChange(e.target.value)}>
                <option value="">All Courses</option>
                <option value="Information Technology Infrastructure">Information Technology Infrastructure</option>
                <option value="Programming Fundamentals">Programming Fundamentals</option>
                <option value="C-sharp Programming">C# Programming</option>
                <option value="Web Applications Development I">Web Applications Development I</option>
                <option value="Advanced Programming Language I">Advanced Programming Language I</option>
                <option value="SQL Database Programming">SQL Database Programming</option>
                <option value="Data Structures and Algorithms">Data Structures and Algorithms</option>
                <option value="Advanced SQL Programming">Advanced SQL Programming</option>
                <option value="Web Applications Development II">Web Applications Development II</option>
                <option value="C-plus-plus Programming">C++ Programming</option>
                <option value="Mobile Computing for Android">Mobile Computing for Android</option>
                <option value="Web App Development III">Web App Development III</option>
            </Select>
        </div>
    );
}
