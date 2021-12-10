import {get} from '@tsamantanis/node-windy-api';

const fetch = require("node-fetch");

export interface PointForecast {
    'past3hsnowprecip-surface': number[];
    'temp-surface': number[];
    ts: number[]; // UNIX timestamps
    units: {
        'past3hsnowprecip-surface': 'm';
        'temp-surface': 'C' | 'K' | 'F';
    }
    warning: string;
}

export interface WeatherData {
    temp: number;
    snow: number;
}

export interface Location {
    lat: number;
    lon: number;
    name: string;
}

export interface LocationWeatherData extends WeatherData, Location {
    tempF: number;
}


export interface Layer {
    addTo();

    openTooltip(latlng?);

    closeTooltip();

    /** Returns true if the tooltip bound to this layer is currently open.*/
    isTooltipOpen(): boolean;

    /** Sets the content of the tooltip bound to this layer.*/
    setTooltipContent(content);

    getTooltip();


    bindPopup(content, options);

    getLatLng();
}

export function normalizeData(data: PointForecast): PointForecast {
    // convert from K to F
    data['temp-surface'] = data['temp-surface'].map((temp) => ((temp - 273.15) * 9 / 5 + 32));
    data.units['temp-surface'] = 'F';
    return data;
}

export function getAverage(data: PointForecast): WeatherData {
    const tempAverage = data['temp-surface'].reduce((prev, curr) => {
        return prev + curr;
    }) / data['temp-surface'].length;

    const snowPrecipAverage = data['past3hsnowprecip-surface'].reduce((prev, curr) => {
        return prev + curr;
    }) / data['past3hsnowprecip-surface'].length;

    console.log({tempAverage, snowPrecipAverage});
    return {
        temp: tempAverage,
        snow: snowPrecipAverage
    };
}

export async function getImageUrl(lat, lon): Promise<WebcamsResponse> {
    const path = `https://api.windy.com/api/webcams/v2/list/nearby=${lat},${lon},5?show=webcams:image,location,player`
    const options = {
        method: "get",
        headers: {
            "x-windy-key": "FTOriVlg1ifb8cP0QDXf6yuq91t0ef5j"
        }
    }
    const data = await fetch(path, options)
    console.log({data}, 'mzmz');
    return data.json();
}



// export async function getTempSnowData(lat, lon): Promise<PointForecast> {
//     return get(
//         lat,
//         lon,
//         "gfs",
//         ["temp", "snowPrecip"],
//         ["surface"],
//         'BXBSHXdWiSLrrtRxkzwQNUb3vHMVwNUo'
//     );
// }
//
// export async function getLocationWeatherData(locations): Promise<LocationWeatherData[]> {
//     const entries = Object.entries(locations);
//     const promises = entries.map(([name, {lat, lon}]) => {
//         return getTempSnowData(lat, lon);
//     });
//
//     const datas: WeatherData[] = (await Promise.all(promises)).map((data: PointForecast) => {
//         return getAverage(normalizeData(data));
//     });
//
//     const ret = entries.map(([name, {lat, lon}], i) => {
//             return {
//                 name,
//                 lat,

//                 lon,
//                 ...datas[i]
//             };
//         }
//     );
//
//     console.log({ret});
//     return ret;
// }

export interface WebcamImage {
    current: {
        icon: string;
        thumbnail: string;
        preview: string;
        toenail: string;
    }
    sizes: {
        icon: { width: number, height: number };
        thumbnail: { width: number, height: number };
        preview: { width: number, height: number };
        toenail: { width: number, height: number };
    };
    daylight: {
        icon: string;
        thumbnail: string;
        preview: string;
        toenail: string;
    }
    update: number
}

export interface Webcam {
    id: string;
    status: 'active';
    title: string;
    image: WebcamImage;
    "location": {
        "city": "Burmantofts",
        "region": "England",
        "region_code": "GB.ENG",
        "country": "United Kingdom",
        "country_code": "GB",
        "continent": "Europe",
        "continent_code": "EU",
        "latitude": 53.796343,
        "longitude": -1.546612,
        "timezone": "Europe/London",
        "wikipedia": "https://en.wikipedia.org/wiki/Burmantofts"
    }
    "player": {
        "live": {
            "available": false,
            "embed": ""
        },
        "day": {
            "available": true,
            "link": "https://www.windy.com/webcams/1576526006",
            "embed": "https://webcams.windy.com/webcams/public/embed/player/1576526006/day"
        },
        "month": {
            "available": true,
            "link": "https://www.windy.com/webcams/1576526006",
            "embed": "https://webcams.windy.com/webcams/public/embed/player/1576526006/month"
        },
        "year": {
            "available": true,
            "link": "https://www.windy.com/webcams/1576526006",
            "embed": "https://webcams.windy.com/webcams/public/embed/player/1576526006/year"
        },
        "lifetime": {
            "available": true,
            "link": "https://www.windy.com/webcams/1576526006",
            "embed": "https://webcams.windy.com/webcams/public/embed/player/1576526006/lifetime"
        }
    },
    "statistics": {
        "views": 51087
    },
}

export interface WebcamsResponseResult {
    offset: number;
    limit: number;
    total: number;
    webcams: Webcam[];
}

export interface WebcamsResponse {
    status: string;
    result: WebcamsResponseResult;
}
