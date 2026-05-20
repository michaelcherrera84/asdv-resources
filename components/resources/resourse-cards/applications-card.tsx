import ResourceCard from "@/components/resources/resource-card";
import Link from "next/link";

/**
 * Applications card component.
 *
 * Displays a list of applications and links to download them.
 */
function ApplicationsCard() {
    const applications = [
        {
            displayName: "Logisim",
            href: "https://sourceforge.net/projects/circuit/files/2.7.x/2.7.1/logisim-generic-2.7.1.jar/download",
        },
        { displayName: "Apache NetBeans", href: "https://netbeans.apache.org/front/main/download/" },
        { displayName: "Visual Studio (Windows)", href: "https://visualstudio.microsoft.com/downloads/" },
        {
            displayName: "Relational (Windows)",
            href: "https://storage.googleapis.com/asdv-resources/Relational%20Setup.exe",
        },
        {
            displayName: "Relational (Mac)",
            href: "https://storage.googleapis.com/asdv-resources/Install%20Relational.dmg",
        },
        { displayName: "MAMP", href: "https://www.mamp.info/" },
    ];

    return (
        <ResourceCard title="Applications" link="/resources/applications">
            {applications.map((app) => (
                <Link key={app.displayName} href={app.href} target="_blank" rel="noopener noreferrer">
                    {app.displayName}
                </Link>
            ))}
        </ResourceCard>
    );
}

export default ApplicationsCard;
