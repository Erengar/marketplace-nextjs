"use client"
import { useContext } from "react";
import { CurrencyContext } from "../context/CurrencyProvider";

export default function PriceTag({price, className, inline=false}: {price: number, className?: string, inline?: boolean}) {
    const currency = useContext(CurrencyContext)
    if (inline) return (
        <span className={`antialiased ${className}`}>{price}{currency}</span>
    )   
    return (
            <h3 className={`antialiased ${className}`}>{price}{currency}</h3>
            )
        
}