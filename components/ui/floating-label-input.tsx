import { ComponentPropsWithoutRef } from "react";

interface FloatingLabelInputProps extends ComponentPropsWithoutRef<"input"> {
    label: string;
    className?: string;
}

/**
 * Reusable floating label input component.
 *
 * Features:
 * - Extends all native HTML input props
 * - Supports a floating label UI pattern
 * - Uses Tailwind peer selectors for label animation
 *
 * Floating label behavior:
 * - Label appears centered when input is empty
 * - Label shrinks and moves upward when:
 *   - input is focused
 *   - input contains a value
 *
 * This component helps standardize form styling
 * across the application.
 */
function FloatingLabelInput({ label, id, className, ...props }: FloatingLabelInputProps) {
    return (
        <div className="relative">
            <input
                id={id}
                className={`peer w-full rounded-md border border-gray-300 pt-5 pb-1 pl-2 ${className}`}
                placeholder=" "
                {...props}
            />
            <label
                htmlFor={id}
                className="absolute top-3 left-3 text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-xs"
            >
                {label}
            </label>
        </div>
    );
}

export default FloatingLabelInput;
