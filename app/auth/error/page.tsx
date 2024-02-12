import AuthError from "./AuthError"
import { Metadata } from "next";

export const metadata : Metadata = {
    title: "Error"
}

export default async function Error() {
    return <AuthError/>
}