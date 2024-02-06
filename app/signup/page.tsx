import SignUp from "../components/client/SignUp";

export default async function Page() {
    return <section className="flex flex-col gap-4 mt-4">
        <h1 className="text-xl flex justify-center">Sign Up</h1>
        <SignUp />
    </section>;
}