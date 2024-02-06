"use client"

import SubmitButton from "./SubmitButton"
import { signUp } from "../../serveractions/signUp"
import { useFormState } from "react-dom"
import ErrorMessage from "./ErrorMessage"
import SuccessMessage from "./SuccessMessage"

export default function SignUp() {
    const [message, formAction] = useFormState(signUp, null)
    return (
        <form action={formAction} className="flex flex-col gap-5 items-center">
            {message?.success ? <SuccessMessage message={message.success}/> : null}
            <input required type="text" placeholder="Username" name="username"/>
            {message?.error?.username ? <ErrorMessage message={message.error.username} small={true}/> : null}
            <input required type="password" placeholder="Password" name="password"/>
            {message?.error?.password ? <ErrorMessage message={message.error.password} small={true}/> : null}
            <input type="password" placeholder="Confirm Password" name="confirmpassword"/>
            {message?.error?.confirmpassword ? <ErrorMessage message={message.error.confirmpassword} small={true}/> : null}
            <input type="email" placeholder="Email" name="email"/>
            {message?.error?.email ? <ErrorMessage message={message.error.email} small={true}/> : null}
            <SubmitButton text="Sign Up"/>
        </form>
    )
}