import React from 'react'

const BACK_END_URL = process.env.REACT_APP_BACKEND_URL

export default function FormulaEntry() {



  return (
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
                    <h2 className="card-title">
                        2023-10-05

                    </h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div className="card-actions justify-end">
                        <div className="badge badge-outline">Fashion</div>
                        <div className="badge badge-outline">Cut & Color</div>
                    </div>
                </div>
            </div>
  )
}
