import { FC } from "react";
interface PlaceButtonProps {
    id: number
    title: string
    description: string
}

const colors = [
    'bg-orange-100',
    'bg-blue-100',
    'bg-green-100',
    'bg-red-100',
    'bg-pink-100',
    'bg-cyan-100',
    'bg-purple-100'
]

const PlaceButton: FC<PlaceButtonProps> = ({ id, title, description }) => {

    return (
        <>
            <a href={`#my_modal_${id}`} className={`card w-full md:w-1/4 lg:w-1/5 ${colors[id]}`} >
                <div className="card-body justify-center items-center">
                    <h2 className="card-title my-0">{title}</h2>
                </div>
            </a>

            <div className="modal" id={`my_modal_${id}`}>
                <form method="dialog" className="modal-box w-11/12 max-w-5xl">
                    <div dangerouslySetInnerHTML={{ __html: description }} className='text-black' />
                    <div className="modal-action">
                        <a href="#" className="btn">დახურვა</a>
                    </div>
                </form>
            </div>
        </>
    )
}

export default PlaceButton