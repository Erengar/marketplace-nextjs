"use client";
import { addCategoryServer } from "../../serveractions/addCategoryServer";
import CategoriesManager from "./CategoriesManager";
import { type CategoryType } from "../../../db/schema";
import SubmitButton from "./SubmitButton";
import { useFormState } from "react-dom";
import AdminErrorMessage from "./AdminErrorMessage";
import AdminCategorySkeleton from "../skeletons/SkeletonAdminCategory";
import { motion } from "framer-motion";
import useSWR from "swr";
import { fetcher } from "../../helperfunctions/fetcher";
import { useState } from "react";
import ToggleButton from "./ToggleButton";

export default function AddCategory() {
    //This hook is used to handle the form state, it holds message returned from the server
    const [message, formAction] = useFormState(addCategoryServer, null);
    //This hook is used to fetch categories from the server
    const categories = useSWR("/api/categories/", fetcher);
    //This state is used to determine whether to show modal for confirming deletion
    const [showWarning, setShowWarning] = useState(true);
    return (
        <motion.section
            className="bg-slate-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <form action={formAction} className="flex flex-col items-center">
                <h1 className="mb-2 font-semibold text-sky-950 antialiased md:text-lg">
                    Category
                </h1>
                {message?.error && (
                    <AdminErrorMessage message={message.error} />
                )}
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
            {categories.error && (
                <AdminErrorMessage
                    message={categories.error.message}
                    className="flex justify-center"
                />
            )}
            <div className="flex justify-end items-center md:mx-20 gap-2">
                <ToggleButton isOn={showWarning} setIsOn={setShowWarning} />
            </div>
            <ul className="mx-1 flex flex-col divide-y text-sm md:mx-20 md:text-base">
                {categories.data?.data && !categories.isLoading ? (
                    categories.data.data.map((category: CategoryType) => (
                        <CategoriesManager
                            key={category.name}
                            category={category}
                            showWarning={showWarning}
                        />
                    ))
                ) : (
                    <AdminCategorySkeleton />
                )}
            </ul>
        </motion.section>
    );
}
