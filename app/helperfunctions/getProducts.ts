import { ProductType } from "../schemas"


export default async function getProducts(category: string): Promise<ProductType[]> {
    const result = await fetch(`https://marketplace-nextjs-roan.vercel.app/api/products/category/${category}/`, {next: {tags: ["products"]}})
    .then(res => res.json())
    .then(data => data['data'] as ProductType[])
    return result
}