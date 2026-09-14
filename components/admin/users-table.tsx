"use client";

import { User } from "@/db/auth-schema";
import { JSX, useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { FaXmark, FaCheck } from "react-icons/fa6";
import { UserUpdate } from "@/lib/validators/user";
import { updateUser } from "@/actions/user-actions";
import { useRouter } from "next/navigation";

interface UserTableProps {
    users: User[];
}

/**
 * Renders a table of users with functionality for inline editing of user details.
 *
 * @param {Object} props - The properties passed to the `UsersTable` component.
 * @param {Array} props.users - The list of user objects to display in the table.
 * @return {JSX.Element} A table displaying user details with inline editing capabilities.
 */
function UsersTable({ users }: UserTableProps): JSX.Element {
    const router = useRouter();
    const [editingUserId, setEditingUserId] = useState<string | null>(null);
    const [draft, setDraft] = useState<UserUpdate | null>(null);

    function startEditing(user: User) {
        setEditingUserId(user.id);
        setDraft({
            id: user.id,
            username: user.username,
            name: user.name,
            email: user.email,
            role: user.role as "user" | "admin",
            emailVerified: user.emailVerified,
        });
    }

    function stopEditing() {
        setEditingUserId(null);
        setDraft(null);
    }

    async function save() {
        if (!draft) return;
        console.log(draft);
        await updateUser(draft);
        setEditingUserId(null);
        setDraft(null);
        router.refresh();
    }

    return (
        <div className="overflow-auto rounded-md shadow-md inset-shadow-xs">
            <table className="border-collapse overflow-scroll text-left">
                <thead className="bg-secondary text-primary text-center [&_th]:p-2">
                    <tr className="divide-x divide-gray-200">
                        <th>Username</th>
                        <th>Role</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Verified</th>
                        <th>Member Since</th>
                        <th className="text-center">
                            <FaUserEdit className="mx-auto" />
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 [&_td]:p-2.5">
                    {users.map((user) => {
                        const isEditing = editingUserId === user.id;
                        return (
                            <tr key={user.id} className="divide-x divide-gray-200">
                                <td className="w-44 min-w-44">
                                    {isEditing ? (
                                        <input
                                            value={draft?.username ?? ""}
                                            onChange={(e) =>
                                                setDraft((prev) =>
                                                    prev ? { ...prev, username: e.target.value } : prev,
                                                )
                                            }
                                            className="w-36 rounded border border-gray-300 px-1"
                                        />
                                    ) : (
                                        user.username
                                    )}
                                </td>
                                <td className="w-32 min-w-32">
                                    {isEditing ? (
                                        <select
                                            value={draft?.role ?? "user"}
                                            onChange={(e) =>
                                                setDraft((prev) =>
                                                    prev ? { ...prev, role: e.target.value as "user" | "admin" } : prev,
                                                )
                                            }
                                            className="w-26 rounded border border-gray-300"
                                        >
                                            <option value="user">user</option>
                                            <option value="admin">admin</option>
                                        </select>
                                    ) : (
                                        user.role
                                    )}
                                </td>
                                <td className="w-44 min-w-44">
                                    {isEditing ? (
                                        <input
                                            value={draft?.name ?? ""}
                                            onChange={(e) =>
                                                setDraft((prev) => (prev ? { ...prev, name: e.target.value } : prev))
                                            }
                                            className="w-36 rounded border border-gray-300 px-1"
                                        />
                                    ) : (
                                        user.name
                                    )}
                                </td>
                                <td className="w-58 min-w-58">
                                    {isEditing ? (
                                        <input
                                            value={draft?.email ?? ""}
                                            onChange={(e) =>
                                                setDraft((prev) => (prev ? { ...prev, email: e.target.value } : prev))
                                            }
                                            className="w-52 rounded border border-gray-300 px-1"
                                        />
                                    ) : (
                                        user.email
                                    )}
                                </td>
                                <td className="w-26 min-w-26">
                                    {isEditing ? (
                                        <select
                                            value={draft?.emailVerified ? "true" : "false"}
                                            onChange={(e) =>
                                                setDraft((prev) =>
                                                    prev ? { ...prev, emailVerified: e.target.value === "true" } : prev,
                                                )
                                            }
                                            className="w-20 rounded border border-gray-300"
                                        >
                                            <option value="true">Yes</option>
                                            <option value="false">No</option>
                                        </select>
                                    ) : user.emailVerified ? (
                                        "Yes"
                                    ) : (
                                        "No"
                                    )}
                                </td>
                                <td>{user.createdAt.toLocaleDateString()}</td>
                                <td className="w-20 min-w-20 text-center">
                                    {isEditing ? (
                                        <div className="flex justify-center gap-1">
                                            <button
                                                className="rounded bg-green-700 p-0.5 text-white shadow"
                                                onClick={() => save()}
                                            >
                                                <FaCheck />
                                            </button>
                                            <button
                                                className="rounded bg-red-700 p-0.5 text-white shadow"
                                                onClick={() => stopEditing()}
                                            >
                                                <FaXmark />
                                            </button>
                                        </div>
                                    ) : (
                                        <button onClick={() => startEditing(user)}>
                                            <MdEdit />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default UsersTable;
