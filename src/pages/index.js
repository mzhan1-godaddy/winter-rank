import * as React from "react"
import {Link} from "gatsby"
import {StaticImage} from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import {TemperatureView} from "../components/windy/temperatureView";
import {Webcams} from "../components/windy/webcams";

const IndexPage = () => {
    return (
        <Layout>
            <Seo title="Home"/>
            <TemperatureView/>
            <Webcams/>
        </Layout>
    )
}

export default IndexPage
