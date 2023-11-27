import { CategoryType } from '../schemas'
import Sidebar from '../components/layout/category/Sidebar'
import React from 'react'
import getCategories from '../helperfunctions/getCategories'

export default async function Layout({params, children} : {params : { category : string }, children: React.ReactNode}){
    const rows: CategoryType[]  = await getCategories()
    return (
        <>
            <section className="flex flex-col w-32 max-w-xl divide-y divide-black divide">
                {rows.map((category) => 
                <Sidebar key={`${category.name}`} category={category} selectedCategory={params.category} />)}
            </section>
            {children}
        </>
    )
}