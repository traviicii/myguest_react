import React, { useEffect } from 'react'

export default function EditImages( { index, image, handleDeleteImage } ) {

    // useEffect(()=>{},[images])

    // const handleDeleteImage = (imageID) => {
    //     const updatedImages = images.filter((image) => image.id !== imageID);
    //     setImages(updatedImages);

    //     setImageTrashCan((current) => [...current, imageID])
    // };

    return (
        <div className='flex flex-col items-center w-24 ml-2 mr-2'>
            <img src={image.imageURL} alt="" />
            <button onClick={()=>handleDeleteImage(image.id)} className="btn btn-circle sm:btn-outline btn-xs mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
        </div>
    )
}
