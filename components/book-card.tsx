import { Book } from "@/db/schema";
import Image from "next/image";
import { Card, CardBody, CardFooter, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import Button from "@/components/ui/button";

interface BookCardProps {
    book: Book;
}

async function BookCard({ book }: BookCardProps) {
    return (
        <Card className="w-full max-w-150 items-center overflow-hidden rounded-xl shadow-md shadow-black/50 lg:max-w-115 xl:max-w-150">
            <div className="w-full min-w-1/2 sm:flex lg:block xl:flex">
                {book.cover && (
                    <Image
                        src={book.cover}
                        alt="book cover"
                        width={460}
                        height={620}
                        className="sm:max-w-1/3 lg:max-h-155 lg:min-h-155 lg:max-w-full xl:max-h-67.5 xl:min-h-67.5 xl:max-w-1/3"
                    />
                )}
                <CardHeader className="px-4 py-2 sm:py-4 lg:items-center xl:items-start">
                    <h1 className="text-center text-xl font-bold sm:text-left lg:text-center xl:text-left">
                        {book.title}
                    </h1>
                    <h2>{book.subtitle}</h2>
                    <p className="text-sm text-gray-500">{book.edition}</p>
                    <p>
                        by <b>{book.author}</b>
                    </p>
                    <div className="flex gap-2 pt-1 text-sm font-light text-gray-500 sm:block lg:flex xl:block">
                        <p>
                            Published: {book.publisher} {book.published}
                        </p>
                        <p>ISBN: {book.isbn}</p>
                    </div>
                </CardHeader>
            </div>
            <CardBody>
                {book.description && <p dangerouslySetInnerHTML={{ __html: book.description }} className="px-4 py-2" />}
            </CardBody>
            <CardFooter className="w-full px-4 pt-2 pb-6">
                {book.link && (
                    <Link href={book.link} target="_blank" rel="noopener noreferrer">
                        <Button type="button" className="w-full">
                            {book.obtain ?? "Purchase"}
                        </Button>
                    </Link>
                )}
            </CardFooter>
        </Card>
    );
}

export default BookCard;
