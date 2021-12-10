import fetch from 'node-fetch';

export interface WikipediaData {
    batchcomplete: string;
    query: {
        pages: {
            [key: string]: {
                extract: string;
                ns: 0;
                pageid: number;
                title: string;
            }
        }
    }
}
export async function getWikiData(fullWikiUrl: string): Promise<any> {
    const temp = fullWikiUrl.split('/');
    const title = temp[temp.length - 1];
    const path = `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&origin=*&titles=${encodeURIComponent(title)}`

    const options = {
        method: "get",
    }
    const data = await fetch(path, options)
    console.log({data}, 'mzmz');
    return data.json();
}
