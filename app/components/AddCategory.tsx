"use client";
import { addCategoryServer } from '../serveractions/addCategoryServer';
import { useEffect, useState, Suspense } from 'react';
import CategoriesManager from './CategoriesManager';
import { CategoryType } from '../schemas';
import SubmitButton from './SubmitButton';
import {useFormState} from 'react-dom';
import AdminErrorMessage from './AdminErrorMessage';
import AdminCategorySkeleton from './AdminSkeletonCategory';

export default function AddCategory({categories, setCategories}: {categories: CategoryType[] | null, setCategories: React.Dispatch<React.SetStateAction<CategoryType[] | null>>}) {
    //This is the state that will be used to refetch categories and rerender the CategoriesManager component
    const [needRerender, setNeedRerender] = useState(false);
    //This hook is used to handle the form state, it holds message returned from the server
    const [message, formAction] = useFormState(addCategoryServer, null);

    useEffect(() => {
        fetch('/api/categories', {cache: 'no-store'}).then((res) => res.json()).then((data) => setCategories(data.data));
    }, [needRerender])
    return (
        <section className="bg-slate-100">
            <form action={formAction} className="flex flex-col items-center">
                <h1 className="font-semibold text-lg antialiased mb-4">Category</h1>
                {message && <AdminErrorMessage message={message.message}/>}
                <label htmlFor="category-name" className="">Name:</label>
                <input id="category-name" type="text" name='name' required className="border-2 border-black rounded md:w-3/12 w-60"/>
                <SubmitButton text="Add Category" needRerender={needRerender} setNeedRerender={setNeedRerender}/>
            </form>
            <ul className="flex flex-col divide-y mx-4 md:mx-20 ">
                <Suspense fallback={<p>Loading...</p>}>
                {categories
                ? categories.map((category) => (
                    <CategoriesManager key={category.name} category={category} setNeedRerender={setNeedRerender}/>
                    ))
                : <AdminCategorySkeleton/>}
                </Suspense>
            </ul>
        </section>
    )
}