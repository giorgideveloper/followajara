'use server'

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function updateUser(formData: any): Promise<{ status: number, message: string }> {
    try {
        const supabase = createServerComponentClient({ cookies })

        const { data, error } = await supabase.auth.updateUser({
            email: formData.userEmail,
            password: formData.password,
        })

        // console.log("Message sent: %s", data);
        return { status: 200, message: 'success' }
    } catch (error) {
        console.log(error);
        return { status: 200, message: 'error' }

    }
}