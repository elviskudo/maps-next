import { useEffect, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { useTable } from '@tanstack/react-table';
import { supabase } from '@/libs/supabaseClient';

export default function MapsPage() {
    const [locations, setLocations] = useState([]);
    const [selectedMarker, setSelectedMarker] = useState(null);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    });

    useEffect(() => {
        // Fetch locations from Supabase
    }, []);

    const columns = [
        // Define table columns
    ];

    const tableInstance = useTable({ columns, data: locations });

    if (!isLoaded) return <div>Loading...</div>;

    return (
        <div className="flex">
            <div className="w-1/3 p-4">
                {/* Render locations table */}
            </div>
            <div className="w-2/3 h-screen">
                <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    center={{ lat: -6.200000, lng: 106.816666 }}
                    zoom={10}
                >
                    {locations.map((location) => (
                        <Marker
                            key={location.id}
                            position={{ lat: location.latitude, lng: location.longitude }}
                            onClick={() => setSelectedMarker(location)}
                        />
                    ))}
                </GoogleMap>
                {selectedMarker && (
                    // Render modal or drawer with location details
                    <div className="absolute top-0 right-0 w-1/4 h-full bg-white">
                        {/* Location details */}
                        <button onClick={() => setSelectedMarker(null)}>Close</button>
                    </div>
                )}
            </div>
        </div>
    );
}