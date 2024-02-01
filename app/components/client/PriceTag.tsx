"use client";
import { useContext } from "react";
import { CurrencyContext } from "../context/CurrencyProvider";

type PriceTagProps = {
    price: number;
    className?: string;
    inline?: boolean;
};

export default function PriceTag({
    price,
    className,
    inline = false,
}: PriceTagProps) {
    const currency = useContext(CurrencyContext);
    if (inline)
        return (
            <span className={`antialiased ${className}`}>
                {price}
                {currency}
            </span>
        );
    return (
        <h3 className={`antialiased ${className}`}>
            {price}
            {currency}
        </h3>
    );
}
