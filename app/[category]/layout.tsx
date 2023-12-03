import { CategoryType } from '../schemas'
import Sidebar from './components/layout/Sidebar'
import React from 'react'
import { sql } from '@vercel/postgres';

export default async function Layout({params, children} : {params : { category : string }, children: React.ReactNode}){
    const {rows}: {rows: CategoryType[]} = await sql`SELECT * FROM categories`
    return (
        <main className="flex gap-2">
            <section className="flex flex-col w-32 max-w-xl divide-y divide-black divide">
                {rows.map((category) => 
                <Sidebar key={`${category.name}`} category={category} selectedCategory={params.category} />)}
            </section>
            {children}
        </main>
    )
}