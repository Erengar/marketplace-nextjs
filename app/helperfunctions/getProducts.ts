import { type ProductType } from "../../db/schema"


export default async function getProducts(currentPage:number = 1, itemsPerPage:number, category: string, sort: string): Promise<ProductType[]> {
    const result = await fetch(`${process.env.DEPLOYMENT_URL}api/products/?currentpage=${currentPage}&itemsperpage=${itemsPerPage}&category=${category}&sort=${sort}`, {next: {tags: ["products"]}})
    .then(res => res.json())
    .then(data => data.data as ProductType[])
    return result
}