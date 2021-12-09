import * as React from "react"
import {Link} from "gatsby"
import {StaticImage} from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import {TemperatureView} from "../components/windy/temperatureView";
import {Webcams} from "../components/windy/webcams";
import {useState} from "react";

const IndexPage = () => {
    const [location, setLocation] = useState(null);

    function handleLocationChange(location) {
        console.log({location});
        setLocation(location);
    }

    return (
        <Layout>
            <Seo title="Home"/>
            <TemperatureView onLocationChange={handleLocationChange}/>
            <Webcams location={location}/>
        </Layout>
    )
}

export default IndexPage
