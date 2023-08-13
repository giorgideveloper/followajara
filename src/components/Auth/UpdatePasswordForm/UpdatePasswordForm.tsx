'use client'
import { useRef, useState } from "react"
import { updateUser } from "./action"
import Input from "@/components/Form/Input"
import Submit from "./form"

const UpdatePasswordForm = ({ userEmail }: any) => {
    const [status, setStatus] = useState<string>('')
    const formRef = useRef<HTMLFormElement>(null)
    const formHandle = async (formData: FormData) => {
        const data = Object.fromEntries(formData.entries())
        const response = await updateUser({ ...data, userEmail })

        if (response?.status === 200) setStatus(response.message)
        formRef?.current?.reset()
    }

    return (
        <>
            <form className='space-y-4 my-4' action={formHandle} ref={formRef}>

                <Input name="password" label="პაროლი" type="password" placeholder="********" />
                <Input label="გაიმეორეთ პაროლი" type="password" placeholder="********" />

                <div>
                    <Submit ></Submit>
                </div>

                {status == 'success' &&
                    <div className="alert alert-success">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>პაროლი წარმატებით შეიცვალა!</span>
                    </div>
                }
            </form>
        </>
    )
}

export default UpdatePasswordForm