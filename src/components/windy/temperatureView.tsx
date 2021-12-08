import React from 'react';
import './temperatureView.scss';
export function TemperatureView({}) {

    const options = {
        // Required: API key
        key: '8OGZ5CI3B4mtrOceYu3YqAHs60bgg81e', // REPLACE WITH YOUR KEY !!!

        // Put additional console output
        verbose: true,

        // Optional: Initial state of the map
        lat: 50.4,
        lon: 14.3,
        zoom: 5,
        overlay: 'temp'
    };

    // Initialize Windy API

    window.windyInit(options, windyAPI => {
        // windyAPI is ready, and contain 'map', 'store',
        // 'picker' and other useful stuff

        const { map } = windyAPI;
        // .map is instance of Leaflet map

        window.L.popup()
            .setLatLng([50.4, 14.3])
            .setContent('Hello World')
            .openOn(map);
    });


    return (<div>
        hi
        <div id="windy"/>
    </div>);
}
