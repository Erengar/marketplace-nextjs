"use client";
import CategoriesManager from "./CategoriesManager";
import { type CategoryType } from "../../../db/schema";
import AdminErrorMessage from "./AdminErrorMessage";
import AdminCategorySkeleton from "../skeletons/SkeletonAdminCategory";
import { motion } from "framer-motion";
import useSWR from "swr";
import { fetcher } from "../../helperfunctions/fetcher";
import { useState } from "react";
import ToggleButton from "./ToggleButton";
import AddCategoryForm from "./AddCategoryForm";

export default function AddCategory() {
    //This hook is used to fetch categories from the server
    const categories = useSWR("/api/categories/", fetcher);
    //This state is used to determine whether to show modal for confirming deletion
    const [showWarning, setShowWarning] = useState(true);
    return (
        <motion.section
            className="bg-slate-100 dark:bg-slate-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <AddCategoryForm categories={categories} />
            {categories.error && (
                <AdminErrorMessage
                    message={categories.error.message}
                    className="flex justify-center"
                />
            )}
            <div className="flex items-center justify-end gap-2 md:mx-20">
                <ToggleButton isOn={showWarning} setIsOn={setShowWarning} />
            </div>
            <ul className="mx-1 flex flex-col divide-y text-sm dark:text-gray-200 md:mx-20 md:text-base">
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
