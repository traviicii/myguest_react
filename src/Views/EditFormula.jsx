import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import { GlobalContext } from '../Context/GlobalContext';

import image_1 from '../images/image_1.jpg'

const BACK_END_URL = process.env.REACT_APP_BACKEND_URL

export default function EditFormula() {

    const { client_id, formula_id } = useParams()
    const { user } = useContext(UserContext)
    const { currentClient } = useContext(GlobalContext)

    const [images, setImages] = useState([])
    const [date, setDate] = useState('')
    const [price, setPrice] = useState('')
    const [type, setType] = useState('')
    const [notes, setNotes] = useState('')

    const handleChange = (e, func) => {
        func(e.target.value)
    };

    useEffect(()=>{getFormula()},[])

    const getFormula = async () => {
        const token = user.apitoken
        
                const res = await fetch(`${BACK_END_URL}/api/formula/${formula_id}/getformula`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                })
                const data = await res.json()
                console.log(data)
                const formula = data.formula
                const images  = data.images
                setDate(formula.date)
                setPrice(formula.price)
                setType(formula.type)
                setNotes(formula.notes)
                setImages(images)
                // if (data.images){
                //    console.log()
                // }
                // else if (data. status == 'not ok'){
                //     console.log(data.message)
                // }

    };

    return (
        <div className='flex flex-col items-center'>
            <h2 className="card-title mt-5 text-base-100 bg-primary h-10 pr-2 pl-2">{`${currentClient.first_name} ${currentClient.last_name}`}</h2>
            <div className='flex justify-center mt-5'>
                <div className="tabs">
                    <Link to={`/client/${client_id}/formulas`} className="tab tab-lifted tab-active tab-lg ">History</Link>
                    <Link to={`/client/${client_id}`} className="tab tab-lifted tab-lg ">Info</Link>
                    <Link to={`/client/${client_id}/colorchart`} className="tab tab-lifted tab-lg ">Color Chart</Link>
                </div>
            </div>

            <div className="card w-96 mb-11 shadow-xl">
                <div className="card-body">

                    <div className='flex'>
                        <h2 className='text-2xl'>Edit Appointment</h2>
                    </div>

                    <div className="form-control">
                        {/* <form onSubmit={(e) => uploadImage1(e)}>
                            <div className='flex'>
                                <input type="file" required="required" name='image1' onChange={(e) => { setImage1(e.target.files[0]) }} className="file-input file-input-bordered file-input-sm w-64 max-w-xs mb-3" />
                                {progress < 99 && progress > 0 ? <button className="btn btn-sm btn-square ml-3 loading"></button> : image1_url ? <span className='btn btn-square btn-sm ml-3'><svg xmlns="http://www.w3.org/2000/svg" className='pb-5 fill-white' height="48" viewBox="0 -960 960 960" width="48"><path d="M378-246 154-470l43-43 181 181 384-384 43 43-427 427Z" /></svg></span> : <button type='submit' className="btn btn-sm ml-3">Upload</button>}
                            </div>
                        </form>
                        {progress ? <progress className="progress w-80 mb-3" value={progress} max="100"></progress> : ''}

                        <form onSubmit={(e) => uploadImage2(e)}>
                            <div className='flex'>
                                <input type="file" required="required" name='image2' onChange={(e) => { setImage2(e.target.files[0]) }} className="file-input file-input-bordered file-input-sm w-64 max-w-xs mb-3" />
                                {progress2 < 99 && progress2 > 0 ? <button className="btn btn-sm btn-square ml-3 loading"></button> : image2_url ? <span className='btn btn-square btn-sm ml-3'><svg xmlns="http://www.w3.org/2000/svg" className='pb-5 fill-white' height="48" viewBox="0 -960 960 960" width="48"><path d="M378-246 154-470l43-43 181 181 384-384 43 43-427 427Z" /></svg></span> : <button type='submit' className="btn btn-sm ml-3">Upload</button>}
                            </div>
                        </form>
                        {progress2 ? <progress className="progress w-80 mb-3" value={progress2} max="100"></progress> : ''}

                        <form onSubmit={(e) => uploadImage3(e)}>
                            <div className='flex'>
                                <input type="file" required="required" name='image3' onChange={(e) => { setImage3(e.target.files[0]) }} className="file-input file-input-bordered file-input-sm w-64 max-w-xs mb-3" />
                                {progress3 < 99 && progress3 > 0 ? <button className="btn btn-sm btn-square ml-3 loading"></button> : image3_url ? <span className='btn btn-square btn-sm ml-3'><svg xmlns="http://www.w3.org/2000/svg" className='pb-5 fill-white' height="48" viewBox="0 -960 960 960" width="48"><path d="M378-246 154-470l43-43 181 181 384-384 43 43-427 427Z" /></svg></span> : <button type='submit' className="btn btn-sm ml-3">Upload</button>}
                            </div>
                        </form>
                        {progress3 ? <progress className="progress w-80 mb-3" value={progress3} max="100"></progress> : ''} */}

                        <label className="input-group input-group-vertical max-w-fit">
                            <span>Date</span>
                            <input type="date" required="required" value={date} onChange={e => handleChange(e, setDate)} className="badge badge-outline w-80 h-9" />
                        </label>

                        <div className='mb-2 mt-3'>
                            <label className='mr-1'>Price: $</label>
                            <input value={price} onChange={e => handleChange(e, setPrice)} className='badge w-20' />
                        </div>

                        <div className='flex flex-col items-center mt-3 mb-'>
                            <p className='mb-2 underline'>Services Performed </p>
                            <div className='flex'>
                                <button onClick={e => handleChange(e, setType)} value="cut" className={`badge badge-lg ${type === 'cut' ? '' : 'badge-outline'}`}>Cut</button>
                                <button onClick={e => handleChange(e, setType)} value="color" className={`badge badge-lg ml-3 mr-3 ${type === 'color' ? '' : 'badge-outline'}`}>Color</button>
                                <button onClick={e => handleChange(e, setType)} value="cut & color" className={`badge badge-lg ${type === 'cut & color' ? '' : 'badge-outline'}`}>Cut & Color</button>
                            </div>
                        </div>

                        <label className="label">
                            <span className="label-text">Notes</span>
                        </label>
                        <textarea placeholder="Formulas, techniques used, etc." type='text' value={notes} onChange={e => handleChange(e, setNotes)} name='notes' className="textarea textarea-bordered textarea-xs w-full max-w-xs" ></textarea>
                    </div>

                    <div className="flex justify-around mt-6">
                        <Link to={`/client/${client_id}/formulas`} className="btn mr-10">Cancel</Link>
                        {<button className="btn">Save</button>}
                        {/* progress || progress2 || progress3 ? <button className="btn loading">Uploading</button> :  */}
                    </div>
                </div>
            </div>

        </div>
    )
}
