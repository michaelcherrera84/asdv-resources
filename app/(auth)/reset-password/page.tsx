import { Suspense } from "react";
import ResetPasswordClient from "@/components/auth/reset-password-client";

function ResetPasswordPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ResetPasswordClient />
        </Suspense>
    );
}

export default ResetPasswordPage;
