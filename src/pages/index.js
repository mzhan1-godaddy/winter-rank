import * as React from "react"
import {Link} from "gatsby"
import {StaticImage} from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import {TemperatureView} from "../components/windy/temperatureView";

const IndexPage = () => {
    return (
        <Layout>
            <Seo title="Home"/>
            <TemperatureView/>

        </Layout>
    )
}

export default IndexPage
