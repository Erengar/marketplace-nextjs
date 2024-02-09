"use client";
import SubmitButton from "./SubmitButton";
import { useFormState } from "react-dom";
import { addCategoryServer } from "../../serveractions/addCategoryServer";
import ErrorMessage from "./ErrorMessage";
import SuccessMessage from "./SuccessMessage";
import Input from "./Input";

export default function AddCategoryForm({categories}: {categories: any}) {
    //This hook is used to handle the form state, it holds message returned from the server
    const [message, formAction] = useFormState(addCategoryServer, null);
    return (
        <form
            action={formAction}
            className="flex flex-col items-center dark:text-gray-200"
            method="post"
        >
            <h1 className="mb-2 font-semibold text-sky-950 antialiased dark:text-sky-100 md:text-lg">
                Category
            </h1>
            {typeof(message?.error) == 'string' && <ErrorMessage message={message.error} />}
            {message?.success && (
                <SuccessMessage message={message.success}/>
            )}
            <Input error={message?.error} name="name" required={true} type="text"/>
            <label
                htmlFor="category-description"
                className="text-sm md:text-base"
            >
                Description:
            </label>
            <textarea
                id="category-description"
                name="description"
                className={`h-20 w-60 rounded border-2 border-black md:h-36 md:w-3/12 ${typeof message?.error === 'object' && message?.error?.description && "border-rose-600"}`}
            />
            {typeof message?.error === 'object' && message?.error?.description && (
                <ErrorMessage message={message.error.description} />
            )}
            <SubmitButton text="Add Category" mutate={categories.mutate} />
        </form>
    );
}
