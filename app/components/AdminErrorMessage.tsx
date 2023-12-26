import { error } from "console"

export default function AdminErrorMessage({message}: {message: any}) {
    return (
        <div>
            {typeof message === 'string'
            ? <p className="text-red-500">{message}</p>
            : Object.values(message).map((error: any)=> (
                <p key="s"className="text-red-500">{[...error]}</p>)
            )
            }
        </div>
    )
}