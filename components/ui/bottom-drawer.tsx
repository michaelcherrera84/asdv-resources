"use client";

import Button from "@/components/ui/button";
import { ReactNode, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

function BottomDrawer({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className={`fixed bottom-0 left-0 z-50 w-full transition-transform duration-300 ease-in-out ${
                isOpen ? "translate-y-0" : "translate-y-full"
            }`}
        >
            <Button
                onClick={() => setIsOpen(!isOpen)}
                className="absolute -top-6 left-5 rounded-b-none py-1!"
                title="Toggle Disclaimer"
            >
                {isOpen ? <FaChevronDown /> : <FaChevronUp />}
            </Button>

            <div className="flex h-72 flex-col gap-4 overflow-auto rounded-t-lg bg-gray-100 p-8 text-sm text-gray-600 shadow-[0_-1px_5px_rgba(0,0,0,0.3)]">
                {children}
            </div>
        </div>
    );
}

export default BottomDrawer;
