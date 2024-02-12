"use client"

import { createContext } from "react"

export const DomainContext = createContext<string | null>(null)

export default function DomainProvider({children, domain}: {children:React.ReactNode, domain: string | null}) {
    return (
        <DomainContext.Provider value={domain}>
            {children}
        </DomainContext.Provider>
    )
}