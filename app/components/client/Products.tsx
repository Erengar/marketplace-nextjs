"use client";
import { type ProductType } from "@/db/schema";
import Product from "./Product";
import { useEffect, useState } from "react";
import SkeletonProducts from "../server/SkeletonProducts";
import Pagination from "./Pagination";
import ProductSort from "./ProductSort";

export default function Products({category}: {category:string}) {
    const [products, setProducts] = useState<ProductType[]>();
    const [totalObjects, setTotalObjects] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(50);
    const [sortSignal, setSortSignal] = useState("name");

    // Set items per page depending on screen size, 20 for mobile, 50 for desktop
    useEffect(() => {
        window.innerWidth < 768 ? setItemsPerPage(20) : setItemsPerPage(50)
    },[])

    useEffect(() => {
        fetch(`/api/products/?currentpage=${currentPage}&itemsperpage=${itemsPerPage}&category=${category}&sort=${sortSignal}`, {next: {tags: ["products"]}})
        .then((res) => res.json())
        .then((data) => {
            setProducts(data.data)
            setTotalObjects(data.total)
        })
    }, [currentPage, sortSignal])
    return (
        <>
            <div className="mb-4 sm:pr-4 lg:pr-20 flex justify-end">
                <ProductSort setSortSignal={setSortSignal}/>
            </div>
            <ul className="flex gap-3 flex-wrap">
                {products
                ? products.map((product: ProductType, index) => (
                    <Product key={product.id} product={product} currentPage={currentPage} totalObjects={totalObjects} itemsPerPage={itemsPerPage} index={index}/>
                    ))
                : <SkeletonProducts numberOfSkeletons={itemsPerPage}/>}
            </ul>
            <div className="mt-6 mb-6 flex justify-center">
                <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalObjects={totalObjects} itemsPerPage={itemsPerPage}/>
            </div>
        </>
    )
}