"use server"

import { type CategoryType} from "../../../db/schema"
import Link from "next/link"

export default async function Sidebar(props: { category: CategoryType, selectedCategory: string }) {
    if ( props.category.name.toLowerCase() == props.selectedCategory ) {
        return (
        <Link href={`${props.category.name.toLowerCase()}`}>
            <li className="h-12 flex justify-center
            dark: bg-slate-500
            bg-white"
            >
                {props.category.name}
            </li>
        </Link>
        )
    } else {
        return(
        <Link href={`${props.category.name.toLowerCase()}`}>
            <li className="h-12 flex justify-center
            dark:bg-slate-700 dark:hover:bg-slate-600
            bg-slate-200 hover:bg-slate-400"
            >
                {props.category.name}
            </li>
        </Link>
    )
}}