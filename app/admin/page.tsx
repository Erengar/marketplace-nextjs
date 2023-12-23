import AddCategory from "../components/AddCategory"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Admin',
}

export default async function Admin() {
    return (
        <main>
            <AddCategory />
        </main>
    )
}