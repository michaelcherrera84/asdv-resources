"use client";

import Button from "@/components/ui/button";
import Link from "next/link";
import { Card, CardBody, CardFooter, CardHeader } from "@/components/ui/card";
import Image from "next/image";

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
    return (
        <div className="flex h-full min-h-screen items-center justify-center px-4 py-12">
            <Card className="w-full max-w-4xl gap-4">
                <Image src="/images/asdv-resources-og.png" alt="Logo" width={1200} height={630} />
                <CardHeader className="items-center! p-4">
                    <h1 className="text-2xl text-red-800">Oh no!</h1>
                    <h2 className="text-primary text-lg">Something went wrong!</h2>
                </CardHeader>
                <CardBody className="items-center bg-red-200 p-4">
                    <p className="text-red-800">{error.message}</p>
                </CardBody>
                <CardFooter className="items-center pt-8 pb-10">
                    <Link href="/resources">
                        <Button>Return to Resources Dashboard</Button>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}
