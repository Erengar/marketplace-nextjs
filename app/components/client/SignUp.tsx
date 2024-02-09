"use client";

import SubmitButton from "./SubmitButton";
import { signUp } from "../../serveractions/signUp";
import { useFormState } from "react-dom";
import ErrorMessage from "./ErrorMessage";
import SuccessMessage from "./SuccessMessage";
import Input from "./Input";

export default function SignUp() {
    const [message, formAction] = useFormState(signUp, null);
    return (
        <form
            action={formAction}
            className="flex flex-col items-center gap-5"
            method="post"
        >
            {message?.success ? (
                <SuccessMessage message={message.success} />
            ) : null}
            <Input
                error={message?.error}
                type="text"
                name="username"
                required={true}
                inputClassName=" "
                placeholder="User name"
                showLabel={false}
            />
            <Input
                error={message?.error}
                type="password"
                name="password"
                required={true}
                inputClassName=" "
                placeholder="Password"
                showLabel={false}
            />
            <Input
                error={message?.error}
                type="password"
                name="confirmpassword"
                required={true}
                inputClassName=" "
                placeholder="Confirm Password"
                showLabel={false}
            />
            <Input
                error={message?.error}
                type="email"
                name="email"
                required={true}
                inputClassName=" "
                placeholder="Email"
                showLabel={false}
            />
            <SubmitButton text="Sign Up" />
        </form>
    );
}
