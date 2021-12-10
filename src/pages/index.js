import * as React from "react"

import {TemperatureView} from "../components/windy/temperatureView";
import {Webcams} from "../components/windy/webcams";
import {useState} from "react";
import {RankingDrawer} from "../components/rankingDrawer";
import {LocationContextProvider} from "../context/locationContext";
import {hottestLocation, orderedLocationWeatherData} from "../cache/12-08-21";
import {LocationViewDrawer} from "../components/locationViewDrawer";


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
            <RankingDrawer/>
            <LocationViewDrawer/>
            <TemperatureView onLocationChange={handleLocationChange}/>

        </LocationContextProvider>
    )
}

export default IndexPage
