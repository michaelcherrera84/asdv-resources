import { Card, CardBody, CardHeader } from "@/components/ui/card";

/**
 * Contact page component.
 *
 * The contact page displays a Discord widget for users to interact with the community.
 */
function ContactPage() {
    return (
        <main className="flex flex-1 flex-col items-center justify-center px-2 py-12">
            <Card className="bg-primary p-1 shadow-black">
                <CardBody className="sm:flex-row">
                    <div className="flex max-w-sm flex-col items-center justify-center gap-6 p-4">
                        <CardHeader>
                            <h1 className="w-full text-center text-2xl font-bold text-white">Contact Us</h1>
                        </CardHeader>
                        <p className="text-center text-lg text-white sm:text-2xl">
                            Join our Discord server to chat with admins, classmates, and alumni.
                        </p>
                    </div>
                    <div className="flex items-end">
                        {/* Discord widget */}
                        <iframe
                            src="https://discord.com/widget?id=1504239875933737154&theme=light"
                            width="350"
                            height="500"
                            sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                        />
                    </div>
                </CardBody>
            </Card>
        </main>
    );
}

export default ContactPage;
