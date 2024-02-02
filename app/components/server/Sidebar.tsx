"use server";

import { type CategoryType } from "../../../db/schema";
import Link from "next/link";

export default async function Sidebar(props: {
    category: CategoryType;
    selectedCategory: string;
}) {
    return (
        <Link href={`${props.category.slug}`} scroll={false}>
            <li
                className={`flex h-12 justify-center text-sky-900
            ${props.category.slug == props.selectedCategory ? "bg-slate-100" : "bg-sky-100"} hover:bg-slate-100
            dark:bg-slate-700 dark:hover:bg-slate-600`}
            >
                {props.category.name}
            </li>
        </Link>
    );
}
