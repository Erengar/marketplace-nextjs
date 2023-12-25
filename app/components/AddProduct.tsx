"use client";

import SubmitButton from "./SubmitButton";
import { useState, useEffect } from "react";
import { CategoryType } from "../schemas";
import { addProductServer } from "../serveractions/addProductServer";
import { ProductType } from "../schemas";
import ProductManager from "./ProductManager";

export default function Addproduct({categories}: {categories: CategoryType[] | null}){
    const [needRerender, setNeedRerender] = useState(false);
    const [products, setProducts] = useState<ProductType[] | null>(null);

    useEffect(()=>{
        fetch('/api/products', {cache: 'no-store'}).then((res) => res.json()).then((data) => setProducts(data.data));
    }, [needRerender])
    return (
        <section className="bg-slate-100">
            <form action={addProductServer} className="flex flex-col items-center">
                <h1 className="font-semibold text-lg antialiased mb-4">Products</h1>
                <label htmlFor="product-name" className="">Name:</label>
                <input id="product-name" type="text" name='name' required className="border-2 border-black rounded md:w-3/12 w-60"/>
                <label htmlFor="product-price" className="">Price:</label>
                <input id="product-price" type="number" step="any" name='price' required className="border-2 border-black rounded md:w-3/12 w-60"/>
                <label htmlFor="product-amount" className="">Stock:</label>
                <input id="product-amount" type="number" name='amount' required className="border-2 border-black rounded md:w-3/12 w-60"/>
                <label htmlFor="product-category" className="">Category:</label>
                <select id="product-category" name='category' required className="border-2 border-black rounded md:w-3/12 w-60">
                    {categories && categories.map((category) => (
                        <option key={category.name} value={category.name}>{category.name}</option>
                        ))}
                </select>
                <label htmlFor="product-description" className="">Description:</label>
                <textarea id="product-description" name='description' className="border-2 border-black rounded md:w-3/12 w-60"/>
                <label htmlFor="product-image" className="">Image:</label>
                <input id="product-image" type="file" name='image' className="md:w-3/12 w-60 file:p-2 file:rounded-full file:border-0 file:font-semibold file:bg-blue-200 file:text-blue-800 hover:file:bg-blue-300"/>
                <SubmitButton text="Add Product" needRerender={needRerender} setNeedRerender={setNeedRerender}/>
            </form>
            <ul className="flex flex-col divide-y mx-4 md:mx-20 ">
                {products && products.map((product) => (
                    <ProductManager key={product.id} product={product} setNeedRerender={setNeedRerender}/>
                ))}
            </ul>
        </section>
    )
}