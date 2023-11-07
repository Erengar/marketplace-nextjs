'use client'

export default function Error({error, reset}: {error: string, reset: () => void}) {
    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold">Error</h1>
            <p className="text-xl">{error}</p>
            <button className="mt-4 px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md" onClick={reset}>Reset</button>
        </div>
    )
}