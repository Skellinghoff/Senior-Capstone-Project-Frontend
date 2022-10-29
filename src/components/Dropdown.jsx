import React from 'react'
import { useState } from "react";
import DropdownItem from './DropdownItem'
import locationData from "../location-data.json"

const Dropdown = (props) => {
    //handles hiding and showing dropdown
    const [open, setopen] = useState(props.cs)
    const toggleOpen = () => {
        setopen(!open)
    }

    const [dropdownLocations, setDropdownLocations] = useState(locationData.map(location => {
        return location.category == props.category ? <DropdownItem key={location.id}
            id={location.id}
            abbrev={location.abbrev}
            name={location.name}
            callBack={props.callBack}
            zoomCallBack={props.zoomCallBack}
            dropToggle={props.dropToggle}
            Mlat={location.lat}
            Mlng={location.lng}
        /> : null
    }))

    if (dropdownLocations.every(value => value === null)) {
        setDropdownLocations([<DropdownItem name="Empty" />])
    }

    return (
        <div className="dropdown">
            <p className={open ? "active" : "closed"} onClick={toggleOpen}><i className={open ? "fa-solid fa-caret-up" : "fa-solid fa-caret-down"}></i>{props.headertext}</p>
            <ul className={open ? "dropdown-list" : "dropdown-list hidden"}>
                {dropdownLocations}
            </ul>
        </div>
    )
}

export default Dropdown