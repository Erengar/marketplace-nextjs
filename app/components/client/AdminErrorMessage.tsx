"use client"

export default function AdminErrorMessage({message, className}: {message: any, className?: string}) {
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