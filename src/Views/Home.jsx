import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import avant_image1 from '../images/avant_image1.png'
import haircut_background from '../images/haircut_background.png'
import platinum_bob from '../images/platinum_bob.png'
import modern_french_bob from '../images/modern_french_bob.png'
import { UserContext } from '../Context/UserContext';

export default function Home() {

    //This points directly to the current theme
    // console.log(document.children[0].dataset.theme, "this theme")

    const navigate = useNavigate()
    const { user } = useContext(UserContext)

    if (user.id){
        navigate('/clients')
    }

    const randBackground = () => {
        let x = [
            avant_image1,
            platinum_bob,
            modern_french_bob,
            haircut_background
        ];
        let choice = Math.floor(Math.random() * (x.length));
        return x[choice]
    };

    return (
        <div>
            <div className="hero min-h-screen" style={{ backgroundImage: `url(${randBackground()})` }}>

                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md hero-overlay bg-opacity-30 p-12 rounded-xl">
                        <h1 className="mb-5 text-5xl font-bold">Welcome to myGuest</h1>
                        <p className="mb-5">A convenient place for you to create and maintain a <b>personal database of your clientelle</b>. Allowing you to keep records of <b>color history</b> and <b>formulas</b>, as well as upload <b>photos of your work</b> and even contacting your clients through <b>email or text</b>. Made for hairstylists, by hairstylists!</p>
                        <div className='flex justify-center w-full'>
                            <Link className="btn btn-accent" to="/signup">Get Started</Link>
                            <div className="divider divider-horizontal">OR</div>
                            <Link className="btn btn-accent" to="/login">Log In</Link>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
