import Link from "next/link";

/**
 * About page component.
 *
 * Responsibilities:
 * - Provide a brief introduction to the project
 * - Explain the purpose and goals of the platform
 * - Highlight community features and planned development
 */
function AboutPage() {
    return (
        <main className="flex flex-col gap-10 px-4 py-12 sm:px-8 md:px-10 lg:px-14 xl:px-20">
            <section className="flex flex-col gap-4">
                <h1 className="text-2xl font-bold">About ASDV Resources</h1>
                <p>
                    Welcome to ASDV Resources — a community-driven platform built to support students, alumni, and
                    anyone interested in software development.
                </p>
                <p>
                    ASDV Resources was originally created as a companion site for the{" "}
                    <Link
                        href="https://www.solacc.edu/academics/programs-offered/application-software-development/index"
                        target="_blank"
                        className="text-primary underline"
                    >
                        Application Software Development (ASDV)
                    </Link>{" "}
                    program at{" "}
                    <Link href="https://www.solacc.edu" target="_blank" className="text-primary underline">
                        South Louisiana Community College
                    </Link>
                    . The ASDV program offers an Associate of Applied Science degree designed to prepare students for
                    careers in software development and related technology fields. Students who wish to continue their
                    education can also benefit from the 2+2 transfer agreement with{" "}
                    <Link href="https://louisiana.edu" target="_blank" className="text-primary underline">
                        University of Louisiana at Lafayette
                    </Link>
                    , allowing them to continue into the{" "}
                    <Link
                        href="https://louisiana.edu/majors-minors/informatics"
                        target="_blank"
                        className="text-primary underline"
                    >
                        Informatics
                    </Link>{" "}
                    program after completing the ASDV degree.
                </p>
                <p>
                    The goal of this site is simple: make it easier for students to succeed while building a strong
                    community around software development education.
                </p>
            </section>
            <section className="flex flex-col gap-4">
                <h2 className="text-xl font-bold">What You&#39;ll Find Here</h2>
                <p>
                    ASDV Resources provides a growing collection of tools and information related to software
                    development and the ASDV curriculum, including:
                </p>
                <ul className="list-disc pl-6">
                    <li>Lists of textbooks commonly used in ASDV courses</li>
                    <li>Descriptions and purchase links for required and recommended books</li>
                    <li>Collections of useful development resources and reference materials</li>
                    <li>Tutorials focused on course-specific topics and general software development concepts</li>
                    <li>Download links and explanations for software required in ASDV courses</li>
                    <li>
                        Community discussion through Discord channels dedicated to courses, tutoring, study groups, and
                        collaboration
                    </li>
                </ul>
                <p>
                    As the platform grows, additional content will expand beyond the immediate curriculum to include
                    broader software development topics, professional tools, and career-oriented resources.
                </p>
            </section>
            <section className="flex flex-col gap-4">
                <h2 className="text-xl font-bold">Community and Collaboration</h2>
                <p>
                    ASDV Resources is not intended to be a static website maintained by a single person. One of the
                    primary goals of the project is to encourage participation and collaboration from students and
                    alumni.
                </p>
                <p>Planned community features include:</p>
                <ul className="list-disc pl-6">
                    <li>User-submitted tutorials</li>
                    <li>Blog posts written by students and contributors</li>
                    <li>Comment systems for tutorials and blog posts</li>
                    <li>Project showcases to highlight work created by members of the community</li>
                    <li>Open-source contributions through pull requests, bug fixes, and feature development</li>
                </ul>
                <p>
                    Students are encouraged to contribute content, improve the platform, and use their work here as part
                    of their professional portfolios and resumes. Real-world collaboration, documentation,
                    communication, and software maintenance are all valuable development skills, and this platform is
                    intended to provide opportunities to practice them in a meaningful environment.
                </p>
            </section>
            <section className="flex flex-col gap-4">
                <h2 className="text-xl font-bold">Why This Project Exists</h2>
                <p>
                    ASDV Resources was also created as a practical software development project — something larger and
                    more realistic than a classroom assignment or isolated tutorial project.
                </p>
                <p>The site serves as:</p>
                <ul className="list-disc pl-6">
                    <li>A learning resource</li>
                    <li>A collaborative development environment</li>
                    <li>A portfolio project</li>
                    <li>A community hub for current students and alumni</li>
                </ul>
                <p>
                    By building and maintaining a platform used by real students, contributors gain experience working
                    on an evolving application with actual users and practical requirements. Contributors can point to
                    their work on this project as evidence of real-world development experience.
                </p>
            </section>
            <section className="flex flex-col gap-4">
                <h2 className="text-xl font-bold">Looking Forward</h2>
                <p>
                    This project is still growing, and many planned features are actively in development. The long-term
                    vision is to create a sustainable resource that continues helping students long after they complete
                    the ASDV program.
                </p>
                <p>
                    Whether you are a current student, graduate, hobbyist, or aspiring developer, you are welcome here.
                </p>
                <p>
                    We hope ASDV Resources becomes a place where people can learn, collaborate, build experience, and
                    help others succeed in software development.
                </p>
            </section>
        </main>
    );
}

export default AboutPage;
