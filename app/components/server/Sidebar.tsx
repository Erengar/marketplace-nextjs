"use server";

import { type CategoryType } from "../../../db/schema";
import Link from "next/link";

export default async function Sidebar(props: {
    category: CategoryType;
    selectedCategory: string;
}) {
    if (props.category.slug == props.selectedCategory) {
        return (
            <Link href={`${props.category.slug}`} scroll={false}>
                <li
                    className="dark: flex h-12
            justify-center bg-slate-500
            bg-white"
                >
                    {props.category.name}
                </li>
            </Link>
        );
    } else {
        return (
            <Link href={`${props.category.slug}`} scroll={false}>
                <li
                    className="flex h-12 justify-center
            bg-slate-200 hover:bg-slate-400
            dark:bg-slate-700 dark:hover:bg-slate-600"
                >
                    {props.category.name}
                </li>
            </Link>
        );
    }
}
