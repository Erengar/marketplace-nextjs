"use client";
import React, { createContext, useContext } from "react";

export const CurrencyContext = createContext<any>(null);

export function CurrencyProvider({ children, ...props }: any) {
    const value = "€";
    return (
        <CurrencyContext.Provider {...props} value={value}>
            {children}
        </CurrencyContext.Provider>
    );
}

export const useCurrencyContext = () => {
    return useContext(CurrencyContext);
};
