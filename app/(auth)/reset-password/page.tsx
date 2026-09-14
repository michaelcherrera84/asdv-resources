import { Suspense } from "react";
import ResetPasswordForm from "@/components/auth/reset-password-form";
import { Metadata } from "next";

/**
 * Represents metadata for the "Reset Password" page of the ASDV Resources.
 *
 * @property {string} title - The title of the page.
 * @property {string} description - A brief description of the page's purpose or functionality.
 */
export const metadata: Metadata = {
    title: "ASDV Resources - Reset Password",
    description: "Reset your password.",
};

/**
 * Reset the password page component.
 * Displays a form for users to reset their password.
 * Uses Suspense for code splitting.
 */
function ResetPasswordPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ResetPasswordForm />
        </Suspense>
    );
}

export default ResetPasswordPage;
