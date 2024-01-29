"use client"


export default function SkeletonProducts({numberOfSkeletons}: {numberOfSkeletons: number}){
    return (
            <>
                {Array.from({ length: numberOfSkeletons }).map((_, index) => (
                    <li key={index} className="rounded w-80 h-72 grow">
                        <div className="w-full h-56 bg-slate-300 rounded animate-pulse duration-1000"></div>
                        <div className="flex justify-between w-full mt-1">
                            <div className="flex flex-col justify-between pt-0.5 gap-1 w-1/2">
                                <div className="w-1/2 h-[1.125rem] w-48 bg-slate-300 rounded animate-pulse duration-1000"></div>
                                <div className="w-1/4 h-4 bg-slate-300 rounded animate-pulse duration-1000"></div>
                            </div>
                            <div className="w-10 h-10 bg-slate-300 rounded animate-pulse duration-1000"></div>
                        </div>
                    </li>
                ))}
            </>
    )
}