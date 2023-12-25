"use client";
import { addCategoryServer } from '../serveractions/addCategoryServer';
import { useEffect, useState } from 'react';
import CategoriesManager from './CategoriesManager';
import { CategoryType, ProductType } from '../schemas';
import SubmitButton from './SubmitButton';

export default function AddCategory({categories, setCategories}: {categories: CategoryType[] | null, setCategories: React.Dispatch<React.SetStateAction<CategoryType[] | null>>}) {
    //This is the state that will hold the categories fetched from useEffect
    //This is the state that will be used to refetch categories and rerender the CategoriesManager component
    const [needRerender, setNeedRerender] = useState(false);


    useEffect(() => {
        fetch('/api/categories', {cache: 'no-store'}).then((res) => res.json()).then((data) => setCategories(data.data));
    }, [needRerender])
    return (
        <section className="bg-slate-100">
            <form action={addCategoryServer} className="flex flex-col items-center">
                <h1 className="font-semibold text-lg antialiased mb-4">Category</h1>
                <label htmlFor="category-name" className="">Name:</label>
                <input id="category-name" type="text" name='name' required className="border-2 border-black rounded md:w-3/12 w-60"/>
                <SubmitButton text="Add Category" needRerender={needRerender} setNeedRerender={setNeedRerender}/>
            </form>
            <ul className="flex flex-col divide-y mx-4 md:mx-20 ">
                {categories && categories.map((category) => (
                    <CategoriesManager key={category.name} category={category} setNeedRerender={setNeedRerender}/>
                ))}
            </ul>
        </section>
    )
}