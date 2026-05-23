import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import { headers } from "next/headers";
import { redirect } from "next/navigation"; // your drizzle instance
import * as schema from "@/db/auth-schema";
import { sendResetPasswordEmail } from "@/lib/email/send-reset-password-email";
import { waitUntil } from "@vercel/functions";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg", // or "mysql", "sqlite"
        schema: schema,
    }),
    session: {
        cookieCache: {
            enabled: true,
            maxAge: 60 * 60 * 24 * 7,
        },
    },
    emailAndPassword: {
        enabled: true,
        sendResetPassword: async ({ user, url, token }, request) => {
            waitUntil(
                sendResetPasswordEmail({
                    to: user.email,
                    resetURL: url,
                }),
            );
        },
        onPasswordReset: async ({ user }, request) => {
            console.log("Password reset for user:", user.email);
        },
    },
    user: {
        additionalFields: {
            role: {
                type: "string",
                required: true,
            },
            username: {
                type: "string",
                required: true,
            },
            bio: {
                type: "string",
                required: false,
            },
            highSchool: {
                type: "string",
                required: false,
            },
            college: {
                type: "string",
                required: false,
            },
            expectedGraduation: {
                type: "string",
                required: false,
            },
        },
    },
});

type Session = typeof auth.$Infer.Session;

/**
 * Get the current session.
 */
export async function getSession() {
    return await auth.api.getSession({
        headers: await headers(),
    });
}

/**
 * Sign out the current user.
 */
export async function signOut() {
    const result = await auth.api.signOut({
        headers: await headers(),
    });

    if (result.success) {
        redirect("/");
    }
}
