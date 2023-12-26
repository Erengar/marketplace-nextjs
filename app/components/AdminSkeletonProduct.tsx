export default function AdminSkeletonProduct() {
    const numberOfSkeletons = 10;
    return (
        <>
        {Array.from({ length: numberOfSkeletons }).map((_, index) => (
            <li key={index} className="flex flex-row justify-between items-center py-2 pr-4">
                <span className="w-10 h-12 bg-slate-300 rounded animate-pulse duration-1000"></span>
                <span className="w-2/12 h-4 bg-slate-300 rounded animate-pulse duration-1000"></span>
                <span className="w-2/12 h-4 bg-slate-300 rounded animate-pulse duration-1000"></span>
                <span className="w-2/12 h-4 bg-slate-300 rounded animate-pulse duration-1000"></span>
                <span className="w-2/12 h-4 bg-slate-300 rounded animate-pulse duration-1000"></span>
                <span className="w-2/12 h-4 bg-slate-300 rounded animate-pulse duration-1000"></span>
            </li>
        ))}
        </>
    )
}