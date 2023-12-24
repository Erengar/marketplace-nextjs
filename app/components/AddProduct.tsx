"use client";

import SubmitButton from "./SubmitButton";
import { useState } from "react";

export default function Addproduct(){
    const [needRerender, setNeedRerender] = useState(false);
    return (
        <section className="bg-slate-100">
            <form action="" className="flex flex-col items-center">
                <h1 className="font-semibold text-lg antialiased mb-4">Products</h1>
                <label htmlFor="product-name" className="">Name:</label>
                <input id="product-name" type="text" name='name' required className="border-2 border-black rounded w-1/2 md:w-3/12 w-60"/>
                <label htmlFor="product-price" className="">Price:</label>
                <input id="product-price" type="text" name='price' required className="border-2 border-black rounded w-1/2 md:w-3/12 w-60"/>
                <label htmlFor="product-description" className="">Description:</label>
                <input id="product-description" type="text" name='description' required className="border-2 border-black rounded w-1/2 md:w-3/12 w-60"/>
                <label htmlFor="product-image" className="">Image:</label>
                <input id="product-image" type="text" name='image' required className="border-2 border-black rounded w-1/2 md:w-3/12 w-60"/>
                <label htmlFor="product-category" className="">Category:</label>
                <input id="product-category" type="text" name='category' required className="border-2 border-black rounded w-1/2 md:w-3/12 w-60"/>
                <label htmlFor="product-stock" className="">Stock:</label>
                <input id="product-stock" type="text" name='stock' required className="border-2 border-black rounded w-1/2 md:w-3/12 w-60"/>
                <SubmitButton text="Add Product" needRerender={needRerender} setNeedRerender={setNeedRerender}/>
            </form>
        </section>
    )
}