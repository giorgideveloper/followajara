
import Tabs from "@/components/Tabs"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import 'react-tabs/style/react-tabs.css'
import './profile.css'

const Profile = async () => {
    const supabase = createServerComponentClient({ cookies })

    const { data: { session } } = await supabase.auth.getSession()

    if (!session) redirect('/')
    const userId = session.user.id
    const userEmail = session.user.email

    let { data, error, status } = await supabase
        .from('profiles')
        .select(`*`)
        .eq('id', userId)
        .single()

    return (
        <div className="card w-full md:w-2/3 lg:w-2/3 bg-base-100 shadow-xl mx-auto mt-6">
            <div className="card-body">
                <Tabs data={data} userId={userId} userEmail={userEmail} />
            </div>
        </div>
    )
}

export default Profile