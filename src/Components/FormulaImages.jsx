import React from 'react'

export default function FormulaImages( { index, image } ) {
    return (
        <div className='carousel-item max-w-fit max-h-fit'>
            <img src={image.imageURL} alt="Carousel image" />
        </div>
    )
}
