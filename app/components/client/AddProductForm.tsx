"use client";
import { addProductServer } from "@/app/serveractions/addProductServer";
import { CategoryType } from "@/db/schema";
import { useFormState } from "react-dom";
import ErrorMessage from "./ErrorMessage";
import SubmitButton from "./SubmitButton";
import useSWR from "swr";
import { fetcher } from "../../helperfunctions/fetcher";
import SuccessMessage from "./SuccessMessage";
import Input from "./Input";

export default function AddProductForm({ mutate }: { mutate?: any }) {
    const [message, formAction] = useFormState(addProductServer, null);
    const categories = useSWR("/api/categories/", fetcher);
    return (
        <form action={formAction} className="flex flex-col items-center dark:text-gray-200">
            <h1 className="mb-2 font-semibold antialiased md:text-lg text-sky-950 dark:text-sky-100">
                Products
            </h1>
            {typeof(message?.error) === 'string' && <ErrorMessage message={message.error} />}
            {message?.success && (
                <SuccessMessage message={message.success}/>
                )}
            {categories.error && (
                <ErrorMessage message={categories.error} />
                )}
            <Input error={message?.error} type="text" name="name" required />
            <Input error={message?.error} type="number" name="price" required />
            <Input error={message?.error} type="number" name="amount" required />
            <label htmlFor="product-category" className="text-sm md:text-base">
                Category:
            </label>
            <select
                id="product-category"
                name="category"
                required
                className="w-60 rounded border-2 border-black md:h-8 md:w-3/12"
                >
                {categories.data?.data &&
                    categories.data.data.map((category: CategoryType) => (
                        <option key={category.name} value={category.name}>
                            {category.name}
                        </option>
                    ))}
            </select>
            <label
                htmlFor="product-description"
                className="text-sm md:text-base"
                >
                Description:
            </label>
            <textarea
                id="product-description"
                name="description"
                className={`w-60 rounded border-2 border-black md:w-3/12 ${typeof message?.error === 'object' && message?.error?.description && "border-rose-600"}`}
                />
            {typeof(message?.error) === 'object' && message?.error?.description && <ErrorMessage message={message?.error?.description} />}
            <label htmlFor="product-image" className="text-sm md:text-base">
                Image:
            </label>
            <input
                id="product-image"
                type="file"
                name="image"
                className={`w-60 text-xs font-semibold text-blue-800 file:cursor-pointer file:rounded-full dark:text-blue-200
                file:border-0 file:bg-blue-200 file:p-3 file:font-semibold file:text-blue-800 hover:file:bg-blue-300 md:w-3/12 md:text-base file:md:p-4
                ${typeof message?.error === 'object' && message?.error?.image && "text-rose-600 file:text-rose-600"}`}
                />
            {typeof(message?.error) == 'object' && message?.error?.image && <ErrorMessage message={message.error.image} small={true}/>}
            <SubmitButton text="Add Product" mutate={mutate} />
        </form>
    );
}
