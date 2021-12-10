import React, {useEffect, useState} from 'react';
import './temperatureView.scss';
import gdLogo from '../../images/gd-logo.png';
import {hottestLocation, locationWeatherData, orderedLocationWeatherData} from '../../cache/12-08-21';
import {getImageUrl, Layer, LocationWeatherData} from "../../services/windy";
import {useWindyMap} from "./useWindyMap";

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


const START_LAT = 14.997985547591881;
const START_LON = 18.700967459515446;

export function TemperatureView({lat = START_LAT, lon = START_LON, zoom = 1, overlay = 'temp', onLocationChange}) {
    useWindyMap();
    return (
        <div id="windy"/>
    );
}
