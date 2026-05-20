import { Card, CardBody, CardFooter, CardHeader } from "@/components/ui/card";
import SignInForm from "@/components/auth/sign-in-form";

/**
 * Props for the SignInPage component.
 */
type Props = {
    searchParams: Promise<{ redirect?: string }>;
};

/**
 * Sign in page component.
 */
export default async function SignInPage({ searchParams }: Props) {
    const params = await searchParams;
    const redirectTo =
        params.redirect?.startsWith("/") && !params.redirect.startsWith("//") ? params.redirect : "/resources";

    return (
        <div className="-mt-16 flex flex-1 flex-col items-center justify-center px-2 py-24">
            <Card className="py-2 sm:w-150 sm:py-10 md:w-175 lg:w-200">
                <CardHeader className="p-4 sm:px-20">
                    <h1 className="text-primary text-2xl sm:text-left">Sign In</h1>
                    <h2 className="text-sm text-gray-500">Sign into your account to join in the discussion</h2>
                </CardHeader>
                <CardBody className="p-4 sm:px-20">
                    <SignInForm redirect={redirectTo} />
                </CardBody>
                <CardFooter className="flex-row justify-center gap-2 pb-4">
                    <p className="text-gray-500">Don&#39;t have an account?</p>
                    <a href="/auth/sign-up" className="font-bold text-blue-600 hover:underline">
                        Sign Up
                    </a>
                </CardFooter>
            </Card>
        </div>
    );
}
