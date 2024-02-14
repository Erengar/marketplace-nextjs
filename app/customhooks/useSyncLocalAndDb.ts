"use client"

import saveLocalToDb from "../helperfunctions/saveLocalToDb"
import { useSession } from "next-auth/react"


export default async function useSyncLocalAndDb() {
    const { data: session, status } = useSession()
    if (status === "unauthenticated") return false
    const shoppingCart = localStorage.getItem("shoppingCart")
    if (!shoppingCart) return false
    const local = JSON.parse(shoppingCart)
    const cart = await saveLocalToDb(local, session?.user?.email!)
    localStorage.setItem("shoppingCart", JSON.stringify(cart))
    window.dispatchEvent(new Event("storage"));
    return true
}