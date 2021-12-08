import React from 'react';
import './temperatureView.scss';
import gatsbyIcon from '../../images/gatsby-icon.png';
export function TemperatureView({lat, lon, zoom = 1, overlay = 'temp'}) {

    const options = {
        // Required: API key
        key: '8OGZ5CI3B4mtrOceYu3YqAHs60bgg81e', // REPLACE WITH YOUR KEY !!!

        // Put additional console output
        verbose: true,

        // Optional: Initial state of the map
        lat,
        lon,
        zoom,
        overlay
    };

    // Initialize Windy API

    window.windyInit(options, windyAPI => {
        // windyAPI is ready, and contain 'map', 'store',
        // 'picker' and other useful stuff

        const { map } = windyAPI;
        // .map is instance of Leaflet map

        // window.L.marker([50.5, 30.5]).bindTooltip('HiThere!').addTo(map);
        const a = window.L.marker([60.5, 30.5]).addTo(map);
        const b = window.L.marker([50.5, 30.5]).addTo(map);

        const tta = window.L.tooltip({sticky:true}, a);
        tta.openTooltip();
        // a.bindTooltip(tta).openTooltip();
        b.bindTooltip('this is b').openTooltip();


        const myIcon = window.L.icon({
            iconUrl: gatsbyIcon,
            iconSize: [20, 20],
            iconAnchor: [22, 94],
            popupAnchor: [-3, -76],
            // shadowUrl: 'gatsby-icon.png',
            shadowSize: [68, 95],
            shadowAnchor: [22, 94]
        });
        L.marker([50.505, 30.57], {icon: myIcon}).addTo(map);

        // a.bindPopup('hi there 2 !!!').openPopup();
        // window.L.marker([50.5, 30.5]).addTo(map).bindPopup('hi there !!!!').openPopup({autoClose: false});


        // window.L.popup()
        //     .setLatLng([50.4, 14.3])
        //     .setContent('1')
        //     .openOn(map)
        //
        // window.L.popup()
        //     .setLatLng([14.4, 50.3])
        //     .setContent('<p>Hello world!<br />This is a nice popup.</p>')
        //     .openOn(map);

    });


    return (<>
        <div id="windy"/>
        <div id="windy2"/>
    </>);
}
