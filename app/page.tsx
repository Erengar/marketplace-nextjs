import Category from './components/page/Category'
import './globals.css'
import { Metadata } from 'next'
import { sql } from '@vercel/postgres'
import { CategoryType } from './schemas'

export const metadata: Metadata = {
    title: 'Home',
}



export default async function Page() {

    const {rows}  = await sql<CategoryType[]>`SELECT * FROM categories`
    return (
    <ul className="flex flex-row flex-wrap gap-6 m-auto xl:mx-80 mt-12">
        {rows.map((category) => (
            <Category key={category.id} category={category} />
        ))}
    </ul>
    );
}