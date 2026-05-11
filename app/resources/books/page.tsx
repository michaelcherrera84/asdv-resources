import BookCard from "../../../components/book-card";
import { db } from "@/db";
import { books } from "@/db/schema";
import Link from "next/link";

type BooksProps = {
    searchParams: Promise<{
        semester?: string;
        course?: string;
    }>;
};

async function Books({ searchParams }: BooksProps) {
    const params = await searchParams;
    const semester = params.semester;
    const course = params.course;

    const allBooks = await db.select().from(books).orderBy(books.semesters, books.courses, books.title);

    return (
        <main className="flex flex-col items-center justify-center gap-4 px-2 py-10 2xl:px-4">
            <h1 className="text-primary text-center text-2xl font-bold">Course Materials</h1>
            <div className="flex flex-col gap-2 text-xs text-gray-500 sm:px-4 md:max-w-2xl 2xl:max-w-250">
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
            </div>
            <div className="grid grid-cols-1 gap-4 py-4 lg:grid-cols-2 2xl:grid-cols-3">
                {allBooks.map((book) => (
                    <BookCard book={book} key={book.isbn} />
                ))}
            </div>
        </main>
    );
}

export default Books;
