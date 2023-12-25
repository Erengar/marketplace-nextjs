"use client";
import {CategoryType} from "../schemas"
import CancelIcon from '@mui/icons-material/Cancel';
import { useState } from "react";
import LoadingModal from "./LoadingModal";
import {deleteCategoryServer} from "../serveractions/deleteCategoryServer";


export default function CategoriesManager({category, setNeedRerender}: {category: CategoryType, setNeedRerender: React.Dispatch<React.SetStateAction<boolean>>}) {
    const [isDeleting, setIsDeleting] = useState(false);

    async function deleteCategory() {
        setIsDeleting(true);
        await deleteCategoryServer(category);
        setIsDeleting(false);
        setNeedRerender((prev) => !prev);
    }
    return (
        <li className="border-black flex justify-between">
            {isDeleting && <LoadingModal text="Deleting Category"/>}
            <span>{category.name}</span>
            <button onClick={deleteCategory} className='text-red-600 hover:text-red-800'><CancelIcon/></button>
        </li>
    );
}