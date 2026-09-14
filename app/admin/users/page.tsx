import UsersTable from "@/components/admin/users-table";
import { getUsersService } from "@/lib/services/user-service";
import { Metadata } from "next";

/**
 * Represents metadata for the "Users Management" page of the ASDV Resources.
 *
 * @property {string} title - The title of the page.
 * @property {string} description - A brief description of the page's purpose or functionality.
 */
export const metadata: Metadata = {
    title: "ASDV Resources - Users Management",
    description: "A page for administrators to manage user accounts.",
};

/**
 * Renders the User Administration Page, which displays a table of users.
 *
 * @return {JSX.Element} The main content container with a user table component populated with user data.
 */
async function UserAdminPage() {
    const users = await getUsersService();

    return (
        <main className="flex justify-start px-4 py-12 lg:px-6 xl:px-8">
            <UsersTable users={users} />
        </main>
    );
}

export default UserAdminPage;
