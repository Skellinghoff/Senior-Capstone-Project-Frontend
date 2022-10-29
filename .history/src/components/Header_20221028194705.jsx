import React from 'react'
import Logo from './images/ttu-logo.png'

function Header ({handleLoginClick}){

    const handleClick = () =>
    {
        handleLoginClick();
    };

    return (
        <header>
            <img id="logo" src={Logo} />
            <button onClick={handleClick} id="sign-in"> Sign-In <i className="fa-solid fa-chevron-right"></i></button>
        </header>
    )
}

export default Header