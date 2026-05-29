"use client";

import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { User } from "@/lib/validators/user";
import Image from "next/image";
import { FaEdit, FaUpload } from "react-icons/fa";
import { useState } from "react";
import FloatingLabelInput from "@/components/ui/floating-label-input";
import { Textarea } from "@headlessui/react";
import Button from "@/components/ui/button";
import { CldUploadButton } from "next-cloudinary";
import { authClient } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";

/**
 * Represents the properties used by a ProfileCard component.
 */
interface ProfileCardProps {
    profile: User;
    editable: boolean;
}

/**
 * ProfileCard component displays a user's profile information.
 * @param {ProfileCardProps} props - The properties for the ProfileCard component.
 * @param {User} props.profile - The user's profile information.
 * @param {boolean} props.editable - Indicates whether the profile is editable.
 */
function ProfileCard({ profile, editable }: ProfileCardProps) {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [image, setImage] = useState<string | undefined>(profile.image || undefined);
    const [name, setName] = useState<string>(profile.name);
    const [email, setEmail] = useState<string>(profile.email);
    const [bio, setBio] = useState<string>(profile.bio || "");
    const [college, setCollege] = useState<string>(profile.college || "");
    const [expectedGraduation, setExpectedGraduation] = useState<string>(profile.expectedGraduation || "");
    const [highSchool, setHighSchool] = useState<string>(profile.highSchool || "");
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const router = useRouter();

    /**
     * Handles the click event for the edit button.
     *
     * This function is triggered when the edit button is clicked. It first checks
     * if the current state allows editing by evaluating the `editable` flag. If
     * editing is allowed (`editable` is true), it updates the state to set
     * `isEditing` to true, initiating the editing process.
     *
     * @function
     */
    const handleEditButtonClick = () => {
        if (!editable) return;
        setIsEditing(true);
    };

    /**
     * Handles the save operation for updating user profile information.
     * This function performs the following steps:
     * - Sets the saving state to true.
     * - Validates that the name and email fields are populated.
     * - Updates the user's profile information through the `authClient.updateUser` method.
     * - If provided, updates the user's email address using the `authClient.changeEmail` method.
     * - Handles errors during these operations by logging them and displaying an alert to the user.
     * - Resets the editing and saving states upon completion, and refreshes the page data.
     *
     * @async
     * @function
     * @throws Will display error alerts if the update or email change operations fail.
     */
    const handleSave = async () => {
        setIsSaving(true);
        if (!name || !email) {
            alert("Name and email are required.");
        }

        const { error } = await authClient.updateUser({
            image,
            name,
            bio,
            college,
            expectedGraduation,
            highSchool,
        });

        if (error) {
            console.error("Error updating user:", error);
            setIsSaving(false);
            alert("Failed to update user. Please try again.");
        }

        if (email !== profile.email) {
            const { error } = await authClient.changeEmail({
                newEmail: email,
            });

            if (error) {
                console.error("Error changing email:", error);
                setIsSaving(false);
                alert("Failed to change email. Please try again.");
            }
        }

        setIsEditing(false);
        setIsSaving(false);
        router.refresh();
    };

    return (
        <Card className="w-full max-w-325 p-2 sm:p-6 lg:p-10">
            <CardHeader className="relative gap-2">
                {!isEditing && editable && (
                    <FaEdit
                        className="absolute top-2 right-2 cursor-pointer text-gray-500 hover:text-gray-700"
                        onClick={handleEditButtonClick}
                        title="Edit Profile"
                    />
                )}
                {!isEditing ? (
                    <>
                        {profile.image ? (
                            <Image
                                src={profile.image}
                                alt="profile picture"
                                width={216}
                                height={216}
                                loading="eager"
                                className="rounded p-4 shadow-md shadow-gray-400"
                            />
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
                    </>
                ) : (
                    <CldUploadButton
                        signatureEndpoint="/api/sign-cloudinary-params"
                        uploadPreset="ASDV Resources Profile Pic"
                        options={{ publicId: `${profile.username}`, maxFileSize: 3000000 }}
                        onSuccess={(result) => {
                            if (result.event === "success" && typeof result.info !== "string")
                                setImage(result.info?.secure_url);
                        }}
                        onError={(error) => {
                            console.log("User image upload failed:", error);
                            alert(`Upload failed: ${error}`);
                        }}
                    >
                        <div className="relative">
                            {image ? (
                                <Image src={image} alt="profile picture" width={200} height={200} loading="eager" />
                            ) : (
                                <Image
                                    src="/images/blank-profile-image.jpg"
                                    alt="profile picture"
                                    width={200}
                                    height={200}
                                    loading="eager"
                                    className="rounded-sm brightness-75"
                                />
                            )}

                            <div className="absolute top-1/2 left-1/2 h-fit w-fit -translate-1/2 rounded-md bg-white p-4 shadow-md shadow-gray-700">
                                <FaUpload className="text-gray-500 hover:text-gray-700" size={35} />
                            </div>
                        </div>
                    </CldUploadButton>
                )}
                <div className="py-1 text-center sm:text-left">
                    <p className="text-bold text-xl">@{profile.username}</p>
                    <p className="text-xs text-gray-500">member since {profile.createdAt.toLocaleDateString()}</p>
                </div>
            </CardHeader>
            <CardBody className="gap-4 py-4">
                <div>
                    {!isEditing ? (
                        <div>
                            <h3 className="text-primary font-bold">Name</h3>
                            <p className="text-sm font-light">{profile.name}</p>
                        </div>
                    ) : (
                        <FloatingLabelInput
                            label="Name"
                            name="name"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="max-w-lg"
                            required
                        />
                    )}
                </div>
                {editable && (
                    <>
                        {!isEditing ? (
                            <div>
                                <h3 className="text-primary font-bold">Email</h3>
                                <p className="text-sm font-light">{profile.email}</p>
                            </div>
                        ) : (
                            <FloatingLabelInput
                                label="Email"
                                name="email"
                                id="email"
                                value={email}
                                className="max-w-lg"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        )}
                    </>
                )}
                {!isEditing ? (
                    <>
                        {profile.bio && (
                            <div>
                                <h3 className="text-primary font-bold">Bio</h3>
                                <p className="text-sm font-light whitespace-pre-wrap">{profile.bio}</p>
                            </div>
                        )}
                    </>
                ) : (
                    <div>
                        <label htmlFor="bio" className="pl-3 text-xs text-gray-400">
                            Bio
                        </label>
                        <Textarea
                            name="bio"
                            id="bio"
                            value={bio}
                            placeholder="Bio"
                            rows={4}
                            onChange={(e) => setBio(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 p-2"
                        />
                    </div>
                )}

                <div>
                    {!isEditing ? (
                        <>
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
                        </>
                    ) : (
                        <div className="flex flex-col gap-4">
                            <FloatingLabelInput
                                label="College"
                                id="college"
                                name="college"
                                value={college}
                                onChange={(e) => setCollege(e.target.value)}
                                className="max-w-lg"
                            />
                            <FloatingLabelInput
                                label="Graduation or Expected Graduation"
                                id="expectedGraduation"
                                name="expectedGraduation"
                                value={expectedGraduation}
                                onChange={(e) => setExpectedGraduation(e.target.value)}
                                className="max-w-lg"
                            />
                        </div>
                    )}
                </div>

                {!isEditing ? (
                    <>
                        {profile.highSchool && (
                            <div>
                                <h3 className="text-primary font-bold">High School</h3>
                                <p className="text-sm font-light">{profile.highSchool}</p>
                            </div>
                        )}
                    </>
                ) : (
                    <FloatingLabelInput
                        label="High School"
                        id="highSchool"
                        name="highSchool"
                        value={highSchool}
                        onChange={(e) => setHighSchool(e.target.value)}
                        className="max-w-lg"
                    />
                )}
            </CardBody>
            <CardBody>
                {isEditing && editable && (
                    <div className="flex gap-3">
                        <Button
                            className="cursor-pointer border border-green-700 bg-green-700!"
                            disabled={isSaving}
                            onClick={handleSave}
                        >
                            {isSaving ? "Saving..." : "Save"}
                        </Button>
                        <Button
                            className="cursor-pointer border border-gray-400 bg-transparent! text-black! hover:bg-gray-100!"
                            onClick={() => setIsEditing(false)}
                            disabled={isSaving}
                        >
                            Cancel
                        </Button>
                    </div>
                )}
            </CardBody>
        </Card>
    );
}

export default ProfileCard;
