
import UpdatePasswordForm from "@/components/Auth/UpdatePasswordForm"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

const Page = async () => {
    const supabase = createServerComponentClient({ cookies })

    const { data: { session } } = await supabase.auth.getSession()
    console.log('session', session);

    const userEmail = ''

    return (
        <div className="w-full md:w-2/3 mx-auto p-6">
            <div className="card w-full lg:w-1/2 bg-base-100 shadow-xl mx-auto mt-6">
                <div className="card-body">
                    <UpdatePasswordForm userEmail={userEmail} />
                </div>
            </div>
        </div>
    )
}

export default Page