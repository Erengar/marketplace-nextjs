"use client";
import { type ProductType } from "@/db/schema";
import Product from "./Product";
import { useEffect, useState } from "react";
import SkeletonProducts from "../server/SkeletonProducts";
import Pagination from "./Pagination";
import ProductSort from "./ProductSort";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";

const productsFetcher = (url: string) => fetch(url, {next: {tags: ["products"]}}).then(res => res.json().then(data => data))

export default function Products({category}: {category:string}) {
    const [currentPage, setCurrentPage] = useState(1);
    const [sortSignal, setSortSignal] = useState("name");
    const [itemsPerPage, setItemsPerPage] = useState(40);
    const url = usePathname()
    const router = useRouter();
    const query = useSearchParams()
    const products = useSWR(`/api/products/?currentpage=${currentPage}&itemsperpage=${itemsPerPage}&category=${category}&sort=${sortSignal}`, productsFetcher)

    //We want only 20 products per page on mobile
    useEffect(() => {
        setItemsPerPage(window.innerWidth < 768 ? 20 : 40);
    }, []);

    
    useEffect(() => {
        if (query.get("sort")) {
            setSortSignal(query.get("sort")!)
        }
        if (query.get("currentpage")) {
            setCurrentPage(parseInt(query.get("currentpage")!))
        }
    }, [query])


    useEffect(() => {
        //This is ensuring that user can use forward and backwards navigation in browser
        router.push(url + `?sort=${sortSignal}&currentpage=${currentPage}`)
    }, [currentPage, sortSignal])
    return (
        <>
            {products.error && <h4 className="text-red-500 font-semibold md:text-lg flex justify-center">{products.error}</h4>}
            <div className="mb-4 sm:pr-4 lg:pr-20 flex justify-end">
                <ProductSort setSortSignal={setSortSignal}/>
            </div>
            <ul className="flex gap-3 flex-wrap">
                {products.data?.data
                ? products.data.data.map((product: ProductType, index: number) => (
                    <Product key={product.id} product={product} currentPage={currentPage} totalObjects={products.data?.total} itemsPerPage={itemsPerPage} index={index}/>
                    ))
                : !products.error && <SkeletonProducts numberOfSkeletons={itemsPerPage}/>}
            </ul>
            <div className="mt-6 mb-6 flex justify-center">
                <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalObjects={products.data?.total} itemsPerPage={itemsPerPage}/>
            </div>
        </>
    )
}