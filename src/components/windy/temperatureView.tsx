import React from 'react';
import './temperatureView.scss';
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

        window.L.popup()
            .setLatLng([50.4, 14.3])
            .setContent('1')
            .openOn(map)

        window.L.popup()
            .setLatLng([14.4, 50.3])
            .setContent('2')
            .openOn(map);
    });


    return (<div id="windy"/>);
}
