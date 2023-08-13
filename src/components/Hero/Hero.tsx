'use client'

import { useEffect, useRef } from "react"

const Hero = () => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const bluredVideoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        videoRef.current?.play()
        bluredVideoRef.current?.play()

    }, [])

    return (
        <section className="relative h-80 md:h-screen lg:h- mb-20 flex flex-col items-center justify-center text-center text-white py-0 px-3">
            <div className="video-docker absolute top-0 left-0 w-full h-full overflow-hidden">
                <video
                    className="min-w-full min-h-full absolute object-cover"
                    src="/Ajara-Tourist-Alphabet.mp4"
                    autoPlay
                    muted
                    loop>

                </video>
            </div>
            <div className="video-content space-y-6 sm:space-y-8">
                <p className="text-3xl lg:text-7xl tracking-widest font-geo-gza"><span className="font-fira-go">#</span>gamomyeviaWaraSi</p>
                <p className="text-3xl lg:text-7xl tracking-widest font-geo-gza">da moige</p>
                <p className="font-bold text-5xl lg:text-9xl tracking-widest mt-10 font-geo-gza">100 000 ₾</p>
            </div>
        </section>
    )
}

export default Hero
