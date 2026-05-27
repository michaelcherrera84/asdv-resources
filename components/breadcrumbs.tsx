"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

/**
 * Props for the Breadcrumbs component.
 */
interface BreadcrumbProps {
    className?: string;
    segmentClassName?: string;
}

/**
 * Breadcrumbs component.
 */
function Breadcrumbs({ className, segmentClassName }: BreadcrumbProps) {
    const path = usePathname();

    // Split the path into segments.
    const segments = path.split("/").filter(Boolean);

    segments.pop();

    if (segments.length < 1) return null;

    /**
     * Convert the path segments into breadcrumbs.
     */
    const breadcrumbs = segments.map((segment) =>
        segment
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" "),
    );

    return (
        <div className={`text-primary flex items-center gap-2 ${className}`}>
            <Link href="/" className={`text-primary ${segmentClassName}`}>
                ASDV Resources
            </Link>
            {breadcrumbs.map((breadcrumb, index) => (
                <Link
                    key={index}
                    href={`/${segments.slice(0, index + 1).join("/")}`}
                    className={`text-primary flex gap-2 ${segmentClassName}`}
                >
                    <span>/</span>
                    {breadcrumb}
                </Link>
            ))}
        </div>
    );
}

export default Breadcrumbs;
