"use server"


export default async function ProductViewSkeleton({modal=false} : {modal?: boolean}) {
    const lengths = [96, 40, 48, 64, 80, 24, 52]
    return(
        <div className={`bg-slate-100 ${modal? null: "md:w-3/4"} grid grid-cols-1 lg:grid-cols-2 rounded`}>
            <div className='col-span-1 md:p-8 flex justify-center'>
                <div className="w-[38.75rem] h-[24rem] md:h-96 lg:h-[32.5rem] bg-slate-300 rounded animate-pulse duration-1000"/>
            </div>
            <div className='col-span-1 flex flex-col justify-between h-full place-items-center gap-4 p-4 md:p-8'>
                <div className="border rounded bg-slate-100 w-full h-1/2 flex flex-col place-items-center justify-around gap-1 lg:gap-0">
                    <div className="h-4 md:h-5 w-32 bg-slate-300 rounded animate-pulse duration-1000"/>
                    <div className="h-4 md:h-5 w-24 bg-slate-300 rounded animate-pulse duration-1000"/>
                    <div className="h-9 lg:h-11 w-24 lg:w-28 bg-slate-300 rounded animate-pulse duration-1000"/>
                </div>
                <div className="flex flex-wrap gap-1">
                    {Array.from({length: 25}).map((_, i) => {
                        const randomIndex = Math.floor(Math.random() * lengths.length);
                        const randomNumber = lengths[randomIndex];
                        return(<div key={i} className={`h-4 w-${randomNumber} bg-slate-300 rounded animate-pulse duration-1000`}/>)
                    }
                )}
                </div>
            </div>
        </div>
    )
}