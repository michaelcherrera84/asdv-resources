import TutorialsCard from "@/components/admin/dashboard-cards/tutorials-card";
import { getSession } from "@/lib/auth/auth";
import { JSX } from "react";

/**
 * Renders the Admin Dashboard page. Ensures the user is authenticated
 * and has the role of "admin" before granting access.
 *
 * @return {Promise<JSX.Element>} The JSX representation of the Admin Dashboard page layout.
 * @throws {Error} If the user is not authenticated or is not an admin.
 */
async function AdminDashboardPage(): Promise<JSX.Element> {
    const session = await getSession();
    if (!session?.user || session.user.role !== "admin") {
        throw new Error("Unauthorized");
    }

    return (
        <main className="flex px-4 py-12 lg:px-6 xl:px-8">
            <div className="flex max-w-84 flex-wrap gap-4 min-[592px]:max-w-148 min-[896px]:max-w-4xl min-[1200px]:max-w-300 min-[1600px]:max-w-400">
                <TutorialsCard />
            </div>
        </main>
    );
}

export default AdminDashboardPage;
