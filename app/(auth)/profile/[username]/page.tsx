import type { Metadata } from "next";
import { getSession } from "@/lib/auth/auth";
import { getUserByUsernameService } from "@/lib/services/user-service";
import ProfileCard from "@/components/auth/profile-card";
import { User } from "@/lib/validators/user";

/**
 * Props for the ProfilePage component.
 */
interface ProfilePageProps {
    params: Promise<{ username: string }>;
}

/**
 * Generates metadata for the ProfilePage component.
 * @param {ProfilePageProps} params - The parameters for the profile page.
 */
export async function generateMetadata({ params }: ProfilePageProps): Promise<Metadata> {
    const { username } = await params;
    return {
        title: `${username} - ASDV Resources`,
        description: `Profile page for ${username} on ASDV Resources`,
    };
}

/**
 * Renders the ProfilePage component, which displays a user's profile information.
 * Determines whether the profile is editable based on the logged-in user's session.
 *
 * @param {Object} params - An object containing the parameters for the profile page.
 * @param {ProfilePageProps} params.params - A promise that resolves to an object with the username of the profile to display.
 * @throws {Error} If the username parameter is not provided.
 */
async function ProfilePage({ params }: ProfilePageProps) {
    const session = await getSession();
    const { username } = await params;

    if (!username) throw new Error("Username is required");

    const editable = session?.user.username === username;
    const profile = await getUserByUsernameService(username);

    return (
        <main className="flex items-center justify-center px-2 py-12">
            <ProfileCard profile={profile as User} editable={editable} />
        </main>
    );
}

export default ProfilePage;
