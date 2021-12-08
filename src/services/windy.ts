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
