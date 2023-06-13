import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../Context/UserContext'
import { useContext } from 'react'
import stuntbot from '../images/stuntbot.png'
import { themeChange } from 'theme-change'


export default function Navbar() {

    const { user, logMeOut, navigate } = useContext(UserContext)

    useEffect(() => {
        themeChange(false)
    }, [])

    // Closes dropdown when an item in it is clicked
    const handleclick = () => {
        const elem = document.activeElement;
        if(elem){
            elem?.blur();
        }
    };


    return (
        <div>
            <div className="navbar flex bg-neutral">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-accent lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {user.id ?
                                // Dropdown nav on mobile
                                <>
                                    <li onClick={handleclick}><Link className='text-accent' to={'/clients'}>Clients</Link></li>
                                    <li onClick={handleclick}><Link className='text-accent' to={'/userprofile'}>Profile <div className="badge badge-sm badge-secondary">NEW</div></Link></li>
                                    <li onClick={handleclick}><Link className='text-accent' to={'/settings'}>About</Link></li>
                                    <li onClick={handleclick}><Link className='text-accent' to={'/'} onClick={() => logMeOut()} >Logout</Link></li>
                                </>
                                :
                                <>
                                    <li onClick={handleclick}><Link className='text-accent' to={'/'}>Home</Link></li>
                                    <li onClick={handleclick}><Link className='text-accent' to={'/SignUp'}>Sign Up</Link></li>
                                </>
                            }
                            <li>
                                <label className='text-accent dropdown dropdown-end' data-key="" htmlFor="myGuest_theme">Theme
                                    <select data-choose-theme className='dropdown dropdown-end' id="myGuest_theme">
                                        <option value="cyberpunk">Cyberpunk</option>
                                        <option value="lofi">LoFi</option>
                                        <option value="black">Black</option>
                                        <option value="mytheme">myGuest</option>
                                        <option value="halloween">Halloween</option>
                                        <option value="synthwave">Synthwave</option>
                                    </select>
                                </label>
                            </li>
                        </ul>
                    </div>
                    <Link className='flex btn btn-ghost' to={user.id ? '/clients' : '/'}>
                        <span className="pr-0 text-base-100 normal-case text-xl">my</span>
                        <span className="pl-0 text-accent normal-case text-xl">Guest</span>
                    </Link>
                </div>

                <div className="navbar hidden lg:flex lg:justify-center">
                    <ul className="menu menu-horizontal px-1">
                        {user.id ?
                            <>
                                <li><Link className='text-accent' to={'/clients'}>Clients</Link></li>
                                <li><Link className='text-accent' to={'/userprofile'}>Profile <div className="badge badge-sm badge-secondary">NEW</div></Link></li>
                                <li><Link className='text-accent' to={'/settings'}>About</Link></li>
                                <li><Link className='text-accent' to={'/'} onClick={() => logMeOut()} >Logout</Link></li>
                                <li><p className='text-neutral-content'>Hello, {user.first_name}!</p></li>
                            </>
                            :
                            <>
                                <li><Link className='text-accent' to={'/'}>Home</Link></li>
                                <li><Link className='text-accent' to={'/SignUp'}>Sign Up</Link></li>
                            </>
                        }
                        <li>

                            <label className='text-accent' data-key="" htmlFor="myGuest_theme">Theme
                                <select data-choose-theme className='' id="myGuest_theme">
                                    <option value="cyberpunk">Cyberpunk</option>
                                    <option value="lofi">LoFi</option>
                                    <option value="black">Black</option>
                                    <option value="mytheme">myGuest</option>
                                    <option value="halloween">Halloween</option>
                                    <option value="synthwave">Synthwave</option>
                                </select>
                            </label>
                        </li>
                    </ul>
                </div>
                {user.id ?

                    <div className='dropdown dropdown-end'>
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src={user.photoURL ? user.photoURL : stuntbot} alt='' />
                            </div>
                        </label>
                        {/* <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {"placeholder"}
                        </ul> */}
                    </div>

                    :

                    <div className="navbar-end">
                        <Link className="btn btn-accent" to="/login">Log In</Link>
                    </div>
                }
            </div>

            

        </div>
    )
}
