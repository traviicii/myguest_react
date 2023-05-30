import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../Context/UserContext';
import { GlobalContext } from '../Context/GlobalContext';
// import { getDatabase, ref, set, child, get } from "firebase/database";
import Client_List from '../Components/Client_List';
import { useNavigate } from 'react-router-dom';


const BACK_END_URL = process.env.REACT_APP_BACKEND_URL

export default function Clients() {

    const navigate = useNavigate()

    const { clients, setClients, setCurrentClient } = useContext(GlobalContext)
    const { user } = useContext(UserContext)
    const [notes, setNotes] = useState('')
    const [sortby, setSortby] = useState('first_name')
    const [checked, setChecked] = useState(null)

    useEffect(() => { setChecked(null) }, [clients, checked])
    useEffect(() => { getClients() }, [])
    useEffect(() => { setCurrentClient({}) }, [])
    useEffect(() => { getClients() }, [sortby])

    // this handle change is tracks value of notes in add client modal
    const handleChange = (e) => {
        setNotes(e.target.value)
    };

    const addClient = async (e) => {
        e.preventDefault()
        const token = user.apitoken

        const first_name = e.target.first_name.value
        const last_name = e.target.last_name.value
        const email = e.target.email.value
        const phone = e.target.phone.value
        const birthday = e.target.birthday.value
        const type = e.target.type.value

        console.log(birthday)

        const url = BACK_END_URL + '/api/addclient';
        const options = {
            method: "POST",
            headers: {
                "Content-Type": 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                user_id: user.id,
                first_name: first_name,
                last_name: last_name,
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
                console.log(data)
                getClients()
                setChecked(false)
                e.target.first_name.value = ''
                e.target.last_name.value = ''
                e.target.email.value = ''
                e.target.phone.value = ''
                e.target.birthday.value = ''
                e.target.type.value = ''
                setNotes('')


            } else {
                return console.log(data.message)
            }
        }
        catch {
            console.log("Could not add client. Try again?")
        }
    };

    const getClients = async () => {
        const token = user.apitoken

        const res = await fetch(`${BACK_END_URL}/api/userclients`, {
            method: "POST",
            headers: {
                "Content-Type": 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                sortby: sortby
            })
        })
        const data = await res.json()
        console.log(data)
        setClients(data.clients)
    };


    const showClients = () => {
        return clients.map((client, index) => <Client_List key={index} client={client} />)
    };

    return (
        <div>

            <div className='flex justify-center sm:align-end'>
                {/* The button to open modal */}
                <label htmlFor="my-modal-4" className="btn no-animation rounded-b rounded-t-none mb-5">Add Client</label>
            </div>

            {/* Put this part before </body> tag */}
            {/* Checked state variable closes the modal once the form is submitted */}
            <input type="checkbox" checked={checked} id="my-modal-4" className="modal-toggle" />
            <label htmlFor="my-modal-4" className="modal modal-bottom sm:modal-middle cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                    <form onSubmit={(e) => { addClient(e) }}>
                        <div className='flex justify-between mb-4'>
                            <h2 className='text-2xl'>Add New Client</h2>
                        </div>
                        <div className="form-control">

                            <div className="form-input mb-3">
                                <label className="input-group input-group-vertical">
                                    <span>First Name</span>
                                    <input type="text" required="required" placeholder="First Name" name="first_name" className="form-input input input-bordered" />
                                </label>
                            </div>

                            <div className="form-input mb-3">
                                <label className="input-group input-group-vertical">
                                    <span>Last Name</span>
                                    <input type="text" required="required" placeholder="Last Name" name="last_name" className="form-input input input-bordered" />
                                </label>
                            </div>

                            <div className="form-input mb-3">
                                <label className="input-group input-group-vertical">
                                    <span>Email</span>
                                    <input type="text" placeholder="info@site.com" name="email" className="form-input input input-bordered" />
                                </label>
                            </div>

                            <div className="form-input mb-3">
                                <label className="input-group input-group-vertical">
                                    <span>Phone</span>
                                    <input type="text" placeholder="112-358-1321" name="phone" className="form-input input input-bordered" />
                                </label>
                            </div>

                            <div className="form-input">
                                <label className="input-group input-group-vertical">
                                    <span>Birthday</span>
                                    <input type="date" placeholder="4443331122" name="birthday" className="form-input input input-bordered" />
                                </label>
                            </div>


                            <div className='form-radio flex justify-around pt-4'>
                                <div className="form-control">
                                    <label className="label cursor-pointer">
                                        <span className="label-text pr-1">Color</span>
                                        <input type="radio" name="type" value="color" className="form-radio radio checked:accent-content" checked />
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label cursor-pointer">
                                        <span className="label-text pr-1">Cut</span>
                                        <input type="radio" name="type" value="cut" className="form-radio radio checked:accent-content" checked />
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label cursor-pointer">
                                        <span className="label-text pr-1">Cut & Color</span>
                                        <input type="radio" name="type" value="cut & color" className="form-radio radio checked:accent-content" checked />
                                    </label>
                                </div>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Notes</span>
                                </label>
                                <textarea placeholder="Client Notes" type='text' value={notes} onChange={e => handleChange(e)} name='notes' className="textarea textarea-bordered textarea-xs w-full max-w-xs" ></textarea>
                            </div>


                            <div className='flex justify-center mt-6'>
                                <button type='submit' className="btn btn-wide form-control">Save</button>
                            </div>

                        </div>
                    </form>
                </label>
            </label>

            {/* Start of the client table */}
            <div className="overflow-x-auto w-full">

                <form className="form-control ">
                    <div className="flex justify-between mb-2 ml-2 mr-2">
                        <div>
                            <div className="form-control w-full max-w-xs">
                                
                                    <select value={sortby} onChange={(e) => { setSortby(e.target.value) }} className="select select-sm select-bordered">
                                        <option disabled>Sort By</option>
                                        <option value="first_name">First Name</option>
                                        <option value="last_name">Last Name</option>
                                    </select>
                                
                            </div>
                        </div>
                        <div>
                            <div className=' input-group'>
                                <input type="text" placeholder="Search…" className="input input-bordered input-sm w-36" />
                                <button className="btn btn-square btn-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                </button>
                            </div>

                        </div>
                    </div>
                </form>


                <table className={`table table-compact  table-zebra w-full`}>
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Client</th>
                            {window.innerWidth > 400 ? <th>Info</th> : ''}
                            <th >
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {showClients()}

                    </tbody>
                    {/* foot */}
                    <tfoot>
                        <tr>
                            <th>Client</th>
                            {window.innerWidth > 400 ? <th>Info</th> : ''}
                            <th></th>
                        </tr>
                    </tfoot>

                </table>
            </div>

        </div>
    )
}
