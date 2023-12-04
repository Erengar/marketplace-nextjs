import { CategoryType } from '../schemas'
import Sidebar from './components/layout/Sidebar'
import React from 'react'
import { sql } from '@vercel/postgres';
import ExpandableSidebar from './components/layout/ExpandableSidebar';

export default async function Layout({params, children} : {params : { category : string }, children: React.ReactNode}){
    const {rows}: {rows: CategoryType[]} = await sql`SELECT * FROM categories`
    return (
        <main className="flex gap-2">
            <div className='absolute md:static'>
                <section id="sidebar" className="hidden md:flex flex-col
                w-32 bg-slate-300 max-w-xl divide-y divide-black divide
                border-solid border-r-2 border-slate-700">
                    {rows.map((category) => 
                    <Sidebar key={`${category.name}`} category={category} selectedCategory={params.category} />)}
                </section>
                <ExpandableSidebar />
            </div>
            {children}
        </main>
    )
}