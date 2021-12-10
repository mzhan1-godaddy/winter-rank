import {getImageUrl, LocationWeatherData, Webcam, WebcamsResponse} from "../../services/windy";
import React, {useEffect, useState} from 'react';
import {useLocationContext} from "../../context/locationContext";
import {getWikiData, WikipediaData} from "../../services/wiki";

import './webcams.scss';
import {WebcamView} from "./webcamView";
import {Divider} from "@mui/material";

const res: WebcamsResponse = {
    "status": "OK",
    "result": {
        "offset": 0,
        "limit": 10,
        "total": 1,
        "webcams": [
            {
                "id": "1576526006",
                "status": "active",
                "title": "Burmantofts: Park Plaza Leeds",
                "image": {
                    "current": {
                        "icon": "https://images-webcams.windy.com/06/1576526006/current/icon/1576526006.jpg",
                        "thumbnail": "https://images-webcams.windy.com/06/1576526006/current/thumbnail/1576526006.jpg",
                        "preview": "https://images-webcams.windy.com/06/1576526006/current/preview/1576526006.jpg",
                        "toenail": "https://images-webcams.windy.com/06/1576526006/current/thumbnail/1576526006.jpg"
                    },
                    "sizes": {
                        "icon": {
                            "width": 48,
                            "height": 48
                        },
                        "thumbnail": {
                            "width": 200,
                            "height": 112
                        },
                        "preview": {
                            "width": 400,
                            "height": 224
                        },
                        "toenail": {
                            "width": 200,
                            "height": 112
                        }
                    },
                    "daylight": {
                        "icon": "https://images-webcams.windy.com/06/1576526006/daylight/icon/1576526006.jpg",
                        "thumbnail": "https://images-webcams.windy.com/06/1576526006/daylight/thumbnail/1576526006.jpg",
                        "preview": "https://images-webcams.windy.com/06/1576526006/daylight/preview/1576526006.jpg",
                        "toenail": "https://images-webcams.windy.com/06/1576526006/daylight/thumbnail/1576526006.jpg"
                    },
                    "update": 1639069651
                },
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
                },
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
                }
            }
        ]
    }
};


export function Webcams() {

    //style="background-image: url(https://images-webcams.windy.com/06/1576526006/current/preview/1576526006.jpg)"
    const {currentLocation} = useLocationContext();
    const [webcams, setWebcams] = useState([]);
    useEffect(() => {
        if (currentLocation) {
            getImageUrl(currentLocation.lat, currentLocation.lon)
                .then((res) => {
                    console.log({res});
                    setWebcams(res.result.webcams);
                });


        }


    }, [currentLocation?.name])


    // return (
    //     <iframe
    //         allowfullscreen={false}
    //         name="windy-webcam-timelapse-player-iframe"
    //         src="https://webcams.windy.com/webcams/public/embed/player/1576526006/day?autoplay=1"
    //         allow='autoplay'>
    //     </iframe>
    // );

    // {webcams && webcams.length > 0 && <img src={webcams[0].image.current.preview}/>}


    // {webcams && webcams.length > 0 && <iframe width="498" height="300"
    // {/*                                          src={`${webcams[0].location.wikipedia}?rvprop=content&rvsection=0`}></iframe>}*/}
    return (
        <>
            {currentLocation && webcams && webcams.length === 0 && <p className='wiki-description top-margin'>No webcams found for {currentLocation.name}</p>}
            {webcams && webcams.length > 0 && webcams.map((webcam: Webcam, i) => {
                return <>
                    <WebcamView webcam={webcam}/>
                    <Divider/>
                </>;
            })}
        </>
    )
}
