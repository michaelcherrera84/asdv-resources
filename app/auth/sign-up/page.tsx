import Link from "next/link";
import { Card, CardBody, CardFooter, CardHeader } from "@/components/ui/card";
import SignUpForm from "@/components/auth/sign-up-form";

/**
 * Sign up page component.
 */
export default function SignUpPage() {
    return (
        <div className="-mt-16 flex flex-1 flex-col items-center justify-center px-2 py-24">
            <Card className="py-2 sm:w-150 sm:py-10 md:w-175 lg:w-200">
                <CardHeader className="p-4 sm:px-20">
                    <h1 className="text-primary text-2xl sm:text-left">Sign Up</h1>
                    <h2 className="text-sm text-gray-500">Create your free account now to join in the discussion</h2>
                </CardHeader>
                <CardBody className="p-4 sm:px-20">
                    <SignUpForm />
                </CardBody>
                <CardFooter className="flex flex-row justify-center gap-2 pb-4">
                    <p className="text-gray-500">Already have an account?</p>
                    <Link href="/auth/sign-in" className="font-bold text-blue-600 hover:underline">
                        Sign In
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}
