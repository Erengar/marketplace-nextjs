"use client"
import { addProductServer } from "@/app/serveractions/addProductServer";
import { CategoryType } from "@/db/schema";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import AdminErrorMessage from "../server/AdminErrorMessage"
import SubmitButton from "./SubmitButton"

export default function AddProductForm(
    {categories, setCategories, setNeedRerender}:
    {categories: CategoryType[] | null, setCategories: (categories: CategoryType[]) => void, setNeedRerender: React.Dispatch<React.SetStateAction<boolean>>,}) {


    const [message, formAction] = useFormState(addProductServer, null);

    useEffect(() => {
        fetch('/api/categories/', {next: {tags: ["categories"]}}).then((res) => res.json()).then((data) => {setCategories(data.data)});
    }, [])
    return (
        <form action={formAction}className="flex flex-col items-center">
            <h1 className="font-semibold md:text-lg antialiased mb-2">Products</h1>
            {message && <AdminErrorMessage message={message.message}/>}
            <label htmlFor="product-name" className="text-sm md:text-base">Name:</label>
            <input id="product-name" type="text" name='name' required className="border-2 border-black rounded md:w-3/12 w-60 md:h-8"/>
            <label htmlFor="product-price" className="text-sm md:text-base">Price:</label>
            <input id="product-price" type="number" step="any" name='price' required className="border-2 border-black rounded md:w-3/12 w-60 md:h-8"/>
            <label htmlFor="product-amount" className="text-sm md:text-base">Stock:</label>
            <input id="product-amount" type="number" name='amount' required className="border-2 border-black rounded md:w-3/12 w-60 md:h-8"/>
            <label htmlFor="product-category" className="text-sm md:text-base">Category:</label>
            <select id="product-category" name='category' required className="border-2 border-black rounded md:w-3/12 w-60 md:h-8">
                {categories && categories.map((category) => (
                    <option key={category.name} value={category.name}>{category.name}</option>
                    ))}
            </select>
            <label htmlFor="product-description" className="text-sm md:text-base">Description:</label>
            <textarea id="product-description" name='description' className="border-2 border-black rounded md:w-3/12 w-60"/>
            <label htmlFor="product-image" className="text-sm md:text-base">Image:</label>
            <input
            id="product-image"
            type="file"
            name='image'
            className="w-60 md:w-3/12 text-blue-800 font-semibold text-xs md:text-base
            file:p-3 file:md:p-4 file:rounded-full file:border-0 file:font-semibold file:bg-blue-200 file:text-blue-800 hover:file:bg-blue-300 file:cursor-pointer"/>
            <SubmitButton text="Add Product" setNeedRerender={setNeedRerender}/>
        </form>
    )
}