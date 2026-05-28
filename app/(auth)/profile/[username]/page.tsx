import { getSession } from "@/lib/auth/auth";
import { getUserByUsername } from "@/lib/services/user-service";
import ProfileCard from "@/components/auth/profile-card";
import { User } from "@/lib/validators/user";

async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
    const session = await getSession();
    const { username } = await params;

    if (!username) throw new Error("Username is required");

    const editable = session?.user.username === username;
    const profile = await getUserByUsername(username);

    return (
        <main className="flex items-center justify-center px-2 py-12">
            <ProfileCard profile={profile as User} editable={editable} />
        </main>
    );
}

export default ProfilePage;
