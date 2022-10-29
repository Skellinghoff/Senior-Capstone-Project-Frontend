import Header from './components/Header.jsx'
import MapSection from './components/MapSection.jsx'
import Footer from './components/Footer.jsx'
import InfoPopup from './InfoPopup.jsx'
import Signin from './components/Signin.jsx'
import React from 'react'
import locationData from "./location-data.json"

function App() {

    //used to focus on selected markers and center map on start
    const [MCenter, setMCenter] = React.useState({
        lat: 33.58446468105697,
        lng: -101.87468789605175
    })
    const [zoomLevel, setZoomLevel] = React.useState(15)

    //handles filters hiding and showing markers
    const [locationMarkers, setLocationMarkers] = React.useState(locationData)
    function toggle(category, switched) {
        if (switched === true) {
            setLocationMarkers(prevLocationMarkers => {
                return prevLocationMarkers.map((location) => {
                    activeMarker && category === activeMarker.category ? setActiveMarker(null) : null
                    return location.category === category ? { ...location, visible: false } : location
                })
            })
        } else {
            setLocationMarkers(prevLocationMarkers => {
                return prevLocationMarkers.map((location) => {
                    return location.category === category ? { ...location, visible: true } : location
                })
            })
        }

    }

    const [popInfo, setPopInfo] = React.useState(null)

    //handles selecting a marker
    const [activeMarker, setActiveMarker] = React.useState(null)
    function dropToggle(id) {
        setLocationMarkers(prevLocationMarkers => {
            return prevLocationMarkers.map((location) => {
                if (location.id === id) {
                    setActiveMarker(location)
                }
                return location.id === id ? { ...location, visible: true } : location
            })
        })
    }


    return (
        <div className="container">
            <Header />
            <MapSection center={MCenter}
                callBack={setMCenter}
                zoom={zoomLevel}
                zoomCallBack={setZoomLevel}
                toggle={toggle}
                locationMarkers={locationMarkers}
                setActiveMarker={setActiveMarker}
                activeMarker={activeMarker} />
            <Footer callBack={setMCenter} zoomCallBack={setZoomLevel} dropToggle={dropToggle} />
        </div>)
}

export default App
