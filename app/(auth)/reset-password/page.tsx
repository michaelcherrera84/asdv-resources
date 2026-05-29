import { Suspense } from "react";
import ResetPasswordForm from "@/components/auth/reset-password-form";

/**
 * Reset password page component.
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
