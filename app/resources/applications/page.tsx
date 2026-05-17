import { Card, CardBody, CardFooter, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import Button from "@/components/ui/button";
import Link from "next/link";
import { FaWindows } from "react-icons/fa";
import { FaApple } from "react-icons/fa";

/**
 * Applications page component.
 *
 * Responsibilities:
 * - Display a grid of application cards
 * - Include descriptions and links to download applications
 * - Provide links to download applications
 */
function ApplicationsPage() {
    return (
        <main className="grid place-items-center justify-center gap-4 px-2 py-12 lg:grid-cols-2 xl:grid-cols-3">
            <Card className="h-full max-w-lg items-center gap-4 p-6">
                <CardHeader className="h-36">
                    <Image src="/images/logisim.png" alt="Logisim" width={227} height={137} />
                </CardHeader>
                <CardBody>
                    <p>
                        Logisim is an educational tool for designing and simulating digital logic circuits. With its
                        simple toolbar interface and simulation of circuits as you build them, it is simple enough to
                        facilitate learning the most basic concepts related to logic circuits. With the capacity to
                        build larger circuits from smaller subcircuits, and to draw bundles of wires with a single mouse
                        drag, Logisim can be used (and is used) to design and simulate entire CPUs for educational
                        purposes.
                        <br />
                        <br />
                        Logisim is used by students at colleges and universities around the world in many types of
                        classes, ranging from a brief unit on logic in general-education computer science surveys, to
                        computer organization courses, to full-semester courses on computer architecture.
                    </p>
                </CardBody>
                <CardFooter className="w-full">
                    <Link
                        href="https://sourceforge.net/projects/circuit/files/2.7.x/2.7.1/logisim-generic-2.7.1.jar/download"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Button className="w-full">Download</Button>
                    </Link>
                </CardFooter>
            </Card>
            <Card className="h-full max-w-lg items-center gap-4 p-6">
                <CardHeader className="h-36 flex-row gap-4">
                    <Image src="/images/apache-netbeans.svg" alt="Apache NetBeans" width={121} height={121} />
                    <div className="flex flex-col gap-2">
                        <h2 className="text-2xl text-[rgb(27,106,198)]">Apache NetBeans</h2>
                        <h3 className="text-xl text-[#a1c535]">Fits the Pieces Together</h3>
                        <p className="hidden sm:inline">
                            Development Environment, Tooling Platform and Application Framework.
                        </p>
                    </div>
                </CardHeader>
                <CardBody>
                    <p>
                        Apache NetBeans is top level Apache Project dedicated to providing rock solid software
                        development products (the Apache NetBeans IDE and the Apache NetBeans Platform) that address the
                        needs of developers, users and the businesses who rely on NetBeans as a basis for their
                        products; particularly, to enable them to develop these products quickly, efficiently and easily
                        by leveraging the strengths of the Java platform and other relevant industry standards.
                        <br />
                        <br />
                        The two base products, the Apache NetBeans IDE and Apache NetBeans Platform, are free for
                        commercial and non-commercial use, under the Apache license. The source code to both is
                        available to anyone to reuse as they see fit, within the terms of use.
                    </p>
                </CardBody>
                <CardFooter className="w-full">
                    <Link
                        href="https://netbeans.apache.org/front/main/download/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Button className="w-full">Download</Button>
                    </Link>
                </CardFooter>
            </Card>
            <Card className="h-full max-w-lg items-center gap-4 overflow-hidden">
                <CardHeader className="relative mb-2 h-40 w-full items-start justify-center pl-6">
                    <Image src="/images/visual-studio.webp" alt="Visual Studio" fill />
                    <h2 className="absolute text-lg font-bold sm:text-2xl">
                        Dream big. Achieve more.
                        <br />
                        Visual Studio 2026.
                    </h2>
                </CardHeader>
                <CardBody className="px-6">
                    <p>
                        Unleash your potential with the world’s most popular IDE for the professional developer. From
                        first keystroke to final deployment, Visual Studio empowers your developer journey so you can
                        get more done.
                        <br />
                        <br />
                        Visual Studio is a powerful IDE that empowers developers to create, debug, and deploy software
                        faster than ever before. With its intuitive interface, powerful features, and seamless
                        integration with your favorite tools, Visual Studio is the perfect tool for any developer.
                    </p>
                </CardBody>
                <CardFooter className="w-full px-6 pb-6">
                    <Link
                        href="https://visualstudio.microsoft.com/downloads/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Button className="flex w-full items-center justify-center gap-2">
                            Download <FaWindows />
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
            <Card className="h-full max-w-lg items-center gap-4 p-6">
                <CardHeader className="h-36 items-center! sm:flex-row sm:gap-4">
                    <Image
                        src="/images/relational.png"
                        height={256}
                        width={256}
                        alt="Relational"
                        className="h-36 w-auto"
                    />
                    <h1 className="text-lg font-bold sm:text-2xl">Relational</h1>
                </CardHeader>
                <CardBody>
                    <p>
                        Relational is an educational tool to provide a workspace for experimenting with relational
                        algebra.
                        <br />
                        <br />
                        It provides GUI that can be used for executing relational queries, and also a command line
                        interface and a Python library.
                    </p>
                </CardBody>
                <CardFooter className="w-full flex-row gap-2">
                    <Link
                        href="https://storage.googleapis.com/asdv-resources/Relational%20Setup.exe"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                    >
                        <Button className="flex w-full items-center justify-center gap-2">
                            Download <FaWindows />
                        </Button>
                    </Link>
                    <Link
                        href="https://storage.googleapis.com/asdv-resources/Install%20Relational.dmg"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                    >
                        <Button className="flex w-full items-center justify-center gap-2">
                            Download <FaApple />
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
            <Card className="h-full max-w-lg items-center gap-4 overflow-hidden">
                <CardHeader className="h-36">
                    <Image src="/images/mamp.png" alt="MAMP" width={1186} height={726} className="max-h-36 min-h-42" />
                </CardHeader>
                <CardBody className="p-6">
                    <p>
                        MAMP is your free local server environment with Apache, Nginx, PHP, and MySQL. It runs on macOS
                        and Windows.
                    </p>
                </CardBody>
                <CardFooter className="w-full px-6 pb-6">
                    <Link href="https://www.mamp.info/" target="_blank" rel="noopener noreferrer">
                        <Button className="w-full">Download</Button>
                    </Link>
                </CardFooter>
            </Card>
        </main>
    );
}

export default ApplicationsPage;
