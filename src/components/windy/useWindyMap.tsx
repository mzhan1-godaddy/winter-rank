import {useState} from "react";
import {useEffect} from "react";
import gdLogo from '../../images/gd-logo.png';
import {hottestLocation, locationWeatherData, orderedLocationWeatherData} from '../../cache/12-08-21';
import {getImageUrl, Layer, LocationWeatherData} from "../../services/windy";
import {useLocationContext} from "../../context/locationContext";

export function useWindyMap() {

    const {actions} = useLocationContext();

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


    // const START_LAT = 14.997985547591881;
    // const START_LON = 18.700967459515446;

    const START_LAT = 0;
    const START_LON = 0;


    const options = {
        // Required: API key
        key: '8OGZ5CI3B4mtrOceYu3YqAHs60bgg81e', // REPLACE WITH YOUR KEY !!!

        // Put additional console output
        // verbose: true,

        // Optional: Initial state of the map
        lat: START_LAT,
        lon: START_LON,
        zoom: 1,
        overlay: 'temp'
    };

    // const [layers, setLayers] = useState([]);
    function selectLocation(location, e, map) {
        console.log({location, map, e}, 'mzmz');
        // onLocationChange && onLocationChange(location);

        // myMap && myMap.panTo([location.lat, location.lon]);
        // myMap && myMap.panTo(new L.LatLng(0, 0));
        // myMap && myMap.setZoom(8);

        // myMap && myMap.setView([location.lat, location.lon]);
        map.setView([location.lat, location.lon]);
        actions.setCurrentLocation(location);
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

            // marker.bindPopup(getPopupContent, popUpOptions);
            marker.on('click', function (e) {
                selectLocation(data, e, map);
                // map.setView(e.target.getLatLng(), 10);
            });
        });
    }

    const [map, setMap] = useState(null);

    useEffect(() => {
        window.windyInit(options, windyAPI => {
            // windyAPI is ready, and contain 'map', 'store',
            // 'picker' and other useful stuff

            const {map} = windyAPI;
            // .map is instance of Leaflet map
            // windyMap = (map);
            setMap(map);
            console.log({map}, 'mz original map');
            initLocations(window.L, map, orderedLocationWeatherData);
            // map.panTo(new L.LatLng(0, 0))
        });
    }, []);
    // Initialize Windy API


    return {
        map
    };
}
