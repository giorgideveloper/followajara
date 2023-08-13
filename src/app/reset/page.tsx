
'use client'

import Input from "@/components/Form/Input"
import Link from "next/link"
import { useRef, useState } from "react"
import { sendResetLink } from "./action"
import Submit from "./form"

export default function Page() {
    const [error, setError] = useState<string>('')

    const [status, setStatus] = useState<string>('')
    const formRef = useRef<HTMLFormElement>(null)

    const formHandle = async (formData: FormData) => {
        const data = Object.fromEntries(formData.entries())

        const response = await sendResetLink(data)

        if (response?.status === 200) setStatus(response.message)
        formRef?.current?.reset()
    }


    return (
        <div className="w-full md:w-2/3 mx-auto p-6">
            <div className="card w-full lg:w-1/2 bg-base-100 shadow-xl mx-auto mt-6">
                <div className="card-body">

                    <>
                        <form className='space-y-4 my-4' action={formHandle} ref={formRef}>
                            <Input name="email" type='email' label="ელ. ფოსტა" placeholder="ელ. ფოსტა" required />

                            <div >
                                <Submit />
                            </div>
                            {error && <span className="text-red-700 mt-2">{error}</span>}
                        </form>
                        {status == 'success' &&
                            <div className="alert alert-success">
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span>პაროლის აღდგენის ლინკი გამოიგზავნა ელ. ფოსტაზე!</span>
                            </div>
                        }
                        <span className='mt-8'>
                            <Link href="/login" className="text-blue-600 hover:text-blue-800 hover:underline"> უკან დაბრუნება</Link>
                        </span>
                    </>
                </div>
            </div>
        </div>
    )
}