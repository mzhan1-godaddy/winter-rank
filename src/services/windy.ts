import {get} from '@tsamantanis/node-windy-api';

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

}


export function normalizeData(data: PointForecast): PointForecast {
    //convert from K to Celsius
    // data['temp-surface'] = data['temp-surface'].map((temp) => (temp - 273.15).toFixed(2))
    data['temp-surface'] = data['temp-surface'].map((temp) => (temp - 273.15));
    data.units['temp-surface'] = 'C';
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
