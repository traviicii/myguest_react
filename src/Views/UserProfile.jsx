import React, { useContext } from 'react'
import { UserContext } from '../Context/UserContext'
import stuntbot from '../images/stuntbot.png'

export default function UserProfile() {
    const { user } = useContext(UserContext)

    return (
        <div className='flex justify-center pt-10'>
            <div className='card bg-neutral max-w-full p-10'>
                <div className="avatar">
                    <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src={user.photoURL ? user.photoURL : stuntbot} />
                    </div>
                </div>
                <p className='text-secondary '>This is a card</p>

            </div>

        </div>
    )
}
