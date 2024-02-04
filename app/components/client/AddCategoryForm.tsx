"use client";
import SubmitButton from "./SubmitButton";
import { useFormState } from "react-dom";
import { addCategoryServer } from "../../serveractions/addCategoryServer";
import AdminErrorMessage from "./AdminErrorMessage";

export default function AddCategoryForm({categories}: {categories: any}) {
    //This hook is used to handle the form state, it holds message returned from the server
    const [message, formAction] = useFormState(addCategoryServer, null);
    return (
        <form
            action={formAction}
            className="flex flex-col items-center dark:text-gray-200"
        >
            <h1 className="mb-2 font-semibold text-sky-950 antialiased dark:text-sky-100 md:text-lg">
                Category
            </h1>
            {message?.error && <AdminErrorMessage message={message.error} />}
            {message?.success && (
                <p className="text-green-500">{message.success}</p>
            )}
            <label htmlFor="category-name" className="text-sm md:text-base">
                Name:
            </label>
            <input
                id="category-name"
                type="text"
                name="name"
                required
                className="h-6 w-60 rounded border-2 border-black md:h-8 md:w-3/12"
            />
            <label
                htmlFor="category-description"
                className="text-sm md:text-base"
            >
                Description:
            </label>
            <textarea
                id="category-description"
                name="description"
                className="h-20 w-60 rounded border-2 border-black md:h-36 md:w-3/12"
            />
            <SubmitButton text="Add Category" mutate={categories.mutate} />
        </form>
    );
}
