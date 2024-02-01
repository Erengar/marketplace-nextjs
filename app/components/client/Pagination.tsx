"use client";

type PaginationProps = {
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    totalObjects: number;
    itemsPerPage: number;
};

export default function Pagination({
    currentPage,
    setCurrentPage,
    totalObjects,
    itemsPerPage,
}: PaginationProps) {
    //This ensures that the totalObjects is never 0, because if it is, the pagination will not render
    totalObjects = totalObjects || 1;
    const pages = Math.ceil(totalObjects / itemsPerPage);
    return (
        <div className="flex items-end gap-4 place-self-center self-center self-center">
            {pages <= 5 ? (
                Array.from({ length: pages }).map((page, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`h-6 w-6 rounded border border-black bg-slate-200 text-sm antialiased hover:bg-slate-400 md:h-8 md:w-8 md:text-base ${currentPage === index + 1 ? "bg-slate-400" : null}`}
                    >
                        {index + 1}
                    </button>
                ))
            ) : currentPage <= 3 ? (
                <>
                    {Array.from({ length: 4 }).map((page, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`h-6 w-6 rounded border border-black bg-slate-200 text-sm antialiased hover:bg-slate-400 md:h-8 md:w-8 md:text-base ${currentPage === index + 1 ? "bg-slate-400" : null}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <span>...</span>
                    <button
                        onClick={() => setCurrentPage(pages)}
                        className={`h-6 w-6 rounded border border-black bg-slate-200 text-sm antialiased hover:bg-slate-400 md:h-8 md:w-8 md:text-base`}
                    >
                        {pages}
                    </button>
                </>
            ) : currentPage >= pages - 2 ? (
                <>
                    <button
                        onClick={() => setCurrentPage(1)}
                        className={`h-6 w-6 rounded border border-black bg-slate-200 text-sm antialiased hover:bg-slate-400 md:h-8 md:w-8 md:text-base`}
                    >
                        1
                    </button>
                    <span>...</span>
                    {Array.from({ length: 4 }).map((page, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentPage(pages - 3 + index)}
                            className={`h-6 w-6 rounded border border-black bg-slate-200 text-sm antialiased hover:bg-slate-400 md:h-8 md:w-8 md:text-base ${currentPage === pages - 3 + index ? "bg-slate-400" : null}`}
                        >
                            {pages - 3 + index}
                        </button>
                    ))}
                </>
            ) : (
                <>
                    <button
                        onClick={() => setCurrentPage(1)}
                        className={`h-6 w-6 rounded border border-black bg-slate-200 text-sm antialiased hover:bg-slate-400 md:h-8 md:w-8 md:text-base`}
                    >
                        1
                    </button>
                    <span>...</span>
                    <button
                        onClick={() => setCurrentPage((prev) => prev - 1)}
                        className={`h-6 w-6 rounded border border-black bg-slate-200 text-sm antialiased hover:bg-slate-400 md:h-8 md:w-8 md:text-base`}
                    >
                        {currentPage - 1}
                    </button>
                    <button
                        className={`h-6 w-6 rounded border border-black bg-slate-400 text-sm antialiased md:h-8 md:w-8 md:text-base`}
                    >
                        {currentPage}
                    </button>
                    <button
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                        className={`h-6 w-6 rounded border border-black bg-slate-200 text-sm antialiased hover:bg-slate-400 md:h-8 md:w-8 md:text-base`}
                    >
                        {currentPage + 1}
                    </button>
                    <span>...</span>
                    <button
                        onClick={() => setCurrentPage(pages)}
                        className={`h-6 w-6 rounded border border-black bg-slate-200 text-sm antialiased hover:bg-slate-400 md:h-8 md:w-8 md:text-base`}
                    >
                        {pages}
                    </button>
                </>
            )}
        </div>
    );
}
