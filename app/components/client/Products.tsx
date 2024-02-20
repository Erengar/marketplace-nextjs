"use client";
import { type ProductType } from "@/db/schema";
import Product from "./Product";
import { useEffect, useState } from "react";
import SkeletonProducts from "../skeletons/SkeletonProducts";
import Pagination from "./Pagination";
import ProductSort from "./ProductSort";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import ErrorMessage from "./ErrorMessage";
import { fetcher } from "../../../helperfunctions/fetcher";
import ProductsNothingHere from "./ProductsNothingHere";

export default function Products({ category }: { category: string }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [sortSignal, setSortSignal] = useState("name");
    const [itemsPerPage, setItemsPerPage] = useState(40);
    const url = usePathname();
    const router = useRouter();
    const query = useSearchParams();
    const products = useSWR(
        `/api/products/?currentpage=${currentPage}&itemsperpage=${itemsPerPage}&category=${category}&sort=${sortSignal}`,
        fetcher,
    );

    //We want only 20 products per page on mobile
    useEffect(() => {
        setItemsPerPage(window.innerWidth < 768 ? 20 : 40);
    }, []);

    useEffect(() => {
        if (query.get("sort")) {
            setSortSignal(query.get("sort")!);
        }
        if (query.get("currentpage")) {
            setCurrentPage(parseInt(query.get("currentpage")!));
        }
    }, [query]);

    useEffect(() => {
        //This is ensuring that user can use forward and backwards navigation in browser
        router.push(url + `?sort=${sortSignal}&currentpage=${currentPage}`);
    }, [currentPage, sortSignal]);
    
    return (
        <div>
            {products.error && (
                <ErrorMessage
                    message={products.error.message}
                    className="flex justify-center"
                />
            )}
            {products.data?.data.length !== 0 ? (
                <div className="mb-4 flex justify-end sm:pr-4 lg:pr-20">
                    <ProductSort setSortSignal={setSortSignal} />
                </div>
            ) : null}
            <ul className="flex flex-wrap gap-3">
                {products.isLoading ? (
                    <SkeletonProducts numberOfSkeletons={itemsPerPage} />
                ) : products.data.data?.length !== 0 ? (
                    products.data.data.map(
                        (product: ProductType, index: number) => (
                            <Product
                                key={product.id}
                                product={product}
                                currentPage={currentPage}
                                totalObjects={products.data?.total}
                                itemsPerPage={itemsPerPage}
                                index={index}
                            />
                        ),
                    )
                ) : !products.error ? (
                    products.data?.data ? (
                        <ProductsNothingHere />
                    ) : (
                        <SkeletonProducts numberOfSkeletons={itemsPerPage} />
                    )
                ) : null}
            </ul>
            <div className="mb-6 mt-6 flex justify-center">
                {products.data?.total ? (
                    <Pagination
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalObjects={products.data?.total}
                        itemsPerPage={itemsPerPage}
                    />
                ) : null}
            </div>
        </div>
    );
}
