import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import ClientTest from "./ClientTest";

export default async function Page() {
    const session = await getServerSession(authOptions);
    return (
        <>
        {session?.user ? <div>Logged in</div> : <div>Not logged in</div>}
        <ClientTest />
        </>
    );
}
