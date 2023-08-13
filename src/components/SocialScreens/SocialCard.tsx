
'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { FC, useEffect, useState } from 'react';
import UpsertForm from './UpsertForm';

interface SocialCardProps {
    id: string
    title: string
    userId: string
}


const SocialCard: FC<SocialCardProps> = ({ id, title, userId }) => {
    const [screens, setScreens] = useState<any[]>([])
    const supabase = createClientComponentClient()

    const getScreens = async () => {

        let { data, error: err } = await supabase
            .from('screens')
            .select("*")

            // Filters
            .eq('social', id)
            .eq('user_id', userId)
            .limit(10)

        if (data) setScreens(data)

    }
    useEffect(() => {
        getScreens()
    }, [])
    return (
        <>
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">{title}</h2>
                    {screens.length == 0 &&
                        <p>No screens</p>
                    }
                    <div className='flex flex-wrap gap-8 '>

                        {screens.length > 0 &&
                            screens.map((item, i) => {
                                const day = 60 * 60 * 24
                                const diff = new Date(item.created_at).getTime() - Date.now()
                                const cond = diff >= day ? 'ნო ედით' : 'ედიტ'

                                return (
                                    <div key={i} className="card md:w-1/6 bg-base-100 shadow-xl image-full">
                                        <figure><img src={`https://qncbnxbxcvvacstnmmdk.supabase.co/storage/v1/object/public/screens/${item.image}`} alt="Shoes" /></figure>
                                        <div className="card-body">
                                            <h2 className="card-title text-base">Reach-{item.views}</h2>
                                            <p></p>
                                            <div className="card-actions justify-center">
                                                {
                                                    diff >= day &&
                                                    <> 
                                                        <label htmlFor={`my_modal_${i}`} className="btn btn-xs">რედაქტირება</label>
 
                                                        <input type="checkbox" id={`my_modal_${i}`} className="modal-toggle" />
                                                        <div className="modal">
                                                            <div className="modal-box font-black">
                                                                <div className='flex items-center justify-between'>
                                                                    <h3 className="font-bold text-lg text-black">{id}</h3>
                                                                    <label htmlFor={`my_modal_${i}`} className="btn">X</label>
                                                                </div>
                                                                <UpsertForm id={id} userId={userId}
                                                                    defaultValues={{
                                                                        id: item.id,
                                                                        views: item.views,
                                                                    }}
                                                                />

                                                            </div>
                                                        </div>
                                                    </>
                                                }
                                            </div>
                                        </div>
                                    </div>)
                            }
                            )}
                    </div>
                    <div className="card-actions justify-end">
                        <a href={`#socModal_${id}`} className="btn">დამატება</a>
                    </div>
                </div>
            </div >

            <div id={`socModal_${id}`} className="modal">
                <div className="modal-box">
                    <div className='flex items-center justify-between'>
                        <h3 className="font-bold text-lg">{title}</h3>
                        <a href="#" className="btn">X</a>
                    </div>
                    <UpsertForm id={id} userId={userId} />
                </div>
            </div>

        </>
    )
}

export default SocialCard