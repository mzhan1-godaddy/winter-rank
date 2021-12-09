import React, {createContext, useContext, useState} from 'react';


const LocationContext = createContext<LocationContextShape>(null);

interface PageIndex {
    curr: number;
    prev?: number;
}

function isEmpty(value: any): boolean {
    return value === '' || value === null || value === undefined;
}

export function LocationContextProvider(
    {
        children,
        locations,
    }: any
): JSX.Element {
    const [_locations, _setLocations] = useState(locations);
    const [_currentLocation, _setCurrentLocation] = useState(null);

    function setCurrentLocation(location) {
        _setCurrentLocation(location);
    }

    const providerValue = {
        values: {
            currentLocation: _currentLocation,
            locations: _locations
        },
        actions: {
            setCurrentLocation
        }
    };

    return <LocationContext.Provider value={providerValue}>
        {children}
    </LocationContext.Provider>;
}

export interface LocationContextShape {

}

export function useLocationContext(): LocationContextShape {
    return useContext(LocationContext) as LocationContextShape;
}
