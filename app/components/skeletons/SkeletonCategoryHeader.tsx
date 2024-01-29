import SkeletonTextBody from "./SkeletonTextBody"


export default async function SkeletonCategoryHeader() {
    return (
        <>
        <div className="flex justify-center mt-2">
            <div className="h-4 md:h-8 w-56 bg-slate-300 rounded animate-pulse duration-1000"/>
        </div>
        <div className="mx-4 lg:mx-32 mt-4 mb-4">
            <SkeletonTextBody length={50}/>
        </div>
        </>
    )
}