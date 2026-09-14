import { eq, inArray } from "drizzle-orm";
import { User, user } from "@/db/auth-schema";
import { db } from "@/db";
import { userUpdateSchema } from "@/lib/validators/user";

/**
 * Get user by id
 * @param id user id
 */
export async function getUserByIdService(id: string) {
    const [userData] = await db.select().from(user).where(eq(user.id, id)).limit(1);
    return userData;
}

/**
 * Get users by ids
 * @param ids user ids
 */
export function getUsersByIdsService(ids: string[]) {
    return db.select().from(user).where(inArray(user.id, ids));
}

/**
 * Get user by email
 * @param email user email
 */
export async function getUserByEmailService(email: string) {
    const [userData] = await db.select().from(user).where(eq(user.email, email)).limit(1);
    return userData;
}

/**
 * Get user by username
 * @param username user username
 */
export async function getUserByUsernameService(username: string) {
    const [userData] = await db.select().from(user).where(eq(user.username, username)).limit(1);
    return userData;
}

/**
 * Get all admins
 */
export async function getAdminsService() {
    return db.select().from(user).where(eq(user.role, "admin"));
}

/**
 * Get all non-admin users
 */
export async function getUsersService() {
    return db.select().from(user).where(eq(user.role, "user"));
}

/**
 * Update a user
 * @param data user data
 */
export async function updateUserService(data: Partial<User>) {
    if (!data.id) {
        throw new Error("User id is required");
    }
    const validated = userUpdateSchema.parse(data);
    await db.update(user).set(validated).where(eq(user.id, validated.id));
}
