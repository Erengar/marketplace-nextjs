"use client"

export default function ProductSort({setSortSignal}: {setSortSignal: React.Dispatch<React.SetStateAction<string>>}) {
    return (
        <select className="border rounded border-black">
            <option value="name" onClick={() => setSortSignal("name")}>Name A-Z</option>
            <option value="name-desc" onClick={() => setSortSignal("-name")}>Name Z-a</option>
            <option value="price" onClick={() => setSortSignal("price")}>Price From Lowest</option>
            <option value="price-desc" onClick={() => setSortSignal("-price")}>Price From Highest</option>
        </select>
    )
}