import { CartItemType } from "../../schemas";

export default function RemoveItemModal(props: { removingItem: CartItemType, setRemovingitem: (a : CartItemType | null) => void }) {

    // This function removes the item from the shopping cart
    function removeItem(){
        const shoppingCart = localStorage.getItem('shoppingCart')
        const cartItems = shoppingCart ? JSON.parse(shoppingCart) : []
        const item = cartItems.find((item: CartItemType) => item.product.id === props.removingItem.product.id)
        if (item) {
            const index = cartItems.indexOf(item)
            cartItems.splice(index, 1)
        }
        localStorage.setItem('shoppingCart', JSON.stringify(cartItems))
        window.dispatchEvent(new Event('storage'))
        props.setRemovingitem(null)
    }

    // This function removes item from the state removingItem thus closing the modal
    function removeModal(){
        props.setRemovingitem(null)
    }

    return (
        <div onClick={removeModal} className="fixed top-0 right-0 left-0 flex justify-center items-center w-full h-full max-h-full bg-gray-500 bg-opacity-50 z-10">
            <div className="min-w-[200px] max-w-6xl min-h-min z-20 rounded bg-white border border-black border-solid p-2 flex flex-col gap-y-6">
                <h2 className="text-base antialiased font-bold text-sky-950">{`Are you sure you want to remove ${props.removingItem.product.name} from shopping cart?`}</h2>
                <div className="flex place-content-around">
                    <button onClick={removeItem} className="h-10 w-20 text-base antialiased font-bold text-red-700 border border-black border-solid rounded bg-slate-200 hover:bg-slate-400">Yes</button>
                    <button onClick={removeModal} className="h-10 w-20 text-base antialiased font-bold text-sky-950 border border-black border-solid rounded bg-slate-200 hover:bg-slate-400">No</button>
                </div>
            </div>
        </div>
    )
}