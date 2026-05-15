import BookCard from "@/components/books/book-card";
import Link from "next/link";
import { SemesterSelector, CourseSelector } from "@/components/books/semester-selector";
import { getBooks } from "@/lib/services/book-service";

type BooksProps = {
    searchParams: Promise<{
        semester?: string;
        course?: string;
    }>;
};

async function BooksPage({ searchParams }: BooksProps) {
    const params = await searchParams;
    const semester = params.semester;
    const course = params.course;

    const allBooks = await getBooks();

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
                    <CourseSelector />
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
