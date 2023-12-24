"use client";
import AddCategory from "./AddCategory";
import SelectTable from "./SelectTable";
import { useState, useEffect } from "react";
import AddProduct from "./AddProduct";
import { useRouter } from "next/navigation";

export default function AdminSection() {
    const router = useRouter();
    const [selectedTable, setSelectedTable] = useState("Category");
    useEffect(() => {
        router.push(`/admin?table=${selectedTable.toLocaleLowerCase}`)
    }, [selectedTable])
    return (
        <>
            <SelectTable selectedTable={selectedTable} setSelectedTable={setSelectedTable}/>
            {selectedTable === "Category" && <AddCategory/>}
            {selectedTable === "Product" && <AddProduct/>}
        </>
    )
}