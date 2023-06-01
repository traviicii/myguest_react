import React, { useContext, useState } from 'react'
import { UserContext } from '../Context/UserContext'
import stuntbot from '../images/stuntbot.png'
import { GlobalContext } from '../Context/GlobalContext'
import { useNavigate } from 'react-router-dom'

const BACK_END_URL = process.env.REACT_APP_BACKEND_URL

export default function UserProfile() {

    const { user } = useContext(UserContext)
    const { addMessage } = useContext(GlobalContext)

    const [firstName, setFirstName] = useState(user.first_name)
    const [lastName, setLastName] = useState(user.last_name)
    const [email, setEmail] = useState(user.email)
    // const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const handleChange = (e, func) => {
        func(e.target.value)
    };

    const updateUser = async (e) => {
        e.preventDefault()
        const token = user.apitoken

        const url = BACK_END_URL + `/api/user/updateaccount`;
        const options = {
            method: "POST",
            headers: {
                "Content-Type": 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password
            })
        }

        try {
            const res = await fetch(url, options);
            const data = await res.json();
            if (data.status === 'ok') {
                // Show success msg
                // console.log(data)
                addMessage(data.message)
            }
            else {
                return console.log(data.message)
            }
        }
        catch {
            console.log("Couldn't update. Try again?")
        }
    };

    const deleteUser = async () => {
        const token = user.apitoken

        try {
            const res = await fetch(`${BACK_END_URL}/api/user/${user.id}/deleteaccount`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
            const data = await res.json()
            console.log(data)
            if (data.status == 'ok') {
                addMessage(data.message)
                navigate('/')
            }
            else {
                addMessage(data.message)
            }
        }
        catch {
            return addMessage("Error deleting account...", "error")
        }
    };

    return (
        <div className='' >
            <div className='flex flex-col items-center'>

                <div className="avatar mt-11">
                    <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src={user.photoURL ? user.photoURL : stuntbot} />
                    </div>
                </div>

                <div className="card w-96 mb-11 shadow-xl">
                    <div className="card-body">
                        <div className='flex justify-center'>
                            <div className='w-fit flex items-center'>
                                <div className='card-title text-base-100 bg-primary h-10 pr-2 pl-2'>{user.first_name} {user.last_name}</div>
                            </div>
                        </div>
                        <div className="form-control">
                            <div className='text-center mb-2'>You must log in again to see any changes made here.</div>
                            <div className="form-input mb-3">
                                <label className="input-group input-group-vertical">
                                    <span>First Name</span>
                                    <input type="text" required="required" value={firstName} onChange={e => handleChange(e, setFirstName)} className="badge w-80 h-9 " />
                                </label>
                            </div>

                            <div className="form-input mb-3">
                                <label className="input-group input-group-vertical">
                                    <span>Last Name</span>
                                    <input type="text" required="required" value={lastName} onChange={e => handleChange(e, setLastName)} className="badge w-80 h-9" />
                                </label>
                            </div>

                            <div className="form-input mb-3">
                                <label className="input-group input-group-vertical">
                                    <span>Email</span>
                                    {user.uid ?
                                        <input type="text" value={email} className="badge w-80 h-9" />
                                        :

                                        <input type="text" value={email} onChange={e => handleChange(e, setEmail)} className="badge w-80 h-9" />
                                    }
                                </label>
                            </div>

                            <div className="form-input mb-3">
                                <label className="input-group input-group-vertical">
                                    <span>Password</span>
                                    <input type="text" required="required" onChange={e => handleChange(e, setPassword)} className="badge w-80 h-9" />
                                </label>
                            </div>

                            {/* <div className="form-input mb-3">
                                <label className="input-group input-group-vertical">
                                    <span>Phone</span>
                                    <input type="text" value={phone} onChange={e => handleChange(e, setPhone)} className="badge w-80 h-9 pointer-events-none" />
                                </label>
                            </div> */}

                            <div className='flex justify-center mt-6'>
                                <div className='indicator'>
                                    <span className="indicator-item badge badge-primary">Coming soon!</span>
                                    <button type='submit' className="btn form-control">Export Data</button>
                                </div>
                            </div>

                            <div className='flex justify-around mt-6'>
                                {/* The button to open modal */}
                                <label htmlFor="decision-modal" className="btn btn-error">Delete Account</label>

                                <button type='submit' onClick={(e) => { updateUser(e) }} className="btn form-control">Save</button>
                            </div>


                            {/* Put this part before </body> tag */}
                            <input type="checkbox" id="decision-modal" className="modal-toggle" />
                            <div className="modal">
                                <div className="modal-box bg-warning">
                                    <h3 className="font-bold text-lg">Delete your account?</h3>
                                    <p className="py-4">Are you sure you want to delete your entire account and all information associated with it? <b>This can't be undone!</b></p>
                                    <div className="modal-action flex justify-around">
                                        <label htmlFor="decision-modal" onClick={() => { deleteUser() }} className="btn btn-error">I'm sure!</label>
                                        <label htmlFor="decision-modal" className="btn">Nope! Nevermind!</label>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div >
    )
}
