"use client"

import { Session } from "next-auth"
import saveLocalToDb from "./saveLocalToDb"


export default async function syncLocalAndDb(session: Session, status: "authenticated" | "unauthenticated" | "loading") {
    if (status === "unauthenticated") return false
    const shoppingCart = localStorage.getItem("shoppingCart") || "[]"
    if (!shoppingCart) return false
    const local = JSON.parse(shoppingCart)
    const cart = await saveLocalToDb(local, session?.user?.email!)
    localStorage.setItem("shoppingCart", JSON.stringify(cart))
    window.dispatchEvent(new Event("storage"));
    return true
}