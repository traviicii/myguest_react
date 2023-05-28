import React, { useContext, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { GlobalContext } from '../Context/GlobalContext'

import orange_cyberpunk from '../images/orange_cyberpunk.png'
import haircut_background from '../images/haircut_background.png'
import blue_hair from '../images/blue_hair.png'
import group from '../images/group.png'
import dual_tone from '../images/dual_tone.png'
import stunty_bob from '../images/stunty_bob.png'
import image_1 from '../images/image_1.jpg'
import image_2 from '../images/image_2.jpg'
import image_3 from '../images/image_3.jpg'

const BACK_END_URL = process.env.REACT_APP_BACKEND_URL

export default function Formulas() {

    const { client_id } = useParams()
    const { currentClient, setCurrentClient } = useContext(GlobalContext)

    return (
        <div className='flex flex-col items-center'>
            <h2 className="card-title mt-5 text-base-100 bg-primary h-10 pr-2 pl-2">{`${currentClient.first_name} ${currentClient.last_name}`}</h2>
            <div className='flex justify-center mt-5'>
                <div className="tabs">
                    <a className="tab tab-lifted tab-lg tab-active bg-base-200">History</a>
                    <Link to={`/client/${client_id}`} className="tab tab-lifted tab-lg ">Info</Link>
                    <Link to={`/client/${client_id}/colorchart`} className="tab tab-lifted tab-lg ">Color Chart</Link>
                </div>
            </div>

            <Link to={`/client/${client_id}/newformula`} className='btn btn-circle base-100 mt-5'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="white" height="48" viewBox="0 -960 960 960" width="48"><path d="M450-200v-250H200v-60h250v-250h60v250h250v60H510v250h-60Z" /></svg>
            </Link>


            <div className="card w-96 bg-base-200 mt-10 shadow-xl">
                <figure>
                    <div className='carousel rounded-box'>
                        <div className='carousel-item max-w-fit max-h-fit'>
                            <img src={image_1} alt="Shoes" />
                        </div>
                        <div className='carousel-item max-w-fit max-h-fit'>
                            <img src={image_2} alt="Shoes" />
                        </div>
                        <div className='carousel-item max-w-fit max-h-fit'>
                            <img src={image_3} alt="Shoes" />
                        </div>
                    </div>
                </figure>
                <div className="card-body">
                    <div className='flex justify-between'>
                        <div className="card-title">
                            2023-10-05
                        </div>
                        <div className='card-title'>$90</div>
                    </div>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div className="card-actions justify-end">
                        <div className="badge badge-outline">Fashion</div>
                        <div className="badge badge-outline">Cut & Color</div>
                    </div>
                </div>
            </div>

            <div className="card w-96 bg-base-200 bg-base-100 mt-10 mb-5 shadow-xl">
                <figure></figure>
                <div className="card-body">
                    <div className="card-title">
                        Shoes!
                        <div className="badge badge-secondary">NEW</div>
                    </div>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div className="card-actions justify-end">
                        <div className="badge badge-outline">Fashion</div>
                        <div className="badge badge-outline">Cut & Color</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
