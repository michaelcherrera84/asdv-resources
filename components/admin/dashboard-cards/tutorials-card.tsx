import ResourceCard from "@/components/resources/resource-card";
import Link from "next/link";

function TutorialsCard() {
    return (
        <ResourceCard title="Tutorials">
            <Link href="/admin/tutorials/approve">Approve Tutorials</Link>
        </ResourceCard>
    );
}

export default TutorialsCard;
