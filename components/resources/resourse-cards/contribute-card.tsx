import ResourceCard from "@/components/resources/resource-card";
import Link from "next/link";

/**
 * Contribute card component.
 *
 * Displays links to contribute to the site.
 */
function ContributeCard() {
    return (
        <ResourceCard title="Contribute">
            <Link href="/resources/tutorials/submit">Submit a Tutorial</Link>
            <Link href="#">Submit a Blog - Coming Soon...</Link>
            <Link href="https://github.com/michaelcherrera84/asdv-resources" target="_blank" rel="noopener noreferrer">
                Fork Repository & Create a Pull Request
            </Link>
        </ResourceCard>
    );
}

export default ContributeCard;
