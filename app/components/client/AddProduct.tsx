"use client";
import { useState, useEffect, useContext, useRef} from "react";
import { CategoryType, type ProductType } from "../../../db/schema";
import ProductManager from "./ProductManager";
import AdminSkeletonProduct from "./AdminSkeletonProduct";
import { motion} from "framer-motion";
import { CurrencyContext } from "../context/CurrencyProvider";
import ProductTableHead from "./ProductTableHead";
import Pagination from "./Pagination";
import LoadingModal from "./LoadingModal";
import AddProductForm from "./AddProductForm";

export default function Addproduct(){

    const firstRender = useRef(true);

    //This state is used to show a loading modal when fetching data
    const [fetchingData, setFetchingData] = useState(false);

    //These states are used for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalObjects, setTotalObjects] = useState(0);

    //This is the state that holds information how to sort the products
    const [sortSignal, setSortSignal] = useState('name');

    //This is the state that will be used to refetch categories and rerender the CategoriesManager component
    const [needRerender, setNeedRerender] = useState(false);
    //This is the state that will hold the products
    const [products, setProducts] = useState<ProductType[] | null>(null);
    //This is the state that will hold the selected category to filter products
    const [categoriesFilter, setCategoriesFilter] = useState<string | null>('All');

    //This state is used to hold the categories returned from the server
    const [categories, setCategories] = useState<CategoryType[] | null>(null);

    //This useEffect will reset the current page to 1 when the categoriesFilter changes, whn user selects a new category
    useEffect(() => {
        setCurrentPage(1);
    }, [categoriesFilter])


    const itemsPerPage = 20;

    useEffect(()=>{
        setFetchingData(true);
        fetch(`/api/products/?currentpage=${currentPage}&itemsperpage=${itemsPerPage}&category=${categoriesFilter}&sort=${sortSignal}`, {next: {tags: ["products"]}})
        .then((res) => res.json())
        .then((data) => {
            setProducts(data.data)
            setTotalObjects(data.total)
            setFetchingData(false);
        });
    }, [needRerender, categoriesFilter, sortSignal, currentPage])

    return (
        <motion.section className="bg-slate-100"
        initial={{opacity:0}}
        animate={{opacity:1}}>
            <AddProductForm categories={categories} setCategories={setCategories} setNeedRerender={setNeedRerender}/>
            {fetchingData && <LoadingModal text="" backDrop={false} seeThrough={true}/>}
            <div className="flex place-content-around">
                
                <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalObjects={totalObjects} itemsPerPage={itemsPerPage}/>
                
                <select onChange={(e) => setCategoriesFilter(e.target.value)} className="border border-black rounded w-fit md:w-20 h-8 text-sky-950 antialised text-sm md:text-base m-2 md:m-4 align-self-end">
                    <option value='All'>All</option>
                    {categories && categories.map((category) => (
                        <option key={category.name} value={category.name}>{category.name}</option>
                        ))}
                </select>
            </div>
            <ProductTableHead sortSignal={sortSignal} setSortSignal={setSortSignal}/>
            <ul className="flex flex-col divide-y ml-4 md:ml-20">
                {products
                ? products.map((product) => (
                    <ProductManager key={product.id} product={product} setNeedRerender={setNeedRerender}/>
                    ))
                : <AdminSkeletonProduct/>}
            </ul>
        </motion.section>
    )
}