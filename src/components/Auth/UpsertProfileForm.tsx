'use client'
import Input from "@/components/Form/Input"
import { randomString } from "@/utils/random"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { FC, useState } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import Image from "next/image"


interface IFormInput {
    id: string
    name: string
    lastname: string
    email: string
    birthday: string
    tel: string
    personalNumber: string
    password: string
    rePassword: string
    avatar_url: string
    fb: string
    ig: string
    yt: string
    tk: string
}

interface RegisterFormProps {
    onSub?: () => void
    defaults?: IFormInput
}

const UpsertProfileForm: FC<RegisterFormProps> = ({ defaults, onSub }) => {
    const [error, setError] = useState<string>('')
    const [uploadLoading, setUploadLoading] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const supabase = createClientComponentClient()

    const {
        control,
        register,
        handleSubmit,
        watch,
        getValues,
        formState: { errors, isDirty, },
    } = useForm<IFormInput>({
        defaultValues: {
            ...defaults
        }
    })

    const onSubmit: SubmitHandler<IFormInput> = async (values) => {
        const { name, lastname, tel, id, personalNumber, birthday, fb, ig, tk, yt } = values

        try {
            setError('')
            setLoading(true)
            const updates = {
                id,
                name,
                lastname,
                tel,
                birthday,
                fb,
                ig,
                tk,
                yt,
                updated_at: new Date(),
            }

            let { error } = await supabase.from('profiles').upsert(updates)

            if (error) {
                setError(error?.message)
            }

            // if (onSub) onSub()
            // if (data) {
            //     // router.reload()
            // } 
        } catch (error) {
            // alert(error.message)
            console.log(error);

        } finally {
            setLoading(false)

        }
    }

    const fileUploadDialog = () => {
        const fileUploadDialog = document.getElementById('fileUploadDialog')
        fileUploadDialog?.click()

    }

    return (
        <>
            <form className='space-y-6 my-6 w-full' onSubmit={handleSubmit(onSubmit)}>

                <div className="flex flex-col lg:flex-row items-start justify-between gap-6 mt-4">

                    <div className="space-y-5">
                        <div className="relative">
                            <Image
                                src={`https://qncbnxbxcvvacstnmmdk.supabase.co/storage/v1/object/public/avatars/${defaults?.avatar_url}`}
                                alt="Avatar"
                                width={300}
                                height={300}
                                className="rounded-md flex-1" />
                            <div
                                onClick={fileUploadDialog}
                                className="flex items-center justify-center absolute w-full h-full top-0 left-0 bg-gray-100 opacity-20 hover:opacity-100 transition-all duration-300 cursor-pointer text-center m-auto rounded-md"
                            >{uploadLoading ?
                                <span className="loading loading-spinner loading-lg"></span>
                                :
                                'შეცვლა'}</div>
                            <input
                                hidden
                                type="file"
                                id="fileUploadDialog"
                                onChange={async (e: any) => {
                                    setUploadLoading(true)
                                    const name = randomString(16)
                                    const { data, error } = await supabase.storage
                                        .from('avatars')
                                        .upload(name, e.target.files[0])
                                    await supabase.from('profiles').upsert({
                                        id: defaults?.id,
                                        avatar_url: data?.path
                                    })

                                    // field.onChange(data?.path ?? '')
                                    setUploadLoading(false)
                                }
                                }
                            />
                        </div>

                    </div>



                    <div className="space-y-5 w-full">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="w-full">
                                <Controller
                                    name="name"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => <Input {...field} label="სახელი" placeholder="სახელი" />}
                                /> {errors.name && <span className="text-red-700 mt-2">* აუცილებელი ველი</span>}
                            </div>
                            <div className="w-full">

                                <Controller
                                    name="lastname"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => <Input {...field} label="გვარი" placeholder="გვარი" />}
                                /> {errors.lastname && <span className="text-red-700 mt-2">* აუცილებელი ველი</span>}
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="w-full">

                                <Controller
                                    name="tel"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => <Input {...field} type="tel" pattern="[0-9]{3}[0-9]{2}[0-9]{2}[0-9]{2}" label="ტელეფონი" placeholder="511-12-34-56" />}
                                /> {errors.tel && <span className="text-red-700 mt-2">* აუცილებელი ველი</span>}
                            </div>
                            <div className="w-full">

                                <Controller
                                    name="birthday"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => <Input {...field} type="date" label="დაბადების თარიღი" placeholder="დაბადების თარიღი" />}
                                /> {errors.birthday && <span className="text-red-700 mt-2">* აუცილებელი ველი</span>}
                            </div>
                        </div>

                    </div>
                </div>

                <Controller
                    name="fb"
                    control={control}
                    render={({ field }) => <Input {...field} type="text" label="Facebook" placeholder="https://www.facebook.com/*********/" />}
                /> {errors.fb && <span className="text-red-700 mt-2">* აუცილებელი ველი</span>}
                <Controller
                    name="ig"
                    control={control}
                    render={({ field }) => <Input {...field} type="text" label="Instagram" placeholder="https://www.instagram.com/*********/" />}
                /> {errors.ig && <span className="text-red-700 mt-2">* აუცილებელი ველი</span>}
                <Controller
                    name="yt"
                    control={control}
                    render={({ field }) => <Input {...field} type="text" label="Youtube" placeholder="https://www.youtube.com/@*********/" />}
                /> {errors.yt && <span className="text-red-700 mt-2">* აუცილებელი ველი</span>}
                <Controller
                    name="tk"
                    control={control}
                    render={({ field }) => <Input {...field} type="text" label="Tiktok" placeholder="https://www.tiktok.com/@*********/" />}
                /> {errors.tk && <span className="text-red-700 mt-2">* აუცილებელი ველი</span>}

                <div className="mt-5">
                    <button className="btn btn-block btn-primary" type='submit' disabled={loading || !isDirty}>
                        {loading && <span className="loading loading-spinner"></span>}
                        განახლება</button>
                </div>
                {error && <span className="text-red-700 mt-2">{error}</span>}
            </form>
        </>
    )
}

export default UpsertProfileForm