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
                className="rounded border border-black"
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
