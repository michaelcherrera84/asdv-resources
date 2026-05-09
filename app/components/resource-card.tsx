import Link from "next/link";
import { MenuIcon } from "lucide-react";

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
        <div className="inset-shadow-md flex h-24 flex-col justify-end gap-4 rounded-md p-4 shadow-md inset-shadow-xs sm:h-87.5 sm:justify-start">
            <MenuIcon className="sm:hidden" />
            <Link href={link ?? "#"}>
                <div className="text-center font-bold sm:text-left">{title}</div>
            </Link>
            <div className="hidden overflow-auto py-2 sm:block">{children}</div>
        </div>
    );
}

export default ResourceCard;
