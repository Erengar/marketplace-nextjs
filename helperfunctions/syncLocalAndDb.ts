import { Session } from "next-auth"
import saveLocalToDb from "./saveLocalToDb"
import Cart from "./cart/cart"


export default async function syncLocalAndDb(session: Session, status: "authenticated" | "unauthenticated" | "loading") {
    if (status === "unauthenticated") return false
    if (window === undefined) return false

    const cart = new Cart()
    const shoppingCart = cart.getProducts()
    if (!shoppingCart) return false


    const dbCart = await saveLocalToDb(shoppingCart, session?.user?.email!)
    if (!dbCart) return false
    cart.reapplyCart(dbCart)
    
    window.dispatchEvent(new Event("storage"));
    return true
}