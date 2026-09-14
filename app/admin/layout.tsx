import { getSession } from "@/lib/auth/auth";
import React from "react";

/**
 * Renders the AdminLayout component. This component ensures that the user has the appropriate
 * admin role before rendering the children components. If the user is not authorized, an error is thrown.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {React.ReactNode} props.children - The child components to be rendered within the layout.
 * @return {JSX.Element} The rendered layout containing the child components.
 * @throws {Error} Throws an error if the user is not authorized.
 */
async function AdminLayout({ children }: { children: React.ReactNode }) {
    const session = await getSession();
    const authorized = session?.user && session.user.role === "admin";

    if (!authorized) {
        throw new Error("Unauthorized");
    }

    return <>{children}</>;
}

export default AdminLayout;
