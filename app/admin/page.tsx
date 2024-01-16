import AdminSection from "../components/client/AdminSection"
import { Metadata } from "next"

// Opt out of caching for all data requests in the route segment
export const dynamic = 'force-dynamic'

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