import { CategoryType } from "../schemas"


export default async function getCategories(): Promise<CategoryType[]> {
    let domain : string
    if (process.env.PRODUCTION) {
        domain = "https://marketplace-nextjs-roan.vercel.app"
    } else {
        domain = "http://localhost:3000"
    }
    const result = await fetch(`${domain}/api/categories/`, {next: {tags: ["categories"]}})
    .then((res) => res.json())
    .then((data) => data['data'] as CategoryType[])
    return result
}