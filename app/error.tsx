"use client";

export default function Error({
    error,
    reset,
}: {
    error: string;
    reset: () => void;
}) {
    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">Error</h1>
            <p className="text-xl">{error}</p>
            <button
                className="mt-4 rounded-md bg-blue-500 px-2 py-1 text-white hover:bg-blue-600"
                onClick={reset}
            >
                Reset
            </button>
        </div>
    );
}
