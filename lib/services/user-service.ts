import { eq, inArray } from "drizzle-orm";
import { user } from "@/db/auth-schema";
import { db } from "@/db";

/**
 * Get user by id
 * @param id user id
 */
export async function getUserById(id: string) {
    const [userData] = await db.select().from(user).where(eq(user.id, id)).limit(1);
    return userData;
}

/**
 * Get users by ids
 * @param ids user ids
 */
export function getUsersByIds(ids: string[]) {
    return db.select().from(user).where(inArray(user.id, ids));
}

/**
 * Get user by email
 * @param email user email
 */
export async function getUserByEmail(email: string) {
    const [userData] = await db.select().from(user).where(eq(user.email, email)).limit(1);
    return userData;
}
