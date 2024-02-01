"use client";

export default function Error({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    return (
        <div className="text-2xl font-bold text-red-500">
            <p>Something went wrong, please refresh the page</p>
        </div>
    );
}
