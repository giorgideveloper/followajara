'use client'

import { randomString } from "@/utils/random"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import Input from "../Form/Input"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"


interface IFormInput {
    id: number
    image: string
    views: string
}

const UpsertForm = ({ id, userId, defaultValues }: { id: string, userId: string, defaultValues?: any }) => {
    const router = useRouter()

    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const supabase = createClientComponentClient()

    const {
        control,
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        formState: { errors, isDirty },

    } = useForm<IFormInput>({
        defaultValues: {
            ...defaultValues
        }
    })

    const onSubmit: SubmitHandler<IFormInput> = async (values) => {
        try {
            setError('')
            setLoading(true)
            console.log(values);

            if (defaultValues?.id) {

                const { data, error } = await supabase
                    .from('screens')
                    .update({
                        views: parseInt(values.views),
                        iamge: values.image
                    })
                    .eq('id', values.id)
                    .select()


            } else {

                const { data, error } = await supabase
                    .from('screens')
                    .insert([
                        {
                            ...values,
                            social: id,
                            user_id: userId
                        },
                    ])
                    .select()
            }
            // if (error) {
            //     setError(error?.message)
            // }

            // if ((data?.length ?? 0) > 0) {
            //     reset()
            //     router.replace('profile#')
            // }

        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false)
        }
    }
    return (
        <form className='space-y-6 my-4' onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="image"
                control={control}
                rules={{ required: defaultValues?.id ? false : true }}
                render={({ field }) => <Input
                    type="file"
                    label="სურათი"
                    placeholder="სურათი"
                    className="file-input file-input-bordered w-full"
                    onChange={async (e: any) => {
                        setLoading(true)
                        const name = randomString(16)
                        const { data, error } = await supabase.storage
                            .from('screens')
                            .upload(name, e.target.files[0])
                        if (error) {
                            setError(error.message)
                            return
                        }
                        field.onChange(data?.path ?? '')
                        setLoading(false)
                    }
                    }
                />}
            /> {errors.image && <span className="text-red-700 mt-2">* აუცილებელი ველი</span>}

            <Controller
                name="views"
                control={control}
                rules={{ required: true }}
                render={({ field }) => <Input {...field} type="number" label="Reach-ების რაოდენობა" placeholder="12345" />}
            />
            {errors.views && <span className="text-red-700 mt-2">* აუცილებელი ველი</span>}


            <div>
                <button className="btn btn-block btn-primary" type='submit' disabled={loading || !isDirty}>
                    {loading && <span className="loading loading-spinner"></span>}
                    {defaultValues?.id ? 'განახლება' : 'ატვირთვა'}</button>
            </div>
            {error && <span className="text-red-700 mt-2">{error}</span>}

        </form>
    )
}

export default UpsertForm;