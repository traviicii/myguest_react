import React, { useContext, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { GlobalContext } from '../Context/GlobalContext'

const BACK_END_URL = process.env.REACT_APP_BACKEND_URL

export default function NewFormulaEntry() {

    const { client_id } = useParams()
    const { currentClient, setCurrentClient } = useContext(GlobalContext)

    const [image1, setImage1] = useState('')
    const [image2, setImage2] = useState()
    const [image3, setImage3] = useState()

    const handleChange = (e, func) => {
        func(e.target.value)
    };

    return (
        <div className='flex flex-col items-center'>
            <h2 className="card-title mt-5 text-base-100 bg-primary h-10 pr-2 pl-2">{`${currentClient.first_name} ${currentClient.last_name}`}</h2>
            <div className='flex justify-center mt-5'>
                <div className="tabs">
                    <Link to={`/client/${client_id}/formulas`} className="tab tab-lifted tab-lg ">History</Link>
                    <Link to={`/client/${client_id}`} className="tab tab-lifted tab-lg ">Info</Link>
                    <Link to={`/client/${client_id}/colorchart`} className="tab tab-lifted tab-lg ">Color Chart</Link>
                </div>
            </div>

            <div className="card w-96 mb-11 shadow-xl">
                <div className="card-body">

                    <div className='flex justify-between mb-4'>
                        <h2 className='text-2xl'>Add New Entry</h2>
                    </div>

                    <div className="form-control">
                        <input type="file" name='image1' onChange={(e) => { setImage1(e.target.files[0])}} className="file-input file-input-bordered file-input-sm w-full max-w-xs mb-3" />
                        <input type="file" name='image2' className="file-input file-input-bordered file-input-sm w-full max-w-xs mb-3" />
                        <input type="file" name='image3' className="file-input file-input-bordered file-input-sm w-full max-w-xs mb-3" />

                        <label className="input-group input-group-vertical max-w-fit">
                            <span>Date</span>
                            <input type="date" className="badge badge-outline w-80 h-9" />
                        </label>

                        <div className='mb-2 mt-3'>
                            <label className='mr-1'>Price: $</label>
                            <input className='badge w-20' />
                        </div>

                        <div className='form-radio flex justify-around pt-'>
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
                                    <span className="label-text pr-1">Both</span>
                                    <input type="radio" name="type" value="cut & color" className="form-radio radio checked:accent-content" checked />
                                </label>
                            </div>
                        </div>

                        <label className="label">
                            <span className="label-text">Notes</span>
                        </label>
                        <textarea placeholder="Client Notes" type='text' name='notes' className="textarea textarea-bordered textarea-xs w-full max-w-xs" ></textarea>
                    </div>

                    <div className="flex justify-around mt-6">
                        <Link to={`/client/${client_id}/formulas`} className="btn mr-10">Cancel</Link>
                        <button className="btn">Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
