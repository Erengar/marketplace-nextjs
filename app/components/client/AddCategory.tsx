"use client";
import { addCategoryServer } from '../../serveractions/addCategoryServer';
import { useEffect, useState, Suspense } from 'react';
import CategoriesManager from './CategoriesManager';
import { CategoryType } from '../../schemas';
import SubmitButton from './SubmitButton';
import {useFormState} from 'react-dom';
import AdminErrorMessage from '../server/AdminErrorMessage';
import AdminCategorySkeleton from './AdminSkeletonCategory';
import { motion } from 'framer-motion';

export default function AddCategory({categories, setCategories}: {categories: CategoryType[] | null, setCategories: React.Dispatch<React.SetStateAction<CategoryType[] | null>>}) {
    //This is the state that will be used to refetch categories and rerender the CategoriesManager component
    const [needRerender, setNeedRerender] = useState(1);
    //This hook is used to handle the form state, it holds message returned from the server
    const [message, formAction] = useFormState(addCategoryServer, null);

    useEffect(() => {
        fetch('/api/categories').then((res) => res.json()).then((data) => {setCategories(data.data)});
    }, [needRerender, setCategories])
    return (
        <motion.section className="bg-slate-100"
        initial={{opacity:0}}
        animate={{opacity:1}}>
            <form action={formAction} className="flex flex-col items-center">
                <h1 className="font-semibold md:text-lg antialiased mb-2">Category</h1>
                {message && <AdminErrorMessage message={message.message}/>}
                <label htmlFor="category-name" className="text-sm md:text-base">Name:</label>
                <input id="category-name" type="text" name='name' required className="border-2 border-black rounded md:w-3/12 w-60 h-6 md:h-8"/>
                <SubmitButton text="Add Category" setNeedRerender={setNeedRerender}/>
            </form>
            <ul className="flex flex-col divide-y mx-1 md:mx-20 text-sm md:text-base">
                    {categories
                    ? categories.map((category) => (
                    <CategoriesManager key={category.name} category={category} setNeedRerender={setNeedRerender}/>
                    ))
                    : <AdminCategorySkeleton/>}
            </ul>
        </motion.section>
    )
}