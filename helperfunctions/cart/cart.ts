import { CartItemType } from "@/app/schemas";
import { ProductType } from "@/db/schema";

export default class Cart {
    
    addProduct(product: CartItemType | ProductType) {
        const cart = this.getProducts();
        if (product.hasOwnProperty("orderedAmount")) {
            const item = cart.find((item: CartItemType) => item.product.id === (product as CartItemType).product.id);
            if (item) {
                item.orderedAmount += 1;
            } else {
                (product as CartItemType).orderedAmount = 1;
                cart.push(product);
            }
        } else {
            const newProduct: CartItemType = {
                product: product as ProductType,
                orderedAmount: 1,
            };
            cart.push(newProduct);
        }
        localStorage.setItem("shoppingCart", JSON.stringify(cart));

    }
    
    removeProduct(product: CartItemType) {
        const cart = this.getProducts();
        const item = cart.find((item: CartItemType) => item.product.id === product.product.id);
        if (item) {
            if (item.orderedAmount > 1) {
                item.orderedAmount -= 1;
            } else {
                const index = cart.indexOf(item);
                cart.splice(index, 1);
            }
        }
        localStorage.setItem("shoppingCart", JSON.stringify(cart));
    }

    reapplyCart(cart: CartItemType[]) {
        localStorage.setItem("shoppingCart", JSON.stringify(cart));
    }
    
    getProducts() {
        return localStorage.getItem("shoppingCart") ? JSON.parse(localStorage.getItem("shoppingCart")!) : [];
    }
}