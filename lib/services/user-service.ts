import { eq, inArray } from "drizzle-orm";
import { user } from "@/db/auth-schema";
import { db } from "@/db";

/**
 * Get user by id
 * @param id user id
 */
export async function getUserById(id: string) {
    const [userdata] = await db.select().from(user).where(eq(user.id, id)).limit(1);
    return userdata;
}

/**
 * Get users by ids
 * @param ids user ids
 */
export function getUsersByIds(ids: string[]) {
    return db.select().from(user).where(inArray(user.id, ids));
}
