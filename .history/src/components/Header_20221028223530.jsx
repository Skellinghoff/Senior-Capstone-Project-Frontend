import React,{useState} from 'react'
import Logo from './images/ttu-logo.png'

function Header() {

    const [login , setLogin] = useState(false);

    const toggleLogin = () => {

        setLogin(!login)

    }

    return (
        <header>
            <img id="logo" src={Logo} />
            <button onClick ={toggleLogin}  id="sign-in">Sign-In <i className="fa-solid fa-chevron-right"></i></button>
        </header>
    )
}

export default Header