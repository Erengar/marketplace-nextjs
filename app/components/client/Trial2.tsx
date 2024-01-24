"use client";
import { type ProductType } from "@/db/schema";
import Product from "./Product";
import { useEffect, useState } from "react";
import SkeletonProducts from "../server/SkeletonProducts";
import Pagination from "./Pagination";
import ProductSort from "./ProductSort";


export default function Trial2({products, currentPage, itemsPerPage, sortSignal, totalObjects,setProducts, setCurrentPage, setSortSignal, setTotalObjects} : {products: ProductType[], currentPage: number, itemsPerPage: number, totalObjects:number, sortSignal: string, setProducts: (e: ProductType[]) => void, setCurrentPage: (i:number) => void,setSortSignal: (e:string) => void,setTotalObjects: (i: number) => void}) {
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