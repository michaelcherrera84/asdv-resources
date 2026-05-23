import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import { headers } from "next/headers";
import { redirect } from "next/navigation"; // your drizzle instance
import * as schema from "@/db/auth-schema";

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
