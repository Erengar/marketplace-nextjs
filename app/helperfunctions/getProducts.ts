import { ProductType } from "../schemas"


export default async function getProducts(category: string): Promise<ProductType[]> {
    let domain : string
    if (process.env.vercel) {
        domain = "https://marketplace-nextjs-roan.vercel.app"
    } else {
        domain = "http://localhost:3000"
    }
    const result = await fetch(`${process.env.DEPLOYMENT_URL}api/products/category/${category}/`, {next: {tags: ["products"]}})
    .then(res => res.json())
    .then(data => data['data'] as ProductType[])
    return result
}