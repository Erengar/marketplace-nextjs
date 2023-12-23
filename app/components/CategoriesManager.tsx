"use client";
import {CategoryType} from "../schemas"
import CancelIcon from '@mui/icons-material/Cancel';
import { revalidateTag } from "next/cache";
import { useState } from "react";

export default function CategoriesManager({category, needRerender, setNeedRerender}: {category: CategoryType, needRerender: boolean, setNeedRerender: (value: boolean) => void}) {
    const [statusDelete, setStatusDelete] = useState(false);

    async function deleteCategory() {
        await fetch(`/api/categories/${category.name}`, {
            method: 'DELETE',
        })
        setNeedRerender(!needRerender);
    }
    return (
        <li className="border-black flex justify-between">
            <span>{category.name}</span>
            {statusDelete && <span>Something went wrong!</span>}
            <button onClick={deleteCategory} className='text-red-600 hover:text-red-800'><CancelIcon/></button>
        </li>
    );
}