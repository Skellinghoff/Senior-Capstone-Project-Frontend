import React from 'react'
import { useState } from "react";

const Signin = (props) => {
    const [view, setview] = useState(true)
    const toggleView = () => {
        setview(!view)
    }

    const [open, setopen] = useState(true)
    const toggleOpen = () => {
        setopen(!open)
    }

    return (
        <div className={open ? "signin-container" : "signin-container closed"}>
            <div className="signin-pop">
                <i class="fa-solid fa-xmark" onClick={toggleOpen}></i>
                <h2>Sign In</h2>
                <form action="#">
                    <input type="text" className='username' placeholder='Enter Your Username' />
                    <br />
                    <input type={view ? "password" : "text"} className='password' placeholder='Enter Your Password' />
                    <i class="fa-solid fa-eye" onClick={toggleView}></i>
                    <br />
                    <input type="submit" value="SUBMIT" />
                </form>
            </div>
            <div className="blur"></div>
        </div>
    )
}

export default Signin