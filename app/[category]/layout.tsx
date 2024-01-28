import Sidebar from '../components/server/Sidebar'
import React from 'react'
import ExpandableSidebar from '../components/client/ExpandableSidebar';
import getCategories from '../helperfunctions/getCategories';

export default async function Layout({params, children, modal} : {params : { category : string }, children: React.ReactNode, modal: React.ReactNode}){
    const categories = await getCategories()
    return (
        <main className="flex gap-2">
            <div id="sidebar" className='fixed -left-32 flex flex-row md:static'>
                <section className="flex flex-col
                w-32 bg-slate-300 max-w-xl divide-y divide-black divide font-semibold">
                    {categories.map((category) => 
                    <Sidebar key={`${category.name}`} category={category} selectedCategory={params.category} />)}
                </section>
                <ExpandableSidebar />
            </div>
            {children}
            {modal}
        </main>
    )
}