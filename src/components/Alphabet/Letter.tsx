'use client'

import { FC, useState } from "react";
import { Alphabet } from "./types";

interface LetterProps extends Alphabet {

}

const Letter: FC<LetterProps> = ({ letter, src }) => {
    const [modal, setModal] = useState(false);

    const [videoLoading, setVideoLoading] = useState(true);

    function openModal() {
        setModal(!modal);
    }

    function closeModal() {
        setModal(false);
    }

    const spinner = () => {
        setVideoLoading(!videoLoading);
    };
    return (
        <>
            <button
                type="button"
                key={letter}
                onClick={openModal}
                className="bg-contain bg-no-repeat p-4 md:p-10 m-1 sm:mx-4 md:mx-6 lg:mx-10 "
                style={{
                    backgroundImage: 'url(/pin.svg)',
                    backgroundPosition: '50% 50%',
                }}
            >
                <p
                    style={{
                        color: '#1959FF'
                    }}
                    className="font-medium text-xl -mt-4 md:-mt-6 md:text-6xl lg:text-6xl  p-1 hover:scale-125 transition-all  font-adaptirebuli  "
                >{letter} </p>
                {modal ? (
                    <section className="modal__bg">
                        <div className="modal__align">
                            <div className="modal__content"
                            // modal={modal}
                            >
                                {/* <IoCloseOutline
                                            className="modal__close"
                                            arial-label="Close modal"
                                            onClick={setModal}
                                        />   */}
                                <div className="modal__video-align">
                                    {videoLoading ? (
                                        <div className="modal__spinner">
                                            <span className="loading loading-spinner loading-lg"></span>
                                        </div>
                                    ) : null}
                                    <iframe
                                        className="modal__video-style"
                                        onLoad={spinner}
                                        loading="lazy"
                                        width="800"
                                        height="500"
                                        src={src}
                                        title="YouTube video player"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"

                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    </section>
                ) : null}
            </button>

        </>

    )
}

export default Letter