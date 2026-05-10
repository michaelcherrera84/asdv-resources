/**
 * Main card component.
 *
 * @param className additional classes to be added to the card
 * @param style additional styles to be added to the card
 * @param children children of the card
 * @param props additional props to be added to the card
 * @constructor
 */
function MainCard({ className = "", style, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={`inset-shadow-md mb-1 flex flex-col rounded-md shadow-md inset-shadow-xs ${className}`}
            style={{ ...style }}
            {...props}
        >
            {children}
        </div>
    );
}

/**
 * Card header component.
 *
 * @param className additional classes to be added to the card header
 * @param children children of the card header
 * @param props additional props to be added to the card header
 */
export function CardHeader({ className = "", children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={`flex flex-col items-center sm:items-start ${className}`} {...props}>
            {children}
        </div>
    );
}

/**
 * Card body component.
 *
 * @param className additional classes to be added to the card body
 * @param children children of the card body
 * @param props additional props to be added to the card body
 */
export function CardBody({ className = "", children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={`flex flex-1 flex-col ${className}`} {...props}>
            {children}
        </div>
    );
}

/**
 * Card footer component.
 *
 * @param className additional classes to be added to the card footer
 * @param children children of the card footer
 * @param props additional props to be added to the card footer
 */
export function CardFooter({ className = "", children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={`flex flex-col ${className}`} {...props}>
            {children}
        </div>
    );
}

/**
 * Card component with header, body, and footer.
 */
export const Card = Object.assign(MainCard, {
    Header: CardHeader,
    Body: CardBody,
    Footer: CardFooter,
});
