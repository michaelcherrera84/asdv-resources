import { eq } from "drizzle-orm";
import { users } from "@/db/schema";
import { db } from "@/db";

/**
 * Get a user by id
 * @param id user id
 */
export function getUserById(id: string) {
    return db.query.users.findFirst({
        where: eq(users.id, id),
    });
}
