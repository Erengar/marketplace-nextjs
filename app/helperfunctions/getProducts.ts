import { ProductType } from "../../db/schema"


export default async function getProducts(category: string): Promise<ProductType[]> {
    const result = await fetch(`${process.env.DEPLOYMENT_URL}api/products/category/${category}/`, {next: {tags: ["products"]}})
    .then(res => res.json())
    .then(data => data['data'] as ProductType[])
    return result
}