import { Metadata } from "next"
import { permanentRedirect } from "next/navigation"


export const metadata: Metadata = {
    title: 'Admin',
}

export default async function Admin() {
    permanentRedirect('/admin/categories')
    return null
}