"use client"

type AdminErrorMessageProps = {
    message: any;
    className?: string;
}

export default function AdminErrorMessage({message, className}: AdminErrorMessageProps) {
    return (
        <div className={className}>
            {typeof message === 'string'
            ? <p className="text-xs md:text-base text-red-500">{message}</p>
            : Object.values(message).map((error: any)=> (
                <p key="s"className="text-xs md:text-base text-red-500">{[...error]}</p>)
            )
            }
        </div>
    )
}