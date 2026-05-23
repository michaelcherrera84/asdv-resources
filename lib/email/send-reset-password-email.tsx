import { resend } from "./resend";
import { EmailTemplate } from "@/components/email-template";
import { getUserByEmail } from "@/lib/services/user-service";

type SendResetPasswordEmailProps = {
    to: string;
    resetURL: string;
};

export async function sendResetPasswordEmail({ to, resetURL }: SendResetPasswordEmailProps) {
    const user = await getUserByEmail(to);

    if (!user) {
        throw new Error("User not found.");
    }

    const username = user?.username;

    const { data, error } = await resend.emails.send({
        from: "ASDV Resources <no-reply@michaelcherrera.com>",
        to: [to],
        subject: "Password Reset Request for ASDV Resources",
        react: <EmailTemplate username={username} link={resetURL} />,
    });

    if (error) {
        console.error("Error sending email:", error);
        throw new Error("Failed to send password reset email.");
    }

    return data;
}
