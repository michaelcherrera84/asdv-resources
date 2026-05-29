"use client";

import { authClient } from "@/lib/auth/auth-client";
import { useState } from "react";
import { Card, CardBody, CardFooter, CardHeader } from "@/components/ui/card";
import FloatingLabelInput from "@/components/ui/floating-label-input";
import Button from "@/components/ui/button";
import Link from "next/link";

/**
 * Represents the Forgot Password page of the application.
 * Allows users to request a password reset email by entering their email address.
 * Displays success message upon email submission or provides inputs for resubmission.
 */
function ForgotPasswordPage() {
    const [email, setEmail] = useState<string>("");
    const [isPending, setIsPending] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    /**
     * Handles the process of initiating a password reset request.
     *
     * This asynchronous function sets the pending status to true and sends a password
     * reset request using the provided email. If the request fails, it throws an error.
     * On a successful request, it updates the success status.
     *
     * @async
     * @function
     * @throws {Error} If the password reset email fails to send.
     */
    const handleForgotPassword = async () => {
        setIsPending(true);
        const { error } = await authClient.requestPasswordReset({
            email: email,
            redirectTo: "/reset-password",
        });

        if (error) {
            throw new Error("Failed to send password reset email. Please try again.");
        } else {
            setIsSuccess(true);
        }
    };

    return (
        <main className="flex h-full min-h-[calc(100vh-64px)] items-center justify-center px-4 py-12">
            {isSuccess ? (
                <div className="flex flex-col items-center gap-4 text-lg">
                    <p className="text-primary text-2xl">Check your inbox.</p>
                    <div className="text-center">
                        <p>An email has been sent to your inbox to reset your password.</p>
                        <p>If you don&#39;t see the email, check your spam folder.</p>
                    </div>
                    <p>
                        <Link href="/contact" className="text-blue-600 underline">
                            Contact Us
                        </Link>{" "}
                        if you need more assistance.
                    </p>
                </div>
            ) : (
                <Card className="gap-8 p-4 sm:p-12 md:p-16 lg:p-20 xl:p-24 2xl:p-32">
                    <CardHeader>
                        <h1 className="text-primary text-2xl">Forgot your password?</h1>
                    </CardHeader>
                    <CardBody className="gap-8">
                        <p>Enter your email below to reset your password.</p>
                        <FloatingLabelInput
                            label="Email"
                            name="email"
                            id="email"
                            type="email"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") handleForgotPassword();
                            }}
                        />
                    </CardBody>
                    <CardFooter>
                        <Button onClick={handleForgotPassword} disabled={isPending}>
                            {isPending ? "Resetting..." : "Reset Password"}
                        </Button>
                    </CardFooter>
                </Card>
            )}
        </main>
    );
}

export default ForgotPasswordPage;
