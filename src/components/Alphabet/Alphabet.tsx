'use client'

import Letter from "./Letter"
import { Alphabet } from "./types"

const part1: Alphabet[] = [
    {
        title: '',
        letter: 'ა',
        src: 'https://www.youtube.com/embed/dAxfaUb5PN0'
    },
    {
        title: '',
        letter: 'ბ',
        src: 'https://www.youtube.com/embed/wAAp_1EKBZ0'
    },
    {
        title: '',
        letter: 'გ',
        src: 'https://www.youtube.com/embed/E6aMds6yMWo'
    },
    {
        title: '',
        letter: 'დ',
        src: 'https://www.youtube.com/embed/9zJQSjirS0w'
    },
    {
        title: '',
        letter: 'ე',
        src: 'https://www.youtube.com/embed/_kzHBCqNHZg'
    },
]

const part2: Alphabet[] = [
    {
        title: '',
        letter: 'ვ',
        src: 'https://www.youtube.com/embed/l6uvqsT_eCY',
    },
    {
        letter: 'ზ',
        src: 'https://www.youtube.com/embed/Pv86mcjdOQo',
        title: ''
    },
    {
        letter: 'თ',
        src: 'https://www.youtube.com/embed/f18u4oezb5k',
        title: ''
    },
    {
        letter: 'ი',
        src: 'https://www.youtube.com/embed/MJdQIEr1tMw',
        title: ''
    },
    {
        letter: 'კ',
        src: 'https://www.youtube.com/embed/kyf6OUNQvi0',
        title: ''
    },
    {
        letter: 'ლ',
        src: 'https://www.youtube.com/embed/ClsUtx6pgKI',
        title: ''
    },
]

const part3: Alphabet[] = [
    {
        title: '',
        letter: 'მ',
        src: 'https://www.youtube.com/embed/_bOAfH5yVfE'
    },
    {
        letter: 'ნ',
        src: 'https://www.youtube.com/embed/VIaP5cTIa9o',
        title: ''
    },
    {
        letter: 'ო',
        src: 'https://www.youtube.com/embed/jKcK0-49B3w',
        title: ''
    },
    {
        letter: 'პ',
        src: 'https://www.youtube.com/embed/Tc1-e3QaG_g',
        title: ''
    },
    {
        letter: 'ჟ',
        src: 'https://www.youtube.com/embed/ENpuKR_k7-g',
        title: ''
    },
]


const part4: Alphabet[] = [
    {
        letter: 'რ',
        src: 'https://www.youtube.com/embed/XKtjGFcsWV4',
        title: ''
    },
    {
        letter: 'ს',
        src: 'https://www.youtube.com/embed/y8yZDKugvOE',
        title: ''
    },
    {
        letter: 'ტ',
        src: 'https://www.youtube.com/embed/cxzpVpUVbVo',
        title: ''
    },
    {
        letter: 'უ',
        src: 'https://www.youtube.com/embed/XLMRmrHZ-UY',
        title: ''
    },
    {
        letter: 'ფ',
        src: 'https://www.youtube.com/embed/fDSCHH01pgA',
        title: ''
    },
    {
        letter: 'ქ',
        src: 'https://www.youtube.com/embed/LEpVx9KGtgg',
        title: ''
    }
]

const part5: Alphabet[] = [
    {
        letter: 'ღ',
        src: 'https://www.youtube.com/embed/CrQEzGg_PXc',
        title: ''
    },
    {
        letter: 'ყ',
        src: 'https://www.youtube.com/embed/psnuBfdGqr0',
        title: ''
    },
    {
        letter: 'შ',
        src: 'https://www.youtube.com/embed/7T65I1vhGEc',
        title: ''
    },
    {
        letter: 'ჩ',
        src: 'https://www.youtube.com/embed/FPUl_yRI4Gw',
        title: ''
    },
    {
        letter: 'ც',
        src: 'https://www.youtube.com/embed/Fzy_LQ14JHc',
        title: ''
    }
]

const part6: Alphabet[] = [
    {
        letter: 'ძ',
        src: 'https://www.youtube.com/embed/tvw2D4eShxY',
        title: ''
    },
    {
        letter: 'წ',
        src: 'https://www.youtube.com/embed/mm24yFp4hN0',
        title: ''
    },
    {
        letter: 'ჭ',
        src: 'https://www.youtube.com/embed//MK_cQ0PFToE',
        title: ''
    },
    {
        letter: 'ხ',
        src: 'https://www.youtube.com/embed/vh9YyxvAVIA',
        title: ''
    },
    {
        letter: 'ჯ',
        src: 'https://www.youtube.com/embed/9Mz3FPlNHOo',
        title: ''
    },
    {
        letter: 'ჰ',
        src: 'https://www.youtube.com/embed/UWRa4VStd_k',
        title: ''
    }
]


const Alphabet = () => {
    return (
        <>
            <h2 className={`text-center font-bold text-2xl lg:text-6xl m-20 mb-10 tracking-widest font-fira-go text-gray-900`}>გამომყევი აჭარაში</h2>
            <div className="card w-full bg-none">
                <div className="card-body text-center p-0 sm:p-4">
                    <div className="flex-row">
                        {part1.map((item, index) => (
                            <Letter  {...item} key={index} />
                        ))}
                    </div>
                    <div className="flex-row">
                        {part2.map((item, index) => (
                            <Letter  {...item} key={index} />
                        ))}
                    </div>
                    <div className="flex-row">
                        {part3.map((item, index) => (
                            <Letter  {...item} key={index} />
                        ))}
                    </div>
                    <div className="flex-row">
                        {part4.map((item, index) => (
                            <Letter  {...item} key={index} />
                        ))}
                    </div>
                    <div className="flex-row">
                        {part5.map((item, index) => (
                            <Letter  {...item} key={index} />
                        ))}
                    </div>
                    <div className="flex-row">
                        {part6.map((item, index) => (
                            <Letter  {...item} key={index} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Alphabet