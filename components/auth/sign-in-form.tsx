"use client";

import { BsXCircle } from "react-icons/bs";
import FloatingLabelInput from "@/components/ui/floating-label-input";
import Button from "@/components/ui/button";
import { authClient } from "@/lib/auth/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

/**
 * Sign in form component.
 *
 * Responsibilities:
 * - Collect user credentials
 * - Submit credentials to the authentication client\
 * - Display authentication errors
 * - Redirect authenticated users to the resources page
 */
function SignInForm() {
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
        <form action={handleSubmit} className="flex flex-col gap-4">
            {/* Display authentication error message */}
            {error && (
                <div className="relative rounded-lg bg-red-200 py-2 pr-2 pl-10 text-red-700 shadow-xs inset-shadow-xs shadow-red-600 inset-shadow-red-300">
                    <BsXCircle className="absolute top-[50%] left-2 -translate-y-1/2" />
                    {error}
                </div>
            )}

            <FloatingLabelInput id="email" name="email" label="Email" type="email" required />

            <FloatingLabelInput id="password" name="password" label="password" type="password" required />

            <Button type="submit" disabled={isPending} className="bg-secondary text-primary">
                {isPending ? "Signing In..." : "Sign In"}
            </Button>
        </form>
    );
}

export default SignInForm;
