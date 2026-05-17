/**
 * Props for the ResourceMobileSheet component.
 */
interface ResourceMobileSheetProps {
    children: React.ReactNode;
    // Whether the sheet is open or closed
    isOpen: boolean;
}

/**
 * Resource mobile sheet component.
 *
 * Displays a sheet at the bottom of a small screen that can be toggled open or closed.
 */
function ResourceMobileSheet({ children, isOpen }: ResourceMobileSheetProps) {
    return (
        <div
            className={`fixed bottom-0 left-0 z-50 flex h-72 w-full flex-col gap-4 overflow-auto rounded-t-lg bg-white p-8 text-blue-600 underline underline-offset-2 shadow-[0_-1px_5px_rgba(0,0,0,0.3)] transition-transform duration-300 ease-in-out sm:hidden ${
                isOpen ? "translate-y-0" : "pointer-events-none translate-y-full"
            }`}
        >
            {children}
        </div>
    );
}

export default ResourceMobileSheet;
