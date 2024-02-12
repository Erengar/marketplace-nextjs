import SignOut from './SignOut';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { redirect } from "next/navigation";

export default async function Page() {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
        redirect("/")
    }
    return <SignOut/>
}