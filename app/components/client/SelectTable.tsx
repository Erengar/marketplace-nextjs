"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"


export default function SelectTable(){
    const url = usePathname()
    return (
        <div className="flex justify-center font-bold text-xs md:text-lg antialised pt-4 divide-x">
            <Link
            href="/admin/categories"
            className={`border-black hover:bg-blue-400 px-4 py-2 rounded-tl ${url.endsWith("categories")? 'bg-slate-100': "bg-blue-200"}`}>
                <h2>Categories</h2>
            </Link>
            <Link
            href="/admin/products"
            className={`border-black hover:bg-blue-400 px-4 py-2 rounded-tr ${url.endsWith("products")? 'bg-slate-100': "bg-blue-200"}`}>
                <h2>Products</h2>
            </Link>
        </div>
    )
}