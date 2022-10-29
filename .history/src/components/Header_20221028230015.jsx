import React from 'react'
import Logo from './images/ttu-logo.png'


function Header() {

    return (
        <header>
            <img id="logo" src={Logo} />
            <button  id="sign-in">Sign-In <i className="fa-solid fa-chevron-right"></i></button>
        </header>
        
    )
}

export default Header