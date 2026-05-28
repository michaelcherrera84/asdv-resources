"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardBody, CardFooter, CardHeader } from "@/components/ui/card";
import FloatingLabelInput from "@/components/ui/floating-label-input";
import { useEffect, useState } from "react";
import Button from "@/components/ui/button";
import { BsXCircle } from "react-icons/bs";
import { authClient } from "@/lib/auth/auth-client";

function ResetPasswordForm() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [isPending, setIsPending] = useState<boolean>(false);
    const [formError, setFormError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (!token) {
            router.push("/");
        }
    }, [token, router]);

    if (!token) return null;

    const handleResetPassword = async () => {
        setIsPending(true);
        setFormError(null);

        const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*\-+=_])/;

        if (!passwordRegex.test(password)) {
            setFormError("Password must contain at least one uppercase letter, one number, and one special character.");
            setIsPending(false);
            return;
        }

        if (password.length < 8) {
            setFormError("Password must be at least 8 characters long.");
            setIsPending(false);
            return;
        }

        if (password !== confirmPassword) {
            setFormError("Passwords do not match.");
            setIsPending(false);
            return;
        }

        const { data, error } = await authClient.resetPassword({
            newPassword: password,
            token,
        });

        if (error) {
            console.error("Error resetting password:", error);
            throw new Error("Failed to reset password. Please try again.");
        }

        console.log("Password reset successfully:", data);
        router.push("/sign-in");
    };

    return (
        <main className="flex h-full min-h-[calc(100vh-64px)] items-center justify-center px-4 py-12">
            <Card className="w-full max-w-lg gap-8 p-4 sm:p-12 md:p-16 lg:p-20 xl:p-24 2xl:max-w-xl 2xl:p-32">
                <CardHeader>
                    <h1 className="text-primary text-2xl">Reset Password</h1>
                </CardHeader>
                <CardBody className="gap-4">
                    {formError /* Display authentication error message */ && (
                        <div className="relative rounded-lg bg-red-200 py-2 pr-2 pl-10 text-red-700 shadow-xs inset-shadow-xs shadow-red-600 inset-shadow-red-300">
                            <BsXCircle className="absolute top-[50%] left-2 -translate-y-1/2" />
                            {formError}
                        </div>
                    )}
                    <FloatingLabelInput
                        label="Password"
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <FloatingLabelInput
                        label="Confirm Password"
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleResetPassword();
                        }}
                    />
                </CardBody>
                <CardFooter>
                    <Button onClick={handleResetPassword} disabled={isPending}>
                        {!isPending ? "Reset Password" : "Resetting..."}
                    </Button>
                </CardFooter>
            </Card>
        </main>
    );
}

export default ResetPasswordForm;
