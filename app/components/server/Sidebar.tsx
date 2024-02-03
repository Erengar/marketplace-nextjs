"use server";

import { type CategoryType } from "../../../db/schema";
import Link from "next/link";

type SidebarProps = {
    category: CategoryType;
    selectedCategory: string;
    index: number;
};

export default async function Sidebar({category, selectedCategory, index}: SidebarProps) {
    return (
        <Link href={`${category.slug}`} scroll={false}>
            <li
                className={`${index === 0 ? "dark:rounded-br-lg": "dark:rounded-r-lg"} flex h-12 justify-center text-sky-900
            ${category.slug == selectedCategory ? "bg-slate-50 dark:bg-blue-300" : "bg-sky-100 dark:bg-slate-900 dark:text-sky-100"} hover:bg-slate-50 dark:hover:bg-blue-300
            dark:hover:text-sky-900`}
            >
                {category.name}
            </li>
        </Link>
    );
}
