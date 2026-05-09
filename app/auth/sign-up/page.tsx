"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth/client";
import FloatingLabelInput from "@/app/components/floating-label-input";
import { CircleXIcon } from "lucide-react";
import Link from "next/link";

/**
 * Sign up form component.
 *
 * Responsibilities:
 * - Collect new user registration data
 * - Submit credentials to the authentication provider
 * - Display validation or authentication errors
 * - Redirect newly authenticated users
 */
export default function SignUpForm() {
    // Next.js router instance used for navigation and refreshing server-rendered data.
    const router = useRouter();
    // Stores authentication or submission errors.
    const [error, setError] = useState<string | null>(null);
    // Tracks whether the form submission is currently running.
    // Used to disable the Submit button during form submission to prevent multiple submissions.
    const [isPending, setIsPending] = useState(false);

    /**
     * Handles account registration form submission.
     *
     * Flow:
     * 1. Read form values
     * 2. Validate required fields
     * 3. Submit a registration request
     * 4. Handle authentication errors
     * 5. Refresh session-aware UI
     * 6. Redirect authenticated user
     *
     * @param formData - The form data containing user registration details.
     */
    async function handleSubmit(formData: FormData) {
        // Clear previous errors and enable loading state.
        setError(null);
        setIsPending(true);

        // Retrieve name from submitted form data.
        const name = formData.get("name") as string;

        // Validate name field.
        if (!name) {
            setError("You must enter your name.");
            // Disable loading state if validation fails.
            setIsPending(false);
            return;
        }

        // Retrieve email from submitted form data.
        const email = formData.get("email") as string;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        // Validate email field.
        if (!email) {
            setError("You must enter an email address.");
            // Disable loading state if validation fails.
            setIsPending(false);
            return;
        }

        // Validate email format.
        if (!emailRegex.test(email)) {
            setError("Invalid email address.");
            // Disable loading state if validation fails.
            setIsPending(false);
            return;
        }

        // Retrieve password and confirm password from submitted form data.
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;
        const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*\-+=_])/;

        // Validate password fields.
        if (!password || !confirmPassword) {
            setError("You must enter a password.");
            // Disable loading state if validation fails.
            setIsPending(false);
            return;
        }

        // Validate password confirmation.
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            // Disable loading state if validation fails.
            setIsPending(false);
            return;
        }

        // Validate password strength.
        if (password.length < 8 || !passwordRegex.test(password)) {
            setError(
                "Password must be at least 8 characters long and contain at least one uppercase letter, one number, and one special character.",
            );
            // Disable loading state if validation fails.
            setIsPending(false);
            return;
        }

        try {
            /**
             * Submit a registration request to an authentication provider.
             *
             * Creates a new user account using:
             * - name
             * - email
             * - password
             */
            const result = await authClient.signUp.email({
                email,
                password,
                name,
            });

            if (result.error) {
                setError(result.error.message ?? "Failed to create account");
                // Disable loading state if registration fails.
                setIsPending(false);
                return;
            }
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
                // Disable loading state if registration fails.
                setIsPending(false);
                return;
            }

            setError("An unexpected error occurred. Please try again later.");
            // Disable loading state if registration fails.
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
            {/* Sign up form container */}
            <div className="mt-24 mb-1 flex w-full flex-col rounded-lg py-2 shadow-lg inset-shadow-sm sm:py-10 md:max-w-175 lg:max-w-200">
                <form action={handleSubmit} className="flex flex-1 flex-col">
                    {/* Sign up form header */}
                    <div className="flex flex-col items-center justify-end gap-2 px-4 py-4 sm:items-start sm:px-20">
                        <h1 className="text-primary text-2xl sm:text-left">Sign Up</h1>
                        <h2 className="text-sm text-gray-500">
                            Create your free account now to join in the discussion
                        </h2>
                    </div>

                    {/* Sign up form body */}
                    <div className="flex flex-1 flex-col justify-center gap-6 px-4 py-4 sm:px-20">
                        {error /* Display authentication error message */ && (
                            <div className="relative rounded-lg bg-red-200 py-2 pr-2 pl-10 text-red-700 shadow-xs inset-shadow-xs shadow-red-600 inset-shadow-red-300">
                                <CircleXIcon className="absolute top-[50%] left-2 -translate-y-1/2" />
                                {error}
                            </div>
                        )}

                        {/* Name input field */}
                        <FloatingLabelInput id="name" name="name" label="Name" type="text" required />

                        {/* Email input field */}
                        <FloatingLabelInput id="email" name="email" label="Email" type="email" required />

                        {/* Password input fields */}
                        <FloatingLabelInput id="password" name="password" label="password" type="password" required />

                        {/* Confirm password input field */}
                        <FloatingLabelInput
                            id="confirmPassword"
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            required
                        />

                        {/* Submit button */}
                        <button
                            type="submit"
                            disabled={isPending}
                            className="bg-secondary text-primary rounded-md p-2 font-bold"
                        >
                            {isPending ? "Creating account..." : "Create Account"}
                        </button>

                        {/* Sign up form footer */}
                        <div className="flex justify-center gap-2">
                            <p className="text-gray-500">Already have an account?</p>
                            <Link href="/auth/sign-in" className="font-bold text-blue-600 hover:underline">
                                Sign In
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
