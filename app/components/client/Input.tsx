import { capitalize } from "lodash";
import ErrorMessage from "./ErrorMessage";

type InputProps = {
    error: any;
    type: string;
    name: string;
    placeholder?: string;
    required?: boolean;
    showLabel?: boolean;
    labelClassName?: string;
    inputClassName?: string;
};

export default function Input({
    error,
    type,
    name,
    placeholder,
    required = false,
    showLabel = true,
    labelClassName,
    inputClassName,
}: InputProps) {
    return (
        <>
            <label
                htmlFor={name}
                className={`${labelClassName ? labelClassName : "text-sm md:text-base"} ${showLabel ? "" : "sr-only"}`}
            >
                {capitalize(name) + ":"}
            </label>
            <input
                id={name}
                type={type}
                name={name}
                required={required}
                placeholder={placeholder}
                min={type === "number" ? 0 : undefined}
                className={`${inputClassName ? inputClassName : "h-6 w-60 rounded border-black pl-2 md:h-8 md:w-3/12"} ${typeof error === "object" && error[name] && "border-rose-600"}`}
            />
            {error && error[name] && (
                <ErrorMessage message={error[name]} small={true} />
            )}
        </>
    );
}
