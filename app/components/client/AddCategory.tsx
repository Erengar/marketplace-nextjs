"use client";
import { addCategoryServer } from '../../serveractions/addCategoryServer';
import CategoriesManager from './CategoriesManager';
import { type CategoryType } from '../../../db/schema';
import SubmitButton from './SubmitButton';
import {useFormState} from 'react-dom';
import AdminErrorMessage from '../server/AdminErrorMessage';
import AdminCategorySkeleton from './AdminSkeletonCategory';
import { motion } from 'framer-motion';
import useSWR from 'swr'
import FetchError from "../../utils/FetchError";

const fetcher = async (url: string) => {
    const res = await fetch(url, {next: {tags: ["categories"]}})
    if (!res.ok) {
        const errorMessage = await res.json().then(data => data.message)
        const error = new FetchError(errorMessage, res.status)
        throw error
    }
    return res.json().then(data => data.data)
}

export default function AddCategory() {
    //This hook is used to handle the form state, it holds message returned from the server
    const [message, formAction] = useFormState(addCategoryServer, null);
    //This hook is used to fetch categories from the server
    const categories = useSWR('/api/categories/', fetcher )
    return (
        <motion.section className="bg-slate-100"
        initial={{opacity:0}}
        animate={{opacity:1}}>
            <form action={formAction} className="flex flex-col items-center">
                <h1 className="font-semibold md:text-lg antialiased mb-2">Category</h1>
                {message?.error && <AdminErrorMessage message={message.error}/>}
                {message?.success && <p className="text-green-500">{message.success}</p>}
                <label htmlFor="category-name" className="text-sm md:text-base">Name:</label>
                <input id="category-name" type="text" name='name' required className="border-2 border-black rounded md:w-3/12 w-60 h-6 md:h-8"/>
                <SubmitButton text="Add Category" mutate={categories.mutate}/>
            </form>
            {categories.error && <AdminErrorMessage message={categories.error.message} className='flex justify-center'/>}
            <ul className="flex flex-col divide-y mx-1 md:mx-20 text-sm md:text-base">
                {categories.data && !categories.isLoading
                ? categories.data.map((category: CategoryType) => (
                <CategoriesManager key={category.name} category={category}/>
                ))
                : <AdminCategorySkeleton/>}
            </ul>
        </motion.section>
    )
}