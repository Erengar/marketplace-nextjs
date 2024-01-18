"use client";
import SubmitButton from "./SubmitButton";
import { useState, useEffect, useContext} from "react";
import { CategoryType } from "../../schemas";
import { addProductServer } from "../../serveractions/addProductServer";
import { ProductType } from "../../schemas";
import ProductManager from "./ProductManager";
import { useFormState } from "react-dom";
import AdminErrorMessage from "../server/AdminErrorMessage";
import AdminSkeletonProduct from "./AdminSkeletonProduct";
import { motion} from "framer-motion";
import { CurrencyContext } from "../context/CurrencyProvider";

export default function Addproduct({categories}: {categories: CategoryType[] | null}){
    const currency = useContext(CurrencyContext)
    const [price, setPrice] = useState(`0${currency}`);
    //This is the state that will be used to refetch categories and rerender the CategoriesManager component
    const [needRerender, setNeedRerender] = useState(false);
    //This is the state that will hold the products
    const [products, setProducts] = useState<ProductType[] | null>(null);
    //This is the state that will hold the selected category to filter products
    const [categoriesFilter, setCategoriesFilter] = useState<string | null>(null);

    const [message, formAction] = useFormState(addProductServer, null);

    useEffect(()=>{
        fetch('/api/products/', {cache: 'no-store'}).then((res) => res.json()).then((data) => setProducts(data.data));
    }, [needRerender])
    return (
        <motion.section className="bg-slate-100"
        initial={{opacity:0}}
        animate={{opacity:1}}>
            <form action={formAction}className="flex flex-col items-center">
                <h1 className="font-semibold md:text-lg antialiased mb-2">Products</h1>
                {message && <AdminErrorMessage message={message.message}/>}
                <label htmlFor="product-name" className="text-sm md:text-base">Name:</label>
                <input id="product-name" type="text" name='name' required className="border-2 border-black rounded md:w-3/12 w-60 md:h-8"/>
                <label htmlFor="product-price" className="text-sm md:text-base">Price:</label>
                <input value={price} onChange={(e) => {setPrice(e.target.value.replace("€",'') + "€")}} id="product-price" type="" step="any" name='price' required className="border-2 border-black rounded md:w-3/12 w-60 md:h-8"/>
                <label htmlFor="product-amount" className="text-sm md:text-base">Stock:</label>
                <input id="product-amount" type="number" name='amount' required className="border-2 border-black rounded md:w-3/12 w-60 md:h-8"/>
                <label htmlFor="product-category" className="text-sm md:text-base">Category:</label>
                <select id="product-category" name='category' required className="border-2 border-black rounded md:w-3/12 w-60 md:h-8">
                    {categories && categories.map((category) => (
                        <option key={category.name} value={category.name}>{category.name}</option>
                        ))}
                </select>
                <label htmlFor="product-description" className="text-sm md:text-base">Description:</label>
                <textarea id="product-description" name='description' className="border-2 border-black rounded md:w-3/12 w-60"/>
                <label htmlFor="product-image" className="text-sm md:text-base">Image:</label>
                <input
                id="product-image"
                type="file"
                name='image'
                className="w-60 md:w-3/12 text-blue-800 font-semibold text-xs md:text-base
                file:p-3 file:md:p-4 file:rounded-full file:border-0 file:font-semibold file:bg-blue-200 file:text-blue-800 hover:file:bg-blue-300 file:cursor-pointer"/>
                <SubmitButton text="Add Product" setNeedRerender={setNeedRerender}/>
            </form>
            <div className="flex place-content-end">
                <select onChange={(e) => setCategoriesFilter(e.target.value)} className="border border-black rounded w-fit md:w-20 h-8 text-sky-950 antialised text-sm md:text-base m-2 md:m-4 align-self-end">
                    {categories && categories.map((category) => (
                        <option key={category.name} value={category.name}>{category.name}</option>
                        ))}
                </select>
            </div>
            <div className="mt-2 ml-4 md:ml-20 grid grid-cols-6 font-bold text-xs md:text-base">
                <span className="mr-4">Image</span>
                <span className="mr-4">Name</span>
                <span className="mr-4">Price</span>
                <span className="mr-4">Stock</span>
                <span className="mr-4">Category</span>
            </div>
            <ul className="flex flex-col divide-y ml-4 md:ml-20">
                {products
                ? categoriesFilter
                    ? products.filter((product) => product.category === categoriesFilter).map((product) => (
                        <ProductManager key={product.id} product={product} setNeedRerender={setNeedRerender}/>
                        ))
                    :products.map((product) => (
                    <ProductManager key={product.id} product={product} setNeedRerender={setNeedRerender}/>
                    ))
                : <AdminSkeletonProduct/>}
            </ul>
        </motion.section>
    )
}