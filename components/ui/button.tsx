/**
 * Props for the Button component.
 */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
}

/**
 * Reusable button component.
 */
function Button({ children, className, ...props }: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            className={`bg-primary text-foreground rounded-md px-4 py-2 font-bold transition-all duration-200 hover:brightness-90 ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;
