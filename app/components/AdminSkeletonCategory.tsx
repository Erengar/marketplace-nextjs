"use client";

export default function AdminSkeletonCategory() {
    const numberOfSkeletons = 10;
    return (
        <>
            {Array.from({ length: numberOfSkeletons }).map((_, index) => (
            <li key={index} className="flex flex-row justify-between items-center py-2 px-4">
                <span className="w-11/12 h-4 bg-slate-300 rounded animate-pulse duration-1000"></span>
                <span className="w-1/12 h-4 bg-slate-300 rounded animate-pulse duration-1000"></span>
            </li>
            ))}
        </>
    )
}