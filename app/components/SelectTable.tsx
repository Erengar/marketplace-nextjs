"use client";
import { useRouter } from "next/router";


export default function SelectTable(props: {selectedTable: string, setSelectedTable: (value: string) => void}){

    function selectTable(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        if (e.currentTarget.textContent){
            props.setSelectedTable(e.currentTarget.textContent);
        }
    }
    return (
        <div className="flex justify-center font-bold md:text-lg antialised pt-4 divide-x">
            <button onClick={selectTable} className={`border-black hover:bg-blue-400 px-4 py-2 rounded-tl ${props.selectedTable === 'Category'? 'bg-slate-100': "bg-blue-200"}`}>
                <h2>Category</h2>
            </button>
            <button onClick={selectTable} className={`border-black hover:bg-blue-400 px-4 py-2 rounded-tr ${props.selectedTable === 'Products'? 'bg-slate-100': "bg-blue-200"}`}>
                <h2>Products</h2>
            </button>
        </div>
    )
}