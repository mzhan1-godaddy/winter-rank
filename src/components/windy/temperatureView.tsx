import React from 'react';
import './temperatureView.scss';
import gdLogo from '../../images/gd-logo.png';
import {hottestLocation, locationWeatherData, orderedLocationWeatherData} from '../../cache/12-08-21';
import {LocationWeatherData} from "../../services/windy";

const DEFAULT_TOOLTIP_OPTIONS = {
    sticky: false,
    permanent: false,
    offset: window.L.point(6, 0),
    direction: 'right'
}

const STICKY_TOOLTIP_OPTIONS = {
    sticky: true,
    permanent: true,
    offset: window.L.point(6, 0),
    direction: 'right'
}

async function getWindyData(lat, lon) {
    // const res = await standard(49.809, 16.787, 'BXBSHXdWiSLrrtRxkzwQNUb3vHMVwNUo');

    // const data = await get(
    //     lat,
    //     lon,
    //     "gfs",
    //     ["temp", "snowPrecip"],
    //     ["surface"],
    //     'BXBSHXdWiSLrrtRxkzwQNUb3vHMVwNUo'
    // )
    //
    // const weatherData = getAverage(normalizeData(data));
    // console.log({weatherData});

    // const test =  await getLocationWeatherData(locations);
    // console.log(test);
}

function getFeaturesInView(map) {
    const features = [];
    map.eachLayer(function (layer) {
        if (layer instanceof L.Marker) {
            if (map.getBounds().contains(layer.getLatLng())) {
                features.push(layer);
            }
        }
    });
    return features;
}

function addTooltip(marker, rank, data: LocationWeatherData) {
    const str = `<b>${data.name}</b><div>${data.tempF.toFixed(2)}°F</div>`;
    switch (rank) {
        case 0:
            marker.bindTooltip(`🥇 ${str}`, STICKY_TOOLTIP_OPTIONS).openTooltip();
            break;
        case 1:
            marker.bindTooltip(`🥈 ${str}`, STICKY_TOOLTIP_OPTIONS).openTooltip();
            break;
        case 2:
            marker.bindTooltip(`🥉 ${str}`, STICKY_TOOLTIP_OPTIONS).openTooltip();
            break;
        default:

            if (hottestLocation.name === data.name) {
                marker.bindTooltip(`🔥 ${str}`, STICKY_TOOLTIP_OPTIONS).openTooltip();
            } else {
                marker.bindTooltip(str, DEFAULT_TOOLTIP_OPTIONS);
            }

            break;
    }
}

function initLocations(L, map, locations: LocationWeatherData[]) {
    const icon = L.icon({
        iconUrl: gdLogo,
        iconSize: [24, 21],
        // iconAnchor: [22, 94],
        // popupAnchor: [-3, -76],
        // shadowUrl: 'gatsby-icon.png',
        // shadowSize: [68, 95],
        // shadowAnchor: [22, 94]
    });
    locations.forEach((data, i) => {
        const marker = L.marker([data.lat, data.lon], {icon}).addTo(map);
        addTooltip(marker, i, data);
    });
}

const START_LAT = 14.997985547591881;
const START_LON = 18.700967459515446;

export function TemperatureView({lat = START_LAT, lon = START_LON, zoom = 1, overlay = 'temp'}) {
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

        initLocations(window.L, map, orderedLocationWeatherData);

        map.panTo(new L.LatLng(lat, lon));

        // map.scrollWheelZoom.disable();


        const myIcon = window.L.icon({
            iconUrl: gdLogo,
            iconSize: [24, 21],
            // iconAnchor: [22, 94],
            // popupAnchor: [-3, -76],
            // shadowUrl: 'gatsby-icon.png',
            // shadowSize: [68, 95],
            // shadowAnchor: [22, 94]
        });

        map.on('moveend', function (e) {
            // var bounds = map.getBounds();
            const visibleFeatures = getFeaturesInView(map);
            console.log({visibleFeatures});
        });

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


    return (
        <div id="windy"/>
    );
}
