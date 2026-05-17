"use client";

/**
 * SemesterSelector and CourseSelector
 *
 * Client-side filter components used on the Course Materials page.
 *
 * Features:
 * - Updates URL search parameters without a full page reload
 * - Preserves existing query parameters when updating filters
 * - Allows users to filter books by semester and/or course
 * - Uses Next.js App Router navigation hooks
 *
 * Query Parameters:
 * - semester: Selected semester filter
 * - course: Selected course filter
 *
 * Example URLs:
 * /books?semester=1st+Semester
 * /books?course=Programming+Fundamentals
 * /books?semester=2nd+Semester&course=SQL+Database+Programming
 */

import { Select } from "@headlessui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FaChevronDown } from "react-icons/fa";

/**
 * SemesterSelector
 *
 * Dropdown component used to filter books by semester.
 *
 * Props:
 * - selected: Currently selected semester value from the URL
 */
export function SemesterSelector({ selected }: { selected: string | undefined }) {
    // Next.js navigation utilities
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    /**
     * Updates the "semester" query parameter in the URL.
     *
     * Behavior:
     * - Adds the semester parameter when a value is selected
     * - Removes the parameter when "All Semesters" is selected
     * - Preserves all other existing query parameters
     */
    function handleChange(value: string) {
        // Clone existing query parameters
        const params = new URLSearchParams(searchParams);

        if (value) params.set("semester", value);
        else params.delete("semester");

        // Navigate to updated URL
        router.push(`${pathname}?${params.toString()}`);
    }

    return (
        <div className="relative rounded-md border border-gray-300">
            <FaChevronDown className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-gray-400" />
            <Select
                className="text-primary min-w-80 appearance-none p-1 pl-2 outline-none"
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

/**
 * CourseSelector
 *
 * Dropdown component used to filter books by course.
 *
 * Props:
 * - selected: Currently selected course value from the URL
 */
export function CourseSelector({ selected }: { selected: string | undefined }) {
    // Next.js navigation utilities
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    /**
     * Updates the "course" query parameter in the URL.
     *
     * Behavior:
     * - Adds the course parameter when a value is selected
     * - Removes the parameter when "All Courses" is selected
     * - Preserves all other existing query parameters
     */
    function handleChange(value: string) {
        // Clone existing query parameters
        const params = new URLSearchParams(searchParams);

        if (value) params.set("course", value);
        else params.delete("course");

        // Navigate to updated URL
        router.push(`${pathname}?${params.toString()}`);
    }

    return (
        <div className="relative rounded-md border border-gray-300">
            <FaChevronDown className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-gray-400" />
            <Select
                className="text-primary min-w-80 appearance-none py-1 pl-2 outline-none"
                onChange={(e) => handleChange(e.target.value)}
                defaultValue={selected}
            >
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
