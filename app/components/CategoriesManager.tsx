"use client";
import {CategoryType} from "../schemas"
import CancelIcon from '@mui/icons-material/Cancel';
import { useState } from "react";
import LoadingModal from "./LoadingModal";

export default function CategoriesManager({category, needRerender, setNeedRerender}: {category: CategoryType, needRerender: boolean, setNeedRerender: (value: boolean) => void}) {
    const [isDeleting, setIsDeleting] = useState(false);

    async function deleteCategory() {
        setIsDeleting(true);
        await fetch(`/api/categories/${category.name}`, {
            method: 'DELETE',
        })
        setIsDeleting(false);
        setNeedRerender(!needRerender);
    }
    return (
        <li className="border-black flex justify-between">
            {isDeleting && <LoadingModal text="Deleting"/>}
            <span>{category.name}</span>
            <button onClick={deleteCategory} className='text-red-600 hover:text-red-800'><CancelIcon/></button>
        </li>
    );
}