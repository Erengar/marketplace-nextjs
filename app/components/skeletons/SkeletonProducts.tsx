"use client";

export default function SkeletonProducts({
    numberOfSkeletons,
}: {
    numberOfSkeletons: number;
}) {
    return (
        <>
            {Array.from({ length: numberOfSkeletons }).map((_, index) => (
                <li key={index} className="h-72 w-80 grow rounded">
                    <div className="h-56 w-full animate-pulse rounded bg-slate-300 duration-1000"></div>
                    <div className="mt-1 flex w-full justify-between">
                        <div className="flex w-1/2 flex-col justify-between gap-1 pt-0.5">
                            <div className="h-[1.125rem] w-1/2 w-48 animate-pulse rounded bg-slate-300 duration-1000"></div>
                            <div className="h-4 w-1/4 animate-pulse rounded bg-slate-300 duration-1000"></div>
                        </div>
                        <div className="h-10 w-10 animate-pulse rounded bg-slate-300 duration-1000"></div>
                    </div>
                </li>
            ))}
        </>
    );
}
