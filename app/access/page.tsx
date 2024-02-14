import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import ClientTest from "./ClientTest";
import saveLocalToDb from "../helperfunctions/saveLocalToDb";

export default async function Page() {
    const session = await getServerSession(authOptions);
    return (
        <>
        {session?.user ? <div>Logged in</div> : <div>Not logged in</div>}
        <ClientTest />
        </>
    );
}
