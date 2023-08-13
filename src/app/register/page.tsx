import RegisterForm from "@/components/Auth/RegisterForm"
import { Metadata } from "next"
import { openGraphImage } from "../shared-metadata"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
    title: 'რეგისტრაცია',
    openGraph: {
        ...openGraphImage,
        title: 'რეგისტრაცია',
    },
}

export default async function Page() {
    const supabase = createServerComponentClient({ cookies })

    const { data: { session } } = await supabase.auth.getSession()

    if (session) redirect('/')

    return (
        <div className="w-full lg:w-3/4 mx-auto p-6">
            <div className="card w-full lg:w-2/3 bg-base-100 shadow-xl mx-auto mt-6">
                <div className="card-body">
                    {/* <p className="text-2xl font-bold text-center my-10 text-red-600">რეგისტრაცია დაიწყება 1 აგვისტოს!</p> */}
                    <RegisterForm />
                </div>
            </div>
        </div>
    )
}

