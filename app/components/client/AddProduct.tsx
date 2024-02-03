"use client";
import { useState, useEffect } from "react";
import { CategoryType, type ProductType } from "../../../db/schema";
import ProductManager from "./ProductManager";
import AdminSkeletonProduct from "../skeletons/SkeletonAdminProduct";
import { motion } from "framer-motion";
import ProductTableHead from "./ProductTableHead";
import Pagination from "./Pagination";
import AddProductForm from "./AddProductForm";
import SearchBar from "./SearchBar";
import useSWR from "swr";
import AdminErrorMessage from "./AdminErrorMessage";
import { fetcher } from "../../helperfunctions/fetcher";
import ToggleButton from "./ToggleButton";

export default function Addproduct() {
    //These states are used for pagination
    const [currentPage, setCurrentPage] = useState(1);

    //This is the state that holds information how to sort the products
    const [sortSignal, setSortSignal] = useState("name");

    //This is the state that will hold the selected category to filter products
    const [categoriesFilter, setCategoriesFilter] = useState<string | null>(
        "All",
    );

    //This state is used to hold the search query
    const [searchQuery, setSearchQuery] = useState<string | null>(null);

    //This state is used to determine whether to show modal for confirming deletion
    const [showWarning, setShowWarning] = useState(true);

    //This useEffect will reset the current page to 1 when the categoriesFilter changes, and will reset the categoriesFilter when the searchQuery changes
    useEffect(() => {
        currentPage !== 1 && setCurrentPage(1);
        categoriesFilter !== "All" && setSearchQuery(null);
    }, [categoriesFilter]);

    //This useEffect will reset the categoriesFilter when the searchQuery changes
    useEffect(() => {
        setCategoriesFilter("All");
    }, [searchQuery]);

    const itemsPerPage = 20;

    const categories = useSWR("/api/categories/", fetcher);
    const products = useSWR(
        `/api/products?currentpage=${currentPage}&itemsperpage=${itemsPerPage}&category=${categoriesFilter}&sort=${sortSignal}&searchQuery=${searchQuery}`,
        fetcher,
    );
    return (
        <motion.section
            className="bg-slate-100 dark:bg-slate-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <AddProductForm mutate={products.mutate} />
            <div className="mt-4 flex justify-center">
                <SearchBar
                    query="products"
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    className="rounded border-2 border-sky-950 text-sm font-semibold text-sky-950 focus:outline-none focus:ring md:text-base dark:border-sky-200 dark:text-sky-200"
                />
            </div>
            <div className="flex place-content-around">
                <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalObjects={!products.isLoading && products.data?.total}
                    itemsPerPage={itemsPerPage}
                />
                <label htmlFor="categoriesFilter" className="sr-only">
                    Filter by Categories
                </label>
                <select
                    id="categoriesFilter"
                    value={categoriesFilter!}
                    onChange={(e) => setCategoriesFilter(e.target.value)}
                    className="antialised align-self-end m-2 h-8 w-fit rounded border border-sky-950 pl-2 text-xs font-semibold text-sky-950 dark:border-sky-200 dark:text-sky-200 md:m-4 md:w-20 md:text-base"
                >
                    <option value="All">All</option>
                    {categories.data?.data &&
                        categories.data.data.map((category: CategoryType) => (
                            <option key={category.name} value={category.name}>
                                {category.name}
                            </option>
                        ))}
                </select>
            </div>
            {products.error && (
                <AdminErrorMessage
                    message={products.error.message}
                    className="flex justify-center"
                />
            )}
            {categories.error && (
                <AdminErrorMessage
                    message={categories.error.message}
                    className="flex justify-center"
                />
            )}
            <div className="mr-2 flex items-center justify-end gap-2 sm:mr-10 md:mr-16 lg:mr-20 xl:mr-28">
                <ToggleButton isOn={showWarning} setIsOn={setShowWarning} />
            </div>
            <ProductTableHead
                sortSignal={sortSignal}
                setSortSignal={setSortSignal}
            />
            <ul className="ml-4 flex flex-col divide-y md:ml-20">
                {products.data?.data && !categories.isLoading
                    ? products.data.data.map((product: ProductType) => (
                          <ProductManager
                              key={product.id}
                              product={product}
                              mutate={products.mutate}
                              showWarning={showWarning}
                          />
                      ))
                    : !products.error && <AdminSkeletonProduct />}
            </ul>
        </motion.section>
    );
}
