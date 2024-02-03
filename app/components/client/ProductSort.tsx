"use client";

export default function ProductSort({
    setSortSignal,
}: {
    setSortSignal: React.Dispatch<React.SetStateAction<string>>;
}) {
    return (
        <>
            <label htmlFor="categories-filter" className="sr-only">
                Filter by Category
            </label>
            <select
                id="categories-filter"
                className="h-6 rounded border border-sky-950 dark:border-sky-200 pl-2 text-xs font-semibold text-sky-950 dark:text-sky-200 hover:shadow md:h-8 md:text-base"
            >
                <option value="name" onClick={() => setSortSignal("name")}>
                    Name A-Z
                </option>
                <option
                    value="name-desc"
                    onClick={() => setSortSignal("-name")}
                >
                    Name Z-a
                </option>
                <option value="price" onClick={() => setSortSignal("price")}>
                    Price From Lowest
                </option>
                <option
                    value="price-desc"
                    onClick={() => setSortSignal("-price")}
                >
                    Price From Highest
                </option>
            </select>
        </>
    );
}
