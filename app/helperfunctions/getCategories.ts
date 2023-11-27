import { CategoryType } from "../schemas"

export default async function getCategories(): Promise<CategoryType[]> {
    const result = await fetch(process.env.URL + '/api/categories')
    const data = await result.json()
    return data.data
}