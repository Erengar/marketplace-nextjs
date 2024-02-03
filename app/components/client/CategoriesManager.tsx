"use client";
import { type CategoryType } from "../../../db/schema";
import CancelIcon from "@mui/icons-material/Cancel";
import { useState } from "react";
import LoadingModal from "./LoadingModal";
import { deleteCategoryServer } from "../../serveractions/deleteCategoryServer";
import { motion, AnimatePresence } from "framer-motion";
import { mutate } from "swr";
import ConfirmationModal from "./ConfirmationModal";

export default function CategoriesManager({
    category,
    showWarning
}: {
    category: CategoryType;
    showWarning: boolean;
}) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);

    async function deleteCategory() {
        setIsDeleting(true);
        await deleteCategoryServer(category);
        mutate("/api/categories/");
        setIsDeleting(false);
    }

    return (
        <>
            <AnimatePresence>
                {isDeleting && <LoadingModal text="Deleting Category" />}
            </AnimatePresence>
            {isConfirming && <ConfirmationModal needConfirm={setIsConfirming} deleteItem={deleteCategory} item={category} table='Category'/>}
            <motion.li
                className="flex justify-between border-black"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                <span>{category.name}</span>
                <button
                    onClick={showWarning? () => setIsConfirming(true) : deleteCategory}
                    className="text-red-600 hover:text-red-800 dark:hover:text-red-400"
                >
                    <CancelIcon />
                    <span className="sr-only">Remove Category</span>
                </button>
            </motion.li>
        </>
    );
}
