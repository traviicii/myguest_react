import React, { useContext, useEffect, useState } from 'react'
import FormulaImages from './FormulaImages'
import { UserContext } from '../Context/UserContext'
import { Link } from 'react-router-dom'

const BACK_END_URL = process.env.REACT_APP_BACKEND_URL

export default function FormulaEntry({ index, formula, client_id }) {

    const { user } = useContext(UserContext)
    const [images, setImages] = useState([])

    useEffect(() => {getImages()}, [])

    const getImages = async () => {
        const token = user.apitoken

        const res = await fetch(`${BACK_END_URL}/api/formula/${formula.id}/getimages`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
        const data = await res.json()
        console.log(data)
        if (data.images){
            setImages(data.images)
        }
        else if (data.status == 'ok'){
            console.log(data.message)
        }
        else if (data.status == 'not ok'){
            console.log(data.message)
        }
    };

    const showImages = () => {
        return images.map((image, index) => <FormulaImages key={index} index={index} image={image} />)
    };

    return (
        <div className="card w-96 bg-base-200 mt-10 shadow-xl">
            <figure>
                <div className='carousel rounded-box'>
                    {images ? showImages() : ''}
                </div>
            </figure>
            <div className="card-body">
                <div className='flex justify-between'>
                    <div className="card-title">
                        {formula.date}
                    </div>
                    <div className='card-title'>${formula.price ? formula.price : "--"}</div>
                </div>
                <p>{formula.notes}</p>
                <div className="card-actions justify-between mt-3">
                    <div className="badge badge-accent ">{formula.type}</div>
                    <Link to={`/client/${client_id}/formula/${formula.id}/editformula`} className="btn btn-primary btn-outline btn-xs">Edit</Link>
                </div>
            </div>
        </div>
    )
}

