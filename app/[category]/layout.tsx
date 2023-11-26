import { sql } from '@vercel/postgres'
import { CategoryType } from '../schemas'
import Sidebar from '../components/layout/category/Sidebar'

export default async function Layout({params} : {params : { category : string }}){
    const {rows}  = await sql<CategoryType[]>`SELECT * FROM categories`
    return (
        <section className="flex flex-col w-32 max-w-xl divide-y divide-black divide">
            {rows.map((category) => 
            <Sidebar key={`${category.name}`} category={category} selectedCategory={params.category} />)}
        </section>
    )
}