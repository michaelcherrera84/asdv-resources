"use server";

import { UserUpdate } from "@/lib/validators/user";
import { updateUserService } from "@/lib/services/user-service";

export async function updateUser(user: UserUpdate) {
    await updateUserService(user);
}
