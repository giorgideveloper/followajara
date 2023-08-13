import { InputHTMLAttributes, forwardRef } from "react"

type InputProps = {
    label: string
} & InputHTMLAttributes<HTMLInputElement>

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const { label, ...rest } = props
    return (
        <div>
            <label className="text-lg font-medium text-gray-900">
                <span className="text-base label-text">{label}</span>
            </label>
            <input
                ref={ref}

                className="w-full input input-bordered mt-2 text-md text-gray-500"
                {...rest}
            />
        </div>
    )
})

export default Input;
Input.displayName = 'Input'