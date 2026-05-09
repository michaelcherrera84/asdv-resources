/**
 * Home page component.
 *
 * Responsibilities:
 * - Display a hero section with a call-to-action
 * - Provide a list of resources categorized by type
 * - Include a footer with important information
 */
export default function Home() {
    return (
        <main className="flex flex-col items-center">
            <div className="flex flex-col items-center gap-2 py-12 text-center md:py-14 lg:gap-5 lg:py-24">
                <h1 className="text-primary text-xl leading-tight font-semibold sm:max-w-md sm:text-2xl md:max-w-lg md:text-4xl lg:max-w-2xl lg:text-5xl lg:font-normal xl:max-w-3xl xl:text-6xl">
                    Companion for Application Software Development
                </h1>
                <h2 className="text-sm text-gray-500 md:text-lg lg:text-xl xl:text-2xl">
                    Your hub for essential study materials, tools, and links.
                </h2>
            </div>

            {/* Resources Section */}
            <div className="border-primary flex flex-col gap-10 bg-[#FCF2E7] p-4 text-center sm:w-full lg:w-7xl lg:gap-16 lg:rounded-xl lg:border-3 lg:px-20 lg:pt-12 lg:pb-20">
                <div className="flex flex-col items-center gap-2 lg:gap-4">
                    <h3 className="text-primary text-lg font-bold md:text-2xl lg:text-3xl">Explore Resources</h3>
                    <h4 className="px-4 text-xs text-gray-500 sm:max-w-md sm:text-sm lg:max-w-xl lg:text-lg">
                        Whether you&#39;re just starting out or preparing for graduation, this companion keeps
                        everything you need in one place.
                    </h4>
                </div>
                <div className="grid grid-cols-1 place-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="flex min-h-48 max-w-xs flex-col rounded-md bg-white shadow-md sm:place-self-end lg:place-self-center">
                        <div className="bg-primary rounded-t-md py-3 text-lg font-bold text-white">Books</div>
                        <div className="flex flex-1 items-center p-6 text-lg">
                            <p>Find recommended reading for each semester and course.</p>
                        </div>
                    </div>
                    <div className="flex min-h-48 max-w-xs flex-col rounded-md bg-white shadow-md sm:place-self-start lg:place-self-center">
                        <div className="bg-primary rounded-t-md py-3 text-lg font-bold text-white">Important Links</div>
                        <div className="flex flex-1 items-center p-6 text-lg">
                            <p>Access tutorials, official documentation, and student tools.</p>
                        </div>
                    </div>
                    <div className="flex min-h-48 max-w-xs flex-col rounded-md bg-white shadow-md sm:col-span-2 lg:col-span-1">
                        <div className="bg-primary rounded-t-md py-3 text-lg font-bold text-white">Applications</div>
                        <div className="flex flex-1 items-center p-6 text-lg">
                            <p>Discover software and utilities to improve your workflow.</p>
                        </div>
                    </div>
                </div>
            </div>
            <p className="min-h-48 p-4 text-center text-sm text-gray-500 md:text-base lg:text-lg">
                Need guidance or have a suggestion for new resources? Connect through the discussion server or contact
                your program tutor.
            </p>

            <footer className="bg-secondary relative min-h-48 w-full">
                <p className="absolute bottom-4 px-4 text-sm text-gray-500">
                    <strong>Disclaimer:</strong> ASDV Resources is an independent, community-driven project created by
                    current students and alumni of the Application Software Development program. This site is not an
                    official website of South Louisiana Community College and is not affiliated with, endorsed by, or
                    operated by the college or its Application Software Development program. All content is provided for
                    informational and community support purposes only.
                </p>
            </footer>
        </main>
    );
}
