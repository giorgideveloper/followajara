import Link from "next/link"
import { InputHTMLAttributes, forwardRef } from "react"

type InputProps = {
    label: string
} & InputHTMLAttributes<HTMLInputElement>

const Checkbox = forwardRef<HTMLInputElement, InputProps>((props, ref) => {

    const { label, value, ...rest } = props
    return (
        <div className="flex items-center gap-2">
            <input
                ref={ref}
                type="checkbox"
                {...rest}
                //   checked="checked" 
                className="checkbox" />
            <label className="text-lg font-medium text-gray-900">
                <span className="text-base label-text"><Link href='/terms' target="_blank" className="text-blue-600 hover:text-blue-800 hover:underline">{label}</Link></span>
            </label>
        </div>
    )
})

export default Checkbox;
Checkbox.displayName = 'Checkbox'