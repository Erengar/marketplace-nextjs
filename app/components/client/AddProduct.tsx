"use client";
import { useState, useEffect} from "react";
import { CategoryType, type ProductType } from "../../../db/schema";
import ProductManager from "./ProductManager";
import AdminSkeletonProduct from "../skeletons/SkeletonAdminProduct";
import { motion} from "framer-motion";
import ProductTableHead from "./ProductTableHead";
import Pagination from "./Pagination";
import AddProductForm from "./AddProductForm";
import SearchBar from "./SearchBar";
import useSWR from 'swr'
import AdminErrorMessage from "./AdminErrorMessage";
import {fetcher} from "../../helperfunctions/fetcher"


export default function Addproduct(){
    //These states are used for pagination
    const [currentPage, setCurrentPage] = useState(1);

    //This is the state that holds information how to sort the products
    const [sortSignal, setSortSignal] = useState('name');

    //This is the state that will hold the selected category to filter products
    const [categoriesFilter, setCategoriesFilter] = useState<string | null>('All');

    //This state is used to hold the search query
    const [searchQuery, setSearchQuery] = useState<string | null>(null);

    //This useEffect will reset the current page to 1 when the categoriesFilter changes, and will reset the categoriesFilter when the searchQuery changes
    useEffect(() => {
        currentPage !== 1 && setCurrentPage(1);
        categoriesFilter !== "All" && setSearchQuery(null)
    }, [categoriesFilter])

    //This useEffect will reset the categoriesFilter when the searchQuery changes
    useEffect(() => {
        setCategoriesFilter('All');
    }, [searchQuery])   
    
    const itemsPerPage = 20;

    const categories = useSWR('/api/categories/', fetcher )
    const products = useSWR(`/api/products?currentpage=${currentPage}&itemsperpage=${itemsPerPage}&category=${categoriesFilter}&sort=${sortSignal}&searchQuery=${searchQuery}`, fetcher)
    return (
        <motion.section className="bg-slate-100"
        initial={{opacity:0}}
        animate={{opacity:1}}>
            <AddProductForm mutate={products.mutate}/>
            <div className="flex justify-center mt-4">
                <SearchBar
                query="products"
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                className="border border-black rounded text-sm md:text-base"/>
            </div>
            <div className="flex place-content-around">
                <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalObjects={!products.isLoading && products.data?.total}
                itemsPerPage={itemsPerPage}/>
                <select
                value={categoriesFilter!}
                onChange={(e) => setCategoriesFilter(e.target.value)}
                className="border border-black rounded w-fit md:w-20 h-8 text-sky-950 antialised text-sm md:text-base m-2 md:m-4 align-self-end">
                    <option value='All'>All</option>
                    {categories.data?.data && categories.data.data.map((category:CategoryType) => (
                        <option key={category.name} value={category.name}>{category.name}</option>
                        ))}
                </select>
            </div>
            {products.error && <AdminErrorMessage message={products.error.message} className="flex justify-center"/>}
            {categories.error && <AdminErrorMessage message={categories.error.message} className="flex justify-center"/>}
            <ProductTableHead sortSignal={sortSignal} setSortSignal={setSortSignal}/>
            <ul className="flex flex-col divide-y ml-4 md:ml-20">
                {products.data?.data && !categories.isLoading
                ? products.data.data.map((product: ProductType) => (
                    <ProductManager key={product.id} product={product} mutate={products.mutate}/>
                    ))
                : !products.error && <AdminSkeletonProduct/>}
            </ul>
        </motion.section>
    )
}