import React from 'react'
import FilterItem from './FilterItem'
import { useState } from "react";
import { GoogleMap, LoadScript, MarkerF, InfoWindow } from '@react-google-maps/api';


const MapSection = (props) => {
    const [map, setMap] = React.useState(null)

    //handles hiding and showing sidebar
    const [clicked, setClicked] = useState(true)
    const toggleSidebar = () => {
        setClicked((prevClicked) => !prevClicked)
    }


    const [options, setOptions] = React.useState({
        disableDefaultUI: true,
        minZoom: 15,
        mapId: "458fe68b808cb87c",
    })

    let infoWindow = null
    const markers = props.locationMarkers.map((location) => {
        let iconType
        let key = location.id
        if (props.activeMarker && props.activeMarker.id === location.id) {
            key = `${location.id}a`
            if (location.category === "residence") {
                iconType = "src/icons/aresidence.svg"
            } else if (location.category === "lecture") {
                iconType = "src/icons/alecture.svg"
            } else if (location.category === "dining") {
                iconType = "src/icons/adining.svg"
            } else if (location.category === "pin_r") {
                iconType = "src/icons/pin_r.svg"
            } else if (location.category === "pin_g") {
                iconType = "src/icons/pin_g.svg"
            } else if (location.category === "pin_o") {
                iconType = "src/icons/pin_o.svg"
            }
        } else if (location.category === "residence") {
            iconType = "src/icons/residence.svg"
        } else if (location.category === "lecture") {
            iconType = "src/icons/lecture.svg"
        } else if (location.category === "dining") {
            iconType = "src/icons/dining.svg"
        } else if (location.category === "pin_r") {
            iconType = "src/icons/pin_r.svg"
        } else if (location.category === "pin_g") {
            iconType = "src/icons/pin_g.svg"
        } else if (location.category === "pin_o") {
            iconType = "src/icons/pin_o.svg"
        }
        return <MarkerF key={key}
            position={{ lat: Number(location.lat), lng: Number(location.lng) }}
            visible={location.visible}
            icon={iconType}
            title={location.name}
            onClick={() => { props.callBack({ lat: Number(location.lat), lng: Number(location.lng) }); props.zoomCallBack(18); props.setActiveMarker(location); }} />
    })

    return (
        <section className='map-content'>
            <LoadScript
                googleMapsApiKey="AIzaSyDD9qFIefu1Po1AbhLBFpv0bz6gEa5C4Ng"
            >
                <GoogleMap
                    onLoad={map => {
                        setMap(map);
                        setOptions({
                            zoomControl: true,
                            zoomControlOptions: {
                                position: google.maps.ControlPosition.LEFT_CENTER,
                            },
                            streetViewControl: true,
                            streetViewControlOptions: {
                                position: google.maps.ControlPosition.LEFT_CENTER,
                            },
                            mapTypeControl: true,
                            mapTypeControlOptions: {
                                style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
                                position: google.maps.ControlPosition.TOP_LEFT,
                            },
                            zoom: 17,
                        });
                        map.setOptions(options)
                    }}
                    center={props.center}
                    zoom={props.zoom}
                    mapContainerClassName="map"
                    options={options}
                    onMouseMove={() => props.zoomCallBack(map.getZoom())}

                >
                    {markers}

                </GoogleMap>
            </LoadScript>
            <div className="controls">
                <span className={clicked ? "topper" : "topper hidden"} onClick={toggleSidebar}>
                    <i id="toggle-button" className={clicked ? "fa-solid fa-caret-right" : "fa-solid fa-caret-left"}></i>
                    <h2 id="toggle-text" className="list-header">{clicked ? "Hide Map Controls" : "Show Map Controls"}</h2>
                </span>
                <div id='content' className={clicked ? "#content" : "#content hidden"}>
                    <form id="search">
                        <input type="text" placeholder='Search' />
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </form>
                    <h2 className="list-header">Location Information</h2>
                    <div className='info-container'>
                        {props.activeMarker ?
                            <div className='info'>
                                {props.activeMarker.image === "" ? null : <img src={props.activeMarker.image} />}
                                <h3>Name: <span>{props.activeMarker.name}</span></h3>
                                {props.activeMarker.abbrev === "" ? null : <h3>Abbreviation: <span>{props.activeMarker.abbrev}</span></h3>}
                                <h3>Description: <span>{props.activeMarker.description}</span></h3>
                                <button>Add to Favorites</button>
                            </div> : <p className='placeholder'>Select a location to find out more about it</p>}
                    </div>
                    <div className="filters">
                        <h2 className="list-header">Student</h2>
                        <ul>
                            <FilterItem cn="fa-solid fa-heart" label="Favorites" color="rgb(253, 45, 97)" />
                            <FilterItem cn="fa-solid fa-house-chimney" label="Residence Halls" toggle={props.toggle} category="residence" />
                            <FilterItem cn="fa-solid fa-graduation-cap" label="Lecture Halls" toggle={props.toggle} category="lecture" />
                            <FilterItem cn="fa-solid fa-utensils" label="Dining Halls" toggle={props.toggle} category="dining" />
                        </ul>
                        <h2 className="list-header">Transportation</h2>
                        <ul>
                            <FilterItem cn="fa-solid fa-bus" label="Bus Stops" />
                            <FilterItem cn="fa-solid fa-square-parking" label="Parking" color="rgb(78, 160, 255)" />
                            <FilterItem cn="fa-solid fa-bolt-lightning" label="Electric Scooter Hub" color="rgb(239, 255, 96)" />
                            <FilterItem cn="fa-solid fa-location-dot" label="Campus Entry" color="rgb(255, 51, 51)" />
                        </ul>
                        <h2 className="list-header">Other</h2>
                        <ul>
                            <FilterItem cn="fa-solid fa-location-dot" label="Notable Locations" color="rgb(253, 156, 45)" />
                            <FilterItem cn="fa-solid fa-location-dot" label="Public Art" color="rgb(16, 179, 65)" />
                            <FilterItem cn="fa-solid fa-square-phone" label="Emergency Phones" color="rgb(116, 255, 248)" />
                            <FilterItem cn="fa-solid fa-person-breastfeeding" label="Mother Friendly" color="rgb(237, 98, 255)" />
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MapSection