"use client";

type AdminErrorMessageProps = {
    message: any;
    className?: string;
    small?: boolean;
};

export default function ErrorMessage({
    message,
    className,
    small = false,
}: AdminErrorMessageProps) {
    return (
        <div className={className}>
            {typeof message === "string" ? (
                <p className={`text-xs text-red-500 ${small ? null : "md:text-base"}`}>{message}</p>
            ) : (
                Object.values(message).map((error: any) => (
                    <p key="s" className={`text-xs text-red-500 ${small ? null : "md:text-base"}`}>
                        {[...error]}
                    </p>
                ))
            )}
        </div>
    );
}
