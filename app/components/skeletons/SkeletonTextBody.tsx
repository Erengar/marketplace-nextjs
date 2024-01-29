export default function SkeletonTextBody({length = 25} : {length?: number}) {
    const lengths = [96, 40, 48, 64, 80, 24, 52]
    return (
        <div className="flex flex-wrap gap-1">
            {Array.from({length: length}).map((_, i) => {
                const randomIndex = Math.floor(Math.random() * lengths.length);
                const randomNumber = lengths[randomIndex];
                return(<div key={i} className={`h-2 md:h-4 w-${randomNumber} bg-slate-300 rounded animate-pulse duration-1000`}/>)
                }
            )}
        </div>
    )
}