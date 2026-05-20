import { eq, inArray } from "drizzle-orm";
import { users } from "@/db/external";
import { db } from "@/db";

/**
 * Get user by id
 * @param id user id
 */
export async function getUserById(id: string) {
    const [user] = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return user;
}

/**
 * Get users by ids
 * @param ids user ids
 */
export function getUsersByIds(ids: string[]) {
    return db.select().from(users).where(inArray(users.id, ids));
}
