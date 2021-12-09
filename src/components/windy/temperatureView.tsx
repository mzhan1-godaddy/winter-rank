import React, {useEffect, useState} from 'react';
import './temperatureView.scss';
import gdLogo from '../../images/gd-logo.png';
import {hottestLocation, locationWeatherData, orderedLocationWeatherData} from '../../cache/12-08-21';
import {getImageUrl, Layer, LocationWeatherData} from "../../services/windy";

const DEFAULT_TOOLTIP_OPTIONS = {
    sticky: false,
    permanent: false,
    offset: window.L.point(6, 0),
    direction: 'right'
}

const STICKY_TOOLTIP_OPTIONS = {
    sticky: false,
    permanent: true,
    offset: window.L.point(6, 0),
    direction: 'right'
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
                // marker.closeTooltip();
            }

            break;
    }
}

 function getPopupContent(layer: Layer) {
    const {lat, lng} = layer.getLatLng();
    console.log({layer, lat, lng});
    // const imageUrl = await getImageUrl(lat, lng);
    // return `<img src="https://images-webcams.windy.com/77/1329413077/current/preview/1329413077.jpg"/>`;
    // return `<video src="https://webcams.windy.com/webcams/public/embed/player/1576526006/year"/>`;
    // return `<a name="windy-webcam-timelapse-player" data-id="1576526006" data-play="day" href="https://windy.com/webcams/1576526006" target="_blank">Burmantofts: Park Plaza Leeds</a>`;

    // return `<iframe allowfullscreen="false" name="windy-webcam-timelapse-player-iframe" src="https://webcams.windy.com/webcams/public/embed/player/1576526006/day?autoplay=1" allow='autoplay'></iframe>`
     return `<a name="windy-webcam-nearby-widget" data-params='{"lat":"53.7963435","lon":"-1.5466116"}'></a><script async type="text/javascript" src="https://webcams.windy.com/webcams/public/widget/script/nearby.js"></script>`
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

    const markerOptions = {
        icon,
        riseOnHover: true
    };

    const popUpOptions = {
        minWidth: 400
    };
    locations.forEach((data, i) => {
        const marker = L.marker([data.lat, data.lon], markerOptions).addTo(map);
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
        // verbose: true,

        // Optional: Initial state of the map
        lat,
        lon,
        zoom,
        overlay
    };

    // const [layers, setLayers] = useState([]);

    useEffect(() => {
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
                visibleFeatures.forEach((feature) => {
                    // const tooltip = feature.getTooltip();
                    // console.log({tooltip});
                    // map.openTooltip(tooltip);
                    // if(!feature.tooltip)
                    // feature.closeTooltip();
                });
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
    }, []);


    return (
        <div id="windy"/>
    );
}
