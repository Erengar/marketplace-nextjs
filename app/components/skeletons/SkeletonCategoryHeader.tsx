import SkeletonTextBody from "./SkeletonTextBody";

export default async function SkeletonCategoryHeader() {
    return (
        <>
            <div className="mt-2 flex justify-center">
                <div className="h-4 w-56 animate-pulse rounded bg-slate-300 duration-1000 md:h-8" />
            </div>
            <div className="mx-4 mb-4 mt-4 lg:mx-32">
                <SkeletonTextBody length={50} />
            </div>
        </>
    );
}
