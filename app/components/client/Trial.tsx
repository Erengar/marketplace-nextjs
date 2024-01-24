import { type ProductType } from "@/db/schema";
import Trial2 from "./Trial2";

export default function Trial({products, category, currentPage, itemsPerPage, sortSignal, totalObjects, setProducts, setCurrentPage, setSortSignal, setTotalObjects} : {products: ProductType[], category: string, currentPage: number, itemsPerPage: number, sortSignal: string, totalObjects: number, setProducts: (e: ProductType[]) => void, setCurrentPage: (e:number) => void, setSortSignal: (e:string) => void, setTotalObjects: (i: number) => void}) {
    fetch(`/api/products/?currentpage=${currentPage}&itemsperpage=${itemsPerPage}&category=${category}&sort=${sortSignal}`, {next: {tags: ["products"]}})
        .then((res) => res.json())
        .then((data) => {
            setProducts(data.data)
            setTotalObjects(data.total)
        })
    return (
        <Trial2 products={products} currentPage={currentPage} itemsPerPage={itemsPerPage} sortSignal={sortSignal} totalObjects={totalObjects} setProducts={setProducts} setCurrentPage={setCurrentPage} setSortSignal={setSortSignal} setTotalObjects={setTotalObjects}/>
    )
}