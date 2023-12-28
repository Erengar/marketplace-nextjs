import AdminSection from "../components/client/AdminSection"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Admin',
}

export default async function Admin() {
    return (
        <main>
            <AdminSection />
        </main>
    )
}