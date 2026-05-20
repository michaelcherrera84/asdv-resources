/**
 * BooksPage
 *
 * Displays a searchable and filterable list of course materials used in the
 * Application Software Development (ASDV) program.
 *
 * Features:
 * - Retrieves all books from the database/service layer
 * - Filters books by semester and/or course using URL search parameters
 * - Provides UI controls for selecting semesters and courses
 * - Renders matching books in a responsive card grid
 *
 * URL Search Parameters:
 * - semester: Filters books assigned to a specific semester
 * - course: Filters books assigned to a specific course
 *
 * Example:
 * /books?semester=1st%20Semester
 * /books?course=Information+Technology+Infrastructure
 * /books?semester=1st+Semester&course=Information+Technology+Infrastructure
 */

import BookCard from "@/components/books/book-card";
import Link from "next/link";
import { SemesterSelector, CourseSelector } from "@/components/books/semester-selector";
import { getBooks } from "@/lib/services/book-service";

/**
 * Props passed to the BooksPage component by Next.js.
 *
 * searchParams is provided automatically for App Router pages and contains
 * query string values from the current URL.
 */
type BooksProps = {
    searchParams: Promise<{
        // Optional semester filter used to display books associated with a specific semester.
        semester?: string;
        // Optional course filter used to display books associated with a specific course.
        course?: string;
    }>;
};

/**
 * Server component responsible for rendering the course materials page.
 *
 * Workflow:
 * 1. Read search parameters from the URL
 * 2. Retrieve all books from the service layer
 * 3. Filter books based on semester/course selections
 * 4. Render informational content, filter controls, and matching books
 */
async function BooksPage({ searchParams }: BooksProps) {
    // Resolve query string parameters from the URL
    const params = await searchParams;

    // Extract selected filters
    const semester = params.semester;
    const course = params.course;

    let allBooks;
    try {
        // Retrieve all available books
        allBooks = await getBooks();
    } catch (error) {
        console.error("Error fetching books:", error);
        throw new Error("Failed to fetch books");
    }

    /**
     * Filter books based on selected semester and course.
     *
     * Rules:
     * - If no semester is selected, all semesters match
     * - If no course is selected, all courses match
     * - A book must satisfy BOTH filters to be included
     */
    const bookList = allBooks.filter((book) => {
        const matchesSemester = !semester || book.semesters?.includes(semester);
        const matchesCourse = !course || book.courses?.includes(course);
        return matchesSemester && matchesCourse;
    });

    return (
        <main className="flex flex-col items-center justify-center gap-4 px-2 py-10 2xl:px-4">
            <h1 className="text-primary text-center text-2xl font-bold">Course Materials</h1>
            <div className="flex flex-col gap-4 text-center text-xs text-gray-500 sm:px-4 md:max-w-2xl 2xl:max-w-250">
                <p>
                    This is a list of books you may use in the&nbsp;
                    <Link
                        href="https://www.solacc.edu/academics/programs-offered/application-software-development/index"
                        className="underline"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        ASDV
                    </Link>
                    &nbsp;program. Check your syllabus for the specific version required for your course. Many of these
                    can be purchased through the college
                    <Link
                        href="https://www.bkstr.com/southlouisianaccstore/home"
                        className="underline"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        &nbsp;book store
                    </Link>
                    . However, some are no longer available for purchase from official bookstores. Check with your
                    instructor or discussion group for assistance obtaining these books.
                </p>
                <div className="flex w-fit flex-col gap-1 self-center lg:flex-row">
                    <SemesterSelector selected={semester} />
                    <CourseSelector selected={course} />
                </div>
            </div>
            <div className="grid auto-rows-fr grid-cols-1 gap-4 py-4 lg:grid-cols-2 2xl:grid-cols-3">
                {bookList.map((book) => (
                    <BookCard book={book} key={book.isbn} />
                ))}
            </div>
        </main>
    );
}

export default BooksPage;
