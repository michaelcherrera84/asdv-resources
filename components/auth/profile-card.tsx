import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { User } from "@/lib/validators/user";
import Image from "next/image";

interface ProfileCardProps {
    profile: User;
    editable: boolean;
}

function ProfileCard({ profile, editable }: ProfileCardProps) {
    return (
        <Card className="max-w-325 p-2 sm:p-6 lg:p-10">
            <CardHeader className="">
                {profile.image ? (
                    <Image src={profile.image} alt="profile picture" width={200} height={200} loading="eager" />
                ) : (
                    <Image
                        src="/images/blank-profile-image.jpg"
                        alt="profile picture"
                        width={200}
                        height={200}
                        loading="eager"
                        className="rounded-sm"
                    />
                )}
                <div className="py-1 text-center sm:text-left">
                    <p className="text-bold text-xl">@{profile.username}</p>
                    <p className="text-xs text-gray-500">member since {profile.createdAt.toLocaleDateString()}</p>
                </div>
            </CardHeader>
            <CardBody className="gap-4 py-4">
                <div>
                    <h3 className="text-primary font-bold">Name</h3>
                    <p className="text-sm font-light">{profile.name}</p>
                </div>
                {editable && (
                    <div>
                        <h3 className="text-primary font-bold">Email</h3>
                        <p className="text-sm font-light">{profile.email}</p>
                    </div>
                )}
                {profile.bio && (
                    <div>
                        <h3 className="text-primary font-bold">Bio</h3>
                        <p className="text-sm font-light">{profile.bio}</p>
                    </div>
                )}
                {profile.college && (
                    <div>
                        <h3 className="text-primary font-bold">College</h3>
                        <p className="text-sm font-light">{profile.college}</p>
                        {profile.expectedGraduation && (
                            <p className="text-xs text-gray-500 italic">
                                Graduating or Graduated: {profile.expectedGraduation}
                            </p>
                        )}
                    </div>
                )}
                {profile.highSchool && (
                    <div>
                        <h3 className="text-primary font-bold">Highschool</h3>
                        <p className="text-sm font-light">{profile.highSchool}</p>
                    </div>
                )}
            </CardBody>
        </Card>
    );
}

export default ProfileCard;
