"use client";
import AddCategory from "./AddCategory";
import SelectTable from "./SelectTable";
import { useState, useEffect } from "react";
import AddProduct from "./AddProduct";
import { useRouter, useSearchParams } from "next/navigation";
import { type CategoryType } from "../../../db/schema";

export default function AdminSection() {
    const router = useRouter();
    const searchParams = useSearchParams()
    const [categories, setCategories] = useState<CategoryType[] | null>(null);
    const [selectedTable, setSelectedTable] = useState("category");

    useEffect(() => {
        router.replace(`/admin?table=${selectedTable.toLocaleLowerCase()}`)
    }, [selectedTable]);

    //This is a hack to get the table from the url, to allow navigation to the correct table when the page is refreshed
    useEffect(() => {
        if (searchParams.get('table')) {
            setSelectedTable(searchParams.get('table') as string);
        }
    }, [searchParams]);
    return (
        <>
            <SelectTable selectedTable={selectedTable} setSelectedTable={setSelectedTable}/>
            {selectedTable === "category" && <AddCategory categories={categories} setCategories={setCategories}/>}
            {selectedTable === "products" && <AddProduct categories={categories}/>}
        </>
    )
}