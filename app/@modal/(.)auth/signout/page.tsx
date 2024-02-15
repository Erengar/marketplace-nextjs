"use server"

import { Modal } from "@/app/[category]/@modal/(..)product/[id]/modal"
import SignOut from "@/app/auth/signout/SignOut"

export default async function page() {
    return (
        <Modal className="rounded-full">
            <SignOut modal={true}/>
        </Modal>
    )
}