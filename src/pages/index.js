import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import {TemperatureView} from "../components/windy/temperatureView";
import {Webcams} from "../components/windy/webcams";
import {useState} from "react";
import {LocationDrawer} from "../components/locationDrawer";
import {LocationContextProvider} from "../context/locationContext";
import {hottestLocation, orderedLocationWeatherData} from "../cache/12-08-21";


const IndexPage = () => {
    const [location, setLocation] = useState(null);

    function handleLocationChange(location) {
        console.log({location});
        setLocation(location);
    }

    return (
        <LocationContextProvider
            locations={orderedLocationWeatherData}
            hottestLocation={hottestLocation}
        >
            <Seo title="Home"/>
            <TemperatureView onLocationChange={handleLocationChange}/>
            <Webcams location={location}/>
            <LocationDrawer location={location}/>
        </LocationContextProvider>
    )
}

export default IndexPage
