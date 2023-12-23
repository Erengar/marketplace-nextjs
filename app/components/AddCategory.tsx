"use client";
import { addCategoryServer } from '../serveractions/addCategoryServer';
import { useEffect, useState } from 'react';
import CategoriesManager from './CategoriesManager';
import { CategoryType } from '../schemas';

export default function AddCategory() {
    const [categories, setCategories] = useState<CategoryType[] | null>(null);
    const [needRerender, setNeedRerender] = useState(false);

    useEffect(() => {
        fetch('/api/categories', {cache: 'no-store'}).then((res) => res.json()).then((data) => setCategories(data.data));
    }, [needRerender])
    return (
        <section>
            <form action={addCategoryServer} className="flex flex-col items-center">
                <h1 className="font-semibold text-lg antialiased mb-4">Category</h1>
                <label htmlFor="category-name" className="">Name:</label>
                <input id="category-name" type="text" name='name' required className="border-2 border-black rounded w-1/2 md:w-3/12 w-60"/>
                <button type="submit" className="h-10 w-20 text-base antialiased font-bold text-sky-950 border border-black border-solid rounded bg-slate-200 hover:bg-slate-400 mt-8">Add</button>
            </form>
            <ul className="flex flex-col divide-y mx-4 md:mx-20">
                {categories && categories.map((category) => (
                    <CategoriesManager key={category.name} category={category} needRerender={needRerender} setNeedRerender={setNeedRerender}/>
                ))}
            </ul>
        </section>
    )
}