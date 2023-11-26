import {CategoryType} from "../../../schemas"
import Link from "next/link"

export default function Sidebar(props: { category: CategoryType, selectedCategory: string }) {
    if ( props.category.name.toLowerCase() == props.selectedCategory ) {
        return (
        <Link href={`${props.category.name.toLowerCase()}`}>
            <li className="bg-slate-600 h-12 flex justify-center">
                {props.category.name}
            </li>
        </Link>
        )
    } else {
        return(
        <Link href={`${props.category.name.toLowerCase()}`}>
            <li className="bg-slate-200 hover:bg-slate-400 h-12 flex justify-center">
                {props.category.name}
            </li>
        </Link>
    )
}}