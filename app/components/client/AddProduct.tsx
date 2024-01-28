"use client";
import { useState, useEffect, useRef} from "react";
import { CategoryType, type ProductType } from "../../../db/schema";
import ProductManager from "./ProductManager";
import AdminSkeletonProduct from "./AdminSkeletonProduct";
import { motion} from "framer-motion";
import ProductTableHead from "./ProductTableHead";
import Pagination from "./Pagination";
import LoadingModal from "./LoadingModal";
import AddProductForm from "./AddProductForm";
import SearchBar from "./SearchBar";

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

    const [searchQuery, setSearchQuery] = useState<string | null>(null);

    //This state is used to hold the categories returned from the server
    const [categories, setCategories] = useState<CategoryType[] | null>(null);

    //This state is used to hold the error message if there is one
    const [error, setError] = useState<string>();

    //This useEffect will reset the current page to 1 when the categoriesFilter changes, when user selects a new category
    useEffect(() => {
        setCurrentPage(1);
    }, [categoriesFilter])


    const itemsPerPage = 20;

    //This useEffect is for general purpose
    useEffect(()=>{
        if (searchQuery && categoriesFilter === 'All') {
            return
        }
        //This is used to abort the fetch request, it should not be needed but it is here just in case
        const controller = new AbortController();
        setSearchQuery(null);
        setFetchingData(true);
        fetch(`/api/products?currentpage=${currentPage}&itemsperpage=${itemsPerPage}&category=${categoriesFilter}&sort=${sortSignal}`, {next: {tags: ["products"]}, signal: controller.signal})
        .then((res) => res.json())
        .then((data) => {
            if (data.error) {
                setError(data.error)
                setFetchingData(false)
                return
            }
            setProducts(data.data)
            setTotalObjects(data.total)
            setFetchingData(false)
        })
        return () => controller.abort();
    }, [needRerender, categoriesFilter, sortSignal, currentPage])

    //This useEffect is for searchbar
    useEffect(() => {
        if (firstRender.current || !searchQuery) {
            firstRender.current = false;
            return;
        }
        //This is used to abort the fetch request, it should not be needed but it is here just in case
        const controller = new AbortController();
        setFetchingData(true);
        setCategoriesFilter('All');
        fetch(`/api/products?currentpage=${currentPage}&itemsperpage=${itemsPerPage}&sort=${sortSignal}&searchQuery=${searchQuery}`, {next: {tags: ["products"]}, signal: controller.signal})
        .then((res) => res.json())
        .then((data) => {
            if (data.error) {
                setError(data.error)
                setFetchingData(false)
                return
            }
            setProducts(data.data)
            setTotalObjects(data.total)
            setFetchingData(false)
        })
        return () => controller.abort();
    }, [searchQuery, currentPage, sortSignal])

    return (
        <motion.section className="bg-slate-100"
        initial={{opacity:0}}
        animate={{opacity:1}}>
            <AddProductForm categories={categories} setCategories={setCategories} setNeedRerender={setNeedRerender}/>

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
                totalObjects={totalObjects}
                itemsPerPage={itemsPerPage}/>
                <select
                value={categoriesFilter!}
                onChange={(e) => setCategoriesFilter(e.target.value)}
                className="border border-black rounded w-fit md:w-20 h-8 text-sky-950 antialised text-sm md:text-base m-2 md:m-4 align-self-end">
                    <option value='All'>All</option>
                    {categories && categories.map((category) => (
                        <option key={category.name} value={category.name}>{category.name}</option>
                        ))}
                </select>
            </div>
            {error && <h4 className="text-red-500 font-semibold md:text-lg flex justify-center">{error}</h4>}
            <ProductTableHead sortSignal={sortSignal} setSortSignal={setSortSignal}/>
            <ul className="flex flex-col divide-y ml-4 md:ml-20">
                {fetchingData
                ? <AdminSkeletonProduct/>
                :
                products
                ? products.map((product) => (
                    <ProductManager key={product.id} product={product} setNeedRerender={setNeedRerender}/>
                    ))
                : !error && <AdminSkeletonProduct/>}
            </ul>
        </motion.section>
    )
}