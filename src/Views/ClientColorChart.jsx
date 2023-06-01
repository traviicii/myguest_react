import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../Context/GlobalContext'
import { Link, useParams } from 'react-router-dom'
import { UserContext } from '../Context/UserContext'

const BACK_END_URL = process.env.REACT_APP_BACKEND_URL

export default function ClientColorChart() {

    
    const { client_id } = useParams()
    const { user } = useContext(UserContext)
    const { currentClient, addMessage } = useContext(GlobalContext)

    const [colorchart, setColorChart] = useState({})

    const [porosity, setPorosity] = useState('')
    const [texture, setTexture] = useState('')
    const [elasticity, setElasticity] = useState('')
    const [scalpCondition, setScalpCondition] = useState('')
    const [naturalLevel, setNaturalLevel] = useState('')
    const [desiredLevel, setDesiredLevel] = useState('')
    const [contribPigment, setContribPigment] = useState('')
    const [grayFront, setGrayFront] = useState('')
    const [graySides, setGraySides] = useState('')
    const [grayBack, setGrayBack] = useState('')
    const [skinDepth, setSkinDepth] = useState('')
    const [skinTone, setSkinTone] = useState('')
    const [eyeColor, setEyeColor] = useState('')


    useEffect(() => { getColorChart() }, [])


    const handleClick = (e, func) => {
        func(e.target.value)
        console.log(e.target.value)
    };

    const getColorChart = async () => {
        const token = user.apitoken

        const res = await fetch(`${BACK_END_URL}/api/client/${client_id}/colorchart`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
        const data = await res.json()
        console.log(data)
        const colorchart = data.colorchart
        setPorosity(colorchart.porosity)
        setTexture(colorchart.hair_texture)
        setElasticity(colorchart.elasticity)
        setScalpCondition(colorchart.scalp_condition)
        setNaturalLevel(colorchart.natural_level)
        setDesiredLevel(colorchart.desired_level)
        setContribPigment(colorchart.contrib_pigment)
        setGrayFront(colorchart.gray_front)
        setGraySides(colorchart.gray_sides)
        setGrayBack(colorchart.gray_back)
        setSkinDepth(colorchart.skin_depth)
        setSkinTone(colorchart.skin_tone)
        setEyeColor(colorchart.eye_color)
    };

    const updateColorChart = async (e) => {
        e.preventDefault()
        const token = user.apitoken

        const url = BACK_END_URL + `/api/client/${client_id}/updatecolorchart`;
        const options = {
            method: "POST",
            headers: {
                "Content-Type": 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                user_id: user.id,
                porosity: porosity,
                hair_texture: texture,
                elasticity: elasticity,
                scalp_condition: scalpCondition,
                natural_level: naturalLevel,
                desired_level: desiredLevel,
                contrib_pigment: contribPigment,
                gray_front: grayFront,
                gray_sides: graySides,
                gray_back: grayBack,
                skin_depth: skinDepth,
                skin_tone: skinTone,
                eye_color: eyeColor
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
                addMessage(data.message)
                return console.log(data.message)
            }
        }
        catch {
            addMessage("Couldn't update colorchart. Try again?", "error")
        }
    };

    return (
        <div className='flex flex-col items-center'>
            <h2 className="card-title mt-5 text-base-100 bg-primary h-10 pr-2 pl-2">{`${currentClient.first_name} ${currentClient.last_name}`}</h2>
            <div className='flex justify-center mt-5'>
                <div className="tabs">
                    <Link to={`/client/${client_id}/formulas`} className="tab tab-lifted tab-lg ">History</Link>
                    <Link to={`/client/${client_id}`} className="tab tab-lifted tab-lg ">Info</Link>
                    <a className="tab tab-lifted tab-lg tab-active bg-base-200">Color Chart</a>
                </div>
            </div>

            <div className="card max-w-fit shadow-xl pl-10 pr-10 pb-9 mb-11 pt-4">

                <div className='flex flex-col items-center mb-4'>
                    <p className='mb-2 underline'>Porosity </p>
                    <div className='flex'>
                        <button onClick={(e) => handleClick(e, setPorosity)} value="resistant" className={`badge ${porosity === 'resistant' ? '' : 'badge-outline'}`}>Resistant</button>
                        <button onClick={(e) => handleClick(e, setPorosity)} value="normal" className={`badge ${porosity === 'normal' ? '' : 'badge-outline'}`}>Normal</button>
                        <button onClick={(e) => handleClick(e, setPorosity)} value="porous" className={`badge ${porosity === 'porous' ? '' : 'badge-outline'}`}>Porous</button>
                        <button onClick={(e) => handleClick(e, setPorosity)} value="very porous" className={`badge ${porosity === 'very porous' ? '' : 'badge-outline'}`}>Very Porous</button>
                    </div>
                </div>

                <div className='flex flex-col items-center mb-4'>
                    <p className='mb-2 underline'>Texture </p>
                    <div className='flex'>
                        <button onClick={(e) => handleClick(e, setTexture)} value="fine" className={`badge ${texture === 'fine' ? '' : 'badge-outline'}`}>Fine</button>
                        <button onClick={(e) => handleClick(e, setTexture)} value="medium" className={`badge ${texture === 'medium' ? '' : 'badge-outline'}`}>Medium</button>
                        <button onClick={(e) => handleClick(e, setTexture)} value="coarse" className={`badge ${texture === 'coarse' ? '' : 'badge-outline'}`}>Coarse</button>
                    </div>
                </div>

                <div className='flex flex-col items-center mb-4'>
                    <p className='mb-2 underline'>Elasticity </p>
                    <div className='flex'>
                        <button onClick={(e) => handleClick(e, setElasticity)} value="normal" className={`badge ${elasticity === 'normal' ? '' : 'badge-outline'}`}>normal</button>
                        <button onClick={(e) => handleClick(e, setElasticity)} value="poor" className={`badge ${elasticity === 'poor' ? '' : 'badge-outline'}`}>Poor</button>
                        <button onClick={(e) => handleClick(e, setElasticity)} value="very poor" className={`badge ${elasticity === 'very poor' ? '' : 'badge-outline'}`}>Very Poor</button>
                    </div>
                </div>

                <div className='flex flex-col items-center mb-4'>
                    <p className='mb-2 underline'>Scalp Condition </p>
                    <div className='flex'>
                        <button onClick={(e) => handleClick(e, setScalpCondition)} value="normal" className={`badge ${scalpCondition === 'normal' ? '' : 'badge-outline'}`}>Normal</button>
                        <button onClick={(e) => handleClick(e, setScalpCondition)} value="dry" className={`badge ${scalpCondition === 'dry' ? '' : 'badge-outline'}`}>Dry</button>
                        <button onClick={(e) => handleClick(e, setScalpCondition)} value="Oily" className={`badge ${scalpCondition === 'Oily' ? '' : 'badge-outline'}`}>Oily</button>
                    </div>
                </div>

                <div className='flex flex-col items-center mb-2'>
                    <div className='mb-2'>
                        <label>Natural Level: </label>
                        <input className='mb-2 badge w-20' value={naturalLevel} onChange={(e) => { setNaturalLevel(e.target.value) }} />
                    </div>
                    <div>
                        <label>Desired Level: </label>
                        <input className='mb-2 badge w-20' value={desiredLevel} onChange={(e) => { setDesiredLevel(e.target.value) }} />
                    </div>
                </div>

                <div className='flex flex-col flex-wrap items-center mb-4'>
                    <p className='mb-2 underline'>Contributing Pigment </p>
                    <div className='flex'>
                        <button onClick={(e) => handleClick(e, setContribPigment)} value="yellow" className={`badge badge-sm ${contribPigment === 'yellow' ? '' : 'badge-outline'}`}>Yellow</button>
                        <button onClick={(e) => handleClick(e, setContribPigment)} value="yellow/orange" className={`badge badge-sm ${contribPigment === 'yellow/orange' ? '' : 'badge-outline'}`}>Yellow/Orange</button>
                        <button onClick={(e) => handleClick(e, setContribPigment)} value="orange" className={`badge badge-sm ${contribPigment === 'orange' ? '' : 'badge-outline'}`}>Orange</button>
                        <button onClick={(e) => handleClick(e, setContribPigment)} value="orange/red" className={`badge badge-sm ${contribPigment === 'orange/red' ? '' : 'badge-outline'}`}>Orange/Red</button>
                        <button onClick={(e) => handleClick(e, setContribPigment)} value="red" className={`badge badge-sm ${contribPigment === 'red' ? '' : 'badge-outline'}`}>Red</button>
                    </div>
                </div>

                <div className='flex flex-col items-center mb-3'>
                    <p>Gray Percentage: </p>
                    <div className='flex'>
                        <div className='mr-3'>
                            <label>Front </label>
                            <input className='mb-2 badge w-14' placeholder='0%' value={grayFront} onChange={(e) => { setGrayFront(e.target.value) }} />
                        </div>
                        <div className='mr-3'>
                            <label>Sides </label>
                            <input className='mb-2 badge w-14' placeholder='0%' value={graySides} onChange={(e) => { setGraySides(e.target.value) }} />
                        </div>
                        <div >
                            <label>Back </label>
                            <input className='mb-2 badge w-14' placeholder='0%' value={grayBack} onChange={(e) => { setGrayBack(e.target.value) }} />
                        </div>
                    </div>
                </div>

                <div className='flex flex-col items-center mb-4'>
                    <p className='mb-2 underline'>Skin Depth </p>
                    <div className='flex'>
                        <button onClick={(e) => handleClick(e, setSkinDepth)} value="light" className={`badge ${skinDepth === 'light' ? '' : 'badge-outline'}`}>Light</button>
                        <button onClick={(e) => handleClick(e, setSkinDepth)} value="medium" className={`badge ${skinDepth === 'medium' ? '' : 'badge-outline'}`}>Medium</button>
                        <button onClick={(e) => handleClick(e, setSkinDepth)} value="dark" className={`badge ${skinDepth === 'dark' ? '' : 'badge-outline'}`}>Dark</button>
                    </div>
                </div>

                <div className='flex flex-col items-center mb-4'>
                    <p className='mb-2 underline'>Skin Tone </p>
                    <div className='flex'>
                        <button onClick={(e) => handleClick(e, setSkinTone)} value="warm" className={`badge ${skinTone === 'warm' ? '' : 'badge-outline'}`}>Warm</button>
                        <button onClick={(e) => handleClick(e, setSkinTone)} value="cool" className={`badge ${skinTone === 'cool' ? '' : 'badge-outline'}`}>Cool</button>
                        <button onClick={(e) => handleClick(e, setSkinTone)} value="neutral" className={`badge ${skinTone === 'neutral' ? '' : 'badge-outline'}`}>Neutral</button>
                    </div>
                </div>

                <div className='flex flex-col items-center mb-6'>
                    <p className='mb-2 underline'>Eye Color</p>
                    <div className='flex'>
                        <button className="badge badge-outline">Resistant</button>
                        <div className="badge ">Normal</div>
                        <div className="badge badge-outline">Porous</div>
                        <div className="badge badge-outline whitespace-nowrap">Very Porous</div>
                    </div>
                </div>

                <div className='flex justify-center'>
                    <button className='btn w-36' onClick={(e) => updateColorChart(e)}>Save</button>
                </div>


            </div>

        </div>
    )
}
