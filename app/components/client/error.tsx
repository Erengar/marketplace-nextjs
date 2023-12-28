"use client";

export default function Error({error, reset}: {error: Error, reset: () => void}) {
    return (
        <div className="text-red-500 text-2xl font-bold">
            <p>Something went wrong, please refresh the page</p>
        </div>
    )
}