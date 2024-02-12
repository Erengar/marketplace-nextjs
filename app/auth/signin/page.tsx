import { getServerSession } from "next-auth";
import SignIn from "./SignIn";
import { Metadata } from "next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";

export const metadata : Metadata = {
    title: "SignIn"
}

export default async function Page() {
    const session = await getServerSession(authOptions)
    if (session?.user) {
        redirect("/")
    }
    return (
        <div className="flex place-content-center pt-12">
            <SignIn />
        </div>
    );
}
