import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { GlobalContext } from '../Context/GlobalContext'
import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { UserContext } from '../Context/UserContext';

const BACK_END_URL = process.env.REACT_APP_BACKEND_URL

export default function NewFormulaEntry() {
    const navigate = useNavigate()
    // navigate(`/client/${client_id}/formulas`)

    const { client_id } = useParams()
    const { user } = useContext(UserContext)
    const { currentClient, addMessage } = useContext(GlobalContext)

    const [image1, setImage1] = useState('')
    const [progress, setProgress] = useState('')
    const [image1_url, setImage1URL] = useState('')

    const [image2, setImage2] = useState('')
    const [progress2, setProgress2] = useState('')
    const [image2_url, setImage2URL] = useState('')

    const [image3, setImage3] = useState('')
    const [progress3, setProgress3] = useState('')
    const [image3_url, setImage3URL] = useState('')

    const [date, setDate] = useState('')
    const [price, setPrice] = useState('')
    const [type, setType] = useState('')
    const [notes, setNotes] = useState('')

    const handleChange = (e, func) => {
        func(e.target.value)
    };

    const uploadImage1 = (e) => {
        e.preventDefault()
        // Create a reference line to 'image.jpg'
        const image1ref = ref(getStorage(), `user/${user.id}/client/${client_id}/images/${image1.name}`);
        listenToUpload(image1ref, image1, setProgress, setImage1URL)
    };

    const uploadImage2 = (e) => {
        e.preventDefault()
        const image2ref = ref(getStorage(), `user/${user.id}/client/${client_id}/images/${image2.name}`);
        listenToUpload(image2ref, image2, setProgress2, setImage2URL)
    };

    const uploadImage3 = (e) => {
        e.preventDefault()
        const image3ref = ref(getStorage(), `user/${user.id}/client/${client_id}/images/${image3.name}`);
        listenToUpload(image3ref, image3, setProgress3, setImage3URL)
    };

    const listenToUpload = async (imgref, img, prog, setURLfunc) => {
        // Listen for state changes, errors, and completion of the image upload.
        const uploadTask = uploadBytesResumable(imgref, img);

        uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                prog((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            }, () => { },
            async () => {
                // Upload completed successfully, now we can get the download URL
                await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setURLfunc(downloadURL)
                    // console.log('File available at', downloadURL);
                });
            }
        );
    }


    const addNewFormula = async () => {
        const token = user.apitoken

        const url = BACK_END_URL + `/api/client/${client_id}/createformula`;
        const options = {
            method: "POST",
            headers: {
                "Content-Type": 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                date: date,
                price: price,
                type: type,
                notes: notes,
            })
        }

        try {
            const res = await fetch(url, options);
            const data = await res.json();
            if (data.status === 'ok') {
                // Show success msg
                // console.log(data)
                let formula_id = data.formula_id
                if (image1_url || image2_url || image3_url) {
                    await addImages();
                }
                addMessage(data.message)
                navigate(`/client/${client_id}/formulas`)

            } else {
                return console.log(data.message)
            }
        }
        catch {
            console.log("Unable to add new formula.")
        }
    };

    const addImages = async () => {
        const token = user.apitoken

        const url = BACK_END_URL + `/api/client/${client_id}/addimages`;
        const options = {
            method: "POST",
            headers: {
                "Content-Type": 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                date: date,
                image1_url: image1_url,
                image1_name: image1.name,
                image2_url: image2_url,
                image2_name: image2.name,
                image3_url: image3_url,
                image3_name: image3.name
            })
        }

        try {
            const res = await fetch(url, options);
            const data = await res.json();
            if (data.status === 'ok') {
                // Show success msg
                console.log(data)

            } else {
                return console.log(data.message)
            }
        }
        catch {
            console.log("Unable to add images.")
        }
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
                        <h2 className='text-2xl'>Add New Entry</h2>
                    </div>
                        <p>Be sure to upload images before saving your entry!</p>

                    <div className="form-control">
                        <form onSubmit={(e) => uploadImage1(e)}>
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
                        {progress3 ? <progress className="progress w-80 mb-3" value={progress3} max="100"></progress> : ''}

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
                        {<button onClick={() => addNewFormula()} className="btn">Save</button>}
                        {/* progress || progress2 || progress3 ? <button className="btn loading">Uploading</button> :  */}
                    </div>
                </div>
            </div>

        </div>
    )
}
