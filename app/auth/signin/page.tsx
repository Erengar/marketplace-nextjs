import { Metadata } from "next";
import SignInRedirect from "@/app/auth/signin/SignInRedirect";

export const metadata : Metadata = {
    title: "SignIn"
}

export default async function Page() {
    return (
        <div className="flex place-content-center pt-12">
            <SignInRedirect />
        </div>
    );
}
