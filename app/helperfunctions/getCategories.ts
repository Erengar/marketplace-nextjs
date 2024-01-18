import { CategoryType } from "../schemas"


export default async function getCategories(): Promise<CategoryType[]> {
    const result = await fetch(`${process.env.DEPLOYMENT_URL}api/categories/`, {next: {tags: ["categories"]}})
    .then((res) => res.json())
    .then((data) => data['data'] as CategoryType[])
    return result
}