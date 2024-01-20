"use client"

export default function Pagination({currentPage, setCurrentPage, totalObjects, itemsPerPage}:
    {currentPage: number, setCurrentPage: React.Dispatch<React.SetStateAction<number>>, totalObjects: number, itemsPerPage: number}) {
    return (
        <div className="flex gap-4 self-center place-self-center self-center">
            {Array.from({length: Math.ceil(totalObjects/itemsPerPage)}).map((page, index) => (
                <button key={index} onClick={() => setCurrentPage(index+1)}
                className="border rounded border-black h-6 md:h-8 w-6 md:w-8 text-sm md:text-base antialiased bg-slate-200 hover:bg-slate-400">{index + 1}</button>
            ))}
        </div>
    )
}