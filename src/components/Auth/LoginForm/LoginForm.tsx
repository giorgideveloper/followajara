'use client'
import Input from "@/components/Form/Input"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FC, useState } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"

interface IFormInput {
    email: string
    password: string
}

interface LoginFormProps { }

const LoginForm: FC<LoginFormProps> = () => {
    const router = useRouter()
    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const supabase = createClientComponentClient()

    const {
        control,
        handleSubmit,
        formState: { errors },

    } = useForm<IFormInput>({})

    const onSubmit: SubmitHandler<IFormInput> = async (values) => {
        try {
            setError('')
            setLoading(true)
            const { data, error } = await supabase.auth.signInWithPassword({
                ...values
            })

            if (error) {
                setError(error?.message)
            }

            if (data.user) {
                router.refresh()

                setTimeout(() => {
                    router.replace('/profile')
                }, 100);
            }

        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <form className='space-y-4 my-4' onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="email"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => <Input {...field} label="ელ. ფოსტა" placeholder="ელ. ფოსტა" />}
                />
                {errors.email && <span className="text-red-700 text-sm mt-2">* აუცილებელი ველი</span>}

                <Controller
                    name="password"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => <Input {...field} label="პაროლი" type="password" placeholder="შეიყვანეთ პაროლი" />}
                />
                {errors.password && <span className="text-red-700 text-sm mt-2">* აუცილებელი ველი</span>}

                <div className="flex items-center justify-end">
                    <Link href='reset' className="self-end hover:text-blue-800 hover:underline" >დაგავიწყდათ პაროლი?</Link>
                </div>

                <div >
                    <button className="btn btn-block btn-primary" type='submit'>
                        {loading && <span className="loading loading-spinner"></span>}
                        შესვლა</button>
                </div>
                {error && <span className="text-red-700 text-sm mt-2">{error}</span>}
            </form>
            <span className='mt-8'>{`არ გაქვს არგარიში`}?
                <Link href="/register" className="text-blue-600 hover:text-blue-800 hover:underline"> რეგისტრაცია</Link>
            </span>
        </>
    )
}

export default LoginForm