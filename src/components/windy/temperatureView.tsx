import React from 'react';
import './temperatureView.scss';
import gdLogo from '../../images/gd-logo.png';
import {locations} from '../../constants';

function initLocations(L, map, locations) {
    const icon = L.icon({
        iconUrl: gdLogo,
        iconSize: [24, 21],
        // iconAnchor: [22, 94],
        // popupAnchor: [-3, -76],
        // shadowUrl: 'gatsby-icon.png',
        // shadowSize: [68, 95],
        // shadowAnchor: [22, 94]
    });
    const tooltipOptions = {
        sticky: false,
        permanent: false,
        offset: L.point(6, 0),
        direction: 'right'
    }
    Object.entries(locations).forEach(([name, {lat, lon}]) => {
        const marker = L.marker([lat, lon], {icon}).addTo(map);
        marker.bindTooltip(name, tooltipOptions);
            // .openTooltip();
    });
}

const START_LAT = 14.997985547591881;
const START_LON = 18.700967459515446;

export function TemperatureView({lat= START_LAT, lon= START_LON, zoom = 1, overlay = 'temp'}) {
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

        const {map} = windyAPI;
        // .map is instance of Leaflet map

        initLocations(window.L, map, locations);

        map.panTo(new L.LatLng(lat, lon));

        map.scrollWheelZoom.disable();



        const myIcon = window.L.icon({
            iconUrl: gdLogo,
            iconSize: [24, 21],
            // iconAnchor: [22, 94],
            // popupAnchor: [-3, -76],
            // shadowUrl: 'gatsby-icon.png',
            // shadowSize: [68, 95],
            // shadowAnchor: [22, 94]
        });

        // window.L.marker([50.5, 30.5]).bindTooltip('HiThere!').addTo(map);
        // const a = window.L.marker([60.5, 30.5]).addTo(map);
        // const b = window.L.marker([50.5, 30.5], {icon: myIcon}).addTo(map);
        //
        //
        // const tooltipOptions = {
        //     sticky: true,
        //     permanent: true,
        //     offset: window.L.point(6, 0),
        //     direction: 'right'
        // }
        //
        // b.bindTooltip('🥇', tooltipOptions).openTooltip();
        // a.bindTooltip('🥇', tooltipOptions).openTooltip();


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
    </>);
}
