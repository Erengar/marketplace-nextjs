"use client"

type PaginationProps = {
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    totalObjects: number;
    itemsPerPage: number;
}

export default function Pagination({currentPage, setCurrentPage, totalObjects, itemsPerPage}:PaginationProps) {
    //This ensures that the totalObjects is never 0, because if it is, the pagination will not render
    totalObjects = totalObjects || 1;
    const pages = Math.ceil(totalObjects/itemsPerPage);
    return (
        <div className="flex gap-4 self-center place-self-center self-center items-end">
            {pages <= 5
            ? Array.from({length: pages}).map((page, index) => (
                <button key={index} onClick={() => setCurrentPage(index+1)}
                className={`border rounded border-black h-6 md:h-8 w-6 md:w-8 text-sm md:text-base antialiased bg-slate-200 hover:bg-slate-400 ${currentPage=== index+1? 'bg-slate-400': null}`}>{index + 1}</button>
            ))
            : currentPage <= 3 
                ? (<>
                    {Array.from({length: 4}).map((page, index) => (
                    <button key={index} onClick={() => setCurrentPage(index+1)}
                    className={`border rounded border-black h-6 md:h-8 w-6 md:w-8 text-sm md:text-base antialiased bg-slate-200 hover:bg-slate-400 ${currentPage=== index+1? 'bg-slate-400': null}`}>{index + 1}</button>
                    ))}
                    <span>...</span>
                    <button onClick={() => setCurrentPage(pages)} className={`border rounded border-black h-6 md:h-8 w-6 md:w-8 text-sm md:text-base antialiased bg-slate-200 hover:bg-slate-400`}>{pages}</button>
                </>)
                : currentPage >= pages -2
                    ? (<>
                        <button onClick={() => setCurrentPage(1)} className={`border rounded border-black h-6 md:h-8 w-6 md:w-8 text-sm md:text-base antialiased bg-slate-200 hover:bg-slate-400`}>1</button>
                        <span>...</span>
                        {Array.from({length: 4}).map((page, index) => (
                        <button key={index} onClick={() => setCurrentPage(pages-3+index)}
                        className={`border rounded border-black h-6 md:h-8 w-6 md:w-8 text-sm md:text-base antialiased bg-slate-200 hover:bg-slate-400 ${currentPage=== pages-3+index? 'bg-slate-400': null}`}>{pages-3+index}</button>
                        ))}
                    </>)
                    : (<>
                        <button onClick={() => setCurrentPage(1)} className={`border rounded border-black h-6 md:h-8 w-6 md:w-8 text-sm md:text-base antialiased bg-slate-200 hover:bg-slate-400`}>1</button>
                        <span>...</span>
                        <button onClick={() => setCurrentPage((prev) => prev -1)} className={`border rounded border-black h-6 md:h-8 w-6 md:w-8 text-sm md:text-base antialiased bg-slate-200 hover:bg-slate-400`}>{currentPage-1}</button>
                        <button className={`border rounded border-black h-6 md:h-8 w-6 md:w-8 text-sm md:text-base antialiased bg-slate-400`}>{currentPage}</button>
                        <button onClick={() => setCurrentPage((prev)=> prev +1)} className={`border rounded border-black h-6 md:h-8 w-6 md:w-8 text-sm md:text-base antialiased bg-slate-200 hover:bg-slate-400`}>{currentPage+1}</button>
                        <span>...</span>
                        <button onClick={() => setCurrentPage(pages)} className={`border rounded border-black h-6 md:h-8 w-6 md:w-8 text-sm md:text-base antialiased bg-slate-200 hover:bg-slate-400`}>{pages}</button>
                    </>)
            }
        </div>
    )
}