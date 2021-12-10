import React, {useEffect, useState} from "react";
import {getWikiData, WikipediaData} from "../../services/wiki";
import './webcams.scss';

export function WebcamView({webcam}) {
    const [wikiData, setWikiData] = useState(null);
    useEffect(() => {
        if (webcam && webcam.location) {
            getWikiData(webcam.location.wikipedia)
                .then((wiki: WikipediaData) => {
                    if (wiki && wiki.query && wiki.query.pages) {
                        const entry = Object.entries(wiki.query.pages)[0];
                        const ddd = entry[1];
                        console.log({ddd}, 'mz');
                        setWikiData({...(ddd)});
                    }
                });
        } else {
            setWikiData(null);
        }
    }, [webcam])

    return (
        <>
            {wikiData && <h2 className='wiki-title'>{wikiData.title}</h2>}
            {webcam &&
            (
                <iframe
                    className="camera-view"
                    width="462" height="300"
                    name={`windy-webcam-timelapse-player-iframe-${webcam.id}`}
                    id={`windy-webcam-timelapse-player-iframe-${webcam.id}`}
                    key={`windy-webcam-timelapse-player-iframe-${webcam.id}`}
                    src={`${webcam.player.day.embed}?rel=0&autoplay=1`}
                    allow={'autoplay'}
                >
                </iframe>
            )}
            {wikiData && wikiData.extract && <p className='wiki-description truncate'>{wikiData.extract}</p>}
        </>
    )
}
