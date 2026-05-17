import { RxHamburgerMenu } from "react-icons/rx";
import Link from "next/link";
import { Card, CardBody, CardHeader } from "@/components/ui/card";

/**
 * Props for the ResourceCard component.
 */
type ResourceCardProps = {
    title: string;
    link?: string;
    children?: React.ReactNode;
};

/**
 * Resource card component.
 *
 * Responsibilities:
 * - Display a card with a title and optional link
 * - Serves as a dashboard type link for users
 */
function ResourceCard({ title, link, children }: ResourceCardProps) {
    return (
        <Card className="h-28 w-40 justify-end py-2 sm:h-72 sm:w-72">
            <CardHeader className="items-start gap-4 p-4">
                <RxHamburgerMenu className="sm:hidden" size={24} />
                <Link href={link ?? "#"} className="self-center sm:self-start">
                    <div className="text-center font-bold sm:text-left">{title}</div>
                </Link>
            </CardHeader>
            <CardBody className="hidden gap-2 overflow-auto px-4 py-2 text-blue-600 underline underline-offset-2 sm:flex">
                {children}
            </CardBody>
        </Card>
    );
}

export default ResourceCard;
