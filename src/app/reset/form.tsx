'use client'

import { experimental_useFormStatus as useFormStatus } from 'react-dom'

export default function Submit() {
    const { pending } = useFormStatus()

    return (
        <button type="submit" className="btn btn-block btn-primary" disabled={pending}>
            {pending && <span className="loading loading-spinner"></span>}
            {pending ? ' იგზავნება...' : 'გაგზავნა'}
        </button>
    )
}