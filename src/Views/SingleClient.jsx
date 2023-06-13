import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../Context/UserContext';
import { GlobalContext } from '../Context/GlobalContext';
import { getStorage, ref, deleteObject } from "firebase/storage";

import orange_cyberpunk from '../images/orange_cyberpunk.png'
import haircut_background from '../images/haircut_background.png'
import blue_hair from '../images/blue_hair.png'
import group from '../images/group.png'
import dual_tone from '../images/dual_tone.png'
import stunty_bob from '../images/stunty_bob.png'


const BACK_END_URL = process.env.REACT_APP_BACKEND_URL

export default function SingleClient() {

    const navigate = useNavigate()

    const { user } = useContext(UserContext)
    const { currentClient, setCurrentClient, addMessage } = useContext(GlobalContext)
    const { client_id } = useParams()
    const [checked, setChecked] = useState(null)

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [birthday, setBirthday] = useState('')
    const [type, setType] = useState('')
    const [notes, setNotes] = useState('')

    useEffect(() => { setChecked(null) }, [checked])

    useEffect(() => { getClient() }, [])

    // this handle change is tracks chane in values for client information
    const handleChange = (e, func) => {
        func(e.target.value)
    };

    const getClient = async () => {
        const token = user.apitoken

        const res = await fetch(`${BACK_END_URL}/api/client/${client_id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
        const data = await res.json()
        setCurrentClient(data.client)
        localStorage.setItem('myGuest_currentClient', JSON.stringify(data.client))

        const client = data.client

        setFirstName(client.first_name)
        setLastName(client.last_name)
        setEmail(client.email)
        setPhone(client.phone)
        setBirthday(client.birthday)
        setType(client.type)
        setNotes(client.notes)
    };

    const deleteClient = async () => {
        const token = user.apitoken

        const res = await fetch(`${BACK_END_URL}/api/delete/client/${client_id}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
        const data = await res.json()
        if (data.status == 'ok'){
            console.log(data)
            // Create reference to the users folder on Firebase
            const userImagesRef = ref(getStorage(), `user/${user.id}/client/${client_id}`);
            // Delete the file
            deleteObject(userImagesRef).then(() => {
            // File deleted successfully
            }).catch((error) => {
                addMessage("Uh-oh, an error occurred!", 'error')
            });
            // addMessage(data.message)
            navigate('/clients')

        }
    };

    const updateClient = async (e) => {
        e.preventDefault()
        const token = user.apitoken

        const url = BACK_END_URL + `/api/update/client/${client_id}`;
        const options = {
            method: "POST",
            headers: {
                "Content-Type": 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                user_id: user.id,
                first_name: firstName,
                last_name: lastName,
                email: email,
                phone: phone,
                birthday: birthday,
                type: type,
                notes: notes
            })
        }

        try {
            const res = await fetch(url, options);
            const data = await res.json();
            if (data.status === 'ok') {
                // Show success msg
                // console.log(data)
                addMessage(data.message, "success")
            }
            else {
                return console.log(data.message)
            }
        }
        catch {
            console.log("Couldn't update client. Try again?")
        }
    };


    return (
        <div className='' >
            <div className='flex flex-col items-center'>
                <h2 className="card-title mt-5 text-base-100 bg-primary h-10 pr-2 pl-2">{`${currentClient.first_name} ${currentClient.last_name}`}</h2>
                <div className='flex justify-center mt-5'>
                    <div className="tabs rounded">
                        <Link to={`/client/${client_id}/formulas`} className="tab tab-lifted tab-lg ">History</Link>
                        <p className="tab tab-lifted tab-lg tab-active base-200">Info</p>
                        <Link to={`/client/${client_id}/colorchart`} className="tab tab-lifted tab-lg ">Color Chart</Link>
                    </div>
                </div>



                <div className="card w-96 mb-11 shadow-xl">
                    <div className="card-body">
                        <div className="form-control">
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
                                    <input type="text" value={email} onChange={e => handleChange(e, setEmail)} className="badge w-80 h-9" />
                                </label>
                            </div>

                            <div className="form-input mb-3">
                                <label className="input-group input-group-vertical">
                                    <span>Phone</span>
                                    <input type="text" value={phone} onChange={e => handleChange(e, setPhone)} className="badge w-80 h-9" />
                                </label>
                            </div>

                            <div className="form-input">
                                <label className="input-group input-group-vertical">
                                    <span>Birthday</span>
                                    <input type="date" value={birthday} onChange={e => handleChange(e, setBirthday)} className="badge badge-outline w-80 h-9" />
                                </label>
                            </div>


                            <div className='flex flex-col items-center mt-3 mb-'>
                                <p className='mb-2 underline'>Client Type </p>
                                <div className='flex'>
                                    <button onClick={e => handleChange(e, setType)} value="cut" className={`badge badge-lg ${type === 'cut' ? '' : 'badge-outline'}`}>Cut</button>
                                    <button onClick={e => handleChange(e, setType)} value="color" className={`badge badge-lg ml-3 mr-3 ${type === 'color' ? '' : 'badge-outline'}`}>Color</button>
                                    <button onClick={e => handleChange(e, setType)} value="cut & color" className={`badge badge-lg ${type === 'cut & color' ? '' : 'badge-outline'}`}>Both</button>
                                </div>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Notes</span>
                                </label>
                                <textarea placeholder="Client Notes" type='text' value={notes} onChange={e => handleChange(e, setNotes)} name='notes' className="textarea textarea-bordered textarea-xs w-full max-w-xs" ></textarea>
                            </div>




                            <div className='flex justify-around mt-6'>
                                {/* The button to open modal */}
                                <label htmlFor="decision-modal" className="btn">Delete</label>

                                <button type='submit' onClick={(e) => { updateClient(e) }} className="btn form-control">Save</button>
                            </div>


                            {/* Put this part before </body> tag */}
                            <input type="checkbox" id="decision-modal" className="modal-toggle" />
                            <div className="modal">
                                <div className="modal-box bg-warning">
                                    <h3 className="font-bold text-lg">Remove Client</h3>
                                    <p className="py-4">Are you sure you want to delete this client from your database? <b>This can't be undone!</b></p>
                                    <div className="modal-action flex justify-around">
                                        <label htmlFor="decision-modal" onClick={() => deleteClient()} className="btn btn-error">I'm sure!</label>
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
