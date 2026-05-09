"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth/client";
import { CircleXIcon } from "lucide-react";
import FloatingLabelInput from "@/app/components/floating-label-input";
import Link from "next/link";

/**
 * Sign in form component.
 *
 * Responsibilities:
 * - Collect user credentials
 * - Submit credentials to the authentication client\
 * - Display authentication errors
 * - Redirect authenticated users to the resources page
 */
export default function SignInForm() {
    // Next.js router instance used for navigation and refreshing server-rendered data.
    const router = useRouter();
    // Stores authentication or submission errors.
    const [error, setError] = useState<string | null>(null);
    // Tracks whether the form submission is currently running.
    // Used to disable the Submit button during form submission to prevent multiple submissions.
    const [isPending, setIsPending] = useState(false);

    /**
     * Handles form submission.
     *
     * Flow:
     * 1. Clear previous errors
     * 2. Set loading state
     * 3. Submit credentials to an auth provider
     * 4. Handle authentication errors
     * 5. Refresh session data
     * 6. Redirect authenticated user
     *
     * @param formData - The form data containing user credentials.
     */
    async function handleSubmit(formData: FormData) {
        setError(null);
        // Enable pending/loading state.
        setIsPending(true);

        try {
            /**
             * Attempt email/password authentication.
             *
             * FormData values are cast to strings because FormData.get() returns FormDataEntryValue | null.
             */
            const result = await authClient.signIn.email({
                email: formData.get("email") as string,
                password: formData.get("password") as string,
            });

            // Handle authentication failure and display the returned error message when available.
            if (result.error) {
                setError(result.error.message ?? "Sign in failed. Please check your credentials and try again.");
                return;
            }
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
                setIsPending(false);
                return;
            }

            setError("An unexpected error occurred. Please try again later.");
            setIsPending(false);
            return;
        }

        // Disable loading state after request completes.
        setIsPending(false);

        // Refresh server-rendered session data.
        // Important because authentication state may affect layouts, navigation, or protected pages.
        router.refresh();

        // Redirect authenticated user to the resources page.
        // replace() prevents returning to the sign-in page when using the browser back button.
        router.replace("/resources");
    }

    return (
        <div className="-mt-12 flex flex-1 flex-col items-center justify-center px-2">
            {/* Sign in form container */}
            <div className="mt-24 mb-1 flex w-full flex-col rounded-lg py-2 shadow-lg inset-shadow-sm sm:py-10 md:max-w-175 lg:max-w-200">
                <form action={handleSubmit} className="flex flex-1 flex-col">
                    {/* Sign in form header */}
                    <div className="flex flex-col items-center justify-end gap-2 px-4 py-4 sm:items-start sm:px-20">
                        <h1 className="text-primary text-2xl sm:text-left">Sign In</h1>
                        <h2 className="text-sm text-gray-500">Sign into your account to join in the discussion</h2>
                    </div>

                    {/* Sign in form body */}
                    <div className="flex flex-1 flex-col justify-center gap-6 px-4 py-4 sm:px-20">
                        {error /* Display authentication error message */ && (
                            <div className="relative rounded-lg bg-red-200 py-2 pr-2 pl-10 text-red-700 shadow-xs inset-shadow-xs shadow-red-600 inset-shadow-red-300">
                                <CircleXIcon className="absolute top-[50%] left-2 -translate-y-1/2" />
                                {error}
                            </div>
                        )}

                        {/* Email input field */}
                        <FloatingLabelInput id="email" name="email" label="Email" type="email" required />

                        {/* Password input field */}
                        <FloatingLabelInput id="password" name="password" label="password" type="password" required />

                        {/* Submit button */}
                        <button
                            type="submit"
                            disabled={isPending}
                            className="bg-secondary text-primary rounded-md p-2 font-bold"
                        >
                            {isPending ? "Signing In..." : "Sign In"}
                        </button>

                        {/* Sign in form footer */}
                        <div className="flex justify-center gap-2">
                            <p className="text-gray-500">Don&#39;t have an account?</p>
                            <Link href="/auth/sign-up" className="font-bold text-blue-600 hover:underline">
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
