"use server";

import SkeletonTextBody from "./SkeletonTextBody";

export default async function ProductViewSkeleton({
    modal = false,
}: {
    modal?: boolean;
}) {
    return (
        <div
            className={`bg-slate-100 ${modal ? null : "md:w-3/4"} grid grid-cols-1 rounded lg:grid-cols-2`}
        >
            <div className="col-span-1 flex justify-center md:p-8">
                <div className="h-[24rem] w-[38.75rem] animate-pulse rounded bg-slate-300 duration-1000 md:h-96 lg:h-[32.5rem]" />
            </div>
            <div className="col-span-1 flex h-full flex-col place-items-center justify-between gap-4 p-4 md:p-8">
                <div className="flex h-1/2 w-full flex-col place-items-center justify-around gap-1 rounded border bg-slate-100 lg:gap-0">
                    <div className="h-4 w-32 animate-pulse rounded bg-slate-300 duration-1000 md:h-5" />
                    <div className="h-4 w-24 animate-pulse rounded bg-slate-300 duration-1000 md:h-5" />
                    <div className="h-9 w-24 animate-pulse rounded bg-slate-300 duration-1000 lg:h-11 lg:w-28" />
                </div>
                <SkeletonTextBody />
            </div>
        </div>
    );
}
