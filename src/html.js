import React from "react"
import PropTypes from "prop-types"

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />

          <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0, shrink-to-fit=no"
          />
          <script src="https://unpkg.com/leaflet@1.4.0/dist/leaflet.js"></script>
          <script src="https://api.windy.com/assets/map-forecast/libBoot.js"></script>
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        <a name="windy-webcam-nearby-widget" data-params='{"lat":"53.7963435","lon":"-1.5466116"}'></a><script async type="text/javascript" src="https://webcams.windy.com/webcams/public/widget/script/nearby.js"></script>
        {props.postBodyComponents}
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
