"use client";

type AdminErrorMessageProps = {
    message: any;
    className?: string;
};

export default function AdminErrorMessage({
    message,
    className,
}: AdminErrorMessageProps) {
    return (
        <div className={className}>
            {typeof message === "string" ? (
                <p className="text-xs text-red-500 md:text-base">{message}</p>
            ) : (
                Object.values(message).map((error: any) => (
                    <p key="s" className="text-xs text-red-500 md:text-base">
                        {[...error]}
                    </p>
                ))
            )}
        </div>
    );
}
