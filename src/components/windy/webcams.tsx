import {WebcamsResponse} from "../../services/windy";


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
                },
                "url": {
                    "current": {
                        "desktop": "https://www.windy.com/webcams/1576526006",
                        "mobile": "https://www.windy.com/webcams/1576526006"
                    },
                    "edit": "https://www.windy.com/webcams/1576526006",
                    "daylight": {
                        "desktop": "https://www.windy.com/webcams/1576526006",
                        "mobile": "https://www.windy.com/webcams/1576526006"
                    }
                }
            }
        ]
    }
};

export function Webcams () {

}