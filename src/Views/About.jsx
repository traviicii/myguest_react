import { getStorage, ref } from 'firebase/storage'
import React from 'react'
import { Link } from 'react-router-dom'

export default function About() {


  return (
    <div className='' >
      <div className='flex flex-col items-center'>
        <div className="card w-96 mb-11 shadow-xl">
          <div className="card-body flex flec-col">
            <div className='flex justify-center flex-col'>
              <div className='text-2xl'>Thank you for using the myGuest app!</div><br></br>
              <div>myGuest was built for hairstylists (by a hairstylist) to keep their own personal database of clientelle, seperate from whatever your salon's chosen booking software is, and ideal for freelance stylists as well!</div><br></br>
              <div>Track contact information, color analysis, past color history and appointment details like formulas and techniques used, including uploading photos!</div><br></br>
              <div>This web application is developed and and maintained by one person (me!). If you've been enjoying using it or have any suggestions, features, or ides you'd like to be implemented, please feel free to contact me <Link className='font-bold text-primary' to={"mailto:traviscpeck@gmail.com"}>here</Link>! Any feedback is greatly appreciated!</div>
            </div>
              <br></br>

            <div>
              <p className='text-2xl'>Upcoming features</p>
              <ul className='steps steps-vertical'>
                <li className='step step-primary'>Export your client data (Pandas)</li>
                <li className='step'>Send mass text alerts to all or selected clients (Twillio)</li>
                <li className='step'>Appontment scheduling and tracking (Calendly?)</li>
                <li className='step'>Paginated client page</li>
                <li className='step'>Optional donations or subscription of an amount of your choosing (Stripe)</li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div >
  )
}
