'use client'

import SocialCard from "./SocialCard"

const SocialScreens = ({ userId }: { userId: string }) => {
    return (
        <>
            <SocialCard id='fb' title='Facebook' userId={userId} />
            <div className="divider"></div>

            <SocialCard id='ig' title='Instagram' userId={userId} />
            <div className="divider"></div>

            <SocialCard id='tk' title='Tiktok' userId={userId} />
            <div className="divider"></div>

            <SocialCard id='yt' title='Youtube' userId={userId} />
        </>
    )
}

export default SocialScreens