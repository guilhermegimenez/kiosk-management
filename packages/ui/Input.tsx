import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> { }

export const Input = (props: InputProps) => {
    return (
        <input
            {...props}
            className=' dark:bg-gray-200 py-3 px-4 rounded text-sm placeholder:text-zinc-100' />
    )
}