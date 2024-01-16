import Category from './components/client/Category'
import { Metadata } from 'next'
import { CategoryType } from './schemas'
import {sql} from "@vercel/postgres"


export const metadata: Metadata = {
    title: 'Home',
}


export default async function Page() {

    const {rows}: {rows: CategoryType[]} = await sql`SELECT * FROM categories`
    return (
    <main>
        <ul className="flex flex-row flex-wrap gap-6 m-auto mx-2 xl:mx-80 mt-12">
            {rows.map((category) => (
                <Category key={category.name} category={category} />
                ))}
        </ul>
    </main>
    );
}