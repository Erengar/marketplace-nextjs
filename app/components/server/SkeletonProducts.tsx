export default function SkeletonProducts({numberOfSkeletons}: {numberOfSkeletons: number}){
    return (
        <>
            <ul className="flex gap-3 flex-wrap">
                {Array.from({ length: numberOfSkeletons }).map((_, index) => (
                    <li key={index} className=" rounded w-80 h-72 grow md:grow-0">
                        <div className="w-full h-48 bg-slate-300 rounded animate-pulse duration-1000"></div>
                        <div className="flex justify-between w-full mt-1">
                            <div className="flex flex-col justify-between pt-0.5 gap-1 w-1/2">
                                <div className="w-1/2 h-4 bg-slate-300 rounded animate-pulse duration-1000"></div>
                                <div className="w-1/4 h-4 bg-slate-300 rounded animate-pulse duration-1000"></div>
                            </div>
                            <div className="w-10 h-10 bg-slate-300 rounded animate-pulse duration-1000"></div>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    )
}