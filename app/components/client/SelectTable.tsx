"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SelectTable() {
    const url = usePathname();
    return (
        <div className="antialised flex justify-center divide-x pt-4 text-xs font-bold dark:text-gray-200 md:text-lg">
            <Link
                href="/admin/categories"
                className={`rounded-tl border-black px-4 py-2 hover:bg-blue-400 dark:hover:bg-slate-800 ${url.endsWith("categories") ? "bg-slate-100 dark:bg-slate-800" : "bg-blue-200 dark:bg-slate-600"}`}
            >
                <h2>Categories</h2>
            </Link>
            <Link
                href="/admin/products"
                className={`rounded-tr border-black px-4 py-2 hover:bg-blue-400 dark:hover:bg-slate-800 ${url.endsWith("products") ? "bg-slate-100 dark:bg-slate-800" : "bg-blue-200 dark:bg-slate-500"}`}
            >
                <h2>Products</h2>
            </Link>
        </div>
    );
}
